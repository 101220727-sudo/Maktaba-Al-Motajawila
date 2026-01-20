import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="authenticated-layout">
            <style>{`
                :root {
                    --color-primary: #76499C;
                    --color-primary-soft: #A189B7;
                    --color-primary-light: #E8DFF5;
                    --color-teal: #4ABC9D;
                    --color-teal-light: #E0F7F2;
                    --color-yellow: #F2C94C;
                    --color-bg: #F9F7FB;
                    --color-text: #222222;
                    --color-text-light: #555555;
                    --shadow-sm: 0 2px 8px rgba(118, 73, 156, 0.08);
                    --shadow-md: 0 8px 24px rgba(118, 73, 156, 0.12);
                    --shadow-lg: 0 16px 48px rgba(118, 73, 156, 0.18);
                    --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                * {
                    direction: rtl;
                }

                .authenticated-layout {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #F9F7FB 0%, #FFF 100%);
                    font-family: "Tajawal", "Cairo", "Segoe UI", system-ui, sans-serif;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                .authenticated-layout::before {
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

                @keyframes float {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(30px, -30px) rotate(5deg); }
                    66% { transform: translate(-20px, 20px) rotate(-5deg); }
                }

                .auth-nav {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(118, 73, 156, 0.1);
                    box-shadow: var(--shadow-sm);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    transition: var(--transition);
                }

                .auth-nav::after {
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

                .auth-nav:hover::after {
                    opacity: 1;
                }

                .auth-nav-container {
                    margin: 0 auto;
                    max-width: 1200px;
                    padding: 0 1.5rem;
                }

                .auth-nav-inner {
                    display: flex;
                    height: 5rem;
                    justify-content: space-between;
                    align-items: center;
                }

                .auth-nav-right {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }

                .auth-logo-link {
                    display: flex;
                    align-items: center;
                    transition: var(--transition);
                }

                .auth-logo-link:hover {
                    transform: scale(1.05);
                }

                .auth-logo {
                    height: 3rem;
                    width: auto;
                    color: var(--color-primary);
                    filter: drop-shadow(0 4px 12px rgba(118, 73, 156, 0.2));
                }

                .auth-nav-links {
                    display: none;
                    gap: 2rem;
                    align-items: center;
                }

                @media (min-width: 640px) {
                    .auth-nav-links {
                        display: flex;
                    }
                }

                .auth-nav-link {
                    text-decoration: none;
                    color: var(--color-text);
                    font-size: 1.1rem;
                    font-weight: 600;
                    transition: var(--transition);
                    padding: 0.5rem 0;
                    position: relative;
                }

                .auth-nav-link::before {
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

                .auth-nav-link:hover {
                    color: var(--color-primary);
                    transform: translateY(-2px);
                }

                .auth-nav-link:hover::before {
                    width: 100%;
                }

                .auth-nav-link.active {
                    color: var(--color-primary);
                }

                .auth-nav-link.active::before {
                    width: 100%;
                }

                .auth-nav-left {
                    display: none;
                    align-items: center;
                }

                @media (min-width: 640px) {
                    .auth-nav-left {
                        display: flex;
                    }
                }

                .auth-dropdown-wrapper {
                    position: relative;
                }

                .auth-dropdown-trigger {
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

                .auth-dropdown-trigger::before {
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

                .auth-dropdown-trigger:hover::before {
                    width: 300px;
                    height: 300px;
                }

                .auth-dropdown-trigger:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(118, 73, 156, 0.4);
                }

                .auth-dropdown-icon {
                    height: 1.1rem;
                    width: 1.1rem;
                    transition: transform 0.3s ease;
                }

                .auth-dropdown-trigger:hover .auth-dropdown-icon {
                    transform: rotate(180deg);
                }

                .auth-mobile-menu-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.7rem;
                    border-radius: 12px;
                    color: var(--color-text-light);
                    transition: var(--transition);
                    border: none;
                    background: none;
                    cursor: pointer;
                }

                @media (min-width: 640px) {
                    .auth-mobile-menu-button {
                        display: none;
                    }
                }

                .auth-mobile-menu-button:hover {
                    background: linear-gradient(135deg, rgba(118, 73, 156, 0.08) 0%, rgba(74, 188, 157, 0.05) 100%);
                    color: var(--color-primary);
                }

                .auth-mobile-menu-icon {
                    height: 1.8rem;
                    width: 1.8rem;
                }

                .auth-mobile-dropdown {
                    display: none;
                    background: white;
                    border-top: 1px solid rgba(118, 73, 156, 0.1);
                }

                .auth-mobile-dropdown.show {
                    display: block;
                    animation: slideDown 0.3s ease-out;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (min-width: 640px) {
                    .auth-mobile-dropdown {
                        display: none !important;
                    }
                }

                .auth-mobile-nav-links {
                    padding: 1rem 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                }

                .auth-mobile-nav-link {
                    display: block;
                    padding: 0.9rem 1.5rem;
                    text-decoration: none;
                    color: var(--color-text);
                    font-size: 1.05rem;
                    font-weight: 600;
                    transition: var(--transition);
                    border-right: 3px solid transparent;
                }

                .auth-mobile-nav-link:hover,
                .auth-mobile-nav-link.active {
                    background: linear-gradient(90deg, rgba(118, 73, 156, 0.08) 0%, transparent 100%);
                    border-right-color: var(--color-teal);
                    padding-right: 1.8rem;
                }

                .auth-mobile-user-section {
                    border-top: 2px solid rgba(118, 73, 156, 0.1);
                    padding: 1.2rem 0;
                    margin-top: 0.5rem;
                    background: var(--color-primary-light);
                }

                .auth-mobile-user-info {
                    padding: 0 1.5rem;
                    margin-bottom: 1rem;
                }

                .auth-mobile-user-name {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--color-primary);
                }

                .auth-mobile-user-email {
                    font-size: 0.95rem;
                    color: var(--color-text-light);
                    margin-top: 0.3rem;
                }

                .auth-mobile-user-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                }

                .auth-header {
                    background: white;
                    box-shadow: var(--shadow-sm);
                    position: relative;
                    z-index: 1;
                }

                .auth-header-inner {
                    margin: 0 auto;
                    max-width: 1200px;
                    padding: 2rem 1.5rem;
                }

                .auth-main {
                    flex: 1;
                    padding: 0;
                    position: relative;
                    z-index: 1;
                }

                .auth-footer {
                    background: linear-gradient(135deg, #2a0845 0%, #3a0d63 100%);
                    color: #f3e9ff;
                    padding: 2rem 1.5rem;
                    margin-top: 2rem;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }

                .auth-footer::before {
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

                .auth-footer-text {
                    font-size: 0.98rem;
                    font-weight: 500;
                }

                @media (max-width: 768px) {
                    .auth-nav-inner {
                        height: 4rem;
                    }

                    .auth-header-inner {
                        padding: 1.5rem 1rem;
                    }

                    .auth-footer {
                        padding: 1.5rem 1rem;
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

            <nav className="auth-nav">
                <div className="auth-nav-container">
                    <div className="auth-nav-inner">
                        <div className="auth-nav-right">
                            {/* Logo or navigation links can go here */}
                        </div>

                        <div className="auth-nav-left">
                            <div className="auth-dropdown-wrapper">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span>
                                            <button
                                                type="button"
                                                className="auth-dropdown-trigger"
                                            >
                                                <svg
                                                    className="auth-dropdown-icon"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {user.name}
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            الملف الشخصي
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            تسجيل الخروج
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="auth-mobile-menu-button"
                            >
                                <svg
                                    className="auth-mobile-menu-icon"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`auth-mobile-dropdown ${showingNavigationDropdown ? 'show' : ''}`}>
                    <div className="auth-mobile-user-section">
                        <div className="auth-mobile-user-info">
                            <div className="auth-mobile-user-name">
                                {user.name}
                            </div>
                            <div className="auth-mobile-user-email">
                                {user.email}
                            </div>
                        </div>

                        <div className="auth-mobile-user-links">
                            <ResponsiveNavLink 
                                href={route('profile.edit')}
                                className="auth-mobile-nav-link"
                            >
                                الملف الشخصي
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="auth-mobile-nav-link"
                            >
                                تسجيل الخروج
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="auth-header">
                    <div className="auth-header-inner">
                        {header}
                    </div>
                </header>
            )}

            <main className="auth-main">{children}</main>

            <footer className="auth-footer">
                <p className="auth-footer-text">© 2025 المكتبة المتجولة. جميع الحقوق محفوظة.</p>
            </footer>
        </div>
    );
}
