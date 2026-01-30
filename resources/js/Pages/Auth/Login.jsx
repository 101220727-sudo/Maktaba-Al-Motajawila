import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
            // onSuccess: (response) => {
            //     // Check if the logged-in user is admin_news
            //     const userRole = response.props?.auth?.user?.role?.name;
                
            //     if (userRole === 'admin_news') {
            //         window.location.href = '/news';
            //     } else if (userRole === 'manager') {
            //         window.location.href = '/manager-dashboard';
            //     } else if (userRole === 'admin_events') {
            //         window.location.href = '/event-packages';
            //     }
            //     else {
            //         window.location.href = '/';
            //     }
            // }
        });
    };

    return (
        <>
            <Head title="تسجيل الدخول" />
            
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

                .login-page {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                .login-page::before {
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

                .login-page::after {
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

                .main-header {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(118, 73, 156, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    box-shadow: var(--shadow-sm);
                    transition: var(--transition);
                }

                .main-header::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, 
                        transparent 0%, 
                        var(--color-teal) 25%, 
                        var(--color-primary) 50%, 
                        var(--color-teal) 75%, 
                        transparent 100%
                    );
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .main-header:hover::after {
                    opacity: 1;
                }

                .nav-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.5rem 0;
                    width: 90%;
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;
                    animation: slideInRight 0.8s ease-out;
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .logo-img {
                    height: 90px;
                    width: auto;
                    filter: drop-shadow(0 4px 12px rgba(118, 73, 156, 0.2));
                    transition: var(--transition);
                }

                .logo-img:hover {
                    transform: scale(1.05) rotate(-2deg);
                    filter: drop-shadow(0 8px 16px rgba(118, 73, 156, 0.3));
                }

                .logo-text-wrap {
                    display: flex;
                    flex-direction: column;
                    gap: 0.2rem;
                }

                .logo-text-ar-big {
                    font-size: 2.2rem;
                    font-weight: 900;
                    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-teal) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1.2;
                    letter-spacing: -0.5px;
                }

                .logo-text-sub {
                    font-size: 1.05rem;
                    color: var(--color-text-light);
                    font-weight: 500;
                }

                .main-nav {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    animation: slideInLeft 0.8s ease-out;
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .main-nav a {
                    text-decoration: none;
                    color: var(--color-text);
                    font-size: 1.1rem;
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
                    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 2px;
                }

                .main-nav a:hover {
                    color: var(--color-primary);
                    transform: translateY(-2px);
                }

                .main-nav a:hover::before {
                    width: 100%;
                }

                .main-nav a.active {
                    color: var(--color-primary);
                }

                .main-nav a.active::before {
                    width: 100%;
                }

                .section {
                    padding: 4rem 0;
                    flex: 1;
                    position: relative;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                }

                .container {
                    width: 90%;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .section-title {
                    font-size: 2.2rem;
                    margin-bottom: 0.8rem;
                    color: var(--color-primary);
                    font-weight: 900;
                    text-align: center;
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

                .section-intro {
                    max-width: 600px;
                    margin: 0 auto 2rem;
                    color: var(--color-text-light);
                    text-align: center;
                    font-size: 1.1rem;
                    animation: fadeInUp 0.6s ease-out 0.1s backwards;
                }

                .login-form {
                    max-width: 500px;
                    margin: 0 auto;
                    background: white;
                    padding: 2.5rem 3rem;
                    border-radius: 20px;
                    box-shadow: var(--shadow-lg);
                    border-right: 6px solid var(--color-teal);
                    position: relative;
                    animation: fadeInUp 0.6s ease-out 0.2s backwards;
                }

                .login-form::before {
                    content: '🔐';
                    position: absolute;
                    top: -30px;
                    left: -30px;
                    font-size: 120px;
                    opacity: 0.04;
                    transform: rotate(-15deg);
                    pointer-events: none;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.6rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    font-size: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .form-group label::before {
                    content: '●';
                    color: var(--color-teal);
                    font-size: 0.7rem;
                }

                .form-group input {
                    width: 100%;
                    padding: 0.9rem 1.2rem;
                    border-radius: 12px;
                    border: 2px solid rgba(118, 73, 156, 0.15);
                    font-size: 1rem;
                    background: linear-gradient(135deg, #faf8ff 0%, #fff 100%);
                    transition: var(--transition);
                    font-family: inherit;
                }

                .form-group input:focus {
                    outline: none;
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 4px rgba(118, 73, 156, 0.12);
                    background: white;
                    transform: translateY(-2px);
                }

                .form-group input::placeholder {
                    color: #aaa;
                }

                .remember-checkbox {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    gap: 0.6rem;
                }

                .remember-checkbox input[type="checkbox"] {
                    width: 1.2rem;
                    height: 1.2rem;
                    cursor: pointer;
                    accent-color: var(--color-teal);
                }

                .remember-checkbox span {
                    font-size: 0.98rem;
                    color: var(--color-text-light);
                    font-weight: 500;
                }

                .btn {
                    display: inline-block;
                    padding: 0.9rem 1.8rem;
                    border-radius: 50px;
                    text-decoration: none;
                    font-size: 1.05rem;
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
                    margin-top: 0.5rem;
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

                .login-bottom {
                    text-align: center;
                    margin-top: 1.5rem;
                    font-size: 0.98rem;
                    color: var(--color-text-light);
                    line-height: 1.8;
                }

                .login-bottom a {
                    color: var(--color-teal);
                    text-decoration: none;
                    font-weight: 700;
                    transition: var(--transition);
                    position: relative;
                }

                .login-bottom a::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    right: 0;
                    width: 0;
                    height: 2px;
                    background: var(--color-teal);
                    transition: width 0.3s ease;
                }

                .login-bottom a:hover {
                    color: var(--color-primary);
                }

                .login-bottom a:hover::after {
                    width: 100%;
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

                .status-message {
                    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
                    border: 2px solid #28a745;
                    color: #155724;
                    padding: 1rem 1.3rem;
                    border-radius: 12px;
                    margin-bottom: 1.5rem;
                    text-align: center;
                    font-size: 0.98rem;
                    font-weight: 600;
                    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.15);
                    animation: slideDown 0.4s ease-out;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .status-message::before {
                    content: '✓';
                    margin-left: 0.5rem;
                    font-weight: bold;
                }

                .main-footer {
                    background: linear-gradient(135deg, #2a0845 0%, #3a0d63 100%);
                    color: #f3e9ff;
                    padding: 2rem 0;
                    margin-top: 1rem;
                    font-size: 0.98rem;
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
                    position: relative;
                }

                .footer-links a::after {
                    content: '';
                    position: absolute;
                    bottom: -3px;
                    right: 0;
                    width: 0;
                    height: 2px;
                    background: var(--color-teal);
                    transition: width 0.3s ease;
                }

                .footer-links a:hover {
                    color: white;
                }

                .footer-links a:hover::after {
                    width: 100%;
                }

                @media (max-width: 768px) {
                    .nav-container {
                        flex-direction: column;
                        gap: 1.5rem;
                        padding: 1.2rem 0;
                    }

                    .main-nav {
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 1rem;
                    }

                    .logo-img {
                        height: 70px;
                    }

                    .logo-text-ar-big {
                        font-size: 1.6rem;
                    }

                    .logo-text-sub {
                        font-size: 0.9rem;
                    }

                    .section {
                        padding: 3rem 0;
                    }

                    .section-title {
                        font-size: 1.7rem;
                    }

                    .login-form {
                        padding: 2rem 1.5rem;
                    }

                    .footer-container {
                        flex-direction: column;
                        text-align: center;
                        gap: 1rem;
                    }

                    .btn {
                        padding: 0.8rem 1.5rem;
                        font-size: 0.95rem;
                    }
                }

                @media (max-width: 480px) {
                    .logo {
                        flex-direction: column;
                        text-align: center;
                        gap: 0.8rem;
                    }

                    .logo-img {
                        height: 60px;
                    }

                    .section-title {
                        font-size: 1.5rem;
                    }

                    .login-form {
                        padding: 1.5rem 1.2rem;
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

            <div className="login-page">
                <header className="main-header">
                    <div className="nav-container">
                        <div className="logo">
                            <img src="/images/logo.png" alt="شعار المكتبة المتجولة" className="logo-img" />
                            <div className="logo-text-wrap">
                                <span className="logo-text-ar-big">مكتبة مهدي المتجولة</span>
                                <span className="logo-text-sub">مكتبة على عجلات تجوب المناطق اللبنانية</span>
                            </div>
                        </div>

                        <nav className="main-nav">
                            <Link href="/">الصفحة الرئيسية</Link>
                            <Link href={route('login')} className="active">تسجيل الدخول</Link>
                            <Link href={route('register')}>إنشاء حساب</Link>
                        </nav>
                    </div>
                </header>

                <section className="section">
                    <div className="container">
                        <h2 className="section-title">تسجيل الدخول</h2>
                        <p className="section-intro">أدخل بياناتك لتسجيل الدخول إلى حسابك.</p>

                        {status && (
                            <div className="status-message">
                                {status}
                            </div>
                        )}

                        <form className="login-form" onSubmit={submit}>
                            <div className="form-group">
                                <label htmlFor="email">البريد الإلكتروني</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    placeholder="example@domain.com"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && (
                                    <div className="error-message">{errors.email}</div>
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
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && (
                                    <div className="error-message">{errors.password}</div>
                                )}
                            </div>

                            <div className="remember-checkbox">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span>تذكرني</span>
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                {processing ? 'جاري تسجيل الدخول...' : 'دخول'}
                            </button>

                            <p className="login-bottom">
                                {canResetPassword && (
                                    <>
                                        <Link href={route('password.request')}>
                                            نسيت كلمة المرور؟
                                        </Link>
                                        <br />
                                    </>
                                )}
                                ليس لديك حساب؟{' '}
                                <Link href={route('register')}>إنشاء حساب جديد</Link>
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
