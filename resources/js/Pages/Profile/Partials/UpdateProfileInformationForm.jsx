import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
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

                .profile-section-header {
                    margin-bottom: 2rem;
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

                .profile-section-title {
                    font-size: 1.8rem;
                    font-weight: 900;
                    color: var(--color-primary);
                    margin-bottom: 0.8rem;
                    position: relative;
                    display: inline-block;
                    padding-bottom: 0.5rem;
                }

                .profile-section-title::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 60%;
                    height: 4px;
                    background: linear-gradient(90deg, var(--color-teal), transparent);
                    border-radius: 2px;
                }

                .profile-section-title::before {
                    content: '👤';
                    margin-left: 0.7rem;
                    font-size: 1.7rem;
                }

                .profile-section-desc {
                    font-size: 1.05rem;
                    color: var(--color-text-light);
                    line-height: 1.8;
                    max-width: 600px;
                }

                .profile-form {
                    margin-top: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.8rem;
                }

                .form-group-profile {
                    display: flex;
                    flex-direction: column;
                    gap: 0.7rem;
                    animation: fadeInUp 0.6s ease-out backwards;
                    animation-delay: calc(var(--animation-order) * 0.1s);
                }

                .form-label-profile {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .form-label-profile::before {
                    content: '●';
                    color: var(--color-teal);
                    font-size: 0.7rem;
                }

                .form-input-profile {
                    padding: 0.9rem 1.2rem;
                    border: 2px solid rgba(118, 73, 156, 0.15);
                    border-radius: 12px;
                    font-size: 1rem;
                    background: linear-gradient(135deg, #faf8ff 0%, #fff 100%);
                    transition: var(--transition);
                    font-family: inherit;
                    width: 100%;
                }

                .form-input-profile:focus {
                    outline: none;
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 4px rgba(118, 73, 156, 0.12);
                    background: white;
                    transform: translateY(-2px);
                }

                .form-input-profile::placeholder {
                    color: #aaa;
                }

                .verification-notice {
                    background: linear-gradient(135deg, var(--color-yellow-light) 0%, #ffe9a3 100%);
                    border: 2px solid var(--color-yellow);
                    border-radius: 16px;
                    padding: 1.5rem;
                    margin-top: 0.5rem;
                    animation: slideDown 0.4s ease-out;
                    box-shadow: var(--shadow-sm);
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

                .verification-text {
                    font-size: 1rem;
                    color: #856404;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                    flex-wrap: wrap;
                }

                .verification-text::before {
                    content: '⚠️';
                    font-size: 1.3rem;
                    flex-shrink: 0;
                }

                .verification-link {
                    color: var(--color-primary);
                    text-decoration: none;
                    font-weight: 700;
                    padding: 0.4rem 1rem;
                    background: white;
                    border-radius: 50px;
                    transition: var(--transition);
                    display: inline-block;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    border: 2px solid var(--color-primary);
                }

                .verification-link:hover {
                    background: var(--color-primary);
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(118, 73, 156, 0.3);
                }

                .verification-sent {
                    margin-top: 1rem;
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: var(--color-teal);
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.7rem 1.3rem;
                    background: var(--color-teal-light);
                    border-radius: 50px;
                    animation: successPulse 0.6s ease-out;
                }

                @keyframes successPulse {
                    0% {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.05);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .verification-sent::before {
                    content: '✓';
                    font-size: 1.2rem;
                    font-weight: bold;
                }

                .form-actions-profile {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                }

                .btn-save-profile {
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-soft) 100%);
                    color: white;
                    padding: 0.9rem 2rem;
                    border-radius: 50px;
                    border: none;
                    font-size: 1.05rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: var(--transition);
                    box-shadow: 0 4px 15px rgba(118, 73, 156, 0.3);
                    position: relative;
                    overflow: hidden;
                    letter-spacing: 0.3px;
                }

                .btn-save-profile::before {
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

                .btn-save-profile:hover::before {
                    width: 400px;
                    height: 400px;
                }

                .btn-save-profile:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(118, 73, 156, 0.4);
                }

                .btn-save-profile:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                .save-success-text {
                    color: var(--color-teal);
                    font-size: 1.05rem;
                    font-weight: 700;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.7rem 1.3rem;
                    background: var(--color-teal-light);
                    border-radius: 50px;
                    animation: successPulse 0.6s ease-out;
                }

                .save-success-text::before {
                    content: '✓';
                    font-size: 1.2rem;
                    font-weight: bold;
                }

                .error-message {
                    color: #c62828;
                    font-size: 0.88rem;
                    margin-top: 0.5rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .error-message::before {
                    content: '⚠️';
                    font-size: 0.9rem;
                }

                @media (max-width: 768px) {
                    .profile-section-title {
                        font-size: 1.5rem;
                    }

                    .profile-section-desc {
                        font-size: 0.95rem;
                    }

                    .verification-notice {
                        padding: 1.2rem;
                    }

                    .verification-text {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .form-actions-profile {
                        flex-direction: column;
                        align-items: stretch;
                    }

                    .btn-save-profile {
                        width: 100%;
                        text-align: center;
                    }

                    .save-success-text {
                        justify-content: center;
                        width: 100%;
                    }
                }

                @media (max-width: 480px) {
                    .profile-section-title {
                        font-size: 1.3rem;
                    }

                    .form-group-profile {
                        gap: 0.5rem;
                    }

                    .form-input-profile {
                        padding: 0.8rem 1rem;
                    }

                    .verification-notice {
                        padding: 1rem;
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

            <header className="profile-section-header">
                <h2 className="profile-section-title">
                    معلومات الملف الشخصي
                </h2>

                <p className="profile-section-desc">
                    قم بتحديث معلومات حسابك وعنوان بريدك الإلكتروني.
                </p>
            </header>

            <form onSubmit={submit} className="profile-form">
                <div className="form-group-profile" style={{'--animation-order': 0}}>
                    <InputLabel 
                        htmlFor="name" 
                        value="الاسم" 
                        className="form-label-profile" 
                    />

                    <TextInput
                        id="name"
                        className="form-input-profile"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="error-message" message={errors.name} />
                </div>

                <div className="form-group-profile" style={{'--animation-order': 1}}>
                    <InputLabel 
                        htmlFor="email" 
                        value="البريد الإلكتروني" 
                        className="form-label-profile" 
                    />

                    <TextInput
                        id="email"
                        type="email"
                        className="form-input-profile"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="error-message" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="verification-notice">
                        <p className="verification-text">
                            بريدك الإلكتروني غير مُفعّل.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="verification-link"
                            >
                                إعادة إرسال رسالة التفعيل
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="verification-sent">
                                تم إرسال رابط التفعيل إلى بريدك الإلكتروني
                            </div>
                        )}
                    </div>
                )}

                <div className="form-actions-profile">
                    <PrimaryButton 
                        disabled={processing} 
                        className="btn-save-profile"
                    >
                        {processing ? 'جارٍ الحفظ...' : 'حفظ'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="save-success-text">
                            تم الحفظ بنجاح
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
