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
            <Head title="إضافة باقة جديدة" />
            
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

                .add-package-page {
                    min-height: 100vh;
                    padding: 3rem 0;
                    position: relative;
                }

                .add-package-page::before {
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

                .add-package-page::after {
                    content: '';
                    position: fixed;
                    bottom: -30%;
                    left: -10%;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(74, 188, 157, 0.06) 0%, transparent 70%);
                    border-radius: 50%;
                    z-index: 0;
                    animation: float 25s ease-in-out infinite reverse;
                }

                @keyframes float {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(30px, -30px) rotate(5deg); }
                    66% { transform: translate(-20px, 20px) rotate(-5deg); }
                }

                .container {
                    width: 90%;
                    max-width: 900px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                .page-title {
                    font-size: 2.5rem;
                    margin-bottom: 2rem;
                    color: var(--color-primary);
                    font-weight: 900;
                    text-align: center;
                    animation: fadeInUp 0.6s ease-out;
                    position: relative;
                    display: inline-block;
                    width: 100%;
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

                .page-title::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    right: 50%;
                    transform: translateX(50%);
                    width: 120px;
                    height: 4px;
                    background: linear-gradient(90deg, var(--color-teal), var(--color-primary));
                    border-radius: 2px;
                }

                .package-form {
                    background: white;
                    padding: 3rem;
                    border-radius: 20px;
                    box-shadow: var(--shadow-lg);
                    border-right: 6px solid var(--color-teal);
                    position: relative;
                    animation: fadeInUp 0.6s ease-out 0.2s backwards;
                }

                .package-form::before {
                    content: '📦';
                    position: absolute;
                    top: -30px;
                    left: -30px;
                    font-size: 120px;
                    opacity: 0.04;
                    transform: rotate(-15deg);
                    pointer-events: none;
                }

                .form-group {
                    margin-bottom: 1.8rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.7rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    font-size: 1.05rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .form-group label::before {
                    content: '●';
                    color: var(--color-teal);
                    font-size: 0.7rem;
                }

                .form-group input,
                .form-group textarea,
                .form-group select {
                    width: 100%;
                    padding: 0.9rem 1.2rem;
                    border-radius: 12px;
                    border: 2px solid rgba(118, 73, 156, 0.15);
                    font-size: 1rem;
                    background: linear-gradient(135deg, #faf8ff 0%, #fff 100%);
                    transition: var(--transition);
                    font-family: inherit;
                }

                .form-group textarea {
                    resize: vertical;
                    min-height: 120px;
                    line-height: 1.7;
                }

                .form-group select {
                    cursor: pointer;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2376499C' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: left 1rem center;
                    padding-left: 2.5rem;
                }

                .form-group select[multiple] {
                    background-image: none;
                    padding-left: 1.2rem;
                    min-height: 150px;
                }

                .form-group input:focus,
                .form-group textarea:focus,
                .form-group select:focus {
                    outline: none;
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 4px rgba(118, 73, 156, 0.12);
                    background: white;
                    transform: translateY(-2px);
                }

                .form-group input::placeholder,
                .form-group textarea::placeholder {
                    color: #aaa;
                }

                .error-message {
                    color: #c62828;
                    font-size: 0.88rem;
                    margin-top: 0.5rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .error-message::before {
                    content: '⚠️';
                    font-size: 0.9rem;
                }

                .filter-section {
                    border-top: 3px solid var(--color-primary-light);
                    padding-top: 2rem;
                    margin-top: 2.5rem;
                    background: linear-gradient(135deg, rgba(118, 73, 156, 0.02), rgba(74, 188, 157, 0.03));
                    padding: 2rem;
                    border-radius: 16px;
                    position: relative;
                }

                .filter-section::before {
                    content: '🎯';
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    font-size: 2rem;
                    opacity: 0.3;
                }

                .filter-title {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: var(--color-primary);
                    margin-bottom: 0.8rem;
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                }

                .filter-title::before {
                    content: '';
                    width: 4px;
                    height: 30px;
                    background: linear-gradient(180deg, var(--color-teal), var(--color-primary));
                    border-radius: 2px;
                }

                .filter-description {
                    font-size: 0.95rem;
                    color: var(--color-text-light);
                    margin-bottom: 1.5rem;
                    line-height: 1.7;
                    padding: 1rem;
                    background: white;
                    border-radius: 8px;
                    border-right: 3px solid var(--color-yellow);
                }

                .grid-2 {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }

                .btn {
                    display: inline-block;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    text-decoration: none;
                    font-size: 1.1rem;
                    border: 2px solid transparent;
                    transition: var(--transition);
                    font-weight: 700;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    letter-spacing: 0.3px;
                }

                .btn::before {
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

                .btn:hover::before {
                    width: 400px;
                    height: 400px;
                }

                .btn-primary {
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-soft) 100%);
                    color: white;
                    box-shadow: 0 4px 15px rgba(118, 73, 156, 0.3);
                    width: 100%;
                    margin-top: 1.5rem;
                }

                .btn-primary:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(118, 73, 156, 0.4);
                }

                .btn-primary:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    margin-top: 2rem;
                    color: var(--color-teal);
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 1.05rem;
                    transition: var(--transition);
                    padding: 0.8rem 1.5rem;
                    border-radius: 50px;
                    background: white;
                    box-shadow: var(--shadow-sm);
                }

                .back-link::before {
                    content: '←';
                    font-size: 1.2rem;
                    transition: transform 0.3s ease;
                }

                .back-link:hover {
                    color: var(--color-primary);
                    transform: translateX(-5px);
                    box-shadow: var(--shadow-md);
                }

                .back-link:hover::before {
                    transform: translateX(-5px);
                }

                @media (max-width: 768px) {
                    .add-package-page {
                        padding: 2rem 0;
                    }

                    .page-title {
                        font-size: 1.9rem;
                    }

                    .package-form {
                        padding: 2rem 1.5rem;
                    }

                    .grid-2 {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }

                    .filter-section {
                        padding: 1.5rem 1rem;
                    }
                }

                @media (max-width: 480px) {
                    .page-title {
                        font-size: 1.6rem;
                    }

                    .package-form {
                        padding: 1.5rem 1.2rem;
                    }

                    .form-group {
                        margin-bottom: 1.3rem;
                    }

                    .btn-primary {
                        padding: 0.9rem 1.5rem;
                        font-size: 1rem;
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

            <div className="add-package-page">
                <div className="container">
                    <h1 className="page-title">إضافة باقة جديدة</h1>
                    
                    <form onSubmit={handleSubmit} className="package-form">
                        <div className="form-group">
                            <label htmlFor="package_title">عنوان الباقة</label>
                            <input
                                id="package_title"
                                type="text"
                                value={data.package_title}
                                onChange={e => setData('package_title', e.target.value)}
                                placeholder="أدخل عنوان الباقة"
                            />
                            {errors.package_title && (
                                <div className="error-message">{errors.package_title}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">الوصف</label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="اكتب وصف تفصيلي للباقة..."
                            />
                            {errors.description && (
                                <div className="error-message">{errors.description}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="main_image">رابط الصورة الرئيسية</label>
                            <input
                                id="main_image"
                                type="text"
                                value={data.main_image}
                                onChange={e => setData('main_image', e.target.value)}
                                placeholder="https://example.com/image.jpg"
                            />
                            {errors.main_image && (
                                <div className="error-message">{errors.main_image}</div>
                            )}
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label htmlFor="total_price">السعر الإجمالي</label>
                                <input
                                    id="total_price"
                                    type="number"
                                    step="0.01"
                                    value={data.total_price}
                                    onChange={e => setData('total_price', e.target.value)}
                                    placeholder="0.00"
                                />
                                {errors.total_price && (
                                    <div className="error-message">{errors.total_price}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="event_time">وقت الفعالية</label>
                                <input
                                    id="event_time"
                                    type="time"
                                    value={data.event_time}
                                    onChange={e => setData('event_time', e.target.value)}
                                />
                                {errors.event_time && (
                                    <div className="error-message">{errors.event_time}</div>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="activity_ids">الأنشطة (اختر عدة أنشطة)</label>
                            <select
                                id="activity_ids"
                                multiple
                                value={data.activity_ids || []}
                                onChange={e => {
                                    const selected = Array.from(e.target.selectedOptions, option => Number(option.value));
                                    setData('activity_ids', selected);
                                }}
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
                                <div className="error-message">{errors.activity_ids}</div>
                            )}
                        </div>

                        {/* FILTERING RULES SECTION */}
                        <div className="filter-section">
                            <h2 className="filter-title">قواعد التصفية</h2>
                            <p className="filter-description">
                                حدد معايير العمر والزوار والجنس المناسبة لهذه الباقة. سيتم عرض الباقة فقط للمستخدمين الذين يطابقون هذه المعايير.
                            </p>

                            {/* AGE RANGE */}
                            <div className="grid-2">
                                <div className="form-group">
                                    <label htmlFor="min_age">الحد الأدنى للعمر</label>
                                    <input
                                        id="min_age"
                                        type="number"
                                        value={data.min_age}
                                        onChange={e => setData('min_age', e.target.value)}
                                        placeholder="مثال: 4"
                                        min="4"
                                        max="20"
                                    />
                                    {errors.min_age && (
                                        <div className="error-message">{errors.min_age}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="max_age">الحد الأقصى للعمر</label>
                                    <input
                                        id="max_age"
                                        type="number"
                                        value={data.max_age}
                                        onChange={e => setData('max_age', e.target.value)}
                                        placeholder="مثال: 20"
                                        min="4"
                                        max="20"
                                    />
                                    {errors.max_age && (
                                        <div className="error-message">{errors.max_age}</div>
                                    )}
                                </div>
                            </div>

                            {/* VISITORS RANGE */}
                            <div className="grid-2">
                                <div className="form-group">
                                    <label htmlFor="min_visitors">الحد الأدنى لعدد الزوار</label>
                                    <input
                                        id="min_visitors"
                                        type="number"
                                        value={data.min_visitors}
                                        onChange={e => setData('min_visitors', e.target.value)}
                                        placeholder="مثال: 2"
                                        min="2"
                                    />
                                    {errors.min_visitors && (
                                        <div className="error-message">{errors.min_visitors}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="max_visitors">الحد الأقصى لعدد الزوار</label>
                                    <input
                                        id="max_visitors"
                                        type="number"
                                        value={data.max_visitors}
                                        onChange={e => setData('max_visitors', e.target.value)}
                                        placeholder="مثال: 50"
                                    />
                                    {errors.max_visitors && (
                                        <div className="error-message">{errors.max_visitors}</div>
                                    )}
                                </div>
                            </div>

                            {/* GENDER */}
                            <div className="form-group">
                                <label htmlFor="suitable_gender">الجنس المناسب</label>
                                <select
                                    id="suitable_gender"
                                    value={data.suitable_gender}
                                    onChange={e => setData('suitable_gender', e.target.value)}
                                >
                                    <option value="mixed">ذكور وإناث</option>
                                    <option value="male">ذكور فقط</option>
                                    <option value="female">إناث فقط</option>
                                </select>
                                {errors.suitable_gender && (
                                    <div className="error-message">{errors.suitable_gender}</div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-primary"
                        >
                            {processing ? 'جارٍ الحفظ...' : 'إضافة الباقة'}
                        </button>
                    </form>

                    <Link
                        href={route('event.packages')}
                        className="back-link"
                    >
                        العودة إلى الباقات
                    </Link>
                </div>
            </div>
        </>
    );
}
