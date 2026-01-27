import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="profile-page-title">
                    الملف الشخصي
                </h2>
            }
        >
            <Head title="الملف الشخصي" />


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
                    text-align: right;
                }

                body {
                    background: linear-gradient(135deg, #F9F7FB 0%, #FFF 100%);
                }

                .profile-page-title {
                    font-size: 2rem;
                    font-weight: 900;
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-teal) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-align: right;
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                }

                .profile-page-title::before {
                    content: '👤';
                    font-size: 1.8rem;
                    -webkit-text-fill-color: initial;
                }

                .profile-container {
                    padding: 3rem 0;
                    direction: rtl;
                    position: relative;
                }

                .profile-container::before {
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

                .profile-container-inner {
                    margin: 0 auto;
                    max-width: 900px;
                    width: 90%;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    direction: rtl;
                    position: relative;
                    z-index: 1;
                }

                .profile-card {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 20px;
                    box-shadow: var(--shadow-lg);
                    border-right: 6px solid var(--color-teal);
                    direction: rtl;
                    text-align: right;
                    transition: var(--transition);
                    animation: fadeInUp 0.6s ease-out backwards;
                    animation-delay: calc(var(--animation-order) * 0.15s);
                    position: relative;
                    overflow: hidden;
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

                .profile-card::before {
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

                .profile-card:hover::before {
                    transform: scaleX(1);
                }

                .profile-card:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-lg), 0 0 0 1px rgba(74, 188, 157, 0.2);
                }

                .actions-card {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                    align-items: center;
                }

                .my-requests-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.9rem 1.8rem;
                    border-radius: 50px;
                    font-weight: 700;
                    text-decoration: none;
                    transition: var(--transition);
                    box-shadow: var(--shadow-sm);
                    position: relative;
                    overflow: hidden;
                    font-size: 1.05rem;
                    letter-spacing: 0.3px;
                }

                .my-requests-btn::before {
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

                .my-requests-btn:hover::before {
                    width: 400px;
                    height: 400px;
                }

                .my-requests-btn:nth-child(1) {
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-soft) 100%);
                    color: white;
                }

                .my-requests-btn:nth-child(1)::after {
                    content: '📋';
                    font-size: 1.2rem;
                }

                .my-requests-btn:nth-child(2) {
                    background: linear-gradient(135deg, var(--color-teal), #3DA88A);
                    color: white;
                }

                .my-requests-btn:nth-child(2)::after {
                    content: '➕';
                    font-size: 1.2rem;
                }

                .my-requests-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: var(--shadow-md);
                }

                /* Hide any dashboard navigation or logo elements */
                nav[aria-label="Breadcrumb"],
                .dashboard-nav,
                .sidebar,
                .app-logo {
                    display: none !important;
                }

                @media (max-width: 768px) {
                    .profile-container {
                        padding: 2rem 0;
                    }

                    .profile-container-inner {
                        width: 95%;
                        gap: 1.5rem;
                    }

                    .profile-card {
                        padding: 2rem 1.5rem;
                    }

                    .profile-page-title {
                        font-size: 1.6rem;
                    }

                    .actions-card {
                        flex-direction: column;
                    }

                    .my-requests-btn {
                        width: 100%;
                        justify-content: center;
                        text-align: center;
                    }
                }

                @media (max-width: 480px) {
                    .profile-card {
                        padding: 1.5rem 1.2rem;
                    }

                    .profile-page-title {
                        font-size: 1.4rem;
                    }

                    .my-requests-btn {
                        padding: 0.8rem 1.5rem;
                        font-size: 0.95rem;
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

            <div className="profile-container">
                <div className="profile-container-inner">
                    {/* <div className="profile-card" style={{'--animation-order': 0}}>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div> */}

                    

                    <div className="profile-card actions-card" style={{'--animation-order': 0}}>
                        <Link
                            href="/my-event-requests"
                            className="my-requests-btn"
                        >
                            طلباتي للفعاليات
                        </Link>

                        <Link 
                            href={route('event.request')} 
                            className="my-requests-btn"
                        >
                            قدّم طلب زيارة
                        </Link>
                    </div>

                    <div className="profile-card" style={{'--animation-order': 1}}>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="profile-card" style={{'--animation-order': 2}}>
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
