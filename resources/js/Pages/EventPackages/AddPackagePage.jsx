
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AddPackagePage() {
const { data, setData, post, processing, errors } = useForm({
    package_title: '',
    description: '',
    main_image: '',
});

const handleSubmit = (e) => {
    e.preventDefault();
    post(route('packages.store'));
};


    return (
        <>
            <Head title="Add New Package" />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Add New Package</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">Package Title</label>
                        <input
                            type="text"
                            value={data.package_title}
                            onChange={e => setData('package_title', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.package_title && <div className="text-red-500">{errors.package_title}</div>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Description</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.description && <div className="text-red-500">{errors.description}</div>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Main Image URL</label>
                        <input
                            type="text"
                            value={data.main_image}
                            onChange={e => setData('main_image', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.main_image && <div className="text-red-500">{errors.main_image}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {processing ? 'Saving...' : 'Add Package'}
                    </button>
                </form>

                <Link
                    href={route('packages')}
                    className="inline-block mt-4 text-blue-600 hover:underline"
                >
                    Back to Packages
                </Link>
            </div>
        </>
    );
}
