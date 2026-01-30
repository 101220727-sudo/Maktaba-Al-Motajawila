from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import Optional, List
import os
import shutil

# RAG Imports
from langchain_community.llms import Ollama
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.chains.retrieval_qa.base import RetrievalQA
from langchain.schema import Document
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate


# Document loaders
from langchain_community.document_loaders import PyPDFLoader, TextLoader
import docx2txt
router = APIRouter()
 
# =========================
# Data Models
# =========================

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[int] = None

class ChatResponse(BaseModel):
    response: str
    sources: Optional[List[str]] = None
    success: bool = True

# =========================
# RAG Configuration
# =========================

# Initialize Ollama
llm = Ollama(model="llama3.2", temperature=0.7)

# Initialize embeddings (using free HuggingFace)
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# Vector store
vector_store = None
qa_chain = None

# Documents folder
DOCS_FOLDER = "uploaded_docs"
os.makedirs(DOCS_FOLDER, exist_ok=True)

# =========================
# Document Processing
# =========================

def load_documents_from_folder():
    """Load all documents from uploaded_docs folder"""
    documents = []
    
    for filename in os.listdir(DOCS_FOLDER):
        filepath = os.path.join(DOCS_FOLDER, filename)
        
        try:
            # PDF files
            if filename.endswith('.pdf'):
                loader = PyPDFLoader(filepath)
                docs = loader.load()
                documents.extend(docs)
            
            # Text files
            elif filename.endswith('.txt'):
                loader = TextLoader(filepath)
                docs = loader.load()
                documents.extend(docs)
            
            # Word files
            elif filename.endswith('.docx'):
                text = docx2txt.process(filepath)
                doc = Document(page_content=text, metadata={"source": filename})
                documents.append(doc)
                
        except Exception as e:
            print(f"Error loading {filename}: {str(e)}")
    
    return documents

# Custom prompt template
QA_PROMPT = PromptTemplate(
    input_variables=["context", "question"],
    template="""
You are an assistant for Mahdi Mobile Library.

Rules:
- Answer ONLY in English.
- Use ONLY the provided context.
- If the answer is not found in the context, say: "I don't know based on the provided documents."
- Do NOT invent information.

Context:
{context}

Question:
{question}

Answer:
"""
)


def initialize_rag():
    """Initialize RAG system with vector store"""
    global vector_store, qa_chain
    
    print("🔄 Initializing RAG system...")
    
    # Load documents
    documents = load_documents_from_folder()
    
    if not documents:
        print("⚠️ No documents found! Add files to 'uploaded_docs' folder.")
        return False
    
    print(f"📄 Loaded {len(documents)} documents")
    
    # Split documents
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    splits = text_splitter.split_documents(documents)
    print(f"✂️ Split into {len(splits)} chunks")
    
    # Create vector store
    vector_store = Chroma.from_documents(
        documents=splits,
        embedding=embeddings,
        collection_name="event_knowledge"
    )
    
    # Create QA chain
    qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vector_store.as_retriever(search_kwargs={"k": 3}),
    return_source_documents=True,
    chain_type_kwargs={
        "prompt": QA_PROMPT
    }
)

    
    print("✅ RAG system initialized!")
    return True

# =========================
# API Endpoints
# =========================

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Main chat endpoint - RAG query"""
    try:
        # Initialize RAG if not already done
        if qa_chain is None:
            success = initialize_rag()
            if not success:
                raise HTTPException(
                    status_code=400, 
                    detail="No documents loaded. Please upload documents first."
                )
        
        # Get response from RAG
        result = qa_chain.invoke({"query": request.message})
        
        # Extract sources
        sources = []
        if "source_documents" in result:
            for doc in result["source_documents"]:
                source_text = doc.page_content[:100] + "..."
                sources.append(source_text)
        
        return ChatResponse(
            response=result["result"],
            sources=sources,
            success=True
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"RAG Error: {str(e)}")

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    """Upload a document for RAG"""
    try:
        # Save file
        filepath = os.path.join(DOCS_FOLDER, file.filename)
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Reload RAG
        global vector_store, qa_chain
        vector_store = None
        qa_chain = None
        
        return {
            "message": f"File '{file.filename}' uploaded successfully",
            "success": True
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload Error: {str(e)}")

@router.post("/reload")
async def reload_knowledge():
    """Reload knowledge base"""
    global vector_store, qa_chain
    
    try:
        vector_store = None
        qa_chain = None
        success = initialize_rag()
        
        if success:
            return {"message": "Knowledge base reloaded successfully", "success": True}
        else:
            return {"message": "No documents found", "success": False}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Reload Error: {str(e)}")

@router.get("/test")
async def test_endpoint():
    """Test endpoint"""
    return {
        "message": "RAG Controller is working!",
        "status": "active",
        "model": "llama3.2 (Ollama)",
        "documents_count": len(os.listdir(DOCS_FOLDER)) if os.path.exists(DOCS_FOLDER) else 0
    }