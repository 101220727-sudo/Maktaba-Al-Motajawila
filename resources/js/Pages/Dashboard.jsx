import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const user = auth?.user; // get logged-in user
    const role = user?.role?.name;

    // Role checks
    const isRegisteredUser = role === 'registered_user';
    const isAdminNews = role === 'admin_news';
    const isAdminEvents = role === 'admin_events';

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <p className="mb-6">You're logged in!</p>

                            {/* Dashboard actions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                {/* News - visible for registered_user */}
                                {(isRegisteredUser || isAdminNews) && (
                                    <Link
                                        href={route('news')}
                                        className="block p-6 bg-blue-500 text-white rounded-lg
                                                   transition transform hover:scale-105 hover:bg-blue-600"
                                    >
                                        <h3 className="text-xl font-semibold mb-2">News</h3>
                                        <p>View latest news and updates</p>
                                    </Link>
                                )}

                                {/* Add News - only for admin_news */}
                                {isAdminNews && (
                                    <Link
                                        href={route('news.add')}
                                        className="block p-6 bg-yellow-500 text-white rounded-lg
                                                   transition transform hover:scale-105 hover:bg-yellow-600"
                                    >
                                        <h3 className="text-xl font-semibold mb-2">Add News</h3>
                                        <p>Create a new news post</p>
                                    </Link>
                                )}

                                {/* Request an Event - only for registered_user */}
                                {isRegisteredUser && (
                                    <Link
                                        href={route('event.request')}
                                        className="block p-6 bg-green-500 text-white rounded-lg
                                                   transition transform hover:scale-105 hover:bg-green-600"
                                    >
                                        <h3 className="text-xl font-semibold mb-2">Request an Event</h3>
                                        <p>Submit your event request</p>
                                    </Link>
                                )}

                                {/* Event Packages - for registered_user or admin_events */}
                                {(isRegisteredUser || isAdminEvents) && (
                                    <Link
                                        href={route('event.packages')}
                                        className="block p-6 bg-purple-500 text-white rounded-lg
                                                   transition transform hover:scale-105 hover:bg-purple-600"
                                    >
                                        <h3 className="text-xl font-semibold mb-2">Event Packages</h3>
                                        <p>View all available event packages</p>
                                    </Link>
                                )}


                                {isAdminEvents && (
    <Link
        href={route('events.receive')}
        className="block p-6 bg-indigo-500 text-white rounded-lg
                   transition transform hover:scale-105 hover:bg-indigo-600"
    >
        <h3 className="text-xl font-semibold mb-2">Receive Events</h3>
        <p>Accept or reject event requests</p>
    </Link>
)}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}



