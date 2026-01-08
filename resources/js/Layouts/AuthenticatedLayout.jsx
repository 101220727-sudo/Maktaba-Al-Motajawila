
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
                    --color-teal: #4ABC9D;
                    --color-bg: #F9F7FB;
                }

                * {
                    direction: rtl;
                }

                .authenticated-layout {
                    min-height: 100vh;
                    background-color: var(--color-bg);
                    font-family: "Tajawal", "Cairo", system-ui, sans-serif;
                }

                .auth-nav {
                    background-color: #ffffff;
                    border-bottom: 2px solid rgba(118, 73, 156, 0.15);
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                }

                .auth-nav-container {
                    margin: 0 auto;
                    max-width: 1100px;
                    padding: 0 1.5rem;
                }

                .auth-nav-inner {
                    display: flex;
                    height: 4rem;
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
                }

                .auth-logo {
                    height: 2.5rem;
                    width: auto;
                    color: var(--color-primary);
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
                    color: #333;
                    font-size: 1.1rem;
                    font-weight: 600;
                    transition: color 0.3s;
                    padding: 0.5rem 0;
                }

                .auth-nav-link:hover {
                    color: var(--color-primary);
                }

                .auth-nav-link.active {
                    color: var(--color-primary);
                    border-bottom: 3px solid var(--color-teal);
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
                    padding: 0.5rem 1rem;
                    border-radius: 999px;
                    background-color: var(--color-primary);
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: opacity 0.3s;
                }

                .auth-dropdown-trigger:hover {
                    opacity: 0.9;
                }

                .auth-dropdown-icon {
                    margin-right: 0.5rem;
                    height: 1rem;
                    width: 1rem;
                }

                .auth-mobile-menu-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    color: #666;
                    transition: all 0.3s;
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
                    background-color: rgba(118, 73, 156, 0.08);
                    color: var(--color-primary);
                }

                .auth-mobile-menu-icon {
                    height: 1.5rem;
                    width: 1.5rem;
                }

                .auth-mobile-dropdown {
                    display: none;
                }

                .auth-mobile-dropdown.show {
                    display: block;
                }

                @media (min-width: 640px) {
                    .auth-mobile-dropdown {
                        display: none !important;
                    }
                }

                .auth-mobile-nav-links {
                    padding: 0.75rem 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .auth-mobile-nav-link {
                    display: block;
                    padding: 0.75rem 1rem;
                    text-decoration: none;
                    color: #333;
                    font-size: 1rem;
                    font-weight: 600;
                    transition: background-color 0.2s;
                    border-right: 3px solid transparent;
                }

                .auth-mobile-nav-link:hover,
                .auth-mobile-nav-link.active {
                    background-color: rgba(118, 73, 156, 0.08);
                    border-right-color: var(--color-teal);
                }

                .auth-mobile-user-section {
                    border-top: 1px solid #e5e7eb;
                    padding: 1rem 0;
                    margin-top: 0.5rem;
                }

                .auth-mobile-user-info {
                    padding: 0 1rem;
                    margin-bottom: 0.75rem;
                }

                .auth-mobile-user-name {
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--color-primary);
                }

                .auth-mobile-user-email {
                    font-size: 0.9rem;
                    color: #666;
                    margin-top: 0.25rem;
                }

                .auth-mobile-user-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .auth-header {
                    background-color: white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                }

                .auth-header-inner {
                    margin: 0 auto;
                    max-width: 1100px;
                    padding: 1.5rem;
                }

                .auth-main {
                    padding: 0;
                }

                .auth-footer {
                    background-color: #3a0d63;
                    color: #f3e9ff;
                    padding: 1.5rem;
                    margin-top: 2rem;
                    text-align: center;
                }

                .auth-footer-text {
                    font-size: 0.95rem;
                }
            `}</style>

            <nav className="auth-nav">
                <div className="auth-nav-container">
                    <div className="auth-nav-inner">
                        <div className="auth-nav-right">
                 

                  
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
                    <div className="auth-mobile-nav-links">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className="auth-mobile-nav-link"
                        >
                            لوحة التحكم
                        </ResponsiveNavLink>
                    </div>

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