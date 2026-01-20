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
                :root {
                    --color-primary: #76499C;
                    --color-primary-soft: #A189B7;
                    --color-primary-light: #E8DFF5;
                    --color-teal: #4ABC9D;
                    --color-teal-light: #E0F7F2;
                    --color-yellow: #F2C94C;
                    --color-orange: #FFA500;
                    --color-red: #E74C3C;
                    --color-bg: #F9F7FB;
                    --color-text: #222222;
                    --color-text-light: #555555;
                    --shadow-sm: 0 2px 8px rgba(118, 73, 156, 0.08);
                    --shadow-md: 0 8px 24px rgba(118, 73, 156, 0.12);
                    --shadow-lg: 0 16px 48px rgba(118, 73, 156, 0.18);
                    --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .event-requests-header {
                    margin-bottom: 2rem;
                    animation: fadeInUp 0.6s ease-out;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .event-requests-title {
                    font-size: 1.8rem;
                    font-weight: 900;
                    color: var(--color-primary);
                    margin-bottom: 0.8rem;
                    position: relative;
                    display: inline-block;
                    padding-bottom: 0.5rem;
                }

                .event-requests-title::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 60%;
                    height: 4px;
                    background: linear-gradient(90deg, var(--color-teal), transparent);
                    border-radius: 2px;
                }

                .event-requests-title::before {
                    content: '📋';
                    margin-left: 0.7rem;
                    font-size: 1.7rem;
                }

                .event-requests-desc {
                    font-size: 1.05rem;
                    color: var(--color-text-light);
                    line-height: 1.8;
                    max-width: 800px;
                }

                .event-requests-list {
                    margin-top: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .event-request-card {
                    background: white;
                    border: 2px solid rgba(118, 73, 156, 0.1);
                    border-radius: 16px;
                    padding: 2rem;
                    transition: var(--transition);
                    box-shadow: var(--shadow-sm);
                    position: relative;
                    overflow: hidden;
                    animation: fadeInUp 0.6s ease-out backwards;
                    animation-delay: calc(var(--animation-order) * 0.1s);
                }

                .event-request-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 4px;
                    background: linear-gradient(90deg, var(--color-teal), var(--color-primary));
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.4s ease;
                }

                .event-request-card:hover::before {
                    transform: scaleX(1);
                }

                .event-request-card:hover {
                    border-color: var(--color-primary);
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-md);
                }

                .event-request-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.5rem;
                    gap: 1rem;
                }

                .event-request-title-text {
                    font-size: 1.3rem;
                    font-weight: 800;
                    color: var(--color-primary);
                    margin-bottom: 0.5rem;
                    line-height: 1.4;
                }

                .event-status-badge {
                    padding: 0.5rem 1.3rem;
                    border-radius: 50px;
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: white;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                    white-space: nowrap;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .event-status-badge::before {
                    content: '●';
                    font-size: 0.7rem;
                    animation: pulse 2s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                .event-request-details {
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                    margin-bottom: 1.5rem;
                    background: var(--color-primary-light);
                    padding: 1.2rem;
                    border-radius: 12px;
                }

                .event-detail-row {
                    display: flex;
                    gap: 0.7rem;
                    font-size: 1rem;
                    color: var(--color-text-light);
                    align-items: flex-start;
                }

                .event-detail-row::before {
                    content: '✓';
                    color: var(--color-teal);
                    font-weight: bold;
                    flex-shrink: 0;
                }

                .event-detail-label {
                    font-weight: 700;
                    color: var(--color-primary);
                }

                .event-request-actions {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    flex-wrap: wrap;
                }

                .btn-cancel-request {
                    background: linear-gradient(135deg, var(--color-red), #c0392b);
                    color: white;
                    padding: 0.8rem 1.6rem;
                    border-radius: 50px;
                    border: none;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: var(--transition);
                    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
                    position: relative;
                    overflow: hidden;
                }

                .btn-cancel-request::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    transition: width 0.6s ease, height 0.6s ease;
                }

                .btn-cancel-request:hover::before {
                    width: 400px;
                    height: 400px;
                }

                .btn-cancel-request:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
                }

                .btn-cancel-request:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                .no-requests-message {
                    text-align: center;
                    padding: 4rem 2rem;
                    color: var(--color-text-light);
                    font-size: 1.3rem;
                    background: white;
                    border-radius: 16px;
                    border: 2px dashed rgba(118, 73, 156, 0.2);
                    animation: fadeInUp 0.6s ease-out;
                }

                .no-requests-message::before {
                    content: '📭';
                    display: block;
                    font-size: 4rem;
                    margin-bottom: 1rem;
                    opacity: 0.3;
                }

                .days-remaining {
                    font-size: 0.9rem;
                    color: var(--color-text-light);
                    font-style: italic;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.4rem 0.9rem;
                    background: var(--color-yellow-light);
                    border-radius: 50px;
                    font-weight: 600;
                }

                .days-remaining::before {
                    content: '⏰';
                    font-size: 1rem;
                }

                .warning-message {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.6rem 1.2rem;
                    background: linear-gradient(135deg, #fff3cd, #ffe9a3);
                    border-radius: 50px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #856404;
                    border: 2px solid var(--color-yellow);
                }

                .warning-message::before {
                    content: '⚠️';
                    font-size: 1rem;
                }

                @media (max-width: 768px) {
                    .event-requests-title {
                        font-size: 1.5rem;
                    }

                    .event-request-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .event-request-card {
                        padding: 1.5rem;
                    }

                    .event-request-details {
                        padding: 1rem;
                    }

                    .btn-cancel-request {
                        width: 100%;
                        text-align: center;
                    }
                }

                @media (max-width: 480px) {
                    .event-requests-title {
                        font-size: 1.3rem;
                    }

                    .event-request-title-text {
                        font-size: 1.1rem;
                    }

                    .event-request-card {
                        padding: 1.2rem;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
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
                    eventRequests.map((request, index) => {
                        const canCancel = canCancelRequest(request);
                        const eventDate = new Date(request.event_date);
                        const today = new Date();
                        const daysRemaining = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

                        return (
                            <div 
                                key={request.id} 
                                className="event-request-card"
                                style={{'--animation-order': index}}
                            >
                                <div className="event-request-header">
                                    <div>
                                        <h3 className="event-request-title-text">
                                            {request.event_name}
                                        </h3>
                                        {request.status === 'accepted' && daysRemaining >= 0 && (
                                            <span className="days-remaining">
                                                باقي {daysRemaining} يوم على الفعالية
                                            </span>
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
                                        <span className="warning-message">
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
