// //hay truest version
// import React from 'react';
// import { Head, Link, useForm } from '@inertiajs/react';

// export default function AddPackagePage({ activities, auth }) {
// // const { data, setData, post, processing, errors } = useForm({
// //     package_title: '',
// //     description: '',
// //     main_image: '',
// // });
//     const { data, setData, post, processing, errors } = useForm({
//         package_title: '',
//         description: '',
//         main_image: '',
//         total_price: '',
//         event_time: '',
//     });

// const handleSubmit = (e) => {
//     e.preventDefault();
//     post(route('packages.store'));
// };


//     return (
//         <>
//             <Head title="Add New Package" />
//             <div className="container mx-auto p-6">
//                 <h1 className="text-3xl font-bold mb-6">Add New Package</h1>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block font-semibold mb-1">Package Title</label>
//                         <input
//                             type="text"
//                             value={data.package_title}
//                             onChange={e => setData('package_title', e.target.value)}
//                             className="border p-2 w-full rounded"
//                         />
//                         {errors.package_title && <div className="text-red-500">{errors.package_title}</div>}
//                     </div>

//                     <div>
//                         <label className="block font-semibold mb-1">Description</label>
//                         <textarea
//                             value={data.description}
//                             onChange={e => setData('description', e.target.value)}
//                             className="border p-2 w-full rounded"
//                         />
//                         {errors.description && <div className="text-red-500">{errors.description}</div>}
//                     </div>

//                     <div>
//                         <label className="block font-semibold mb-1">Main Image URL</label>
//                         <input
//                             type="text"
//                             value={data.main_image}
//                             onChange={e => setData('main_image', e.target.value)}
//                             className="border p-2 w-full rounded"
//                         />
//                         {errors.main_image && <div className="text-red-500">{errors.main_image}</div>}
//                     </div>

                    
//                      <div>
//                          <label className="block font-semibold mb-1">Total Price</label>
//                          <input
//                             type="number"
//                             step="0.01"
//                             value={data.total_price}
//                             onChange={e => setData('total_price', e.target.value)}
//                             className="border p-2 w-full rounded"
//                         />
//                         {errors.total_price && <div className="text-red-500">{errors.total_price}</div>}
//                     </div>

//                     <div>
//                         <label className="block font-semibold mb-1">Event Time</label>
//                         <input
//                             type="time"
//                             value={data.event_time}
//                             onChange={e => setData('event_time', e.target.value)}
//                             className="border p-2 w-full rounded"
//                         />
//                         {errors.event_time && <div className="text-red-500">{errors.event_time}</div>}
//                     </div>

// {/* <div>
//     <label className="block font-semibold mb-1">Activity</label>
//     <select
//         value={data.activity_id || ''} // default to empty string
//         onChange={e => setData('activity_id', Number(e.target.value))} // convert to number
//         className="border p-2 w-full rounded"
//     >
//         <option value="">Select Activity</option>
//         {activities && activities.length > 0
//             ? activities.map(activity => (
//                 <option key={activity.id} value={activity.id}>
//                     {activity.name}
//                 </option>
//             ))
//             : <option value="" disabled>لا توجد أنشطة</option> // fallback if empty
//         }
//     </select>
//     {errors.activity_id && <div className="text-red-500">{errors.activity_id}</div>}
// </div> */}

// <div>
//     <label className="block font-semibold mb-1">Activities</label>
//     <select
//         multiple // allow selecting multiple options
//         value={data.activity_ids || []} // bind to array
//         onChange={e => {
//             // get all selected options as numbers
//             const selected = Array.from(e.target.selectedOptions, option => Number(option.value));
//             setData('activity_ids', selected);
//         }}
//         className="border p-2 w-full rounded h-32" // height for multiple
//     >
//         {activities && activities.length > 0 ? (
//             activities.map(activity => (
//                 <option key={activity.id} value={activity.id}>
//                     {activity.name}
//                 </option>
//             ))
//         ) : (
//             <option value="" disabled>لا توجد أنشطة</option>
//         )}
//     </select>
//     {errors.activity_ids && (
//         <div className="text-red-500 text-sm mt-1">{errors.activity_ids}</div>
//     )}
// </div>



//                     <button
//                         type="submit"
//                         disabled={processing}
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     >
//                         {processing ? 'Saving...' : 'Add Package'}
//                     </button>
//                 </form>

//                 <Link
//                     href={route('event.packages')}
//                     className="inline-block mt-4 text-blue-600 hover:underline"
//                 >
//                     Back to Packages
//                 </Link>
//             </div>
//         </>
//     );
// }



