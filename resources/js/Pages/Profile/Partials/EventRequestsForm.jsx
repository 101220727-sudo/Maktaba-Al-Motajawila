import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function EventRequestsForm({ eventRequests = [], className = '' }) {
    const [cancelingId, setCancelingId] = useState(null);
    const { delete: deleteRequest, processing } = useForm();

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#F2A93B';
            case 'accepted': return '#4ABC9D';
            case 'rejected': return '#E57373';
            default: return '#999';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'قيد الانتظار';
            case 'accepted': return 'مقبول';
            case 'rejected': return 'مرفوض';
            default: return status;
        }
    };

    const canCancelRequest = (request) => {
        if (request.status === 'rejected') return false;
        if (request.status === 'pending') return true;
        if (request.status === 'accepted') {
            const eventDate = new Date(request.event_date);
            const today = new Date();
            const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
            return diffDays >= 3;
        }
        return false;
    };

    const handleCancel = (id) => {
        if (confirm('هل أنت متأكد من إلغاء هذا الطلب؟')) {
            setCancelingId(id);
            deleteRequest(route('event-requests.cancel', id), {
                preserveScroll: true,
                onFinish: () => setCancelingId(null),
            });
        }
    };

    return (
        <section className={className}>
            <style>{`
                :root {
                    --primary: #76499C;
                    --teal: #4ABC9D;
                    --soft-bg: rgba(118, 73, 156, 0.06);
                    --text-light: #555;
                    --shadow: 0 10px 30px rgba(118, 73, 156, 0.12);
                    --transition: all .35s ease;
                }

                .event-header {
                    margin-bottom: 2.5rem;
                }

                .event-title {
                    font-size: 1.6rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, var(--primary), var(--teal));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    display: inline-flex;
                    align-items: center;
                    gap: .6rem;
                }

                .event-desc {
                    margin-top: .6rem;
                    color: var(--text-light);
                    font-size: 1.05rem;
                    max-width: 750px;
                    line-height: 1.7;
                }

                .requests-list {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .request-card {
                    background: #fff;
                    border-radius: 18px;
                    padding: 2rem;
                    box-shadow: var(--shadow);
                    border: 1px solid rgba(118,73,156,.12);
                    transition: var(--transition);
                }

                .request-card:hover {
                    transform: translateY(-3px);
                }

                .request-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 1rem;
                    margin-bottom: 1.2rem;
                }

                .request-title {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: var(--primary);
                }

                .status-badge {
                    padding: .45rem 1.1rem;
                    border-radius: 50px;
                    font-size: .85rem;
                    font-weight: 700;
                    color: #fff;
                }

                .request-details {
                    background: var(--soft-bg);
                    padding: 1.2rem;
                    border-radius: 14px;
                    display: flex;
                    flex-direction: column;
                    gap: .7rem;
                    margin-bottom: 1.4rem;
                }

                .detail-row {
                    display: flex;
                    gap: .6rem;
                    color: var(--text-light);
                    font-size: .95rem;
                }

                .detail-label {
                    font-weight: 700;
                    color: var(--primary);
                }

                .actions {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .cancel-btn {
                    background: linear-gradient(135deg, #e57373, #d32f2f);
                    color: #fff;
                    padding: .75rem 1.6rem;
                    border-radius: 50px;
                    border: none;
                    font-size: .95rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: var(--transition);
                    box-shadow: 0 4px 12px rgba(211,47,47,.25);
                }

                .cancel-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                }

                .cancel-btn:disabled {
                    opacity: .6;
                    cursor: not-allowed;
                }

                .empty {
                    text-align: center;
                    padding: 4rem 2rem;
                    background: #fff;
                    border-radius: 18px;
                    border: 2px dashed rgba(118,73,156,.25);
                    color: var(--text-light);
                    font-size: 1.2rem;
                }

                @media (max-width:768px) {
                    .request-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .cancel-btn {
                        width: 100%;
                    }
                }
            `}</style>

            <header className="event-header">
                <h2 className="event-title">📋 طلباتي  </h2>
                <p className="event-desc">
                    يمكنك مراجعة الطلبات التي قمت بتقديمها، وإلغاء الطلبات المتاحة قبل 3 أيام من تاريخ الفعالية.
                </p>
            </header>

            <div className="requests-list">
                {eventRequests.length === 0 ? (
                    <div className="empty">لا توجد طلبات حتى الآن</div>
                ) : (
                    eventRequests.map((request) => (
                        <div key={request.id} className="request-card">
                            <div className="request-header">
    <h3 className="request-title">
        {new Date(request.event_date).toLocaleString()}
    </h3>

    <span
        className="status-badge"
        style={{ backgroundColor: getStatusColor(request.status) }}
    >
        {getStatusText(request.status)}
    </span>
</div>

<div className="request-details">
    <div className="detail-row">
        <span className="detail-label">اسم الباقة:</span>
        <span>{request.event_name}</span>
    </div>

    <div className="detail-row">
        <span className="detail-label">العمر:</span>
        <span>{request.age} سنة </span>
    </div>

    <div className="detail-row">
        <span className="detail-label">المكان:</span>
        <span>{request.location}</span>
    </div>

    
</div>


                            <div className="actions">
                                {canCancelRequest(request) && (
                                    <button
                                        onClick={() => handleCancel(request.id)}
                                        disabled={processing && cancelingId === request.id}
                                        className="cancel-btn"
                                    >
                                        {processing && cancelingId === request.id
                                            ? 'جاري الإلغاء...'
                                            : 'إلغاء الطلب'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
