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

                .news-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                .news-page::before {
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

                .news-page::after {
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

                .add-news-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.6rem 1.3rem;
                    border-radius: 50px;
                    background: linear-gradient(135deg, var(--color-yellow) 0%, #F2B94C 100%);
                    color: var(--color-primary);
                    font-size: 1rem;
                    font-weight: 700;
                    text-decoration: none;
                    box-shadow: 0 4px 15px rgba(242, 201, 76, 0.3);
                    transition: var(--transition);
                    position: relative;
                    overflow: hidden;
                }

                .add-news-btn::before {
                    content: '✚';
                    margin-left: 0.3rem;
                }

                .add-news-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(242, 201, 76, 0.4);
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
                }

                .grid {
                    display: grid;
                    gap: 2rem;
                    margin-top: 2rem;
                }

                .grid-2 {
                    grid-template-columns: repeat(2, 1fr);
                }

                .card {
                    background: white;
                    padding: 2rem;
                    border-radius: 16px;
                    box-shadow: var(--shadow-sm);
                    transition: var(--transition);
                    position: relative;
                    overflow: hidden;
                    border: 1px solid rgba(118, 73, 156, 0.08);
                }

                .card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 4px;
                    background: linear-gradient(90deg, var(--color-teal), var(--color-primary));
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.4s ease;
                }

                .card:hover::before {
                    transform: scaleX(1);
                }

                .card:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-md);
                    border-color: rgba(118, 73, 156, 0.15);
                }

                .news-card {
                    padding: 2rem;
                    animation: fadeInUp 0.6s ease-out backwards;
                    animation-delay: calc(var(--animation-order) * 0.1s);
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

                .news-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    font-size: 0.9rem;
                    margin-bottom: 0.8rem;
                }

                .news-tag {
                    display: inline-block;
                    background: linear-gradient(135deg, var(--color-teal), #3DA88A);
                    color: white;
                    padding: 0.35rem 1rem;
                    border-radius: 50px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    box-shadow: 0 2px 8px rgba(74, 188, 157, 0.3);
                    letter-spacing: 0.3px;
                }

                .news-date {
                    color: var(--color-text-light);
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .news-date::before {
                    content: '📅';
                    font-size: 1rem;
                }

                .news-title {
                    margin: 0.8rem 0 0.6rem;
                    color: var(--color-primary);
                    font-size: 1.4rem;
                    font-weight: 800;
                    line-height: 1.4;
                }

                .news-text {
                    font-size: 1rem;
                    color: var(--color-text-light);
                    line-height: 1.8;
                    margin-bottom: 1.2rem;
                }

                .news-gallery {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.8rem;
                    margin-top: 1rem;
                }

                .news-gallery-img {
                    width: 100%;
                    height: 130px;
                    object-fit: cover;
                    border-radius: 12px;
                    transition: var(--transition);
                    border: 2px solid rgba(118, 73, 156, 0.1);
                }

                .news-gallery-img:hover {
                    transform: scale(1.05);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                    border-color: var(--color-teal);
                }

                .delete-btn {
                    position: absolute;
                    top: 1.5rem;
                    left: 1.5rem;
                    background: linear-gradient(135deg, #c62828, #a01515);
                    color: white;
                    padding: 0.5rem 1.2rem;
                    border-radius: 50px;
                    border: none;
                    font-size: 0.9rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: var(--transition);
                    box-shadow: 0 4px 12px rgba(198, 40, 40, 0.3);
                    z-index: 10;
                }

                .delete-btn::before {
                    content: '🗑️ ';
                    margin-left: 0.3rem;
                }

                .delete-btn:hover {
                    background: linear-gradient(135deg, #a01515, #7d0f0f);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 18px rgba(198, 40, 40, 0.4);
                }

                .loading-text {
                    text-align: center;
                    margin-top: 4rem;
                    font-size: 1.3rem;
                    color: var(--color-primary);
                    font-weight: 600;
                    animation: pulse 2s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                .loading-text::after {
                    content: '...';
                    animation: dots 1.5s steps(3, end) infinite;
                }

                @keyframes dots {
                    0%, 20% { content: '.'; }
                    40% { content: '..'; }
                    60%, 100% { content: '...'; }
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

                @media (max-width: 968px) {
                    .grid-2 {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .section-title {
                        font-size: 1.9rem;
                    }

                    .news-gallery {
                        grid-template-columns: repeat(2, 1fr);
                    }
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

                    .grid-2 {
                        grid-template-columns: 1fr;
                    }

                    .news-gallery {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .news-gallery-img {
                        height: 140px;
                    }

                    .footer-container {
                        flex-direction: column;
                        text-align: center;
                        gap: 1rem;
                    }

                    .delete-btn {
                        top: 1rem;
                        left: 1rem;
                        padding: 0.4rem 1rem;
                        font-size: 0.85rem;
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

                    .card {
                        padding: 1.5rem;
                    }

                    .news-gallery {
                        grid-template-columns: 1fr;
                    }

                    .news-gallery-img {
                        height: 180px;
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
                                            {(!isAdminEvents || !isAdminNews) && (
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

                <section className="section">
                    <div className="container">
                        <h2 className="section-title">آخر الأخبار</h2>
                        <p className="section-intro">
                            تابع أحدث نشاطات مكتبة مهدي المتجولة، وزياراتها للمدارس والمناطق المختلفة.
                        </p>

                        {loading ? (
                            <p className="loading-text">جاري التحميل</p>
                        ) : (
                            <div className="grid grid-2">
                                {newsList.map((item, index) => (
                                    <article 
                                        key={item.id} 
                                        className="card news-card"
                                        style={{'--animation-order': index}}
                                    >
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

                                        {/* {item.image && (
                                            <div className="news-gallery">
                                                 <img 
                                                    src={`/${item.image}`} 
                                                    className="news-gallery-img" 
                                                    alt={item.title}
                                                /> 
                                            </div>
                                        )} */}




                                        {item.image ? (
    <div className="news-gallery">
        <img 
            src={`/storage/${item.image}`} 
            className="news-gallery-img" 
            alt={item.title}
            onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=صورة+غير+متوفرة';
                e.target.onerror = null;
            }}
        />
    </div>
) : (
    <div className="news-gallery">
        <div style={{
            width: '100%',
            height: '130px',
            backgroundColor: '#f0f0f0',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
            fontSize: '0.9rem'
        }}>
            لا توجد صورة
        </div>
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
