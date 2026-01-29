import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="الملف الشخصي" />

            <style>{`
                :root {
                    --color-primary: #76499C;
                    --color-primary-soft: #A189B7;
                    --color-primary-light: #E8DFF5;
                    --color-teal: #4ABC9D;
                    --color-teal-light: #E0F7F2;
                    --color-text: #222222;
                    --color-text-light: #555555;
                    --shadow-soft: 0 12px 32px rgba(118, 73, 156, 0.12);
                    --transition: all 0.35s ease;
                }

                * {
                    direction: rtl;
                    text-align: right;
                }

                body {
                    background: linear-gradient(135deg, #F9F7FB 0%, #FFF 100%);
                }

                .profile-container {
                    padding: 2.5rem 0 3rem;
                    position: relative;
                }

                .profile-container-inner {
                    max-width: 900px;
                    width: 90%;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    position: relative;
                    z-index: 1;
                }

                .profile-title {
                    font-size: 1.6rem;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: linear-gradient(135deg, var(--color-primary), var(--color-teal));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 0.5rem;
                }

                .profile-title::before {
                    content: '👤';
                    -webkit-text-fill-color: initial;
                }

                .profile-card {
                    background: #fff;
                    padding: 2.3rem;
                    border-radius: 18px;
                    box-shadow: var(--shadow-soft);
                    border-right: 4px solid var(--color-teal);
                    transition: var(--transition);
                }

                .profile-card:hover {
                    transform: translateY(-4px);
                }

                .actions-card {
                    display: flex;
                    gap: 1rem;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }

                .action-btn {
                    flex: 1;
                    min-width: 220px;
                    padding: 0.9rem 1.8rem;
                    border-radius: 50px;
                    font-weight: 700;
                    text-decoration: none;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    gap: 0.6rem;
                    color: #fff;
                    transition: var(--transition);
                    box-shadow: 0 6px 18px rgba(0,0,0,0.12);
                }

                .action-btn.primary {
                    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-soft));
                }

                .action-btn.secondary {
                    background: linear-gradient(135deg, var(--color-teal), #3DA88A);
                }

                .action-btn:hover {
                    transform: translateY(-3px);
                }

                @media (max-width: 768px) {
                    .actions-card {
                        flex-direction: column;
                    }

                    .action-btn {
                        width: 100%;
                    }

                    .profile-title {
                        font-size: 1.4rem;
                    }
                }
            `}</style>

            <div className="profile-container">
                <div className="profile-container-inner">

                    <h2 className="profile-title">الملف الشخصي</h2>

                    <div className="profile-card actions-card">
                        <Link
                            href="/my-event-requests"
                            className="action-btn primary"
                        >
                            📋 طلباتي 
                        </Link>

                        <Link
                            href={route('event.request')}
                            className="action-btn secondary"
                        >
                            ➕ قدّم طلب 
                        </Link>
                    </div>

                    <div className="profile-card">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="profile-card">
                        <DeleteUserForm className="max-w-xl" />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
