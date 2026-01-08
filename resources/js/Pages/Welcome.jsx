


import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [latestNews, setLatestNews] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const user = auth?.user;
    const role = user?.role?.name;

    // Role checks
    const isRegisteredUser = role === 'registered_user';
    const isAdminNews = role === 'admin_news';
    const isAdminEvents = role === 'admin_events';

    // Fetch latest 2 news items
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/news')
            .then(res => {
                setLatestNews(res.data.slice(0, 2));
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <Head title="الصفحة الرئيسية" />
            
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

                .welcome-page {
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

                .hero {
                    padding: 3rem 0 2.5rem;
                }

                .hero-content {
                    display: grid;
                    grid-template-columns: 2fr 1.2fr;
                    gap: 2rem;
                    align-items: center;
                }

                .hero-text h1 {
                    font-size: 2.3rem;
                    margin-bottom: 1rem;
                    color: var(--color-primary);
                    font-weight: 800;
                }

                .hero-text p {
                    margin-bottom: 1.5rem;
                    max-width: 550px;
                    color: #444;
                }

                .hero-actions {
                    display: flex;
                    gap: 0.8rem;
                    flex-wrap: wrap;
                }

                .hero-box {
                    background-color: #fff;
                    padding: 1.8rem;
                    border-radius: 1rem;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
                    border-right: 6px solid var(--color-teal);
                }

                .hero-box h2 {
                    margin-bottom: 0.5rem;
                    color: var(--color-primary);
                }

                .section {
                    padding: 2.5rem 0;
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

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.8rem;
                }

                .section-link {
                    color: var(--color-teal);
                    text-decoration: none;
                    font-weight: 600;
                }

                .section-link:hover {
                    text-decoration: underline;
                }

                .grid {
                    display: grid;
                    gap: 1.5rem;
                    margin-top: 1.5rem;
                }

                .grid-2 {
                    grid-template-columns: repeat(2, 1fr);
                }

                .grid-3 {
                    grid-template-columns: repeat(3, 1fr);
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

                .card h3 {
                    margin-bottom: 0.5rem;
                    color: var(--color-primary);
                }

                .news-tag {
                    display: inline-block;
                    background-color: var(--color-teal);
                    color: #fff;
                    padding: 0.25rem 0.8rem;
                    border-radius: 999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
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
                }

                .btn-primary {
                    background-color: var(--color-primary);
                    color: #fff;
                }

                .btn-primary:hover {
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

                .btn-light {
                    background-color: #fff;
                    color: var(--color-primary);
                    border: 1px solid var(--color-yellow);
                }

                .cta-section {
                    background: linear-gradient(90deg, var(--color-primary), var(--color-teal));
                    color: #fff;
                    padding: 2.5rem 0;
                    margin-top: 1rem;
                }

                .cta-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1.5rem;
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

                .event-meta {
                    font-size: 0.9rem;
                    color: #666;
                    margin-bottom: 0.6rem;
                }

                .event-details {
                    margin-top: 0.5rem;
                    font-size: 0.9rem;
                }

                .event-details summary {
                    cursor: pointer;
                    font-weight: 600;
                    color: var(--color-teal);
                    list-style: none;
                    position: relative;
                    padding-right: 1.1rem;
                }

                .event-details summary::before {
                    content: "▾";
                    position: absolute;
                    right: 0;
                    top: 0;
                    font-size: 0.85rem;
                    color: var(--color-primary);
                }

                .event-details[open] summary::before {
                    content: "▴";
                }

                .event-details ul {
                    margin-top: 0.4rem;
                    padding-right: 1.1rem;
                }

                .event-details li {
                    margin-bottom: 0.25rem;
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

                    .hero-content {
                        grid-template-columns: 1fr;
                    }

                    .grid-2, .grid-3 {
                        grid-template-columns: 1fr;
                    }

                    .cta-container {
                        flex-direction: column;
                        text-align: center;
                    }

                    .footer-container {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>

            <div className="welcome-page">
                <header className="main-header">
                    <div className="nav-container">
                        <div className="logo">
                            <img src="/assets/images/logo.png" alt="شعار المكتبة المتجولة" className="logo-img" />
                            <div className="logo-text-wrap">
                                <span className="logo-text-ar-big">مكتبة مهدي المتجولة</span>
                                <span className="logo-text-sub">مكتبة على عجلات تجوب المناطق اللبنانية</span>
                            </div>
                        </div>

                        <nav className="main-nav">
                            <Link href="/" className="active">الصفحة الرئيسية</Link>
                            <Link href={route('news')}>الأخبار</Link>
                            
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
                                    <Link href={route('login')}>تسجيل الدخول</Link>
                                    <Link href={route('register')}>انشاء حساب</Link> 
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="hero">
                    <div className="container hero-content">
                        <div className="hero-text">
                            <h1>ننشر الثقافة وحب القراءة في كل مكان</h1>
                            <p>
                                حافلة مليئة بالكتب والأنشطة الثقافية والتعليمية، 
                                تزور المدارس، الأفواج، والجمعيات في مختلف المناطق اللبنانية.
                            </p>
<div className="hero-actions">
    {/* Request Event - for any logged-in user */}
    {user && (
        <Link href={route('event.request')} className="btn btn-primary">
            قدّم طلب زيارة
        </Link>
    )}
    {!user && (
        <Link href={route('register')} className="btn btn-primary">
            قدّم طلب زيارة
        </Link>
    )}
    <Link href={route('news')} className="btn btn-secondary">آخر الأخبار</Link>
</div>
                        </div>

                        <div className="hero-box">
                            <h2>مكتبة على عجلات</h2>
                            <p>
                                قصص، أنشطة فنية، زاوية الواقع الافتراضي، ومسابقات قراءة — 
                                كلّها داخل حافلة ملوّنة تنشر الفرح والمعرفة.
                            </p>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="section">
                    <div className="container">
                        <h2 className="section-title">ما هي المكتبة المتجولة؟</h2>
                        <p className="section-intro">
                            حافلة ثقافية متنقلة تتسع لـ8000 كتاب موجه للأطفال والناشئة، 
                            أطلقتها كشافة الإمام المهدي (عجل الله فرجه)، 
                            بهدف تعزيز العلاقة مع الكتاب. 
                            مكتبة مهدي تقدم باقة بأكثر من 40 نشاطاً فنياً مختلفاً 
                            ومجموعة كبيرة من الألعاب الفكرية وأفلام تعليمية 
                            تعرض على الحواسيب وعلى شاشة تلفاز ضخمة ثلاثية الأبعاد
                        </p>

                        <div className="grid grid-3">
                            <div className="card">
                                <h3>الكتب والقراءة</h3>
                                <p>
                                    مجموعة واسعة من الكتب المناسبة لجميع الأعمار، 
                                    تشجّع على تنمية حب القراءة.
                                </p>
                            </div>
                            <div className="card">
                                <h3>الورش والأنشطة</h3>
                                <p>
                                    رواية القصص، الأشغال اليدوية، والألعاب الجماعية التي 
                                    تعزّز روح الإبداع والتعاون.
                                </p>
                            </div>
                            <div className="card">
                                <h3>التكنولوجيا والواقع الافتراضي</h3>
                                <p>
                                    زاوية رقمية تتيح للأطفال التعلّم بطريقة ممتعة وعصرية.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Upcoming Events Section */}
                <section className="section section-events">
                    <div className="container">
                        <h2 className="section-title">الأنشطة القادمة</h2>
                        <p className="section-intro">
                            يمكن للجميع الاطلاع على مواعيد الزيارات القادمة للمكتبة المتجولة 
                            والانضمام للحضور في المنطقة الأقرب إليهم.
                        </p>

                        <div className="grid grid-3">
                            <article className="card event-card">
                                <h3>يوم مفتوح – حديقة المدينة في صور</h3>
                                <p className="event-meta">الأحد 20 كانون الأول 2025 • من 3 حتى 6 مساءً</p>

                                <details className="event-details">
                                    <summary>عرض التفاصيل</summary>
                                    <ul>
                                        <li>مفتوح لجميع الأهالي والأطفال</li>
                                        <li>زاوية كتب، زاوية رسم، وتجربة واقع افتراضي</li>
                                        <li>الدخول مجاني • عدد محدود من المقاعد داخل الحافلة</li>
                                    </ul>
                                </details>
                            </article>
                        </div>
                    </div>
                </section>

                {/* News Preview */}
                <section className="section section-alt">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">آخر الأخبار</h2>
                            <Link href={route('news')} className="section-link">عرض كل الأخبار →</Link>
                        </div>

                        <div className="grid grid-2">
                            {latestNews.length > 0 ? (
                                latestNews.map(item => (
                                    <article key={item.id} className="card news-card">
                                        {/* <p className="news-tag">نشاط</p> */}
                                        <h3>{item.title}</h3>
                                        <p>{item.description.substring(0, 120)}...</p>
                                    </article>
                                ))
                            ) : (
                                <>
                                    <article className="card news-card">
                                        <p className="news-tag">تحديث</p>
                                        <h3>إطلاق موقعنا الإلكتروني الجديد</h3>
                                        <p>
                                            يمكنكم الآن متابعة الفعاليات والأخبار وتقديم طلبات الزيارة 
                                            مباشرة عبر الموقع.
                                        </p>
                                    </article>

                                    <article className="card news-card">
                                        <p className="news-tag">إنجاز</p>
                                        <h3>أكثر من 1000 طفل استفادوا من المكتبة</h3>
                                        <p>
                                            من خلال زيارات المدارس والمخيمات والجمعيات، 
                                            تواصل المكتبة المتجولة نشر الثقافة في كل لبنان.
                                        </p>
                                    </article>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                {isRegisteredUser && (
                    <section className="cta-section">
                        <div className="container cta-container">
                            <div>
                                <h2>هل ترغب بزيارة المكتبة المتجولة؟</h2>
                                <p>يمكن للمدارس والجمعيات والكشافة تقديم طلب زيارة بخطوات بسيطة.</p>
                            </div>
                            <Link href={route('event.request')} className="btn btn-light">سجّل طلبك الآن</Link>
                        </div>
                    </section>
                )}

                {!user && (
                    <section className="cta-section">
                        <div className="container cta-container">
                            <div>
                                <h2>هل ترغب بزيارة المكتبة المتجولة؟</h2>
                                <p>يمكن للمدارس والجمعيات والكشافة تقديم طلب زيارة بخطوات بسيطة.</p>
                            </div>
                            <Link href={route('register')} className="btn btn-light">سجّل طلبك الآن</Link>
                        </div>
                    </section>
                )}

                {/* Footer */}
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