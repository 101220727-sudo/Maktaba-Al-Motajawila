
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Head, Link } from '@inertiajs/react';

export default function NewsPage({ auth }) {
    const user = auth?.user;
    const role = user?.role?.name;
    
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    // Role checks
    const isRegisteredUser = role === 'registered_user';
    const isAdminNews = role === 'admin_news';
    const isAdminEvents = role === 'admin_events';

    // Fetch news from API
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/news')
            .then(res => {
                console.log(res.data); 
                setNewsList(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    // Delete news item
    const handleDelete = (id) => {
        if (!confirm("هل أنت متأكد من حذف هذا الخبر؟")) return;

        axios.delete(`/api/news/${id}`)
            .then(() => {
                setNewsList(newsList.filter(n => n.id !== id));
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <Head title="الأخبار" />
            
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

                .news-page {
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

                .section {
                    padding: 2.5rem 0;
                    flex: 1;
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
                    padding: 1.4rem;
                    border-radius: 1rem;
                    box-shadow: 0 6px 18px rgba(0,0,0,0.04);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
                }

                .news-card {
                    padding: 1.4rem;
                    border-radius: 1rem;
                    position: relative;
                }

                .news-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                    font-size: 0.9rem;
                    margin-bottom: 0.4rem;
                }

                .news-tag {
                    background-color: var(--color-teal);
                    color: #fff;
                    padding: 0.25rem 0.8rem;
                    border-radius: 999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .news-date {
                    color: #777;
                }

                .news-title {
                    margin: 0.5rem 0 0.3rem;
                    color: var(--color-primary);
                    font-size: 1.25rem;
                    font-weight: 700;
                }

                .news-text {
                    font-size: 0.95rem;
                    color: #444;
                    line-height: 1.7;
                    margin-bottom: 1rem;
                }

                .news-gallery {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.6rem;
                }

                .news-gallery-img {
                    width: 100%;
                    height: 115px;
                    object-fit: cover;
                    border-radius: 0.7rem;
                }

                .delete-btn {
                    position: absolute;
                    top: 1rem;
                    left: 1rem;
                    background-color: #c62828;
                    color: #fff;
                    padding: 0.4rem 0.8rem;
                    border-radius: 0.5rem;
                    border: none;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }

                .delete-btn:hover {
                    background-color: #a01515;
                }

                .loading-text {
                    text-align: center;
                    margin-top: 3rem;
                    font-size: 1.1rem;
                    color: var(--color-primary);
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

                    .news-gallery {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .news-gallery-img {
                        height: 130px;
                    }

                    .footer-container {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>

            <div className="news-page">
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
    {/* Show home page link only if NOT admin_news */}
    {!isAdminNews && (
        <Link href="/">الصفحة الرئيسية</Link>
    )}
    
    <Link href={route('news')} className="active">الأخبار</Link>

    {/* Add News button - only for admin_news */}
{isAdminNews && (
    <Link href={route('news.add')} className="add-news-btn"> إضافة خبر </Link>
)}
                            
                            {/* Event Packages - for registered_user or admin_events */}
                            {/* {(isRegisteredUser || isAdminEvents) && (
                                <Link href={route('event.packages')}>الفعاليات</Link>
                            )} */}

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
                                            <Link href={route('profile.edit')} className="dropdown-item">
                                                الملف الشخصي
                                            </Link>
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

                <section className="section">
                    <div className="container">
                        <h2 className="section-title">آخر الأخبار</h2>
                        <p className="section-intro">
                            تابع أحدث نشاطات مكتبة مهدي المتجولة، وزياراتها للمدارس والمناطق المختلفة.
                        </p>

                        {loading ? (
                            <p className="loading-text">جاري التحميل...</p>
                        ) : (
                            <div className="grid grid-2">
                                {newsList.map(item => (
                                    <article key={item.id} className="card news-card">
                                        
                                        {/* Delete button visible only for admin_news */}
                                        {isAdminNews && (
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="delete-btn"
                                            >
                                                حذف
                                            </button>
                                            
                                        )}
<div className="news-meta">
    {/* <span className="news-tag">نشاط</span> */}
    <span className="news-date">
        {new Date(item.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })} at {new Date(item.published_at).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })}
    </span>
</div>

                                        <h3 className="news-title">{item.title}</h3>

                                        <p className="news-text">{item.description}</p>

                                        {item.image && (
                                            <div className="news-gallery">
                                                <img 
                                                    src={`/${item.image}`} 
                                                    className="news-gallery-img" 
                                                    alt={item.title}
                                                />
                                            </div>
                                        )}
                                    </article>
                                ))}
                            </div>
                        )}
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
}