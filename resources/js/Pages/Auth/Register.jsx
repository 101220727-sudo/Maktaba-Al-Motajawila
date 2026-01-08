
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { useState, useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        type_id: '',
    });

const submit = (e) => {
    e.preventDefault();

    post(route('register'), {
        onFinish: () => reset('password', 'password_confirmation'),
        onSuccess: () => {
            window.location.href = '/';
        }
    });
};

    const [types, setTypes] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/user-types')
            .then(res => res.json())
            .then(data => setTypes(data))
            .catch(err => console.error('Error fetching types:', err));
    }, []);

    return (
        <>
            <Head title="Register" />
            
            <style>{`
                :root {
                    --color-primary: #76499C;
                    --color-primary-soft: #A189B7;
                    --color-teal: #4ABC9D;
                    --color-yellow: #F2C94C;
                    --color-bg: #F9F7FB;
                    --color-text: #222222;
                }

                body {
                    font-family: "Tajawal", "Cairo", system-ui, sans-serif;
                    background-color: var(--color-bg);
                    color: var(--color-text);
                    line-height: 1.7;
                    direction: rtl;
                    margin: 0;
                    padding: 0;
                }

                .register-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }

                .main-header {
                    background-color: #ffffff;
                    border-bottom: 2px solid rgba(118, 73, 156, 0.15);
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                }

                .nav-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.3rem 0;
                    width: 90%;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .logo-img {
                    height: 85px;
                    width: auto;
                }

                .logo-text-wrap {
                    display: flex;
                    flex-direction: column;
                }

                .logo-text-ar-big {
                    font-size: 2rem;
                    font-weight: 800;
                    color: var(--color-primary);
                    line-height: 1.2;
                }

                .logo-text-sub {
                    font-size: 1.05rem;
                    color: var(--color-teal);
                }

                .main-nav {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .main-nav a {
                    text-decoration: none;
                    color: #333;
                    font-size: 1.15rem;
                    font-weight: 600;
                    transition: color 0.3s ease;
                }

                .main-nav a:hover {
                    color: var(--color-primary);
                }

                .main-nav a.active {
                    color: var(--color-primary);
                    border-bottom: 3px solid var(--color-teal);
                    padding-bottom: 0.3rem;
                }

                .section {
                    padding: 2.5rem 0;
                    background: linear-gradient(
                        135deg,
                        rgba(118, 73, 156, 0.04),
                        rgba(74, 188, 157, 0.06)
                    );
                    flex: 1;
                }

                .container {
                    width: 90%;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .section-title {
                    font-size: 1.7rem;
                    margin-bottom: 0.8rem;
                    color: var(--color-primary);
                    font-weight: 700;
                    text-align: center;
                }

                .section-intro {
                    max-width: 700px;
                    margin: 0 auto 1.8rem;
                    color: #444;
                    text-align: center;
                }

                .register-form {
                    max-width: 480px;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 2rem 2.2rem;
                    border-radius: 1.1rem;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
                    border-right: 6px solid var(--color-teal);
                }

                .form-group {
                    margin-bottom: 1.2rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.35rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    font-size: 0.98rem;
                }

                .form-group input,
                .form-group select {
                    width: 100%;
                    padding: 0.75rem 0.8rem;
                    border-radius: 0.7rem;
                    border: 1px solid rgba(0,0,0,0.12);
                    font-size: 0.98rem;
                    background-color: #faf8ff;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
                    font-family: inherit;
                }

                .form-group input:focus,
                .form-group select:focus {
                    outline: none;
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 3px rgba(118,73,156,0.18);
                    background-color: #fff;
                }

                .btn {
                    display: inline-block;
                    padding: 0.7rem 1.3rem;
                    border-radius: 999px;
                    text-decoration: none;
                    font-size: 1rem;
                    border: 1px solid transparent;
                    transition: all 0.25s ease;
                    font-weight: 600;
                    cursor: pointer;
                }

                .btn-primary {
                    background-color: var(--color-primary);
                    color: #fff;
                    width: 100%;
                    margin-top: 0.5rem;
                    font-size: 1.05rem;
                }

                .btn-primary:hover:not(:disabled) {
                    opacity: 0.95;
                }

                .btn-primary:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .login-link {
                    text-align: center;
                    margin-top: 1rem;
                    font-size: 0.95rem;
                }

                .login-link a {
                    color: var(--color-teal);
                    text-decoration: none;
                    font-weight: 600;
                }

                .login-link a:hover {
                    text-decoration: underline;
                }

                .error-message {
                    color: #c62828;
                    font-size: 0.85rem;
                    margin-top: 0.35rem;
                }

                .main-footer {
                    background-color: #3a0d63;
                    color: #f3e9ff;
                    padding: 1rem 0;
                    margin-top: 0.5rem;
                    font-size: 0.95rem;
                }

                .footer-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                    width: 90%;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .footer-links {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .footer-links a {
                    color: #e0cffc;
                    text-decoration: none;
                }

                .footer-links a:hover {
                    text-decoration: underline;
                }

                @media (max-width: 768px) {
                    .nav-container {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .main-nav {
                        flex-wrap: wrap;
                        justify-content: center;
                    }

                    .logo-img {
                        height: 60px;
                    }

                    .logo-text-ar-big {
                        font-size: 1.3rem;
                    }

                    .footer-container {
                        flex-direction: column;
                        text-align: center;
                    }

                    .register-form {
                        padding: 1.4rem 1.2rem;
                    }
                }
            `}</style>

            <div className="register-page">
                <header className="main-header">
                    <div className="nav-container">
                        <div className="logo">
                            <img src="/assets/images/logo.png" alt="شعار المكتبة المتجولة" className="logo-img" />
                            <div className="logo-text-wrap">
                                <span className="logo-text-ar-big">مكتبة مهدي المتجولة</span>
                                <span className="logo-text-sub">مكتبة على عجلات تجوب المناطق اللبنانية</span>
                            </div>
                        </div>

                        <nav className="main-nav">
                            <Link href="/">الصفحة الرئيسية</Link>
                            <Link href={route('login')}>تسجيل الدخول</Link>
                            <Link href={route('register')} className="active">إنشاء حساب</Link>
                        </nav>
                    </div>
                </header>

                <section className="section">
                    <div className="container">
                        <h2 className="section-title">إنشاء حساب جديد</h2>
                        <p className="section-intro">املأ البيانات التالية لإكمال عملية إنشاء الحساب.</p>

                        <form className="register-form" onSubmit={submit}>

                            <div className="form-group">
                                <label htmlFor="type_id">الجهة</label>
                                <select
                                    id="type_id"
                                    value={data.type_id}
                                    onChange={e => setData('type_id', e.target.value)}
                                    required
                                >
                                    <option value="">اختر الجهة</option>
                                    {types.map(t => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                                {errors.type_id && (
                                    <div className="error-message">{errors.type_id}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">الاسم الكامل</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    placeholder="أدخل اسمك الكامل"
                                    autoComplete="name"
                                    autoFocus
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && (
                                    <div className="error-message">{errors.name}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">البريد الإلكتروني الرسمي</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    placeholder="example@domain.com"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && (
                                    <div className="error-message">{errors.email}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">رقم الهاتف</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={data.phone}
                                    placeholder="03 123 456"
                                    autoComplete="tel"
                                    onChange={(e) => setData('phone', e.target.value)}
                                    required
                                />
                                {errors.phone && (
                                    <div className="error-message">{errors.phone}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">كلمة المرور</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    placeholder="********"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && (
                                    <div className="error-message">{errors.password}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_confirmation">تأكيد كلمة المرور</label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    placeholder="********"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                {errors.password_confirmation && (
                                    <div className="error-message">{errors.password_confirmation}</div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                تسجيل
                            </button>

                            <p className="login-link">
                                لديك حساب؟ <Link href={route('login')}>تسجيل الدخول</Link>
                            </p>

                        </form>
                    </div>
                </section>

                <footer className="main-footer">
                    <div className="footer-container">
                        <p>© 2025 جميع الحقوق محفوظة</p>
                        <div className="footer-links">
                            <a href="#">سياسة الخصوصية</a>
                            <a href="#">تواصل معنا</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}