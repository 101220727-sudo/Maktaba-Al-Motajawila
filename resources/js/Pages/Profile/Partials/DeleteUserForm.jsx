import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <style>{`
                :root {
                    --color-primary: #76499C;
                    --color-primary-soft: #A189B7;
                    --color-primary-light: #E8DFF5;
                    --color-teal: #4ABC9D;
                    --color-teal-light: #E0F7F2;
                    --color-red: #c62828;
                    --color-red-dark: #a01515;
                    --color-red-light: #ffebee;
                    --color-bg: #F9F7FB;
                    --color-text: #222222;
                    --color-text-light: #555555;
                    --shadow-sm: 0 2px 8px rgba(198, 40, 40, 0.1);
                    --shadow-md: 0 8px 24px rgba(198, 40, 40, 0.15);
                    --shadow-lg: 0 16px 48px rgba(198, 40, 40, 0.2);
                    --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .delete-section-header {
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

                .delete-section-title {
                    font-size: 1.8rem;
                    font-weight: 900;
                    color: var(--color-red);
                    margin-bottom: 0.8rem;
                    position: relative;
                    display: inline-block;
                    padding-bottom: 0.5rem;
                }

                .delete-section-title::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 60%;
                    height: 4px;
                    background: linear-gradient(90deg, var(--color-red), transparent);
                    border-radius: 2px;
                }

                .delete-section-title::before {
                    content: '⚠️';
                    margin-left: 0.7rem;
                    font-size: 1.7rem;
                }

                .delete-section-desc {
                    font-size: 1.05rem;
                    color: var(--color-text-light);
                    line-height: 1.8;
                    max-width: 700px;
                    padding: 1.2rem 1.5rem;
                    background: var(--color-red-light);
                    border-radius: 12px;
                    border-right: 3px solid var(--color-red);
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                }

                .delete-section-desc::before {
                    content: '🛑';
                    font-size: 1.5rem;
                    flex-shrink: 0;
                }

                .btn-delete-account {
                    background: linear-gradient(135deg, var(--color-red), var(--color-red-dark));
                    color: white;
                    padding: 0.9rem 2rem;
                    border-radius: 50px;
                    border: none;
                    font-size: 1.05rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: var(--transition);
                    margin-top: 1.5rem;
                    box-shadow: var(--shadow-sm);
                    position: relative;
                    overflow: hidden;
                    letter-spacing: 0.3px;
                }

                .btn-delete-account::before {
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

                .btn-delete-account:hover::before {
                    width: 400px;
                    height: 400px;
                }

                .btn-delete-account:hover {
                    transform: translateY(-3px);
                    box-shadow: var(--shadow-md);
                }

                .modal-header-delete {
                    font-size: 1.6rem;
                    font-weight: 900;
                    color: var(--color-red);
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                }

                .modal-header-delete::before {
                    content: '⚠️';
                    font-size: 1.8rem;
                }

                .modal-desc-delete {
                    font-size: 1.05rem;
                    color: var(--color-text-light);
                    line-height: 1.8;
                    margin-top: 1rem;
                    padding: 1.2rem;
                    background: var(--color-red-light);
                    border-radius: 12px;
                    border-right: 3px solid var(--color-red);
                }

                .modal-form-group {
                    margin-top: 2rem;
                }

                .modal-input-delete {
                    padding: 0.9rem 1.2rem;
                    border: 2px solid rgba(198, 40, 40, 0.3);
                    border-radius: 12px;
                    font-size: 1rem;
                    background: linear-gradient(135deg, #fff8f8 0%, #fff 100%);
                    transition: var(--transition);
                    font-family: inherit;
                    width: 100%;
                    margin-top: 0.8rem;
                }

                .modal-input-delete:focus {
                    outline: none;
                    border-color: var(--color-red);
                    box-shadow: 0 0 0 4px rgba(198, 40, 40, 0.12);
                    background: white;
                    transform: translateY(-2px);
                }

                .modal-input-delete::placeholder {
                    color: #aaa;
                }

                .modal-actions-delete {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 2rem;
                }

                .btn-cancel-delete {
                    background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
                    color: var(--color-text);
                    padding: 0.8rem 1.8rem;
                    border-radius: 50px;
                    border: none;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: var(--transition);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                }

                .btn-cancel-delete:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
                }

                .btn-confirm-delete {
                    background: linear-gradient(135deg, var(--color-red), var(--color-red-dark));
                    color: white;
                    padding: 0.8rem 1.8rem;
                    border-radius: 50px;
                    border: none;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: var(--transition);
                    box-shadow: var(--shadow-sm);
                    position: relative;
                    overflow: hidden;
                }

                .btn-confirm-delete::before {
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

                .btn-confirm-delete:hover::before {
                    width: 400px;
                    height: 400px;
                }

                .btn-confirm-delete:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: var(--shadow-md);
                }

                .btn-confirm-delete:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                .error-message-delete {
                    color: var(--color-red);
                    font-size: 0.88rem;
                    margin-top: 0.5rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .error-message-delete::before {
                    content: '⚠️';
                    font-size: 0.9rem;
                }

                .sr-only-delete {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0,0,0,0);
                    border: 0;
                }

                @media (max-width: 768px) {
                    .delete-section-title {
                        font-size: 1.5rem;
                    }

                    .delete-section-desc {
                        font-size: 0.95rem;
                        padding: 1rem 1.2rem;
                    }

                    .modal-header-delete {
                        font-size: 1.3rem;
                    }

                    .modal-actions-delete {
                        flex-direction: column-reverse;
                    }

                    .btn-cancel-delete,
                    .btn-confirm-delete {
                        width: 100%;
                        text-align: center;
                    }
                }

                @media (max-width: 480px) {
                    .delete-section-title {
                        font-size: 1.3rem;
                    }

                    .modal-header-delete {
                        font-size: 1.2rem;
                    }

                    .btn-delete-account {
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

            <header className="delete-section-header">
                <h2 className="delete-section-title">
                    حذف الحساب
                </h2>

                <p className="delete-section-desc">
                    بمجرد حذف حسابك، سيتم حذف جميع موارده وبياناته نهائيًا. قبل حذف حسابك، يرجى تنزيل أي بيانات أو معلومات ترغب في الاحتفاظ بها.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion} className="btn-delete-account">
                حذف الحساب
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="modal-header-delete">
                        هل أنت متأكد من حذف حسابك؟
                    </h2>

                    <p className="modal-desc-delete">
                        بمجرد حذف حسابك، سيتم حذف جميع موارده وبياناته نهائيًا. يرجى إدخال كلمة المرور لتأكيد رغبتك في حذف حسابك نهائيًا.
                    </p>

                    <div className="modal-form-group">
                        <InputLabel
                            htmlFor="password"
                            value="كلمة المرور"
                            className="sr-only-delete"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="modal-input-delete"
                            isFocused
                            placeholder="كلمة المرور"
                        />

                        <InputError
                            message={errors.password}
                            className="error-message-delete"
                        />
                    </div>

                    <div className="modal-actions-delete">
                        <SecondaryButton onClick={closeModal} className="btn-cancel-delete">
                            إلغاء
                        </SecondaryButton>

                        <DangerButton className="btn-confirm-delete" disabled={processing}>
                            {processing ? 'جارٍ الحذف...' : 'حذف الحساب'}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
