import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

export default function EventRequestsForm({ eventRequests = [], className = '' }) {
    const [cancelingId, setCancelingId] = useState(null);
    const { delete: deleteRequest, processing } = useForm();

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return '#FFA500'; // Orange
            case 'accepted':
                return '#4ABC9D'; // Green
            case 'rejected':
                return '#E74C3C'; // Red
            default:
                return '#666';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'قيد الانتظار';
            case 'accepted':
                return 'مقبول';
            case 'rejected':
                return 'مرفوض';
            default:
                return status;
        }
    };

    const canCancelRequest = (request) => {
        if (request.status === 'rejected') {
            return false;
        }

        if (request.status === 'pending') {
            return true;
        }

        if (request.status === 'accepted') {
            const eventDate = new Date(request.event_date);
            const today = new Date();
            const diffTime = eventDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays >= 3;
        }

        return false;
    };

    const handleCancel = (requestId) => {
        if (confirm('هل أنت متأكد من إلغاء هذا الطلب؟')) {
            setCancelingId(requestId);
            deleteRequest(route('event-requests.cancel', requestId), {
                preserveScroll: true,
                onSuccess: () => {
                    setCancelingId(null);
                },
                onError: () => {
                    setCancelingId(null);
                }
            });
        }
    };

    return (
        <section className={className}>
            <style>{`
                .event-requests-header {
                    margin-bottom: 1.5rem;
                }

                .event-requests-title {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #76499C;
                    margin-bottom: 0.5rem;
                }

                .event-requests-desc {
                    font-size: 0.95rem;
                    color: #666;
                    line-height: 1.6;
                }

                .event-requests-list {
                    margin-top: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .event-request-card {
                    border: 2px solid #e0e0e0;
                    border-radius: 0.7rem;
                    padding: 1.5rem;
                    transition: border-color 0.3s;
                }

                .event-request-card:hover {
                    border-color: #76499C;
                }

                .event-request-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: start;
                    margin-bottom: 1rem;
                }

                .event-request-title-text {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 0.3rem;
                }

                .event-status-badge {
                    padding: 0.4rem 1rem;
                    border-radius: 999px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: white;
                }

                .event-request-details {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .event-detail-row {
                    display: flex;
                    gap: 0.5rem;
                    font-size: 0.95rem;
                    color: #555;
                }

                .event-detail-label {
                    font-weight: 600;
                }

                .event-request-actions {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                .btn-cancel-request {
                    background-color: #E74C3C;
                    color: white;
                    padding: 0.6rem 1.2rem;
                    border-radius: 999px;
                    border: none;
                    font-size: 0.95rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: opacity 0.3s;
                }

                .btn-cancel-request:hover:not(:disabled) {
                    opacity: 0.9;
                }

                .btn-cancel-request:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .no-requests-message {
                    text-align: center;
                    padding: 3rem 1rem;
                    color: #999;
                    font-size: 1.1rem;
                }

                .days-remaining {
                    font-size: 0.85rem;
                    color: #666;
                    font-style: italic;
                }
            `}</style>

            <header className="event-requests-header">
                <h2 className="event-requests-title">
                    طلبات الفعاليات الخاصة بي
                </h2>
                <p className="event-requests-desc">
                    يمكنك عرض جميع طلبات الفعاليات التي قمت بتقديمها وإلغائها إذا كانت قيد الانتظار أو مقبولة (قبل 3 أيام من تاريخ الفعالية).
                </p>
            </header>

            <div className="event-requests-list">
                {eventRequests.length === 0 ? (
                    <div className="no-requests-message">
                        لا توجد طلبات فعاليات حتى الآن
                    </div>
                ) : (
                    eventRequests.map((request) => {
                        const canCancel = canCancelRequest(request);
                        const eventDate = new Date(request.event_date);
                        const today = new Date();
                        const daysRemaining = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

                        return (
                            <div key={request.id} className="event-request-card">
                                <div className="event-request-header">
                                    <div>
                                        <h3 className="event-request-title-text">
                                            {request.event_name}
                                        </h3>
                                        {request.status === 'accepted' && daysRemaining >= 0 && (
                                            <p className="days-remaining">
                                                باقي {daysRemaining} يوم على الفعالية
                                            </p>
                                        )}
                                    </div>
                                    <span 
                                        className="event-status-badge"
                                        style={{ backgroundColor: getStatusColor(request.status) }}
                                    >
                                        {getStatusText(request.status)}
                                    </span>
                                </div>

                                <div className="event-request-details">
                                    <div className="event-detail-row">
                                        <span className="event-detail-label">تاريخ الفعالية:</span>
                                        <span>{new Date(request.event_date).toLocaleDateString('ar-EG')}</span>
                                    </div>
                                    <div className="event-detail-row">
                                        <span className="event-detail-label">تاريخ الطلب:</span>
                                        <span>{new Date(request.created_at).toLocaleDateString('ar-EG')}</span>
                                    </div>
                                    {request.description && (
                                        <div className="event-detail-row">
                                            <span className="event-detail-label">الوصف:</span>
                                            <span>{request.description}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="event-request-actions">
                                    {canCancel && (
                                        <button
                                            onClick={() => handleCancel(request.id)}
                                            disabled={processing && cancelingId === request.id}
                                            className="btn-cancel-request"
                                        >
                                            {processing && cancelingId === request.id ? 'جاري الإلغاء...' : 'إلغاء الطلب'}
                                        </button>
                                    )}
                                    {!canCancel && request.status === 'accepted' && daysRemaining < 3 && (
                                        <span className="days-remaining">
                                            لا يمكن الإلغاء (أقل من 3 أيام متبقية)
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
}