// // import React from 'react'; 
// // import { Head, Link, useForm } from '@inertiajs/react';

// // export default function AddPackagePage({ activities }) {
// //     // Added new fields: total_price, event_time, activity_id
// //     const { data, setData, post, processing, errors } = useForm({
// //         package_title: '',
// //         description: '',
// //         main_image: '',
// //         total_price: '',
// //         event_time: '',
// //         activity_id: '',
// //     });

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         post(route('packages.store'));
// //     };

// //     return (
// //         <>
// //             <Head title="Add New Package" />
// //             <div className="container mx-auto p-6">
// //                 <h1 className="text-3xl font-bold mb-6">Add New Package</h1>
// //                 <form onSubmit={handleSubmit} className="space-y-4">
// //                     <div>
// //                         <label className="block font-semibold mb-1">Package Title</label>
// //                         <input
// //                             type="text"
// //                             value={data.package_title}
// //                             onChange={e => setData('package_title', e.target.value)}
// //                             className="border p-2 w-full rounded"
// //                         />
// //                         {errors.package_title && <div className="text-red-500">{errors.package_title}</div>}
// //                     </div>

// //                     <div>
// //                         <label className="block font-semibold mb-1">Description</label>
// //                         <textarea
// //                             value={data.description}
// //                             onChange={e => setData('description', e.target.value)}
// //                             className="border p-2 w-full rounded"
// //                         />
// //                         {errors.description && <div className="text-red-500">{errors.description}</div>}
// //                     </div>

// //                     <div>
// //                         <label className="block font-semibold mb-1">Main Image URL</label>
// //                         <input
// //                             type="text"
// //                             value={data.main_image}
// //                             onChange={e => setData('main_image', e.target.value)}
// //                             className="border p-2 w-full rounded"
// //                         />
// //                         {errors.main_image && <div className="text-red-500">{errors.main_image}</div>}
// //                     </div>

// //                     <div>
// //                         <label className="block font-semibold mb-1">Total Price</label>
// //                         <input
// //                             type="number"
// //                             step="0.01"
// //                             value={data.total_price}
// //                             onChange={e => setData('total_price', e.target.value)}
// //                             className="border p-2 w-full rounded"
// //                         />
// //                         {errors.total_price && <div className="text-red-500">{errors.total_price}</div>}
// //                     </div>

// //                     <div>
// //                         <label className="block font-semibold mb-1">Event Time</label>
// //                         <input
// //                             type="time"
// //                             value={data.event_time}
// //                             onChange={e => setData('event_time', e.target.value)}
// //                             className="border p-2 w-full rounded"
// //                         />
// //                         {errors.event_time && <div className="text-red-500">{errors.event_time}</div>}
// //                     </div>

//                     // <div>
//                     //     <label className="block font-semibold mb-1">Activity</label>
//                     //     <select
//                     //         value={data.activity_id}
//                     //         onChange={e => setData('activity_id', e.target.value)}
//                     //         className="border p-2 w-full rounded"
//                     //     >
//                     //         <option value="">Select Activity</option>
//                     //         {activities.map(activity => (
//                     //             <option key={activity.id} value={activity.id}>
//                     //                 {activity.name}
//                     //             </option>
//                     //         ))}
//                     //     </select>
//                     //     {errors.activity_id && <div className="text-red-500">{errors.activity_id}</div>}
//                     // </div>

// //                     <button
// //                         type="submit"
// //                         disabled={processing}
// //                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //                     >
// //                         {processing ? 'Saving...' : 'Add Package'}
// //                     </button>
// //                 </form>

// //                 <Link
// //                     href={route('packages')}
// //                     className="inline-block mt-4 text-blue-600 hover:underline"
// //                 >
// //                     Back to Packages
// //                 </Link>
// //             </div>
// //         </>
// //     );
// // }




