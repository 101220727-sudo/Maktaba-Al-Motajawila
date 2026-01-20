
import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';


export default function EventRequestPage({ auth, packages, selectedPackageId }) {
    const user = auth?.user;
    const [showDropdown, setShowDropdown] = useState(false);


    const [form, setForm] = useState({
        event_package_id: selectedPackageId || '',
        event_date: '',
        location: '',
        age: '',
        nb_of_visitors: '',
        phone: user?.phone || '', // Pre-fill with user's phone from database
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store form data in sessionStorage to use later when requesting package
    sessionStorage.setItem('eventRequestData', JSON.stringify({
        event_date: form.event_date,
        location: form.location,
        age: form.age,
        nb_of_visitors: form.nb_of_visitors,
        gender: form.gender,
        phone: form.phone
    }));
    
    // Redirect to packages page with filters in URL
    router.visit(route('event.packages'), {
        method: 'get',
        data: {
            age: form.age,
            visitors: form.nb_of_visitors,  // Note: 'visitors' not 'nb_of_visitors'
            gender: form.gender
        }
    });
};


    return (
        <>
            <Head title="طلب زيارة" />
            
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

                .event-request-page {
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
                    background: linear-gradient(
                        135deg,
                        rgba(118, 73, 156, 0.04),
                        rgba(74, 188, 157, 0.06)
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
                    text-align: center;
                }

                .section-intro {
                    max-width: 700px;
                    margin: 0 auto 1.8rem;
                    color: #444;
                    text-align: center;
                }

                .event-form {
                    max-width: 650px;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 2rem 2.2rem;
                    border-radius: 1.1rem;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
                    border-right: 6px solid var(--color-teal);
                }

                .form-group {
                    margin-bottom: 1.2rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.4rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    font-size: 0.98rem;
                }

                .form-group input,
                .form-group select {
                    width: 100%;
                    padding: 0.75rem 0.9rem;
                    border-radius: 0.7rem;
                    border: 1px solid rgba(0,0,0,0.12);
                    font-size: 0.98rem;
                    background-color: #faf8ff;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
                    font-family: inherit;
                }

                .form-group input:focus,
                .form-group select:focus {
                    outline: none;
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 3px rgba(118,73,156,0.18);
                    background-color: #fff;
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
                    width: 100%;
                    margin-top: 0.5rem;
                    font-size: 1.05rem;
                }

                .btn-primary:hover:not(:disabled) {
                    opacity: 0.95;
                }

                .btn-primary:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .no-packages {
                    text-align: center;
                    padding: 2rem;
                    background-color: #fff3cd;
                    border: 1px solid #ffc107;
                    border-radius: 0.7rem;
                    color: #856404;
                    margin-bottom: 1rem;
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

                    .event-form {
                        padding: 1.5rem 1.2rem;
                    }

                    .footer-container {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>

            <div className="event-request-page">
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
                            <Link href="/">الصفحة الرئيسية</Link>
                            <Link href={route('news')}>الأخبار</Link>
                            {/* <Link href={route('event.packages')}>الفعاليات</Link> */}

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

                                             {(isAdminEvents || isAdminNews ) && (
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
                                    <Link href={route('login')}>تسجيل الدخول</Link>
                                    <Link href={route('register')}>انشاء حساب</Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <section className="section">
                    <div className="container">
                        <h2 className="section-title">طلب زيارة المكتبة المتجولة</h2>
                        <p className="section-intro">
                            املأ النموذج التالي لحجز زيارة المكتبة المتجولة لمؤسستك أو مجموعتك.
                        </p>

                        <form className="event-form" onSubmit={handleSubmit}>
                            
                            {/* drore {packages && packages.length > 0 ? (
                                <div className="form-group">
                                    <label htmlFor="event_package_id">اختر الباقة</label>
                                    <select
                                        id="event_package_id"
                                        name="event_package_id"
                                        onChange={handleChange}
                                        value={form.event_package_id}
                                        required
                                    >
                                        <option value="">اختر باقة الفعالية...</option>
                                        {packages.map(pkg => (
                                            <option key={pkg.id} value={pkg.id}>{pkg.package_title}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div className="no-packages">
                                    لا توجد باقات فعاليات متاحة حاليًا.
                                </div>
                            )} */}



<div className="form-group">
    <label htmlFor="age">العمر</label>
    <input 
        type="number" 
        id="age"
        name="age" 
        placeholder="العمر..."
        onChange={handleChange}
        value={form.age}
        min="4"
        max="18"
        required 
    />
</div>

                            <div className="form-group">
                                <label htmlFor="nb_of_visitors">عدد الزوار المتوقع</label>
                                <input 
                                    type="number" 
                                    id="nb_of_visitors"
                                    name="nb_of_visitors" 
                                    placeholder="عدد المشاركين..."
                                    onChange={handleChange}
                                    value={form.nb_of_visitors}
                                            min="2"

                                    required 
                                />
                            </div>

                            <div className="form-group">
    <label htmlFor="gender">الجنس</label>
    <select 
        id="gender"
        name="gender" 
        onChange={handleChange}
        value={form.gender}
        required
    >
        <option value="male">ذكور</option>
        <option value="female">إناث</option>
        <option value="mixed">ذكور وإناث</option>
    </select>
</div>

<div className="form-group">
    <label htmlFor="event_date">تاريخ ووقت الزيارة المطلوب</label>
    <input 
        type="datetime-local" 
        id="event_date"
        name="event_date" 
        onChange={handleChange}
        value={form.event_date}
        min={new Date().toISOString().slice(0, 16)}
        required 
    />
</div>

                            <div className="form-group">
                                <label htmlFor="location">الموقع</label>
                                <input 
                                    type="text" 
                                    id="location"
                                    name="location" 
                                    placeholder="الموقع..."
                                    onChange={handleChange}
                                    value={form.location}
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">رقم الهاتف</label>
                                <input 
                                    type="text" 
                                    id="phone"
                                    name="phone" 
                                    placeholder="رقم الهاتف للتواصل..."
                                    onChange={handleChange}
                                    value={form.phone}
                                    required 
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                إرسال الطلب
                            </button>
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
}