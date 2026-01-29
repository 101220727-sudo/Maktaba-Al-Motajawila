import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EventRequestsForm from '@/Pages/Profile/Partials/EventRequestsForm';

export default function MyEventRequests({ auth, eventRequests = [] }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">طلبات الفعاليات الخاصة بي</h2>}
        >
            <Head title="طلبات الفعاليات" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <EventRequestsForm eventRequests={eventRequests} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}