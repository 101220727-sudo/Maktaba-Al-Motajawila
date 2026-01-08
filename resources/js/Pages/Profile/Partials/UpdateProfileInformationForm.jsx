// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import { Transition } from '@headlessui/react';
// import { Link, useForm, usePage } from '@inertiajs/react';

// export default function UpdateProfileInformation({
//     mustVerifyEmail,
//     status,
//     className = '',
// }) {
//     const user = usePage().props.auth.user;

//     const { data, setData, patch, errors, processing, recentlySuccessful } =
//         useForm({
//             name: user.name,
//             email: user.email,
//         });

//     const submit = (e) => {
//         e.preventDefault();

//         patch(route('profile.update'));
//     };

//     return (
//         <section className={className}>
//             <header>
//                 <h2 className="text-lg font-medium text-gray-900">
//                     Profile Information
//                 </h2>

//                 <p className="mt-1 text-sm text-gray-600">
//                     Update your account's profile information and email address.
//                 </p>
//             </header>

//             <form onSubmit={submit} className="mt-6 space-y-6">
//                 <div>
//                     <InputLabel htmlFor="name" value="Name" />

//                     <TextInput
//                         id="name"
//                         className="mt-1 block w-full"
//                         value={data.name}
//                         onChange={(e) => setData('name', e.target.value)}
//                         required
//                         isFocused
//                         autoComplete="name"
//                     />

//                     <InputError className="mt-2" message={errors.name} />
//                 </div>

//                 <div>
//                     <InputLabel htmlFor="email" value="Email" />

//                     <TextInput
//                         id="email"
//                         type="email"
//                         className="mt-1 block w-full"
//                         value={data.email}
//                         onChange={(e) => setData('email', e.target.value)}
//                         required
//                         autoComplete="username"
//                     />

//                     <InputError className="mt-2" message={errors.email} />
//                 </div>

//                 {mustVerifyEmail && user.email_verified_at === null && (
//                     <div>
//                         <p className="mt-2 text-sm text-gray-800">
//                             Your email address is unverified.
//                             <Link
//                                 href={route('verification.send')}
//                                 method="post"
//                                 as="button"
//                                 className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                             >
//                                 Click here to re-send the verification email.
//                             </Link>
//                         </p>

//                         {status === 'verification-link-sent' && (
//                             <div className="mt-2 text-sm font-medium text-green-600">
//                                 A new verification link has been sent to your
//                                 email address.
//                             </div>
//                         )}
//                     </div>
//                 )}

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
                .profile-section-header {
                    margin-bottom: 1.5rem;
                }

                .profile-section-title {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #76499C;
                    margin-bottom: 0.5rem;
                }

                .profile-section-desc {
                    font-size: 0.95rem;
                    color: #666;
                    line-height: 1.6;
                }

                .profile-form {
                    margin-top: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .form-group-profile {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .form-label-profile {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #333;
                }

                .form-input-profile {
                    padding: 0.75rem 1rem;
                    border: 2px solid #e0e0e0;
                    border-radius: 0.7rem;
                    font-size: 1rem;
                    transition: border-color 0.3s;
                    font-family: inherit;
                    width: 100%;
                }

                .form-input-profile:focus {
                    outline: none;
                    border-color: #4ABC9D;
                }

                .verification-notice {
                    background-color: #fff3cd;
                    border: 1px solid #ffc107;
                    border-radius: 0.7rem;
                    padding: 1rem;
                    margin-top: 0.5rem;
                }

                .verification-text {
                    font-size: 0.95rem;
                    color: #856404;
                }

                .verification-link {
                    color: #856404;
                    text-decoration: underline;
                    margin-right: 0.5rem;
                    font-size: 0.95rem;
                    border-radius: 0.5rem;
                }

                .verification-link:hover {
                    color: #533f03;
                }

                .verification-sent {
                    margin-top: 0.75rem;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #155724;
                }

                .form-actions-profile {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-top: 0.5rem;
                }

                .btn-save-profile {
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

                .btn-save-profile:hover:not(:disabled) {
                    opacity: 0.9;
                }

                .btn-save-profile:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .save-success-text {
                    color: #4ABC9D;
                    font-size: 0.95rem;
                    font-weight: 600;
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
                <div className="form-group-profile">
                    <InputLabel htmlFor="name" value="الاسم" className="form-label-profile" />

                    <TextInput
                        id="name"
                        className="form-input-profile"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="form-group-profile">
                    <InputLabel htmlFor="email" value="البريد الإلكتروني" className="form-label-profile" />

                    <TextInput
                        id="email"
                        type="email"
                        className="form-input-profile"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
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
                                اضغط هنا لإعادة إرسال رسالة التفعيل.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="verification-sent">
                                تم إرسال رابط التفعيل الجديد إلى بريدك الإلكتروني.
                            </div>
                        )}
                    </div>
                )}

                <div className="form-actions-profile">
                    <PrimaryButton disabled={processing} className="btn-save-profile">
                        حفظ
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="save-success-text">
                            تم الحفظ بنجاح.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}