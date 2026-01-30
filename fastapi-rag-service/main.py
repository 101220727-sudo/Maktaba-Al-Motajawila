from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from rag_controller import router as rag_router
import uvicorn

app = FastAPI(title="RAG Service API", version="1.0.0")

# CORS - Allow Laravel to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://127.0.0.1:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include RAG Router
app.include_router(rag_router, prefix="/api/rag", tags=["RAG"])

@app.get("/")
def read_root():
    return {
        "message": "FastAPI RAG Service is running!",
        "status": "active",
        "endpoints": {
            "chat": "POST /api/rag/chat",
            "upload": "POST /api/rag/upload",
            "reload": "POST /api/rag/reload",
            "test": "GET /api/rag/test"
        }
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "rag-service"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)