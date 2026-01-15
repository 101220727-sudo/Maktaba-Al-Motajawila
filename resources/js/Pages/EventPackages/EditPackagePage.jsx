// // import React, { useState } from 'react';
// // import { Head, useForm } from '@inertiajs/react';

// // export default function EditPackagePage({ package: pkg }) {
// //     const { data, setData, put, processing, errors } = useForm({
// //         package_title: pkg.package_title || '',
// //         description: pkg.description || '',
// //         main_image: pkg.main_image || '',
// //     });

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         put(route('packages.update', pkg.id));
// //     };

// //     return (
// //         <>
// //             <Head title="Edit Package" />
// //             <div className="container mx-auto p-6">
// //                 <h1 className="text-3xl font-bold mb-6">Edit Package</h1>
// //                 <form onSubmit={handleSubmit} className="space-y-4">
// //                     <div>
// //                         <label className="block font-semibold mb-1">Title</label>
// //                         <input
// //                             type="text"
// //                             value={data.package_title}
// //                             onChange={(e) => setData('package_title', e.target.value)}
// //                             className="border p-2 w-full rounded"
// //                         />
// //                         {errors.package_title && (
// //                             <p className="text-red-500 text-sm mt-1">{errors.package_title}</p>
// //                         )}
// //                     </div>

// //                     <div>
// //                         <label className="block font-semibold mb-1">Description</label>
// //                         <textarea
// //                             value={data.description}
// //                             onChange={(e) => setData('description', e.target.value)}
// //                             className="border p-2 w-full rounded"
// //                         />
// //                         {errors.description && (
// //                             <p className="text-red-500 text-sm mt-1">{errors.description}</p>
// //                         )}
// //                     </div>

// //                     <div>
// //                         <label className="block font-semibold mb-1">Main Image URL</label>
// //                         <input
// //                             type="text"
// //                             value={data.main_image}
// //                             onChange={(e) => setData('main_image', e.target.value)}
// //                             className="border p-2 w-full rounded"
// //                         />
// //                         {errors.main_image && (
// //                             <p className="text-red-500 text-sm mt-1">{errors.main_image}</p>
// //                         )}
// //                     </div>

// //                     <button
// //                         type="submit"
// //                         disabled={processing}
// //                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //                     >
// //                         {processing ? 'Updating...' : 'Update Package'}
// //                     </button>
// //                 </form>
// //             </div>
// //         </>
// //     );
// // }


// import React from 'react';
// import { Head, useForm } from '@inertiajs/react';

// export default function EditPackagePage({ package: pkg, activities }) {
//     const { data, setData, put, processing, errors } = useForm({
//         package_title: pkg.package_title || '',
//         description: pkg.description || '',
//         main_image: pkg.main_image || '',
//         total_price: pkg.total_price || '',
//         event_time: pkg.event_time || '',
//         activity_id: pkg.activity_id || '',
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         put(route('packages.update', pkg.id));
//     };

//     return (
//         <>
//             <Head title="Edit Package" />
//             <div className="container mx-auto p-6">
//                 <h1 className="text-3xl font-bold mb-6">Edit Package</h1>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {/* Title */}
//                     <div>
//                         <label className="block font-semibold mb-1">Title</label>
//                         <input
//                             type="text"
//                             value={data.package_title}
//                             onChange={(e) => setData('package_title', e.target.value)}
//                             className="border p-2 w-full rounded"
//                         />
//                         {errors.package_title && (
//                             <p className="text-red-500 text-sm mt-1">{errors.package_title}</p>
//                         )}
//                     </div>

//                     {/* Description */}
//                     <div>
//                         <label className="block font-semibold mb-1">Description</label>
//                         <textarea
//                             value={data.description}
//                             onChange={(e) => setData('description', e.target.value)}
//                             className="border p-2 w-full rounded"
//                         />
//                         {errors.description && (
//                             <p className="text-red-500 text-sm mt-1">{errors.description}</p>
//                         )}
//                     </div>

//                     {/* Main Image */}
//                     <div>
//                         <label className="block font-semibold mb-1">Main Image URL</label>
//                         <input
//                             type="text"
//                             value={data.main_image}
//                             onChange={(e) => setData('main_image', e.target.value)}
//                             className="border p-2 w-full rounded"
//                         />
//                         {errors.main_image && (
//                             <p className="text-red-500 text-sm mt-1">{errors.main_image}</p>
//                         )}
//                     </div>

