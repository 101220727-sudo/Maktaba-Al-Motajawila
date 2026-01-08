// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import { Transition } from '@headlessui/react';
// import { useForm } from '@inertiajs/react';
// import { useRef } from 'react';

// export default function UpdatePasswordForm({ className = '' }) {
//     const passwordInput = useRef();
//     const currentPasswordInput = useRef();

//     const {
//         data,
//         setData,
//         errors,
//         put,
//         reset,
//         processing,
//         recentlySuccessful,
//     } = useForm({
//         current_password: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const updatePassword = (e) => {
//         e.preventDefault();

//         put(route('password.update'), {
//             preserveScroll: true,
//             onSuccess: () => reset(),
//             onError: (errors) => {
//                 if (errors.password) {
//                     reset('password', 'password_confirmation');
//                     passwordInput.current.focus();
//                 }

//                 if (errors.current_password) {
//                     reset('current_password');
//                     currentPasswordInput.current.focus();
//                 }
//             },
//         });
//     };

//     return (
//         <section className={className}>
//             <header>
//                 <h2 className="text-lg font-medium text-gray-900">
//                     Update Password
//                 </h2>

//                 <p className="mt-1 text-sm text-gray-600">
//                     Ensure your account is using a long, random password to stay
//                     secure.
//                 </p>
//             </header>

//             <form onSubmit={updatePassword} className="mt-6 space-y-6">
//                 <div>
//                     <InputLabel
//                         htmlFor="current_password"
//                         value="Current Password"
//                     />

//                     <TextInput
//                         id="current_password"
//                         ref={currentPasswordInput}
//                         value={data.current_password}
//                         onChange={(e) =>
//                             setData('current_password', e.target.value)
//                         }
//                         type="password"
//                         className="mt-1 block w-full"
//                         autoComplete="current-password"
//                     />

//                     <InputError
//                         message={errors.current_password}
//                         className="mt-2"
//                     />
//                 </div>

//                 <div>
//                     <InputLabel htmlFor="password" value="New Password" />

//                     <TextInput
//                         id="password"
//                         ref={passwordInput}
//                         value={data.password}
//                         onChange={(e) => setData('password', e.target.value)}
//                         type="password"
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                     />

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div>
//                     <InputLabel
//                         htmlFor="password_confirmation"
//                         value="Confirm Password"
//                     />

//                     <TextInput
//                         id="password_confirmation"
//                         value={data.password_confirmation}
//                         onChange={(e) =>
//                             setData('password_confirmation', e.target.value)
//                         }
//                         type="password"
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                     />

//                     <InputError
//                         message={errors.password_confirmation}
//                         className="mt-2"
//                     />
//                 </div>

//                 <div className="flex items-center gap-4">
//                     <PrimaryButton disabled={processing}>Save</PrimaryButton>

//                     <Transition
//                         show={recentlySuccessful}
//                         enter="transition ease-in-out"
//                         enterFrom="opacity-0"
//                         leave="transition ease-in-out"
//                         leaveTo="opacity-0"
//                     >
//                         <p className="text-sm text-gray-600">
//                             Saved.
//                         </p>
//                     </Transition>
//                 </div>
//             </form>
//         </section>
//     );
// }




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
                .password-section-header {
                    margin-bottom: 1.5rem;
                }

                .password-section-title {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #76499C;
                    margin-bottom: 0.5rem;
                }

                .password-section-desc {
                    font-size: 0.95rem;
                    color: #666;
                    line-height: 1.6;
                }

                .password-form {
                    margin-top: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .form-group-password {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .form-label-password {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #333;
                }

                .form-input-password {
                    padding: 0.75rem 1rem;
                    border: 2px solid #e0e0e0;
                    border-radius: 0.7rem;
                    font-size: 1rem;
                    transition: border-color 0.3s;
                    font-family: inherit;
                    width: 100%;
                }

                .form-input-password:focus {
                    outline: none;
                    border-color: #4ABC9D;
                }

                .form-actions-password {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-top: 0.5rem;
                }

                .btn-save-password {
                    background-color: #76499C;
                    color: white;
                    padding: 0.7rem 1.5rem;
                    border-radius: 999px;
                    border: none;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: opacity 0.3s;
                }

                .btn-save-password:hover:not(:disabled) {
                    opacity: 0.9;
                }

                .btn-save-password:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .save-success-password {
                    color: #4ABC9D;
                    font-size: 0.95rem;
                    font-weight: 600;
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
                <div className="form-group-password">
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
                        className="mt-2"
                    />
                </div>

                <div className="form-group-password">
                    <InputLabel htmlFor="password" value="كلمة المرور الجديدة" className="form-label-password" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="form-input-password"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="form-group-password">
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
                        className="mt-2"
                    />
                </div>

                <div className="form-actions-password">
                    <PrimaryButton disabled={processing} className="btn-save-password">
                        حفظ
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="save-success-password">
                            تم الحفظ.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}