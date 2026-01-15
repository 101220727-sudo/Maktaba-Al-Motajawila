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
                .delete-section-header {
                    margin-bottom: 1.5rem;
                }

                .delete-section-title {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #76499C;
                    margin-bottom: 0.5rem;
                }

                .delete-section-desc {
                    font-size: 0.95rem;
                    color: #666;
                    line-height: 1.6;
                }

                .btn-delete-account {
                    background-color: #c62828;
                    color: white;
                    padding: 0.7rem 1.5rem;
                    border-radius: 999px;
                    border: none;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    margin-top: 1rem;
                }

                .btn-delete-account:hover {
                    background-color: #a01515;
                }

                .modal-header-delete {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #76499C;
                    margin-bottom: 0.5rem;
                }

                .modal-desc-delete {
                    font-size: 0.95rem;
                    color: #666;
                    line-height: 1.6;
                    margin-top: 0.5rem;
                }

                .modal-form-group {
                    margin-top: 1.5rem;
                }

                .modal-input-delete {
                    padding: 0.75rem 1rem;
                    border: 2px solid #e0e0e0;
                    border-radius: 0.7rem;
                    font-size: 1rem;
                    transition: border-color 0.3s;
                    font-family: inherit;
                    width: 75%;
                    margin-top: 0.5rem;
                }

                .modal-input-delete:focus {
                    outline: none;
                    border-color: #4ABC9D;
                }

                .modal-actions-delete {
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.75rem;
                    margin-top: 1.5rem;
                }

                .btn-cancel-delete {
                    background-color: #f0f0f0;
                    color: #333;
                    padding: 0.7rem 1.5rem;
                    border-radius: 999px;
                    border: none;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .btn-cancel-delete:hover {
                    background-color: #e0e0e0;
                }

                .btn-confirm-delete {
                    background-color: #c62828;
                    color: white;
                    padding: 0.7rem 1.5rem;
                    border-radius: 999px;
                    border: none;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    margin-right: 0.75rem;
                }

                .btn-confirm-delete:hover:not(:disabled) {
                    background-color: #a01515;
                }

                .btn-confirm-delete:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
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
                            className="mt-2"
                        />
                    </div>

                    <div className="modal-actions-delete">
                        <SecondaryButton onClick={closeModal} className="btn-cancel-delete">
                            إلغاء
                        </SecondaryButton>

                        <DangerButton className="btn-confirm-delete" disabled={processing}>
                            حذف الحساب
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}