//                     {/* Total Price */}
//                     <div>
//                         <label className="block font-semibold mb-1">Total Price</label>
//                         <input
//                             type="number"
//                             value={data.total_price}
//                             onChange={(e) => setData('total_price', e.target.value)}
//                             className="border p-2 w-full rounded"
//                         />
//                         {errors.total_price && (
//                             <p className="text-red-500 text-sm mt-1">{errors.total_price}</p>
//                         )}
//                     </div>

//                     {/* Event Time */}
//                     <div>
//                         <label className="block font-semibold mb-1">Event Time</label>
//                         <input
//                             type="datetime-local"
//                             value={data.event_time}
//                             onChange={(e) => setData('event_time', e.target.value)}
//                             className="border p-2 w-full rounded"
//                         />
//                         {errors.event_time && (
//                             <p className="text-red-500 text-sm mt-1">{errors.event_time}</p>
//                         )}
//                     </div>

//                     {/* Activity */}
//     <div>
//         <label className="block font-semibold mb-1">Activity</label>
//         <select
//             value={data.activity_id}
//             onChange={(e) => setData('activity_id', e.target.value)}
//             className="border p-2 w-full rounded"
//         >
//             <option value="">Select Activity</option>
//             {activities.map((activity) => (
//                 <option key={activity.id} value={activity.id}>
//                     {activity.name}
//                 </option>
//             ))}
//         </select>
//         {errors.activity_id && (
//             <p className="text-red-500 text-sm mt-1">{errors.activity_id}</p>
//         )}
//     </div>


//                     {/* Submit */}
//                     <button
//                         type="submit"
//                         disabled={processing}
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     >
//                         {processing ? 'Updating...' : 'Update Package'}
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// }


import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function EditPackagePage({ package: pkg, activities }) {
    const { data, setData, put, processing, errors } = useForm({
        package_title: pkg.package_title || '',
        description: pkg.description || '',
        main_image: pkg.main_image || '',
        total_price: pkg.total_price || '',
        event_time: pkg.event_time || '',
        activity_ids: pkg.activity_ids || [], // ✅ ARRAY
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('packages.update', pkg.id));
    };

    return (
        <>
            <Head title="Edit Package" />

            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Edit Package</h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Package Title */}
                    <div>
                        <label className="block font-semibold mb-1">Title</label>
                        <input
                            type="text"
                            value={data.package_title}
                            onChange={e => setData('package_title', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.package_title && (
                            <p className="text-red-500 text-sm">{errors.package_title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-semibold mb-1">Description</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description}</p>
                        )}
                    </div>

                    {/* Main Image */}
                    <div>
                        <label className="block font-semibold mb-1">Main Image URL</label>
                        <input
                            type="text"
                            value={data.main_image}
                            onChange={e => setData('main_image', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.main_image && (
                            <p className="text-red-500 text-sm">{errors.main_image}</p>
                        )}
                    </div>

                    {/* Total Price */}
                    <div>
                        <label className="block font-semibold mb-1">Total Price</label>
                        <input
                            type="number"
                            value={data.total_price}
                            onChange={e => setData('total_price', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.total_price && (
                            <p className="text-red-500 text-sm">{errors.total_price}</p>
                        )}
                    </div>

                    {/* Event Time */}
                    <div>
                        <label className="block font-semibold mb-1">Event Time</label>
                        <input
                            type="datetime-local"
                            value={data.event_time}
                            onChange={e => setData('event_time', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.event_time && (
                            <p className="text-red-500 text-sm">{errors.event_time}</p>
                        )}
                    </div>

                    {/* Activities (MULTIPLE) */}
                    <div>
                        <label className="block font-semibold mb-1">Activities</label>
                        <select
                            multiple
                            value={data.activity_ids}
                            onChange={(e) => {
                                const selected = Array.from(
                                    e.target.selectedOptions,
                                    option => Number(option.value)
                                );
                                setData('activity_ids', selected);
                            }}
                            className="border p-2 w-full rounded h-32"
                        >
                            {activities.map(activity => (
                                <option key={activity.id} value={activity.id}>
                                    {activity.name}
                                </option>
                            ))}
                        </select>

                        {errors.activity_ids && (
                            <p className="text-red-500 text-sm">{errors.activity_ids}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {processing ? 'Updating...' : 'Update Package'}
                    </button>
                </form>
            </div>
        </>
    );
}
