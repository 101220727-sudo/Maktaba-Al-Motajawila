

import React, { useState } from "react";

export default function ReceiveEventsPage({ eventRequests }) {
    const [requests, setRequests] = useState(eventRequests);

    const handleStatusChange = async (id, status) => {
        try {
            const token = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute('content');

            const res = await fetch(`/event-requests/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) throw new Error('Network response was not ok');

            const data = await res.json();

            setRequests(prev =>
                prev.map(req => (req.id === id ? { ...req, status: data.status } : req))
            );
        } catch (err) {
            console.error(err);
            alert('Error updating status');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 space-y-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Received Event Requests</h1>
            {requests.map(req => (
                <div
                    key={req.id}
                    className={`border rounded-lg p-5 shadow-md flex justify-between items-center transition-colors
                        ${
                            req.status === "accepted"
                                ? "bg-green-100"
                                : req.status === "rejected"
                                ? "bg-red-100"
                                : "bg-white"
                        }`}
                >
                    <div className="space-y-1">
                        <p><strong>User:</strong> {req.user.name}</p>
                        <p><strong>Package:</strong> {req.events_package.package_title}</p>
                        <p><strong>Date:</strong> {req.event_date}</p>
                        <p><strong>Status:</strong> <span className="capitalize">{req.status || "pending"}</span></p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => handleStatusChange(req.id, "accepted")}
                            disabled={req.status === "accepted"}
                            className={`px-4 py-2 rounded font-semibold transition-colors
                                ${
                                    req.status === "accepted"
                                        ? "bg-green-300 cursor-not-allowed"
                                        : "bg-green-500 hover:bg-green-600 text-white"
                                }`}
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => handleStatusChange(req.id, "rejected")}
                            disabled={req.status === "rejected"}
                            className={`px-4 py-2 rounded font-semibold transition-colors
                                ${
                                    req.status === "rejected"
                                        ? "bg-red-300 cursor-not-allowed"
                                        : "bg-red-500 hover:bg-red-600 text-white"
                                }`}
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
