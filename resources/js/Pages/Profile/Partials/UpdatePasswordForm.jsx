import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
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
                    --color-bg: #F9F7FB;
                    --color-text: #222222;
                    --color-text-light: #555555;
                    --shadow-sm: 0 2px 8px rgba(118, 73, 156, 0.08);
                    --shadow-md: 0 8px 24px rgba(118, 73, 156, 0.12);
                    --shadow-lg: 0 16px 48px rgba(118, 73, 156, 0.18);
                    --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .password-section-header {
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

                .password-section-title {
                    font-size: 1.8rem;
                    font-weight: 900;
                    color: var(--color-primary);
                    margin-bottom: 0.8rem;
                    position: relative;
                    display: inline-block;
                    padding-bottom: 0.5rem;
                }

                .password-section-title::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 60%;
                    height: 4px;
                    background: linear-gradient(90deg, var(--color-teal), transparent);
                    border-radius: 2px;
                }

                .password-section-title::before {
                    content: '🔐';
                    margin-left: 0.7rem;
                    font-size: 1.7rem;
                }

                .password-section-desc {
                    font-size: 1.05rem;
                    color: var(--color-text-light);
                    line-height: 1.8;
                    max-width: 600px;
                    padding: 1rem 1.5rem;
                    background: var(--color-teal-light);
                    border-radius: 12px;
                    border-right: 3px solid var(--color-teal);
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                }

                .password-section-desc::before {
                    content: 'ℹ️';
                    font-size: 1.3rem;
                    flex-shrink: 0;
                }

                .password-form {
                    margin-top: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.8rem;
                }

                .form-group-password {
                    display: flex;
                    flex-direction: column;
                    gap: 0.7rem;
                    animation: fadeInUp 0.6s ease-out backwards;
                    animation-delay: calc(var(--animation-order) * 0.1s);
                }

                .form-label-password {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .form-label-password::before {
                    content: '●';
                    color: var(--color-teal);
                    font-size: 0.7rem;
                }

                .form-input-password {
                    padding: 0.9rem 1.2rem;
                    border: 2px solid rgba(118, 73, 156, 0.15);
                    border-radius: 12px;
                    font-size: 1rem;
                    background: linear-gradient(135deg, #faf8ff 0%, #fff 100%);
                    transition: var(--transition);
                    font-family: inherit;
                    width: 100%;
                }

                .form-input-password:focus {
                    outline: none;
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 4px rgba(118, 73, 156, 0.12);
                    background: white;
                    transform: translateY(-2px);
                }

                .form-input-password::placeholder {
                    color: #aaa;
                }

                .form-actions-password {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                }

                .btn-save-password {
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

                .btn-save-password::before {
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

                .btn-save-password:hover::before {
                    width: 400px;
                    height: 400px;
                }

                .btn-save-password:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(118, 73, 156, 0.4);
                }

                .btn-save-password:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                .save-success-password {
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

                .save-success-password::before {
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
                    .password-section-title {
                        font-size: 1.5rem;
                    }

                    .password-section-desc {
                        font-size: 0.95rem;
                        padding: 0.9rem 1.2rem;
                    }

                    .form-actions-password {
                        flex-direction: column;
                        align-items: stretch;
                    }

                    .btn-save-password {
                        width: 100%;
                        text-align: center;
                    }

                    .save-success-password {
                        justify-content: center;
                        width: 100%;
                    }
                }

                @media (max-width: 480px) {
                    .password-section-title {
                        font-size: 1.3rem;
                    }

                    .form-group-password {
                        gap: 0.5rem;
                    }

                    .form-input-password {
                        padding: 0.8rem 1rem;
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

            <header className="password-section-header">
                <h2 className="password-section-title">
                    تحديث كلمة المرور
                </h2>

                <p className="password-section-desc">
                    تأكد من أن حسابك يستخدم كلمة مرور طويلة وعشوائية للبقاء آمنًا.
                </p>
            </header>

            <form onSubmit={updatePassword} className="password-form">
                <div className="form-group-password" style={{'--animation-order': 0}}>
                    <InputLabel
                        htmlFor="current_password"
                        value="كلمة المرور الحالية"
                        className="form-label-password"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="form-input-password"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="error-message"
                    />
                </div>

                <div className="form-group-password" style={{'--animation-order': 1}}>
                    <InputLabel 
                        htmlFor="password" 
                        value="كلمة المرور الجديدة" 
                        className="form-label-password" 
                    />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="form-input-password"
                        autoComplete="new-password"
                    />

                    <InputError 
                        message={errors.password} 
                        className="error-message" 
                    />
                </div>

                <div className="form-group-password" style={{'--animation-order': 2}}>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="تأكيد كلمة المرور"
                        className="form-label-password"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="form-input-password"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="error-message"
                    />
                </div>

                <div className="form-actions-password">
                    <PrimaryButton 
                        disabled={processing} 
                        className="btn-save-password"
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
                        <p className="save-success-password">
                            تم الحفظ بنجاح
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
