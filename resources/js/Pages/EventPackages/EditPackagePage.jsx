import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function EditPackagePage({ package: pkg }) {
    const { data, setData, put, processing, errors } = useForm({
        package_title: pkg.package_title || '',
        description: pkg.description || '',
        main_image: pkg.main_image || '',
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
                    <div>
                        <label className="block font-semibold mb-1">Title</label>
                        <input
                            type="text"
                            value={data.package_title}
                            onChange={(e) => setData('package_title', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.package_title && (
                            <p className="text-red-500 text-sm mt-1">{errors.package_title}</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Main Image URL</label>
                        <input
                            type="text"
                            value={data.main_image}
                            onChange={(e) => setData('main_image', e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                        {errors.main_image && (
                            <p className="text-red-500 text-sm mt-1">{errors.main_image}</p>
                        )}
                    </div>

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
