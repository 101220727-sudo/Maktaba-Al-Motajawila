
import React, { useState } from "react";
import { Head, Link } from '@inertiajs/react';

export default function ReceiveEventsPage({ eventRequests, auth }) {
    const [requests, setRequests] = useState(eventRequests);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showDropdown, setShowDropdown] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const user = auth?.user;


    const parseMysqlDate = (dateString) => {
    return new Date(dateString.replace(' ', 'T'));
};

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

            setShowModal(false);
            setSelectedRequest(null);
        } catch (err) {
            console.error(err);
            alert('حدث خطأ أثناء تحديث الحالة');
        }
    };

    // Check if date is in the past
    const isPastDate = (dateString) => {
        const requestDate = parseMysqlDate(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        requestDate.setHours(0, 0, 0, 0);
        return requestDate < today;
    };

    // Check if request can be modified
    const canModifyRequest = (request) => {
        return !isPastDate(request.event_date) && !request.status;
    };

    // Separate active and history requests
    const activeRequests = requests.filter(req => !isPastDate(req.event_date));
    const historyRequests = requests.filter(req => isPastDate(req.event_date));

    // Calendar logic
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const getRequestsForDate = (date, requestsList = activeRequests) => {
        return requestsList.filter(req => {
            const reqDate = parseMysqlDate(req.event_date);
            return reqDate.toDateString() === date.toDateString();
        });
    };

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

    const monthNames = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

    const previousMonth = () => {
        setCurrentMonth(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(year, month + 1, 1));
    };

    const handleRequestClick = (request) => {
        setSelectedRequest(request);
        setShowModal(true);
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'accepted': return 'مقبول';
            case 'rejected': return 'مرفوض';
            default: return 'قيد الانتظار';
        }
    };

    return (
        <>
            <Head title="إدارة الطلبات " />
            
            <style>{`
                :root {
                    --color-primary: #76499C;
                    --color-primary-soft: #A189B7;
                    --color-primary-light: #E8DFF5;
                    --color-teal: #4ABC9D;
                    --color-teal-light: #E0F7F2;
                    --color-yellow: #F2C94C;
                    --color-yellow-light: #FFF9E6;
                    --color-bg: #F9F7FB;
                    --color-text: #222222;
                    --color-text-light: #555555;
                    --shadow-sm: 0 2px 8px rgba(118, 73, 156, 0.08);
                    --shadow-md: 0 8px 24px rgba(118, 73, 156, 0.12);
                    --shadow-lg: 0 16px 48px rgba(118, 73, 156, 0.18);
                    --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: "Tajawal", "Cairo", "Segoe UI", system-ui, sans-serif;
                    background: linear-gradient(135deg, #F9F7FB 0%, #FFF 100%);
                    color: var(--color-text);
                    line-height: 1.8;
                    direction: rtl;
                    overflow-x: hidden;
                }

                .events-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                .events-page::before {
                    content: '';
                    position: fixed;
                    top: -50%;
                    right: -20%;
                    width: 800px;
                    height: 800px;
                    background: radial-gradient(circle, rgba(118, 73, 156, 0.05) 0%, transparent 70%);
                    border-radius: 50%;
                    z-index: 0;
                    animation: float 20s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(30px, -30px) rotate(5deg); }
                    66% { transform: translate(-20px, 20px) rotate(-5deg); }
                }

                .main-header {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(118, 73, 156, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    box-shadow: var(--shadow-sm);
                }

                .nav-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 0;
                    width: 90%;
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .logo-img {
                    height: 70px;
                    width: auto;
                    filter: drop-shadow(0 4px 12px rgba(118, 73, 156, 0.2));
                    transition: var(--transition);
                }

                .logo-text-wrap {
                    display: flex;
                    flex-direction: column;
                    gap: 0.2rem;
                }

                .logo-text-ar-big {
                    font-size: 1.6rem;
                    font-weight: 900;
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-teal) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1.2;
                }

                .logo-text-sub {
                    font-size: 0.9rem;
                    color: var(--color-text-light);
                    font-weight: 500;
                }

                .main-nav {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }

                .main-nav a {
                    text-decoration: none;
                    color: var(--color-text);
                    font-size: 1rem;
                    font-weight: 600;
                    position: relative;
                    padding: 0.5rem 0;
                    transition: var(--transition);
                }

                .main-nav a::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 0;
                    height: 3px;
                    background: linear-gradient(90deg, var(--color-teal), var(--color-primary));
                    transition: width 0.4s ease;
                    border-radius: 2px;
                }

                .main-nav a:hover::before {
                    width: 100%;
                }

                .user-menu {
                    position: relative;
                }

                .user-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.5rem 1.2rem;
                    border-radius: 50px;
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-soft) 100%);
                    color: white;
                    font-size: 0.95rem;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(118, 73, 156, 0.3);
                    transition: var(--transition);
                }

                .user-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(118, 73, 156, 0.4);
                }

                .user-button svg {
                    width: 1rem;
                    height: 1rem;
                }

                .dropdown-menu {
                    position: absolute;
                    left: 0;
                    top: calc(100% + 0.8rem);
                    background: white;
                    border-radius: 12px;
                    box-shadow: var(--shadow-lg);
                    min-width: 200px;
                    overflow: hidden;
                    z-index: 50;
                    border: 1px solid rgba(118, 73, 156, 0.1);
                }

                .dropdown-item {
                    display: block;
                    padding: 0.8rem 1.2rem;
                    color: var(--color-text);
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-size: 0.9rem;
                    font-weight: 500;
                    border-right: 3px solid transparent;
                }

                .dropdown-item:hover {
                    background: linear-gradient(90deg, rgba(118, 73, 156, 0.08) 0%, transparent 100%);
                    border-right-color: var(--color-teal);
                    padding-right: 1.5rem;
                }

                .section {
                    padding: 2rem 0;
                    flex: 1;
                    position: relative;
                    z-index: 1;
                }

                .container {
                    width: 90%;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .page-header {
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                .page-title {
                    font-size: 1.8rem;
                    color: var(--color-primary);
                    font-weight: 900;
                    margin-bottom: 0.3rem;
                    position: relative;
                    display: inline-block;
                }

                .page-title::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    right: 50%;
                    transform: translateX(50%);
                    width: 100px;
                    height: 3px;
                    background: linear-gradient(90deg, var(--color-teal), var(--color-primary));
                    border-radius: 2px;
                }

                .page-subtitle {
                    font-size: 0.95rem;
                    color: var(--color-text-light);
                    margin-top: 1rem;
                }

                .stats-row {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .stat-card {
                    background: white;
                    padding: 1rem;
                    border-radius: 12px;
                    box-shadow: var(--shadow-sm);
                    text-align: center;
                    transition: var(--transition);
                    border-right: 4px solid transparent;
                    cursor: pointer;
                }

                .stat-card:hover {
                    transform: translateY(-3px);
                    box-shadow: var(--shadow-md);
                }

                .stat-card.pending {
                    border-right-color: var(--color-yellow);
                }

                .stat-card.accepted {
                    border-right-color: var(--color-teal);
                }

                .stat-card.rejected {
                    border-right-color: #e74c3c;
                }

                .stat-card.history {
                    border-right-color: #95a5a6;
                }

                .stat-number {
                    font-size: 2rem;
                    font-weight: 900;
                    margin-bottom: 0.3rem;
                }

                .stat-card.pending .stat-number {
                    color: var(--color-yellow);
                }

                .stat-card.accepted .stat-number {
                    color: var(--color-teal);
                }

                .stat-card.rejected .stat-number {
                    color: #e74c3c;
                }

                .stat-card.history .stat-number {
                    color: #95a5a6;
                }

                .stat-label {
                    font-size: 0.95rem;
                    color: var(--color-text-light);
                    font-weight: 600;
                }

                .calendar-container {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 16px;
                    box-shadow: var(--shadow-lg);
                    border-right: 6px solid var(--color-teal);
                }

                .calendar-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 2px solid var(--color-primary-light);
                }

                .calendar-title {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: var(--color-primary);
                }

                .calendar-nav {
                    display: flex;
                    gap: 0.8rem;
                }

                .calendar-nav-btn {
                    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-soft));
                    color: white;
                    border: none;
                    padding: 0.5rem 1.2rem;
                    border-radius: 50px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: var(--transition);
                    box-shadow: 0 4px 12px rgba(118, 73, 156, 0.3);
                    font-size: 0.9rem;
                }

                .calendar-nav-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(118, 73, 156, 0.4);
                }

                .calendar-weekdays {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 0.4rem;
                    margin-bottom: 0.4rem;
                }

                .calendar-weekday {
                    text-align: center;
                    font-weight: 700;
                    color: var(--color-primary);
                    padding: 0.6rem 0;
                    font-size: 0.85rem;
                    background: var(--color-primary-light);
                    border-radius: 6px;
                }

                .calendar-days {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 0.4rem;
                }

                .calendar-day {
                    min-height: 100px;
                    max-height: 100px;
                    display: flex;
                    flex-direction: column;
                    border-radius: 8px;
                    border: 2px solid transparent;
                    background: #faf8ff;
                    position: relative;
                    overflow: hidden;
                    transition: var(--transition);
                }

                .calendar-day.empty {
                    background: transparent;
                }

                .calendar-day:not(.empty):hover {
                    border-color: var(--color-teal);
                    box-shadow: 0 4px 15px rgba(74, 188, 157, 0.3);
                }

                .calendar-day-header {
                    padding: 0.25rem;
                    text-align: center;
                    font-weight: 700;
                    font-size: 0.75rem;
                    color: var(--color-text);
                    background: rgba(118, 73, 156, 0.05);
                    border-bottom: 1px solid rgba(118, 73, 156, 0.1);
                    flex-shrink: 0;
                }

                .calendar-day-body {
                    flex: 1;
                    overflow-y: auto;
                    overflow-x: hidden;
                    padding: 0.25rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .calendar-day-body::-webkit-scrollbar {
                    width: 4px;
                }

                .calendar-day-body::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }

                .calendar-day-body::-webkit-scrollbar-thumb {
                    background: var(--color-primary-soft);
                    border-radius: 4px;
                }

                .calendar-day-body::-webkit-scrollbar-thumb:hover {
                    background: var(--color-primary);
                }

                .request-rectangle {
                    padding: 0.35rem 0.4rem;
                    border-radius: 5px;
                    font-size: 0.7rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: var(--transition);
                    text-align: center;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    min-height: 24px;
                    max-height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .request-rectangle:hover {
                    transform: scale(1.05);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }

                .request-rectangle.pending {
                    background: var(--color-yellow);
                    color: #856404;
                }

                .request-rectangle.accepted {
                    background: var(--color-teal);
                    color: white;
                }

                .request-rectangle.rejected {
                    background: #e74c3c;
                    color: white;
                }

                .request-rectangle.history {
    background: linear-gradient(135deg, #95a5a6, #7f8c8d);
    color: white;
    opacity: 0.8;
}

.request-rectangle.history:hover {
    opacity: 1;
    background: linear-gradient(135deg, #7f8c8d, #95a5a6);
}

                .history-section {
                    margin-top: 2rem;
                    background: white;
                    padding: 1.5rem;
                    border-radius: 16px;
                    box-shadow: var(--shadow-lg);
                    border-right: 6px solid #95a5a6;
                }

                .history-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                    cursor: pointer;
                    padding: 1rem;
                    background: linear-gradient(135deg, rgba(149, 165, 166, 0.1), rgba(149, 165, 166, 0.05));
                    border-radius: 12px;
                    transition: var(--transition);
                }

                .history-header:hover {
                    background: linear-gradient(135deg, rgba(149, 165, 166, 0.15), rgba(149, 165, 166, 0.08));
                }

                .history-title {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #7f8c8d;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .history-toggle {
                    background: #95a5a6;
                    color: white;
                    border: none;
                    padding: 0.5rem 1.2rem;
                    border-radius: 50px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: var(--transition);
                    font-size: 0.9rem;
                }

                .history-toggle:hover {
                    background: #7f8c8d;
                }

                .history-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .history-card {
                    background: #f8f9fa;
                    padding: 1rem;
                    border-radius: 12px;
                    border-right: 4px solid #95a5a6;
                    cursor: pointer;
                    transition: var(--transition);
                }

                .history-card:hover {
                    transform: translateY(-3px);
                    box-shadow: var(--shadow-md);
                }

                .history-card.accepted {
                    border-right-color: var(--color-teal);
                }

                .history-card.rejected {
                    border-right-color: #e74c3c;
                }

                .history-card-header {
                    font-weight: 700;
                    color: var(--color-primary);
                    margin-bottom: 0.5rem;
                    font-size: 1rem;
                }

                .history-card-detail {
                    font-size: 0.85rem;
                    color: var(--color-text-light);
                    margin-bottom: 0.3rem;
                }

                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .modal {
                    background: white;
                    border-radius: 20px;
                    width: 90%;
                    max-width: 600px;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: var(--shadow-lg);
                    animation: slideUp 0.3s ease;
                    border-right: 6px solid var(--color-primary);
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .modal-header {
                    padding: 2rem 2rem 1rem;
                    border-bottom: 2px solid var(--color-primary-light);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .modal-title {
                    font-size: 1.8rem;
                    font-weight: 900;
                    color: var(--color-primary);
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    color: var(--color-text-light);
                    cursor: pointer;
                    transition: var(--transition);
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }

                .modal-close:hover {
                    background: var(--color-primary-light);
                    color: var(--color-primary);
                }

                .modal-body {
                    padding: 2rem;
                }

                .request-detail {
                    display: flex;
                    justify-content: space-between;
                    padding: 1rem 0;
                    border-bottom: 1px solid #f0f0f0;
                }

                .request-detail:last-child {
                    border-bottom: none;
                }

                .request-label {
                    font-weight: 700;
                    color: var(--color-primary);
                    font-size: 1rem;
                }

                .request-value {
                    color: var(--color-text-light);
                    font-size: 1rem;
                    text-align: left;
                }

                .status-badge {
                    display: inline-block;
                    padding: 0.4rem 1rem;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    text-align: center;
                }

                .status-badge.pending {
                    background: var(--color-yellow-light);
                    color: #856404;
                }

                .status-badge.accepted {
                    background: var(--color-teal-light);
                    color: #0f5132;
                }

                .status-badge.rejected {
                    background: #f8d7da;
                    color: #842029;
                }

                .history-notice {
                    background: linear-gradient(135deg, #e8eaf6, #c5cae9);
                    border: 2px solid #7986cb;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin: 1.5rem 0;
                    text-align: center;
                    color: #283593;
                    font-weight: 700;
                    font-size: 1.05rem;
                    box-shadow: 0 4px 12px rgba(121, 134, 203, 0.2);
                }

                .history-notice::before {
                    content: '📚';
                    font-size: 1.5rem;
                    margin-left: 0.5rem;
                }

                .modal-actions {
                    display: flex;
                    gap: 1rem;
                    padding: 1.5rem 2rem;
                    border-top: 2px solid var(--color-primary-light);
                }

                .btn {
                    flex: 1;
                    padding: 1rem;
                    border: none;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 1.05rem;
                    cursor: pointer;
                    transition: var(--transition);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                    transform: none !important;
                    box-shadow: none;
                }

                .btn-accept {
                    background: linear-gradient(135deg, var(--color-teal), #3DA88A);
                    color: white;
                }

                .btn-accept:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(74, 188, 157, 0.4);
                }

                .btn-reject {
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                    color: white;
                }

                .btn-reject:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
                }

                .main-footer {
                    background: linear-gradient(135deg, #2a0845 0%, #3a0d63 100%);
                    color: #f3e9ff;
                    padding: 1.5rem 0;
                    margin-top: 1rem;
                    font-size: 0.9rem;
                    position: relative;
                    overflow: hidden;
                }

                .main-footer::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, 
                        var(--color-teal), 
                        var(--color-primary), 
                        var(--color-yellow),
                        var(--color-primary),
                        var(--color-teal)
                    );
                }

                .footer-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1.5rem;
                    width: 90%;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .footer-links {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .footer-links a {
                    color: #e0cffc;
                    text-decoration: none;
                    transition: var(--transition);
                }

                .footer-links a:hover {
                    color: white;
                }

                @media (max-width: 968px) {
                    .stats-row {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .history-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 768px) {
                    .nav-container {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .stats-row {
                        grid-template-columns: 1fr;
                    }

                    .calendar-day {
                        min-height: 80px;
                        max-height: 80px;
                    }

                    .modal {
                        width: 95%;
                    }

                    .modal-actions {
                        flex-direction: column;
                    }

                    .footer-container {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>

            <div className="events-page">
                {/* Header */}
                <header className="main-header">
                    <div className="nav-container">
                        <div className="logo">
                            <img src="/images/logo.png" alt="شعار المكتبة" className="logo-img" />
                            <div className="logo-text-wrap">
                                <span className="logo-text-ar-big">مكتبة مهدي المتجولة</span>
                                <span className="logo-text-sub">مكتبة على عجلات تجوب المناطق اللبنانية</span>
                            </div>
                        </div>

                        <nav className="main-nav">
                            <Link href={route('event.packages')
                            }>الباقات</Link>
                            <Link 
                                href={route('logout')} 
                                method="post" 
                                as="button" 
                                className="dropdown-item"
                            >
                                تسجيل الخروج
                            </Link>

                            {/* {user && (
                                <div className="user-menu">
                                    <button 
                                        className="user-button"
                                        onClick={() => setShowDropdown(!showDropdown)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                        {user.name}
                                    </button>
                                    
                                    
                                </div>
                            )} */}
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <section className="section">
                    <div className="container">
                        <div className="page-header">
                            <h1 className="page-title">إدارة طلبات الفعاليات</h1>
                            <p className="page-subtitle">
                                عرض وإدارة جميع طلبات الفعاليات الواردة من خلال التقويم
                            </p>
                        </div>

                        {/* Statistics */}
                        <div className="stats-row">
                            <div className="stat-card pending">
                                <div className="stat-number">
                                    {activeRequests.filter(r => !r.status || r.status === 'pending').length}
                                </div>
                                <div className="stat-label">قيد الانتظار</div>
                            </div>
                            <div className="stat-card accepted">
                                <div className="stat-number">
                                    {activeRequests.filter(r => r.status === 'accepted').length}
                                </div>
                                <div className="stat-label">مقبول</div>
                            </div>
                            <div className="stat-card rejected">
                                <div className="stat-number">
                                    {activeRequests.filter(r => r.status === 'rejected').length}
                                </div>
                                <div className="stat-label">مرفوض</div>
                            </div>
                            <div className="stat-card history" onClick={() => setShowHistory(!showHistory)}>
                                <div className="stat-number">{historyRequests.length}</div>
                                <div className="stat-label">السجل</div>
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="calendar-container">
                            <div className="calendar-header">
                                <h2 className="calendar-title">
                                    {monthNames[month]} {year}
                                </h2>
                                <div className="calendar-nav">
                                    <button onClick={previousMonth} className="calendar-nav-btn">
                                        ← السابق
                                    </button>
                                    <button onClick={nextMonth} className="calendar-nav-btn">
                                        التالي →
                                    </button>
                                </div>
                            </div>

                            <div className="calendar-weekdays">
                                {dayNames.map(day => (
                                    <div key={day} className="calendar-weekday">{day}</div>
                                ))}
                            </div>

                            <div className="calendar-days">
                                {/* Empty days before month starts */}
                                {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                                    <div key={`empty-${i}`} className="calendar-day empty"></div>
                                ))}

                                {/* Actual days */}
                                {/* {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const currentDate = new Date(year, month, day);
                                    const dayRequests = getRequestsForDate(currentDate);

                                    return (
                                        <div key={day} className="calendar-day">
                                            <div className="calendar-day-header">{day}</div>
                                            <div className="calendar-day-body">
                                                {dayRequests.map(request => (
                                                    <div
                                                        key={request.id}
                                                        className={`request-rectangle ${request.status || 'pending'}`}
                                                        onClick={() => handleRequestClick(request)}
                                                        title={request.user.name}
                                                    >
                                                        {request.user.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })} */}



                                {/* Actual days */}
{Array.from({ length: daysInMonth }).map((_, i) => {
    const day = i + 1;
    const currentDate = new Date(year, month, day);
    
    // Get ALL requests for this date (both active and history)
    const activeRequestsForDay = getRequestsForDate(currentDate, activeRequests);
    const historyRequestsForDay = getRequestsForDate(currentDate, historyRequests);
    const allRequestsForDay = [...activeRequestsForDay, ...historyRequestsForDay];

    return (
        <div key={day} className="calendar-day">
            <div className="calendar-day-header">{day}</div>
            <div className="calendar-day-body">
                {/* Show active requests first */}
                {activeRequestsForDay.map(request => (
                    <div
                        key={request.id}
                        className={`request-rectangle ${request.status || 'pending'}`}
                        onClick={() => handleRequestClick(request)}
                        title={request.user.name}
                    >
                        {request.user.name}
                    </div>
                ))}
                
                {/* Show history requests in gray */}
                {historyRequestsForDay.map(request => (
                    <div
                        key={request.id}
                        className="request-rectangle history"
                        onClick={() => handleRequestClick(request)}
                        title={`${request.user.name} (سجل)`}
                    >
                        {request.user.name}
                    </div>
                ))}
            </div>
        </div>
    );
})}
                            </div>
                        </div>


                        

                        {/* History Section */}
                        {showHistory && historyRequests.length > 0 && (
                            <div className="history-section">
                                <div className="history-header" onClick={() => setShowHistory(!showHistory)}>
                                    <h2 className="history-title">
                                        📚 سجل الطلبات السابقة
                                    </h2>
                                    <button className="history-toggle">
                                        {showHistory ? 'إخفاء' : 'عرض'}
                                    </button>
                                </div>
                                
                                <div className="history-grid">
                                    {historyRequests.map(request => (
                                        <div
                                            key={request.id}
                                            className={`history-card ${request.status || 'pending'}`}
                                            onClick={() => handleRequestClick(request)}
                                        >
                                            <div className="history-card-header">{request.user.name}</div>
                                            <div className="history-card-detail">
                                                <strong>الباقة:</strong> {request.events_package.package_title}
                                            </div>
                                            <div className="history-card-detail">
                                                <strong>التاريخ:</strong> {parseMysqlDate(request.event_date).toLocaleDateString('ar')}
                                            </div>
                                            <div className="history-card-detail">
                                                <strong>الحالة:</strong>{' '}
                                                <span className={`status-badge ${request.status || 'pending'}`}>
                                                    {getStatusText(request.status)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

{/* Modal */}
{showModal && selectedRequest && (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
                <h3 className="modal-title">تفاصيل الطلب</h3>
                <button 
                    className="modal-close"
                    onClick={() => setShowModal(false)}
                >
                    ×
                </button>
            </div>

            <div className="modal-body">
                <div className="request-detail">
                    <span className="request-label">اسم المستخدم:</span>
                    <span className="request-value">{selectedRequest.user.name}</span>
                </div>
                <div className="request-detail">
                    <span className="request-label">الباقة:</span>
                    <span className="request-value">{selectedRequest.events_package.package_title}</span>
                </div>
                <div className="request-detail">
                    <span className="request-label">التاريخ:</span>
                    <span className="request-value">
                        {parseMysqlDate(selectedRequest.event_date).toLocaleString('ar')}
                    </span>
                </div>
                <div className="request-detail">
                    <span className="request-label">الموقع:</span>
                    <span className="request-value">{selectedRequest.location || 'غير محدد'}</span>
                </div>
                <div className="request-detail">
                    <span className="request-label">عدد الزوار:</span>
                    <span className="request-value">{selectedRequest.nb_of_visitors || 'غير محدد'}</span>
                </div>
                <div className="request-detail">
                    <span className="request-label">رقم الهاتف:</span>
                    <span className="request-value">{selectedRequest.phone || 'غير محدد'}</span>
                </div>
                <div className="request-detail">
                    <span className="request-label">الحالة:</span>
                    <span className={`status-badge ${selectedRequest.status || 'pending'}`}>
                        {getStatusText(selectedRequest.status)}
                    </span>
                </div>
            </div>

            {/* Modal Actions - Smart Display Based on Date */}
            {isPastDate(selectedRequest.event_date) ? (
                // Past date - show history notice, NO BUTTONS
                <div style={{
                    padding: '1.5rem 2rem',
                    borderTop: '2px solid var(--color-primary-light)',
                }}>
                    <div className="history-notice" style={{margin: 0}}>
                        هذا الطلب ينتمي إلى السجل التاريخي ولا يمكن تعديله
                    </div>
                </div>
            ) : (
                // Future date - ALWAYS show buttons (can toggle status)
                <>
                    {/* Show hint if already processed */}
                    {selectedRequest.status && selectedRequest.status !== 'pending' && (
                        <div style={{
                            padding: '1rem 2rem',
                            borderTop: '2px solid var(--color-primary-light)',
                            background: 'linear-gradient(135deg, rgba(255, 243, 205, 0.3), rgba(255, 243, 205, 0.1))',
                            textAlign: 'center',
                            fontSize: '0.95rem',
                            color: '#856404',
                            fontWeight: '600'
                        }}>
                            💡 يمكنك تغيير الحالة إلى {selectedRequest.status === 'accepted' ? 'مرفوض' : 'مقبول'}
                        </div>
                    )}
                    
                    <div className="modal-actions">
                        <button
                            onClick={() => handleStatusChange(selectedRequest.id, 'accepted')}
                            disabled={selectedRequest.status === 'accepted'}
                            className="btn btn-accept"
                        >
                            {selectedRequest.status === 'accepted' ? '✓ مقبول حالياً' : '✓ قبول'}
                        </button>
                        <button
                            onClick={() => handleStatusChange(selectedRequest.id, 'rejected')}
                            disabled={selectedRequest.status === 'rejected'}
                            className="btn btn-reject"
                        >
                            {selectedRequest.status === 'rejected' ? '✗ مرفوض حالياً' : '✗ رفض'}
                        </button>
                    </div>
                </>
            )}
        </div>
    </div>
)}

                {/* Footer */}
                <footer className="main-footer">
                    <div className="footer-container">
                        <p>© 2025 المكتبة المتجولة. جميع الحقوق محفوظة.</p>
                        <p className="footer-links">
                            <a href="#">اتصل بنا</a>
                            <span> • </span>
                            <a href="#">سياسة الخصوصية</a>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}