

import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
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

        axios.post('/event-requests', {
            event_package_id: packageId,
            ...eventRequestData
        })
        .then(res => {
            alert(res.data.message || 'تم إرسال الطلب بنجاح!');
            sessionStorage.removeItem('eventRequestData');
            router.visit('/my-event-requests');
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
        if (confirm('هل أنت متأكد من حذف هذه الباقة؟')) {
            deletePackage(route('packages.destroy', id), {
                onSuccess: () => {
                    alert('تم حذف الباقة بنجاح');
                },
            });
        }
    };

    // Get query params to show active filters
    const queryParams = new URLSearchParams(window.location.search);
    const activeFilters = {
        age: queryParams.get('age'),
        visitors: queryParams.get('visitors'),
        gender: queryParams.get('gender')
    };

    const hasActiveFilters = activeFilters.age || activeFilters.visitors || activeFilters.gender;

    return (
        <>
            <Head title="باقات الفعاليات" />

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

                .packages-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                .packages-page::before {
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

                .packages-page::after {
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

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2.5rem;
                }

                .section-title {
                    font-size: 2.2rem;
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

                .btn-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(118, 73, 156, 0.4);
                }

                .filter-info {
                    background: linear-gradient(135deg, var(--color-teal-light) 0%, #d0f0e8 100%);
                    padding: 1.5rem 2rem;
                    border-radius: 16px;
                    margin-bottom: 2rem;
                    border: 2px solid var(--color-teal);
                    box-shadow: var(--shadow-sm);
                    animation: slideDown 0.4s ease-out;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .filter-info h3 {
                    font-weight: 800;
                    margin-bottom: 0.8rem;
                    color: var(--color-primary);
                    font-size: 1.3rem;
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                }

                .filter-info h3::before {
                    content: '🎯';
                    font-size: 1.4rem;
                }

                .filter-info ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .filter-info ul li {
                    margin-bottom: 0.5rem;
                    color: var(--color-text-light);
                    font-weight: 600;
                    padding-right: 0.5rem;
                }

                .filter-count {
                    margin-top: 1rem;
                    font-size: 1rem;
                    color: var(--color-primary);
                    font-weight: 700;
                    padding: 0.7rem 1.2rem;
                    background: white;
                    border-radius: 50px;
                    display: inline-block;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                }

                .no-results {
                    background: linear-gradient(135deg, var(--color-yellow-light) 0%, #ffe9a3 100%);
                    padding: 3rem 2rem;
                    border-radius: 16px;
                    text-align: center;
                    border: 2px solid var(--color-yellow);
                    color: #856404;
                    box-shadow: var(--shadow-md);
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

                .no-results p:first-child {
                    font-weight: 800;
                    font-size: 1.4rem;
                    margin-bottom: 0.8rem;
                }

                .no-results p:first-child::before {
                    content: '⚠️ ';
                    font-size: 1.5rem;
                    margin-left: 0.5rem;
                }

                .packages-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 2rem;
                }

                .package-card {
                    background: white;
                    border-radius: 16px;
                    box-shadow: var(--shadow-sm);
                    overflow: hidden;
                    transition: var(--transition);
                    border: 1px solid rgba(118, 73, 156, 0.08);
                    animation: fadeInUp 0.6s ease-out backwards;
                    animation-delay: calc(var(--animation-order) * 0.1s);
                }

                .package-card::before {
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

                .package-card:hover::before {
                    transform: scaleX(1);
                }

                .package-card:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-md);
                    border-color: rgba(118, 73, 156, 0.15);
                }

                .package-image {
                    width: 100%;
                    height: 220px;
                    object-fit: cover;
                    transition: var(--transition);
                }

                .package-card:hover .package-image {
                    transform: scale(1.05);
                }

                .package-content {
                    padding: 1.8rem;
                }

                .package-title {
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: var(--color-primary);
                    margin-bottom: 0.8rem;
                    line-height: 1.4;
                }

                .package-description {
                    font-size: 1rem;
                    color: var(--color-text-light);
                    line-height: 1.7;
                    margin-bottom: 1.2rem;
                }

                .package-details {
                    list-style: none;
                    padding: 0;
                    margin-bottom: 1.3rem;
                    font-size: 0.95rem;
                    background: var(--color-primary-light);
                    padding: 1rem;
                    border-radius: 12px;
                }

                .package-details li {
                    margin-bottom: 0.6rem;
                    color: var(--color-text-light);
                    display: flex;
                    align-items: flex-start;
                    gap: 0.5rem;
                }

                .package-details li:last-child {
                    margin-bottom: 0;
                }

                .package-details li::before {
                    content: '✓';
                    color: var(--color-teal);
                    font-weight: bold;
                    flex-shrink: 0;
                }

                .package-details strong {
                    color: var(--color-primary);
                    font-weight: 700;
                }

                .package-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.7rem;
                }

                .btn-request {
                    background: linear-gradient(135deg, var(--color-teal), #3DA88A);
                    color: white;
                    padding: 0.9rem 1.2rem;
                    border-radius: 50px;
                    border: none;
                    font-size: 1.05rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: var(--transition);
                    text-align: center;
                    box-shadow: 0 4px 15px rgba(74, 188, 157, 0.3);
                    position: relative;
                    overflow: hidden;
                }

                .btn-request::before {
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

                .btn-request:hover::before {
                    width: 400px;
                    height: 400px;
                }

                .btn-request:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(74, 188, 157, 0.4);
                }

                .btn-edit {
                    background: linear-gradient(135deg, var(--color-yellow), #F2B94C);
                    color: var(--color-primary);
                    padding: 0.8rem 1.2rem;
                    border-radius: 50px;
                    border: none;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: var(--transition);
                    text-align: center;
                    text-decoration: none;
                    display: block;
                    box-shadow: 0 4px 15px rgba(242, 201, 76, 0.3);
                }

                .btn-edit:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(242, 201, 76, 0.4);
                }

                .btn-delete {
                    background: linear-gradient(135deg, #c62828, #a01515);
                    color: white;
                    padding: 0.8rem 1.2rem;
                    border-radius: 50px;
                    border: none;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: var(--transition);
                    text-align: center;
                    box-shadow: 0 4px 15px rgba(198, 40, 40, 0.3);
                }

                .btn-delete:hover {
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

                @media (max-width: 968px) {
                    .packages-grid {
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

                    .section-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }

                    .section-title {
                        font-size: 1.7rem;
                    }

                    .packages-grid {
                        grid-template-columns: 1fr;
                    }

                    .footer-container {
                        flex-direction: column;
                        text-align: center;
                        gap: 1rem;
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

                    .filter-info {
                        padding: 1.2rem 1.5rem;
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

            <div className="packages-page">
                {/* Header */}
                <header className="main-header">
                    <div className="nav-container">
                        <div className="logo">
                            <img src="/images/logo.png" alt="شعار المكتبة المتجولة" className="logo-img" />
                            <div className="logo-text-wrap">
                                <span className="logo-text-ar-big">مكتبة مهدي المتجولة</span>
                                <span className="logo-text-sub">مكتبة على عجلات تجوب المناطق اللبنانية</span>
                            </div>
                        </div>

                        <nav className="main-nav">
                            {/* <Link href="/">الصفحة الرئيسية</Link> */}
                            <Link href={route('event.packages')
}>الباقات</Link>
                           {/* <Link href={route('logout')}>تسجيل الخروج</Link> */}
<Link 
    href={route('events.receive')} 
    // method="post" 
    // as="button" 
    // className="dropdown-item"
>
الطلبات</Link>


<Link 
    href={route('logout')} 
    method="post" 
    as="button" 
    className="dropdown-item"
>
    تسجيل الخروج
</Link>

                            {/* {auth?.user ? (
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
                                            {(isAdminEvents || isRegisteredUser) && (
                                                <Link href={route('profile.edit')} className="dropdown-item">الملف الشخصي</Link>
                                            )}
                                            <Link href={route('logout')} method="post" as="button" className="dropdown-item">تسجيل الخروج</Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link href={route('login')}>تسجيل الدخول</Link>
                                    <Link href={route('register')}>انشاء حساب</Link>
                                </>
                            )} */}
                        </nav>
                    </div>
                </header>

                {/* Packages Section */}
                <section className="section">
                    <div className="container">
                        <div className="section-header">
                            <h1 className="section-title">باقات الفعاليات المتاحة</h1>
                            {isAdminEvents && (
                                <Link href={route('packages.add')} className="btn btn-primary">إضافة باقة جديدة</Link>
                            )}
                        </div>

                        {/* Show active filters */}
                        {hasActiveFilters && (
                            <div className="filter-info">
                                <h3>الفلاتر النشطة</h3>
                                <ul>
                                    {activeFilters.age && <li>✓ العمر: {activeFilters.age} سنة</li>}
                                    {activeFilters.visitors && <li>✓ عدد الزوار: {activeFilters.visitors}</li>}
                                    {activeFilters.gender && (
                                        <li>✓ الجنس: {
                                            activeFilters.gender === 'male' ? 'ذكور' :
                                            activeFilters.gender === 'female' ? 'إناث' : 'ذكور وإناث'
                                        }</li>
                                    )}
                                </ul>
                                <p className="filter-count">عرض {packages.length} باقة متطابقة</p>
                            </div>
                        )}

                        {/* Show message if no packages */}
                        {packages.length === 0 && hasActiveFilters && (
                            <div className="no-results">
                                <p>عذراً، لا توجد باقات متاحة تطابق معاييرك</p>
                                <p>يرجى تعديل العمر أو عدد الزوار والمحاولة مرة أخرى.</p>
                            </div>
                        )}

                        <div className="packages-grid">
                            {packages.map((pkg, index) => (
                                <article 
                                    key={pkg.id} 
                                    className="package-card"
                                    style={{'--animation-order': index}}
                                >
                                    {/* <img src={pkg.main_image || 'https://via.placeholder.com/400x300'} alt={pkg.package_title} className="package-image" /> */}
                                    <img 
    src={pkg.main_image ? `/storage/${pkg.main_image}` : 'https://via.placeholder.com/400x300?text=لا+توجد+صورة'} 
    alt={pkg.package_title} 
    className="package-image"
    onError={(e) => {
        e.target.src = 'https://via.placeholder.com/400x300?text=صورة+غير+متوفرة';
        e.target.onerror = null;
    }}
/>


                                    <div className="package-content">
                                        <h2 className="package-title">{pkg.package_title}</h2>
                                        <p className="package-description">{pkg.description || 'لا يوجد وصف متاح.'}</p>

                                        <ul className="package-details">
                                            <li><strong>السعر:</strong> {pkg.total_price} دولار</li>
                                            <li><strong>وقت الفعالية:</strong> {pkg.event_time} دقيقة </li>
                                            <li>
                                                <strong>الأنشطة:</strong>{' '}
                                                {pkg.activities && pkg.activities.length > 0
                                                    ? pkg.activities.join(', ')
                                                    : 'غير محدد'}
                                            </li>
                                        </ul>

                                        <div className="package-actions">
                                            {isRegisteredUser && (
                                                <button onClick={() => handlePackageRequest(pkg.id)} className="btn-request">
                                                    طلب هذه الباقة
                                                </button>
                                            )}
                                            {isAdminEvents && (
                                                <>
                                                    <Link href={route('packages.edit', pkg.id)} className="btn-edit">تعديل الباقة</Link>
                                                    <button onClick={() => handleDelete(pkg.id)} className="btn-delete">حذف الباقة</button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

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
