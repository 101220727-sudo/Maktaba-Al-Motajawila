import { useState } from "react";
import axios from "axios";

export default function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        setMessages(prev => [...prev, { role: "user", text: message }]);
        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post("/api/rag/chat", {
                message
            });

            setMessages(prev => [
                ...prev,
                { role: "ai", text: response.data.response }
            ]);
        } catch {
            setMessages(prev => [
                ...prev,
                { role: "ai", text: "حدث خطأ أثناء الاتصال بالمساعد الذكي." }
            ]);
        }

        setLoading(false);
    };

    return (
        <>
            <style>{`
                body {
                    background: linear-gradient(135deg, #F9F7FB, #FFF);
                    font-family: "Tajawal","Cairo",system-ui;
                    direction: rtl;
                }

                .chat-page {
                    max-width: 950px;
                    margin: 3rem auto;
                    background: white;
                    border-radius: 26px;
                    box-shadow: 0 18px 50px rgba(118,73,156,.18);
                    display: flex;
                    flex-direction: column;
                    height: 78vh; /* ⬅️ أكبر */
                    overflow: hidden;
                }

                .chat-top {
                    padding: 1rem 1.6rem;
                    text-align: right;
                }

                .back-link {
                    font-weight: 700;
                    color: #76499C;
                    text-decoration: none;
                }

                .chat-header {
                    padding: 1.6rem 1.8rem 1rem;
                    text-align: center; /* ⬅️ توسيط */
                    font-size: 1.3rem;
                    font-weight: 800;
                    color: #76499C;
                    background: linear-gradient(135deg, #E8DFF5, #fff);
                    border-bottom: 1px solid rgba(118,73,156,.12);
                }

                .chat-intro {
                    padding: .8rem 2.5rem 1.2rem;
                    text-align: center; /* ⬅️ توسيط */
                    font-size: .95rem;
                    color: #555;
                    background: #faf7fd;
                    line-height: 1.9;
                    border-bottom: 1px solid rgba(118,73,156,.1);
                }

                .chat-body {
                    flex: 1; /* ⬅️ أهم شي */
                    padding: 2rem;
                    background: #F9F7FB;
                    overflow-y: auto;
                }

                .message {
                    max-width: 75%;
                    padding: .9rem 1.2rem;
                    border-radius: 18px;
                    margin-bottom: 1rem;
                    font-size: .95rem;
                    line-height: 1.9;
                    box-shadow: 0 4px 12px rgba(0,0,0,.08);
                }

                .message.user {
                    margin-right: auto;
                    background: linear-gradient(135deg, #76499C, #A189B7);
                    color: white;
                    border-bottom-right-radius: 6px;
                }

                .message.ai {
                    margin-left: auto;
                    background: #E0F7F2;
                    color: #065f46;
                    border-bottom-left-radius: 6px;
                }

                .chat-input {
                    padding: 1.3rem;
                    display: flex;
                    gap: .9rem;
                    background: #fff;
                    border-top: 1px solid rgba(118,73,156,.12);
                }

                textarea {
                    flex: 1;
                    border-radius: 16px;
                    border: 1px solid rgba(118,73,156,.25);
                    padding: .9rem 1.2rem;
                    resize: none;
                }

                button {
                    border-radius: 50px;
                    padding: 0 2rem;
                    background: linear-gradient(135deg, #76499C, #A189B7);
                    color: white;
                    border: none;
                    font-weight: 700;
                    cursor: pointer;
                }

                button:disabled {
                    opacity: .6;
                }
            `}</style>

            <div className="chat-page">

                {/* back link (NOT centered) */}
                <div className="chat-top">
                    <a href="/" className="back-link">← العودة إلى الموقع</a>
                </div>

                {/* centered header */}
                <div className="chat-header">
                    🤖 المساعد الذكي 
                </div>

                {/* centered intro */}
                <div className="chat-intro">
                    يمكنك طرح أي سؤال حول مكتبة مهدي المتجولة،  
                    الأنشطة، الباقات، أو البرامج التعليمية.  
                    <br />
                    تتم الإجابة بناءً على مستندات المكتبة الرسمية فقط.
                </div>

                {/* BIG message area */}
                <div className="chat-body">
                    {messages.map((msg, i) => (
                        <div key={i} className={`message ${msg.role}`}>
                            {msg.text}
                        </div>
                    ))}

                    {loading && (
                        <div className="message ai">جاري كتابة الرد...</div>
                    )}
                </div>

                {/* input */}
                <div className="chat-input">
                    <textarea
                        rows="2"
                        placeholder="اكتب سؤالك هنا..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && !e.shiftKey && sendMessage()
                        }
                    />
                    <button onClick={sendMessage} disabled={loading}>
                        إرسال
                    </button>
                </div>

            </div>
        </>
    );
}
