
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
                    --color-primary-light: #E8DFF5;
                    --color-teal: #4ABC9D;
                    --color-teal-light: #E0F7F2;
                    --color-yellow: #F2C94C;
                    --color-yellow-light: #FFF9E6;
                    --color-bg: #F9F7FB;
                    --color-text: #222222;
                    --color-text-light: #555555;
                    --shadow-sm: 0 2px 8px rgba(118, 73, 156, 0.08);
                    --shadow-md: 0 8px 24px rgba(118, 73, 156, 0.12);
                    --shadow-lg: 0 16px 48px rgba(118, 73, 156, 0.18);
                    --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: "Tajawal", "Cairo", "Segoe UI", system-ui, sans-serif;
                    background: linear-gradient(135deg, #F9F7FB 0%, #FFF 100%);
                    color: var(--color-text);
                    line-height: 1.8;
                    direction: rtl;
                    overflow-x: hidden;
                }

                .news-admin-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                .news-admin-page::before {
                    content: '';
                    position: fixed;
                    top: -50%;
                    right: -20%;
                    width: 800px;
                    height: 800px;
                    background: radial-gradient(circle, rgba(118, 73, 156, 0.05) 0%, transparent 70%);
                    border-radius: 50%;
                    z-index: 0;
                    animation: float 20s ease-in-out infinite;
                }

                .news-admin-page::after {
                    content: '';
                    position: fixed;
                    bottom: -30%;
                    left: -10%;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(74, 188, 157, 0.06) 0%, transparent 70%);
                    border-radius: 50%;
                    z-index: 0;
                    animation: float 25s ease-in-out infinite reverse;
                }

                @keyframes float {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(30px, -30px) rotate(5deg); }
                    66% { transform: translate(-20px, 20px) rotate(-5deg); }
                }

                .main-header {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(118, 73, 156, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    box-shadow: var(--shadow-sm);
                    transition: var(--transition);
                }

                .main-header::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, 
                        transparent 0%, 
                        var(--color-teal) 25%, 
                        var(--color-primary) 50%, 
                        var(--color-teal) 75%, 
                        transparent 100%
                    );
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .main-header:hover::after {
                    opacity: 1;
                }

                .nav-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.5rem 0;
                    width: 90%;
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;
                    animation: slideInRight 0.8s ease-out;
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .logo-img {
                    height: 90px;
                    width: auto;
                    filter: drop-shadow(0 4px 12px rgba(118, 73, 156, 0.2));
                    transition: var(--transition);
                }

                .logo-img:hover {
                    transform: scale(1.05) rotate(-2deg);
                    filter: drop-shadow(0 8px 16px rgba(118, 73, 156, 0.3));
                }

                .logo-text-wrap {
                    display: flex;
                    flex-direction: column;
                    gap: 0.2rem;
                }

                .logo-text-ar-big {
                    font-size: 2.2rem;
                    font-weight: 900;
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-teal) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1.2;
                    letter-spacing: -0.5px;
                }

                .logo-text-sub {
                    font-size: 1.05rem;
                    color: var(--color-text-light);
                    font-weight: 500;
                }

                .main-nav {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    animation: slideInLeft 0.8s ease-out;
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .main-nav a {
                    text-decoration: none;
                    color: var(--color-text);
                    font-size: 1.1rem;
                    font-weight: 600;
                    position: relative;
                    padding: 0.5rem 0;
                    transition: var(--transition);
                }

                .main-nav a::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 0;
                    height: 3px;
                    background: linear-gradient(90deg, var(--color-teal), var(--color-primary));
                    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 2px;
                }

                .main-nav a:hover {
                    color: var(--color-primary);
                    transform: translateY(-2px);
                }

                .main-nav a:hover::before {
                    width: 100%;
                }

                .main-nav a.active {
                    color: var(--color-primary);
                }

                .main-nav a.active::before {
                    width: 100%;
                }

                .user-menu {
                    position: relative;
                }

                .user-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.65rem 1.4rem;
                    border-radius: 50px;
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-soft) 100%);
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(118, 73, 156, 0.3);
                    transition: var(--transition);
                    position: relative;
                    overflow: hidden;
                }

                .user-button::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    transition: width 0.6s ease, height 0.6s ease;
                }

                .user-button:hover::before {
                    width: 300px;
                    height: 300px;
                }

                .user-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(118, 73, 156, 0.4);
                }

                .user-button svg {
                    width: 1.1rem;
                    height: 1.1rem;
                    transition: transform 0.3s ease;
                }

                .user-button:hover svg {
                    transform: rotate(180deg);
                }

                .dropdown-menu {
                    position: absolute;
                    left: 0;
                    top: calc(100% + 0.8rem);
                    background: white;
                    border-radius: 12px;
                    box-shadow: var(--shadow-lg);
                    min-width: 220px;
                    overflow: hidden;
                    z-index: 50;
                    opacity: 0;
                    transform: translateY(-10px);
                    animation: dropdownSlide 0.3s ease forwards;
                    border: 1px solid rgba(118, 73, 156, 0.1);
                }

                @keyframes dropdownSlide {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .dropdown-item {
                    display: block;
                    padding: 1rem 1.3rem;
                    color: var(--color-text);
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-size: 0.98rem;
                    font-weight: 500;
                    border-right: 3px solid transparent;
                }

                .dropdown-item:hover {
                    background: linear-gradient(90deg, rgba(118, 73, 156, 0.08) 0%, transparent 100%);
                    border-right-color: var(--color-teal);
                    padding-right: 1.6rem;
                }

                .section {
                    padding: 4rem 0;
                    flex: 1;
                    position: relative;
                    z-index: 1;
                }

                .container {
                    width: 90%;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .section-title {
                    font-size: 2.2rem;
                    margin-bottom: 1rem;
                    color: var(--color-primary);
                    font-weight: 900;
                    position: relative;
                    display: inline-block;
                    padding-bottom: 0.8rem;
                    animation: fadeInUp 0.6s ease-out;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .section-title::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 60%;
                    height: 4px;
                    background: linear-gradient(90deg, var(--color-teal), transparent);
                    border-radius: 2px;
                }

                .section-intro {
                    max-width: 800px;
                    margin-bottom: 2.5rem;
                    color: var(--color-text-light);
                    font-size: 1.1rem;
                    line-height: 1.9;
                    animation: fadeInUp 0.6s ease-out 0.1s backwards;
                }

                .news-admin-form {
                    max-width: 700px;
                    margin: 0 auto;
                    background: white;
                    padding: 2.5rem 3rem;
                    border-radius: 20px;
                    box-shadow: var(--shadow-lg);
                    border-right: 6px solid var(--color-teal);
                    position: relative;
                    animation: fadeInUp 0.6s ease-out 0.2s backwards;
                }

                .news-admin-form::before {
                    content: '✍️';
                    position: absolute;
                    top: -30px;
                    left: -30px;
                    font-size: 120px;
                    opacity: 0.04;
                    transform: rotate(-15deg);
                    pointer-events: none;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.6rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    font-size: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .form-group label::before {
                    content: '●';
                    color: var(--color-teal);
                    font-size: 0.7rem;
                }

                .form-group input[type="text"],
                .form-group input[type="file"],
                .form-group select,
                .form-group textarea {
                    width: 100%;
                    padding: 0.9rem 1.2rem;
                    border-radius: 12px;
                    border: 2px solid rgba(118, 73, 156, 0.15);
                    font-size: 1rem;
                    background: linear-gradient(135deg, #faf8ff 0%, #fff 100%);
                    transition: var(--transition);
                    font-family: inherit;
                }

                .form-group textarea {
                    resize: vertical;
                    min-height: 160px;
                    line-height: 1.7;
                }

                .form-group input:focus,
                .form-group select:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 4px rgba(118, 73, 156, 0.12);
                    background: white;
                    transform: translateY(-2px);
                }

                .form-group input[type="file"] {
                    padding: 0.7rem 1rem;
                    cursor: pointer;
                }

                .form-group input[type="file"]::file-selector-button {
                    padding: 0.5rem 1.2rem;
                    border-radius: 50px;
                    border: none;
                    background: linear-gradient(135deg, var(--color-teal), #3DA88A);
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    transition: var(--transition);
                    margin-left: 1rem;
                }

                .form-group input[type="file"]::file-selector-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(74, 188, 157, 0.3);
                }

                .form-actions {
                    text-align: left;
                    padding-top: 1rem;
                }

                .btn {
                    display: inline-block;
                    padding: 0.9rem 1.8rem;
                    border-radius: 50px;
                    text-decoration: none;
                    font-size: 1.05rem;
                    border: 2px solid transparent;
                    transition: var(--transition);
                    font-weight: 700;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    letter-spacing: 0.3px;
                }

                .btn::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    transition: width 0.6s ease, height 0.6s ease;
                }

                .btn:hover::before {
                    width: 400px;
                    height: 400px;
                }

                .btn-primary {
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-soft) 100%);
                    color: white;
                    box-shadow: 0 4px 15px rgba(118, 73, 156, 0.3);
                }

                .btn-primary:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(118, 73, 156, 0.4);
                }

                .btn-primary:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .btn-secondary {
                    background: white;
                    border-color: var(--color-teal);
                    color: var(--color-teal);
                    box-shadow: 0 4px 15px rgba(74, 188, 157, 0.15);
                }

                .btn-secondary:hover {
                    background: var(--color-teal);
                    color: white;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(74, 188, 157, 0.3);
                }

                .btn-danger {
                    background: linear-gradient(135deg, #c62828, #a01515);
                    color: white;
                    box-shadow: 0 4px 15px rgba(198, 40, 40, 0.3);
                }

                .btn-danger:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(198, 40, 40, 0.4);
                }

                .main-footer {
                    background: linear-gradient(135deg, #2a0845 0%, #3a0d63 100%);
                    color: #f3e9ff;
                    padding: 2rem 0;
                    margin-top: 1rem;
                    font-size: 0.98rem;
                    position: relative;
                    overflow: hidden;
                }

                .main-footer::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, 
                        var(--color-teal), 
                        var(--color-primary), 
                        var(--color-yellow),
                        var(--color-primary),
                        var(--color-teal)
                    );
                }

                .footer-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1.5rem;
                    width: 90%;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .footer-links {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .footer-links a {
                    color: #e0cffc;
                    text-decoration: none;
                    transition: var(--transition);
                    position: relative;
                }

                .footer-links a::after {
                    content: '';
                    position: absolute;
                    bottom: -3px;
                    right: 0;
                    width: 0;
                    height: 2px;
                    background: var(--color-teal);
                    transition: width 0.3s ease;
                }

                .footer-links a:hover {
                    color: white;
                }

                .footer-links a:hover::after {
                    width: 100%;
                }

                @media (max-width: 768px) {
                    .nav-container {
                        flex-direction: column;
                        gap: 1.5rem;
                        padding: 1.2rem 0;
                    }

                    .main-nav {
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 1rem;
                    }

                    .logo-img {
                        height: 70px;
                    }

                    .logo-text-ar-big {
                        font-size: 1.6rem;
                    }

                    .logo-text-sub {
                        font-size: 0.9rem;
                    }

                    .section {
                        padding: 3rem 0;
                    }

                    .section-title {
                        font-size: 1.7rem;
                    }

                    .news-admin-form {
                        padding: 2rem 1.5rem;
                    }

                    .footer-container {
                        flex-direction: column;
                        text-align: center;
                        gap: 1rem;
                    }

                    .btn {
                        padding: 0.8rem 1.5rem;
                        font-size: 0.95rem;
                    }
                }

                @media (max-width: 480px) {
                    .logo {
                        flex-direction: column;
                        text-align: center;
                        gap: 0.8rem;
                    }

                    .logo-img {
                        height: 60px;
                    }

                    .section-title {
                        font-size: 1.5rem;
                    }

                    .news-admin-form {
                        padding: 1.5rem 1.2rem;
                    }

                    .form-group input[type="file"]::file-selector-button {
                        padding: 0.4rem 1rem;
                        font-size: 0.9rem;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
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
