

import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';

export default function PackagesPage({ packages, auth }) {
    const [eventRequestData, setEventRequestData] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const { delete: deletePackage } = useForm();

    // Check roles
    const isAdminEvents = auth?.user?.role?.name === 'admin_events';
    const isRegisteredUser = auth?.user?.role?.name === 'registered_user';

    // Load stored form data on mount
    useEffect(() => {
        const storedData = sessionStorage.getItem('eventRequestData');
        if (storedData) {
            setEventRequestData(JSON.parse(storedData));
        }
    }, []);

    const handlePackageRequest = (packageId) => {
        if (!eventRequestData) {
            alert('الرجاء ملء النموذج أولاً');
            router.visit(route('event.request'));
            return;
        }

        // Submit the complete request with package_id
        axios.post('/event-requests', {
            event_package_id: packageId,
            ...eventRequestData
        })
        .then(res => {
            alert(res.data.message || 'تم إرسال الطلب بنجاح!');
            // Clear stored data
            sessionStorage.removeItem('eventRequestData');
            // Redirect to home or confirmation page
            router.visit('/');
        })
        .catch(err => {
            if (err.response) {
                alert('فشل الإرسال: ' + JSON.stringify(err.response.data.errors));
            } else {
                alert('فشل في تقديم الطلب');
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this package?')) {
            deletePackage(route('packages.destroy', id), {
                onSuccess: () => {
                    alert('Package deleted successfully');
                },
            });
        }
    };

    return (
        <>
            <Head title="Event Packages" />

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

                .packages-page {
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

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .section-title {
                    font-size: 1.7rem;
                    color: var(--color-primary);
                    font-weight: 700;
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

                .packages-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.5rem;
                }

                .package-card {
                    background-color: #fff;
                    border-radius: 1rem;
                    box-shadow: 0 6px 18px rgba(0,0,0,0.04);
                    overflow: hidden;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .package-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
                }

                .package-image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }

                .package-content {
                    padding: 1.4rem;
                }

                .package-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    margin-bottom: 0.5rem;
                }

                .package-description {
                    font-size: 0.95rem;
                    color: #444;
                    line-height: 1.7;
                    margin-bottom: 1rem;
                }

                .package-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .btn-request {
                    background-color: var(--color-teal);
                    color: #fff;
                    padding: 0.7rem 1rem;
                    border-radius: 999px;
                    border: none;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: opacity 0.3s ease;
                    text-align: center;
                }

                .btn-request:hover {
                    opacity: 0.9;
                }

                .btn-edit {
                    background-color: var(--color-yellow);
                    color: #333;
                    padding: 0.6rem 1rem;
                    border-radius: 999px;
                    border: none;
                    font-size: 0.95rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: opacity 0.3s ease;
                    text-align: center;
                    text-decoration: none;
                }

                .btn-edit:hover {
                    opacity: 0.9;
                }

                .btn-delete {
                    background-color: #c62828;
                    color: #fff;
                    padding: 0.6rem 1rem;
                    border-radius: 999px;
                    border: none;
                    font-size: 0.95rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    text-align: center;
                }

                .btn-delete:hover {
                    background-color: #a01515;
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

                    .section-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }

                    .packages-grid {
                        grid-template-columns: 1fr;
                    }

                    .footer-container {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>

            <div className="packages-page">
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
                            {/* <Link href="/">الصفحة الرئيسية</Link>
                            <Link href={route('news')}>الأخبار</Link>
                            <Link href={route('event.packages')} className="active">الفعاليات</Link> */}

                            {auth?.user ? (
                                <div className="user-menu">
                                    <button 
                                        className="user-button"
                                        onClick={() => setShowDropdown(!showDropdown)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                        {auth.user.name}
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

                <section className="section">
                    <div className="container">
                        <div className="section-header">
                            <h1 className="section-title">باقات الفعاليات المتاحة</h1>
                            
                            {isAdminEvents && (
                                <Link
                                    href={route('packages.add')}
                                    className="btn btn-primary"
                                >
                                    إضافة باقة جديدة
                                </Link>
                            )}
                        </div>

                        <div className="packages-grid">
                            {packages.map(pkg => (
                                <article key={pkg.id} className="package-card">
                                    <img 
                                        src={pkg.main_image || 'https://via.placeholder.com/400x300'}
                                        alt={pkg.package_title}
                                        className="package-image"
                                    />
                                    
                                    <div className="package-content">
                                        <h2 className="package-title">{pkg.package_title}</h2>
                                        <p className="package-description">
                                            {pkg.description || 'No description available.'}
                                        </p>

                                        <div className="package-actions">
                                            {isRegisteredUser && (
                                                <button
                                                    onClick={() => handlePackageRequest(pkg.id)}
                                                    className="btn-request"
                                                >
                                                    طلب هذه الباقة
                                                </button>
                                            )}

                                            {isAdminEvents && (
                                                <>
                                                    <Link
                                                        href={route('packages.edit', pkg.id)}
                                                        className="btn-edit"
                                                    >
                                                        تعديل الباقة
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(pkg.id)}
                                                        className="btn-delete"
                                                    >
                                                        حذف الباقة
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
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