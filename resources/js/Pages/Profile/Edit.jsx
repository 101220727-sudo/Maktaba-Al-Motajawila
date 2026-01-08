// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';
// import DeleteUserForm from './Partials/DeleteUserForm';
// import UpdatePasswordForm from './Partials/UpdatePasswordForm';
// import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

// export default function Edit({ mustVerifyEmail, status }) {
//     return (
//         <AuthenticatedLayout
//             header={
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800">
//                     Profile
//                 </h2>
//             }
//         >
//             <Head title="Profile" />

//             <div className="py-12">
//                 <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
//                     <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
//                         <UpdateProfileInformationForm
//                             mustVerifyEmail={mustVerifyEmail}
//                             status={status}
//                             className="max-w-xl"
//                         />
//                     </div>

//                     <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
//                         <UpdatePasswordForm className="max-w-xl" />
//                     </div>

//                     <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
//                         <DeleteUserForm className="max-w-xl" />
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }



import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
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
            <Head title="Profile" />

            <style>{`
                * {
                    direction: rtl;
                    text-align: right;
                }

                .profile-page-title {
                    font-size: 1.7rem;
                    font-weight: 700;
                    color: #76499C;
                    text-align: right;
                }

                .profile-container {
                    padding: 2.5rem 0;
                    direction: rtl;
                }

                .profile-container-inner {
                    margin: 0 auto;
                    max-width: 1100px;
                    width: 90%;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    direction: rtl;
                }

                .profile-card {
                    background-color: #fff;
                    padding: 2rem;
                    border-radius: 1rem;
                    box-shadow: 0 6px 18px rgba(0,0,0,0.04);
                    direction: rtl;
                    text-align: right;
                }

                /* Hide any dashboard navigation or logo elements */
                nav[aria-label="Breadcrumb"],
                .dashboard-nav,
                .sidebar,
                .app-logo {
                    display: none !important;
                }

                @media (max-width: 768px) {
                    .profile-container-inner {
                        width: 95%;
                    }

                    .profile-card {
                        padding: 1.5rem;
                    }
                }
            `}</style>

            <div className="profile-container">
                <div className="profile-container-inner">
                    <div className="profile-card">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
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