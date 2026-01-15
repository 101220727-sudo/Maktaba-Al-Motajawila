

import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

const AddNewsPage = ({ auth }) => {
    const user = auth?.user;
    const role = user?.role?.name;
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('تحديث');
    const [image, setImage] = useState(null);
    const [existingNews, setExistingNews] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // Role checks
    const isRegisteredUser = role === 'registered_user';
    const isAdminNews = role === 'admin_news';
    const isAdminEvents = role === 'admin_events';

    // Fetch existing news
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/news')
            .then(res => setExistingNews(res.data))
            .catch(err => console.error(err));
    }, []);

    // Delete news
    const handleDelete = (id) => {
        if (!confirm("هل أنت متأكد من حذف هذا الخبر؟")) return;

        axios.delete(`/api/news/${id}`)
            .then(() => {
                setExistingNews(existingNews.filter(n => n.id !== id));
            })
            .catch(err => console.error(err));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.post('/api/news', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            // Redirect to news page on success
            window.location.href = route('news');
        } catch (err) {
            console.error('Error adding news:', err);
            alert('حدث خطأ أثناء إضافة الخبر');
        }
    };

    return (
        <>
            <Head title="لوحة إدارة الأخبار" />
            
            <style>{`
                :root {
                    --color-primary: #76499C;
                    --color-primary-soft: #A189B7;
                    --color-teal: #4ABC9D;
                    --color-yellow: #F2C94C;
                    --color-bg: #F9F7FB;
                    --color-text: #222222;
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: "Tajawal", "Cairo", system-ui, sans-serif;
                    background-color: var(--color-bg);
                    color: var(--color-text);
                    line-height: 1.7;
                    direction: rtl;
                }

                .news-admin-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }

                .main-header {
                    background-color: #ffffff;
                    border-bottom: 2px solid rgba(118, 73, 156, 0.15);
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                }

                .nav-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.3rem 0;
                    width: 90%;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .logo-img {
                    height: 85px;
                    width: auto;
                }

                .logo-text-wrap {
                    display: flex;
                    flex-direction: column;
                }

                .logo-text-ar-big {
                    font-size: 2rem;
                    font-weight: 800;
                    color: var(--color-primary);
                    line-height: 1.2;
                }

                .logo-text-sub {
                    font-size: 1.05rem;
                    color: var(--color-teal);
                }

                .main-nav {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .main-nav a {
                    text-decoration: none;
                    color: #333;
                    font-size: 1.15rem;
                    font-weight: 600;
                    transition: color 0.3s ease;
                }

                .main-nav a:hover {
                    color: var(--color-primary);
                }

                .main-nav a.active {
                    color: var(--color-primary);
                    border-bottom: 3px solid var(--color-teal);
                    padding-bottom: 0.3rem;
                }

                .user-menu {
                    position: relative;
                }

                .user-button {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.5rem 1rem;
                    border-radius: 999px;
                    background-color: var(--color-primary);
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: opacity 0.3s ease;
                }

                .user-button:hover {
                    opacity: 0.9;
                }

                .user-button svg {
                    margin-right: 0.5rem;
                    width: 1rem;
                    height: 1rem;
                }

                .dropdown-menu {
                    position: absolute;
                    left: 0;
                    top: 100%;
                    margin-top: 0.5rem;
                    background-color: white;
                    border-radius: 0.7rem;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    min-width: 200px;
                    overflow: hidden;
                    z-index: 50;
                }

                .dropdown-item {
                    display: block;
                    padding: 0.75rem 1rem;
                    color: #333;
                    text-decoration: none;
                    transition: background-color 0.2s ease;
                    font-size: 0.95rem;
                }

                .dropdown-item:hover {
                    background-color: rgba(118, 73, 156, 0.08);
                }

                .add-news-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.6rem 1.2rem;
                    border-radius: 999px;
                    background-color: var(--color-teal);
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    text-decoration: none;
                    transition: opacity 0.3s ease;
                }

                .add-news-btn:hover {
                    opacity: 0.9;
                }

                .add-news-btn svg {
                    width: 1.2rem;
                    height: 1.2rem;
                }

                .section {
                    padding: 2.5rem 0;
                    flex: 1;
                }

                .section-alt {
                    background: linear-gradient(
                        135deg,
                        rgba(118, 73, 156, 0.04),
                        rgba(74, 188, 157, 0.08)
                    );
                }

                .container {
                    width: 90%;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .section-title {
                    font-size: 1.7rem;
                    margin-bottom: 0.8rem;
                    color: var(--color-primary);
                    font-weight: 700;
                }

                .section-intro {
                    max-width: 700px;
                    margin-bottom: 1.8rem;
                    color: #444;
                }

                .news-admin-form {
                    max-width: 650px;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 1.8rem 2rem;
                    border-radius: 1.1rem;
                    box-shadow: 0 8px 22px rgba(0,0,0,0.05);
                    border-right: 6px solid var(--color-teal);
                }

                .form-group {
                    margin-bottom: 1.1rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.35rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    font-size: 0.95rem;
                }

                .form-group input[type="text"],
                .form-group input[type="file"],
                .form-group select,
                .form-group textarea {
                    width: 100%;
                    padding: 0.7rem 0.8rem;
                    border-radius: 0.7rem;
                    border: 1px solid rgba(0,0,0,0.15);
                    font-size: 0.95rem;
                    background-color: #faf8ff;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
                    font-family: inherit;
                }

                .form-group textarea {
                    resize: vertical;
                    min-height: 140px;
                }

                .form-group input:focus,
                .form-group select:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 3px rgba(118,73,156,0.18);
                    background-color: #fff;
                }

                .form-actions {
                    text-align: left;
                }

                .btn {
                    display: inline-block;
                    padding: 0.7rem 1.3rem;
                    border-radius: 999px;
                    text-decoration: none;
                    font-size: 1rem;
                    border: 1px solid transparent;
                    transition: all 0.25s ease;
                    font-weight: 600;
                    cursor: pointer;
                }

                .btn-primary {
                    background-color: var(--color-primary);
                    color: #fff;
                }

                .btn-primary:hover:not(:disabled) {
                    opacity: 0.95;
                }

                .btn-secondary {
                    background-color: #fff;
                    border-color: var(--color-teal);
                    color: var(--color-teal);
                }

                .btn-secondary:hover {
                    background-color: rgba(74, 188, 157, 0.08);
                }

                .btn-danger {
                    background-color: #c62828;
                }

                .btn-danger:hover {
                    background-color: #a01515;
                }

                .grid {
                    display: grid;
                    gap: 1.5rem;
                    margin-top: 1.5rem;
                }

                .grid-2 {
                    grid-template-columns: repeat(2, 1fr);
                }

                .card {
                    background-color: #fff;
                    padding: 1.1rem 1.2rem;
                    border-radius: 1rem;
                    box-shadow: 0 6px 18px rgba(0,0,0,0.04);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .news-card {
                    padding: 1.1rem 1.2rem;
                }

                .news-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                }

                .news-thumb {
                    width: 110px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: 0.6rem;
                    flex-shrink: 0;
                }

                .news-info {
                    flex: 1;
                }

                .news-tag {
                    display: inline-block;
                    background-color: var(--color-teal);
                    color: #fff;
                    padding: 0.1rem 0.7rem;
                    border-radius: 999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    margin-bottom: 0.3rem;
                }

                .news-title-small {
                    font-size: 1.05rem;
                    margin: 0.2rem 0;
                    color: var(--color-primary);
                }

                .news-text-small {
                    font-size: 0.9rem;
                    color: #555;
                }

                .news-actions {
                    margin-top: 0.6rem;
                    display: flex;
                    gap: 0.4rem;
                    flex-wrap: wrap;
                }

                .main-footer {
                    background-color: #3a0d63;
                    color: #f3e9ff;
                    padding: 1rem 0;
                    margin-top: 0.5rem;
                    font-size: 0.95rem;
                }

                .footer-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                    width: 90%;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .footer-links {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .footer-links a {
                    color: #e0cffc;
                    text-decoration: none;
                }

                .footer-links a:hover {
                    text-decoration: underline;
                }

                @media (max-width: 768px) {
                    .nav-container {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .main-nav {
                        flex-wrap: wrap;
                        justify-content: center;
                    }

                    .logo-img {
                        height: 60px;
                    }

                    .logo-text-ar-big {
                        font-size: 1.3rem;
                    }

                    .grid-2 {
                        grid-template-columns: 1fr;
                    }

                    .news-row {
                        flex-direction: column;
                    }

                    .news-thumb {
                        width: 100%;
                        height: 160px;
                    }

                    .footer-container {
                        flex-direction: column;
                        text-align: center;
                    }

                    .news-admin-form {
                        padding: 1.4rem 1.2rem;
                    }
                }
            `}</style>

            <div className="news-admin-page">
                <header className="main-header">
                    <div className="nav-container">
                        <div className="logo">
                            <img src="/assets/images/logo.png" alt="شعار المكتبة" className="logo-img" />
                            <div className="logo-text-wrap">
                                <span className="logo-text-ar-big">مكتبة مهدي المتجولة</span>
                                <span className="logo-text-sub">مكتبة على عجلات تجوب المناطق اللبنانية</span>
                            </div>
                        </div>


                        

                        <nav className="main-nav">
                            <Link href={route('news')}>الأخبار</Link>

                            {/* Add News button - only for admin_news */}
                        <Link href={route('news.add')} className="active">إضافة خبر</Link>
                           
                            
                            {/* Event Packages - for registered_user or admin_events */}
                            {(isRegisteredUser || isAdminEvents) && (
                                <Link href={route('event.packages')}>الفعاليات</Link>
                            )}

                            {user ? (
                                <div className="user-menu">
                                    <button 
                                        className="user-button"
                                        onClick={() => setShowDropdown(!showDropdown)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                        {user.name}
                                    </button>
                                    
                                    {showDropdown && (
                                        <div className="dropdown-menu">

                                             {(isAdminEvents || isAdminNews) && (
                                            <Link href={route('profile.edit')} className="dropdown-item">
                                                الملف الشخصي
                                            </Link>

                                             )}
                                            <Link href={route('logout')} method="post" as="button" className="dropdown-item">
                                                تسجيل الخروج
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link href={route('register')}>تسجيل</Link>
                                    <Link href={route('login')}>تسجيل الدخول</Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* ADD NEWS FORM */}
                <section className="section">
                    <div className="container">
                        <h2 className="section-title">إضافة خبر جديد</h2>
                        <p className="section-intro">قم بإدخال تفاصيل الخبر ليظهر في صفحة الأخبار للزوار.</p>

                        <form 
                            className="news-admin-form" 
                            onSubmit={handleSubmit}
                        >

                            <div className="form-group">
                                <label htmlFor="title">عنوان الخبر</label>
                                <input 
                                    id="title" 
                                    type="text" 
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="اكتب عنوان الخبر..." 
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">الوصف</label>
                                <textarea 
                                    id="description" 
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="اكتب نص الخبر هنا..." 
                                    rows="5"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="image">إرفاق صورة رئيسية للخبر</label>
                                <input 
                                    id="image" 
                                    type="file" 
                                    name="image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    accept="image/*" 
                                />
                            </div>

                            <div className="form-actions">
                                <button className="btn btn-primary" type="submit">إضافة الخبر</button>
                            </div>

                        </form>
                    </div>
                </section>

                <footer className="main-footer">
                    <div className="footer-container">
                        <p>© 2025 المكتبة المتجولة. جميع الحقوق محفوظة.</p>
                        <p className="footer-links">
                            <a href="#">اتصل بنا</a>
                            <span> • </span>
                            <a href="#">سياسة الخصوصية</a>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default AddNewsPage;