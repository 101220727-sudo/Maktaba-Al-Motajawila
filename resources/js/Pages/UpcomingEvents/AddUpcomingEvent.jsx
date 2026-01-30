import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AddUpcomingEvent() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description1: '',
        description2: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('upcoming-events.store'));
    };

    return (
        <>
            <Head title="إضافة فعالية قادمة" />

            {/* SAME THEME – NO CHANGES */}
            <style>{`
                :root {
                    --color-primary: #76499C;
                    --color-primary-soft: #A189B7;
                    --color-primary-light: #E8DFF5;
                    --color-teal: #4ABC9D;
                    --color-bg: #F9F7FB;
                    --shadow-lg: 0 16px 48px rgba(118, 73, 156, 0.18);
                    --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                body {
                    font-family: "Tajawal", "Cairo", sans-serif;
                    direction: rtl;
                    background: var(--color-bg);
                }

                .page {
                    min-height: 100vh;
                    padding: 3rem 0;
                }

                .container {
                    width: 90%;
                    max-width: 800px;
                    margin: auto;
                }

                .page-title {
                    font-size: 2.4rem;
                    font-weight: 900;
                    color: var(--color-primary);
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .form-box {
                    background: white;
                    padding: 3rem;
                    border-radius: 20px;
                    box-shadow: var(--shadow-lg);
                    border-right: 6px solid var(--color-teal);
                    position: relative;
                }

                .form-box::before {
                    content: '📅';
                    position: absolute;
                    top: -30px;
                    left: -30px;
                    font-size: 120px;
                    opacity: 0.04;
                }

                .form-group {
                    margin-bottom: 1.8rem;
                }

                label {
                    font-weight: 700;
                    color: var(--color-primary);
                    display: block;
                    margin-bottom: 0.6rem;
                }

                input, textarea {
                    width: 100%;
                    padding: 0.9rem 1.2rem;
                    border-radius: 12px;
                    border: 2px solid rgba(118,73,156,0.15);
                    font-size: 1rem;
                    transition: var(--transition);
                }

                textarea {
                    min-height: 130px;
                    resize: vertical;
                }

                input:focus, textarea:focus {
                    outline: none;
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 4px rgba(118,73,156,0.12);
                }

                .error {
                    color: #c62828;
                    font-size: 0.85rem;
                    margin-top: 0.4rem;
                    font-weight: 600;
                }

                .btn {
                    width: 100%;
                    padding: 1rem;
                    border-radius: 50px;
                    border: none;
                    font-size: 1.1rem;
                    font-weight: 700;
                    cursor: pointer;
                    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-soft));
                    color: white;
                    transition: var(--transition);
                }

                .btn:hover:not(:disabled) {
                    transform: translateY(-3px);
                }

                .btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .back-link {
                    margin-top: 2rem;
                    display: inline-flex;
                    gap: 0.5rem;
                    text-decoration: none;
                    font-weight: 700;
                    color: var(--color-teal);
                }
            `}</style>

            <div className="page">
                <div className="container">
                    <h1 className="page-title">إضافة فعالية قادمة</h1>

                    <form onSubmit={handleSubmit} className="form-box">
                        {/* TITLE */}
                        <div className="form-group">
                            <label>عنوان الفعالية</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="أدخل عنوان الفعالية"
                            />
                            {errors.title && <div className="error">{errors.title}</div>}
                        </div>

                        {/* DESCRIPTION 1 */}
                        <div className="form-group">
                            <label>الوصف الأساسي</label>
                            <textarea
                                value={data.description1}
                                onChange={e => setData('description1', e.target.value)}
                                placeholder="الوصف الرئيسي للفعالية..."
                            />
                            {errors.description1 && <div className="error">{errors.description1}</div>}
                        </div>

                        {/* DESCRIPTION 2 */}
                        <div className="form-group">
                            <label>وصف إضافي (اختياري)</label>
                            <textarea
                                value={data.description2}
                                onChange={e => setData('description2', e.target.value)}
                                placeholder="تفاصيل إضافية أو ملاحظات..."
                            />
                            {errors.description2 && <div className="error">{errors.description2}</div>}
                        </div>

                        <button className="btn" disabled={processing}>
                            {processing ? 'جارٍ الحفظ...' : 'إضافة الفعالية'}
                        </button>
                    </form>

                    <Link href={route('upcoming-events.index')} className="back-link">
                        ← العودة إلى الفعاليات
                    </Link>
                </div>
            </div>
        </>
    );
}