import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AddPackagePage({ activities, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        package_title: '',
        description: '',
        main_image: '',
        total_price: '',
        event_time: '',
        activity_ids: [],
        // New filtering fields
        min_age: '',
        max_age: '',
        min_visitors: '',
        max_visitors: '',
        suitable_gender: 'mixed'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('packages.store'));
    };

    return (
        <>
            <Head title="Add New Package" />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">إضافة باقة جديدة</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">عنوان الباقة</label>
                        <input
                            type="text"
                            value={data.package_title}
                            onChange={e => setData('package_title', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.package_title && <div className="text-red-500">{errors.package_title}</div>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">الوصف</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.description && <div className="text-red-500">{errors.description}</div>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">رابط الصورة الرئيسية</label>
                        <input
                            type="text"
                            value={data.main_image}
                            onChange={e => setData('main_image', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.main_image && <div className="text-red-500">{errors.main_image}</div>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">السعر الإجمالي</label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.total_price}
                            onChange={e => setData('total_price', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.total_price && <div className="text-red-500">{errors.total_price}</div>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">وقت الفعالية</label>
                        <input
                            type="time"
                            value={data.event_time}
                            onChange={e => setData('event_time', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.event_time && <div className="text-red-500">{errors.event_time}</div>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">الأنشطة (اختر عدة أنشطة)</label>
                        <select
                            multiple
                            value={data.activity_ids || []}
                            onChange={e => {
                                const selected = Array.from(e.target.selectedOptions, option => Number(option.value));
                                setData('activity_ids', selected);
                            }}
                            className="border p-2 w-full rounded h-32"
                        >
                            {activities && activities.length > 0 ? (
                                activities.map(activity => (
                                    <option key={activity.id} value={activity.id}>
                                        {activity.name}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>لا توجد أنشطة</option>
                            )}
                        </select>
                        {errors.activity_ids && (
                            <div className="text-red-500 text-sm mt-1">{errors.activity_ids}</div>
                        )}
                    </div>

                    {/* FILTERING RULES SECTION */}
                    <div className="border-t pt-4 mt-6">
                        <h2 className="text-xl font-bold mb-4 text-purple-700">قواعد التصفية (اختياري)</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            حدد معايير العمر والزوار والجنس المناسبة لهذه الباقة. سيتم عرض الباقة فقط للمستخدمين الذين يطابقون هذه المعايير.
                        </p>

                        {/* AGE RANGE */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold mb-1">الحد الأدنى للعمر</label>
                                <input
                                    type="number"
                                    value={data.min_age}
                                    onChange={e => setData('min_age', e.target.value)}
                                    className="border p-2 w-full rounded"
                                    placeholder="مثال: 4"
                                    min="4"
                                    max="20"
                                />
                                {errors.min_age && <div className="text-red-500 text-sm">{errors.min_age}</div>}
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">الحد الأقصى للعمر</label>
                                <input
                                    type="number"
                                    value={data.max_age}
                                    onChange={e => setData('max_age', e.target.value)}
                                    className="border p-2 w-full rounded"
                                    placeholder="مثال: 20"
                                    min="4"
                                    max="20"
                                />
                                {errors.max_age && <div className="text-red-500 text-sm">{errors.max_age}</div>}
                            </div>
                        </div>

                        {/* VISITORS RANGE */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block font-semibold mb-1">الحد الأدنى لعدد الزوار</label>
                                <input
                                    type="number"
                                    value={data.min_visitors}
                                    onChange={e => setData('min_visitors', e.target.value)}
                                    className="border p-2 w-full rounded"
                                    placeholder="مثال: 2"
                                    min="2"
                                />
                                {errors.min_visitors && <div className="text-red-500 text-sm">{errors.min_visitors}</div>}
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">الحد الأقصى لعدد الزوار</label>
                                <input
                                    type="number"
                                    value={data.max_visitors}
                                    onChange={e => setData('max_visitors', e.target.value)}
                                    className="border p-2 w-full rounded"
                                    placeholder="مثال: 50"
                                />
                                {errors.max_visitors && <div className="text-red-500 text-sm">{errors.max_visitors}</div>}
                            </div>
                        </div>

                        {/* GENDER */}
                        <div className="mt-4">
                            <label className="block font-semibold mb-1">الجنس المناسب</label>
                            <select
                                value={data.suitable_gender}
                                onChange={e => setData('suitable_gender', e.target.value)}
                                className="border p-2 w-full rounded"
                            >
                                <option value="mixed">ذكور وإناث</option>
                                <option value="male">ذكور فقط</option>
                                <option value="female">إناث فقط</option>
                            </select>
                            {errors.suitable_gender && <div className="text-red-500 text-sm">{errors.suitable_gender}</div>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mt-6"
                    >
                        {processing ? 'جارٍ الحفظ...' : 'إضافة الباقة'}
                    </button>
                </form>

                <Link
                    href={route('event.packages')}
                    className="inline-block mt-4 text-blue-600 hover:underline"
                >
                    العودة إلى الباقات
                </Link>
            </div>
        </>
    );
}