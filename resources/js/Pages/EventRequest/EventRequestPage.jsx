
// // import React, { useState } from 'react';
// // import { Head, Link, router } from '@inertiajs/react';
// // import axios from 'axios';


// // export default function EventRequestPage({ auth, packages, selectedPackageId }) {
// //     const user = auth?.user;
// //     const [showDropdown, setShowDropdown] = useState(false);
// //     const role = user?.role?.name;
    
// //     // Role checks
// //     const isRegisteredUser = role === 'registered_user';
// //     const isAdminNews = role === 'admin_news';
// //     const isAdminEvents = role === 'admin_events';

// //     const [form, setForm] = useState({
// //         event_package_id: selectedPackageId || '',
// //         event_date: '',
// //         location: '',
// //         age: '',
// //         nb_of_visitors: '',
// //         phone: user?.phone || '', // Pre-fill with user's phone from database
// //     });

// //     const handleChange = (e) => {
// //         setForm({ ...form, [e.target.name]: e.target.value });
// //     };

// // const handleSubmit = (e) => {
// //     e.preventDefault();
    
// //     // Store form data in sessionStorage to use later when requesting package
// //     sessionStorage.setItem('eventRequestData', JSON.stringify({
// //         event_date: form.event_date,
// //         location: form.location,
// //         age: form.age,
// //         nb_of_visitors: form.nb_of_visitors,
// //         gender: form.gender,
// //         phone: form.phone
// //     }));
    
// //     // Redirect to packages page with filters in URL
// //     router.visit(route('event.packages'), {
// //         method: 'get',
// //         data: {
// //             age: form.age,
// //             visitors: form.nb_of_visitors,  // Note: 'visitors' not 'nb_of_visitors'
// //             gender: form.gender
// //         }
// //     });
// // };


// //     return (
// //         <>
// //             <Head title="طلب زيارة" />
            
// //             <style>{`
// //                 :root {
// //                     --color-primary: #76499C;
// //                     --color-primary-soft: #A189B7;
// //                     --color-teal: #4ABC9D;
// //                     --color-yellow: #F2C94C;
// //                     --color-bg: #F9F7FB;
// //                     --color-text: #222222;
// //                 }

// //                 * {
// //                     margin: 0;
// //                     padding: 0;
// //                     box-sizing: border-box;
// //                 }

// //                 body {
// //                     font-family: "Tajawal", "Cairo", system-ui, sans-serif;
// //                     background-color: var(--color-bg);
// //                     color: var(--color-text);
// //                     line-height: 1.7;
// //                     direction: rtl;
// //                 }

// //                 .event-request-page {
// //                     min-height: 100vh;
// //                     display: flex;
// //                     flex-direction: column;
// //                 }

// //                 .main-header {
// //                     background-color: #ffffff;
// //                     border-bottom: 2px solid rgba(118, 73, 156, 0.15);
// //                     position: sticky;
// //                     top: 0;
// //                     z-index: 10;
// //                     box-shadow: 0 4px 10px rgba(0,0,0,0.05);
// //                 }

// //                 .nav-container {
// //                     display: flex;
// //                     align-items: center;
// //                     justify-content: space-between;
// //                     padding: 1.3rem 0;
// //                     width: 90%;
// //                     max-width: 1100px;
// //                     margin: 0 auto;
// //                 }

// //                 .logo {
// //                     display: flex;
// //                     align-items: center;
// //                     gap: 1rem;
// //                 }

// //                 .logo-img {
// //                     height: 85px;
// //                     width: auto;
// //                 }

// //                 .logo-text-wrap {
// //                     display: flex;
// //                     flex-direction: column;
// //                 }

// //                 .logo-text-ar-big {
// //                     font-size: 2rem;
// //                     font-weight: 800;
// //                     color: var(--color-primary);
// //                     line-height: 1.2;
// //                 }

// //                 .logo-text-sub {
// //                     font-size: 1.05rem;
// //                     color: var(--color-teal);
// //                 }

// //                 .main-nav {
// //                     display: flex;
// //                     align-items: center;
// //                     gap: 1.5rem;
// //                 }

// //                 .main-nav a {
// //                     text-decoration: none;
// //                     color: #333;
// //                     font-size: 1.15rem;
// //                     font-weight: 600;
// //                     transition: color 0.3s ease;
// //                 }

// //                 .main-nav a:hover {
// //                     color: var(--color-primary);
// //                 }

// //                 .main-nav a.active {
// //                     color: var(--color-primary);
// //                     border-bottom: 3px solid var(--color-teal);
// //                     padding-bottom: 0.3rem;
// //                 }

// //                 .user-menu {
// //                     position: relative;
// //                 }

// //                 .user-button {
// //                     display: inline-flex;
// //                     align-items: center;
// //                     padding: 0.5rem 1rem;
// //                     border-radius: 999px;
// //                     background-color: var(--color-primary);
// //                     color: white;
// //                     font-size: 1rem;
// //                     font-weight: 600;
// //                     border: none;
// //                     cursor: pointer;
// //                     transition: opacity 0.3s ease;
// //                 }

// //                 .user-button:hover {
// //                     opacity: 0.9;
// //                 }

// //                 .user-button svg {
// //                     margin-right: 0.5rem;
// //                     width: 1rem;
// //                     height: 1rem;
// //                 }

// //                 .dropdown-menu {
// //                     position: absolute;
// //                     left: 0;
// //                     top: 100%;
// //                     margin-top: 0.5rem;
// //                     background-color: white;
// //                     border-radius: 0.7rem;
// //                     box-shadow: 0 10px 25px rgba(0,0,0,0.1);
// //                     min-width: 200px;
// //                     overflow: hidden;
// //                     z-index: 50;
// //                 }

// //                 .dropdown-item {
// //                     display: block;
// //                     padding: 0.75rem 1rem;
// //                     color: #333;
// //                     text-decoration: none;
// //                     transition: background-color 0.2s ease;
// //                     font-size: 0.95rem;
// //                 }

// //                 .dropdown-item:hover {
// //                     background-color: rgba(118, 73, 156, 0.08);
// //                 }

// //                 .section {
// //                     padding: 2.5rem 0;
// //                     flex: 1;
// //                     background: linear-gradient(
// //                         135deg,
// //                         rgba(118, 73, 156, 0.04),
// //                         rgba(74, 188, 157, 0.06)
// //                     );
// //                 }

// //                 .container {
// //                     width: 90%;
// //                     max-width: 1100px;
// //                     margin: 0 auto;
// //                 }

// //                 .section-title {
// //                     font-size: 1.7rem;
// //                     margin-bottom: 0.8rem;
// //                     color: var(--color-primary);
// //                     font-weight: 700;
// //                     text-align: center;
// //                 }

// //                 .section-intro {
// //                     max-width: 700px;
// //                     margin: 0 auto 1.8rem;
// //                     color: #444;
// //                     text-align: center;
// //                 }

// //                 .event-form {
// //                     max-width: 650px;
// //                     margin: 0 auto;
// //                     background-color: #fff;
// //                     padding: 2rem 2.2rem;
// //                     border-radius: 1.1rem;
// //                     box-shadow: 0 10px 25px rgba(0,0,0,0.06);
// //                     border-right: 6px solid var(--color-teal);
// //                 }

// //                 .form-group {
// //                     margin-bottom: 1.2rem;
// //                 }

// //                 .form-group label {
// //                     display: block;
// //                     margin-bottom: 0.4rem;
// //                     font-weight: 700;
// //                     color: var(--color-primary);
// //                     font-size: 0.98rem;
// //                 }

// //                 .form-group input,
// //                 .form-group select {
// //                     width: 100%;
// //                     padding: 0.75rem 0.9rem;
// //                     border-radius: 0.7rem;
// //                     border: 1px solid rgba(0,0,0,0.12);
// //                     font-size: 0.98rem;
// //                     background-color: #faf8ff;
// //                     transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
// //                     font-family: inherit;
// //                 }

// //                 .form-group input:focus,
// //                 .form-group select:focus {
// //                     outline: none;
// //                     border-color: var(--color-primary);
// //                     box-shadow: 0 0 0 3px rgba(118,73,156,0.18);
// //                     background-color: #fff;
// //                 }

// //                 .btn {
// //                     display: inline-block;
// //                     padding: 0.7rem 1.3rem;
// //                     border-radius: 999px;
// //                     text-decoration: none;
// //                     font-size: 1rem;
// //                     border: 1px solid transparent;
// //                     transition: all 0.25s ease;
// //                     font-weight: 600;
// //                     cursor: pointer;
// //                 }

// //                 .btn-primary {
// //                     background-color: var(--color-primary);
// //                     color: #fff;
// //                     width: 100%;
// //                     margin-top: 0.5rem;
// //                     font-size: 1.05rem;
// //                 }

// //                 .btn-primary:hover:not(:disabled) {
// //                     opacity: 0.95;
// //                 }

// //                 .btn-primary:disabled {
// //                     opacity: 0.6;
// //                     cursor: not-allowed;
// //                 }

// //                 .no-packages {
// //                     text-align: center;
// //                     padding: 2rem;
// //                     background-color: #fff3cd;
// //                     border: 1px solid #ffc107;
// //                     border-radius: 0.7rem;
// //                     color: #856404;
// //                     margin-bottom: 1rem;
// //                 }

// //                 .main-footer {
// //                     background-color: #3a0d63;
// //                     color: #f3e9ff;
// //                     padding: 1rem 0;
// //                     margin-top: 0.5rem;
// //                     font-size: 0.95rem;
// //                 }

// //                 .footer-container {
// //                     display: flex;
// //                     align-items: center;
// //                     justify-content: space-between;
// //                     gap: 1rem;
// //                     width: 90%;
// //                     max-width: 1100px;
// //                     margin: 0 auto;
// //                 }

// //                 .footer-links {
// //                     display: flex;
// //                     align-items: center;
// //                     gap: 0.5rem;
// //                 }

// //                 .footer-links a {
// //                     color: #e0cffc;
// //                     text-decoration: none;
// //                 }

// //                 .footer-links a:hover {
// //                     text-decoration: underline;
// //                 }

// //                 @media (max-width: 768px) {
// //                     .nav-container {
// //                         flex-direction: column;
// //                         gap: 1rem;
// //                     }

// //                     .main-nav {
// //                         flex-wrap: wrap;
// //                         justify-content: center;
// //                     }

// //                     .logo-img {
// //                         height: 60px;
// //                     }

// //                     .logo-text-ar-big {
// //                         font-size: 1.3rem;
// //                     }

// //                     .event-form {
// //                         padding: 1.5rem 1.2rem;
// //                     }

// //                     .footer-container {
// //                         flex-direction: column;
// //                         text-align: center;
// //                     }
// //                 }
// //             `}</style>

// //             <div className="event-request-page">
// //                 <header className="main-header">
// //                     <div className="nav-container">
// //                         <div className="logo">
// //                             <img src="/assets/images/logo.png" alt="شعار المكتبة المتجولة" className="logo-img" />
// //                             <div className="logo-text-wrap">
// //                                 <span className="logo-text-ar-big">مكتبة مهدي المتجولة</span>
// //                                 <span className="logo-text-sub">مكتبة على عجلات تجوب المناطق اللبنانية</span>
// //                             </div>
// //                         </div>

// //                         <nav className="main-nav">
// //                             <Link href="/">الصفحة الرئيسية</Link>
// //                             <Link href={route('news')}>الأخبار</Link>
// //                             {/* <Link href={route('event.packages')}>الفعاليات</Link> */}

// //                             {user ? (
// //                                 <div className="user-menu">
// //                                     <button 
// //                                         className="user-button"
// //                                         onClick={() => setShowDropdown(!showDropdown)}
// //                                     >
// //                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
// //                                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
// //                                         </svg>
// //                                         {user.name}
// //                                     </button>
                                    
// //                                     {showDropdown && (
// //                                         <div className="dropdown-menu">

// //                                             <Link href={route('profile.edit')} className="dropdown-item">
// //                                                 الملف الشخصي
// //                                             </Link>

// //                                             <Link href={route('logout')} method="post" as="button" className="dropdown-item">
// //                                                 تسجيل الخروج
// //                                             </Link>
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             ) : (
// //                                 <>
// //                                     <Link href={route('login')}>تسجيل الدخول</Link>
// //                                     <Link href={route('register')}>انشاء حساب</Link>
// //                                 </>
// //                             )}
// //                         </nav>
// //                     </div>
// //                 </header>

// //                 <section className="section">
// //                     <div className="container">
// //                         <h2 className="section-title">طلب زيارة المكتبة المتجولة</h2>
// //                         <p className="section-intro">
// //                             املأ النموذج التالي لحجز زيارة المكتبة المتجولة لمؤسستك أو مجموعتك.
// //                         </p>

// //                         <form className="event-form" onSubmit={handleSubmit}>
                            
// //                             {/* drore {packages && packages.length > 0 ? (
// //                                 <div className="form-group">
// //                                     <label htmlFor="event_package_id">اختر الباقة</label>
// //                                     <select
// //                                         id="event_package_id"
// //                                         name="event_package_id"
// //                                         onChange={handleChange}
// //                                         value={form.event_package_id}
// //                                         required
// //                                     >
// //                                         <option value="">اختر باقة الفعالية...</option>
// //                                         {packages.map(pkg => (
// //                                             <option key={pkg.id} value={pkg.id}>{pkg.package_title}</option>
// //                                         ))}
// //                                     </select>
// //                                 </div>
// //                             ) : (
// //                                 <div className="no-packages">
// //                                     لا توجد باقات فعاليات متاحة حاليًا.
// //                                 </div>
// //                             )} */}



// // <div className="form-group">
// //     <label htmlFor="age">العمر</label>
// //     <input 
// //         type="number" 
// //         id="age"
// //         name="age" 
// //         placeholder="العمر..."
// //         onChange={handleChange}
// //         value={form.age}
// //         min="4"
// //         max="18"
// //         required 
// //     />
// // </div>

// //                             <div className="form-group">
// //                                 <label htmlFor="nb_of_visitors">عدد الزوار المتوقع</label>
// //                                 <input 
// //                                     type="number" 
// //                                     id="nb_of_visitors"
// //                                     name="nb_of_visitors" 
// //                                     placeholder="عدد المشاركين..."
// //                                     onChange={handleChange}
// //                                     value={form.nb_of_visitors}
// //                                             min="2"

// //                                     required 
// //                                 />
// //                             </div>

// //                             <div className="form-group">
// //     <label htmlFor="gender">الجنس</label>
// //     <select 
// //         id="gender"
// //         name="gender" 
// //         onChange={handleChange}
// //         value={form.gender}
// //         required
// //     >
// //         <option value="male">ذكور</option>
// //         <option value="female">إناث</option>
// //         <option value="mixed">ذكور وإناث</option>
// //     </select>
// // </div>

// // <div className="form-group">
// //     <label htmlFor="event_date">تاريخ ووقت الزيارة المطلوب</label>
// //     <input 
// //         type="datetime-local" 
// //         id="event_date"
// //         name="event_date" 
// //         onChange={handleChange}
// //         value={form.event_date}
// //         min={new Date().toISOString().slice(0, 16)}
// //         required 
// //     />
// // </div>

// //                             <div className="form-group">
// //                                 <label htmlFor="location">الموقع</label>
// //                                 <input 
// //                                     type="text" 
// //                                     id="location"
// //                                     name="location" 
// //                                     placeholder="الموقع..."
// //                                     onChange={handleChange}
// //                                     value={form.location}
// //                                     required 
// //                                 />
// //                             </div>

// //                             <div className="form-group">
// //                                 <label htmlFor="phone">رقم الهاتف</label>
// //                                 <input 
// //                                     type="text" 
// //                                     id="phone"
// //                                     name="phone" 
// //                                     placeholder="رقم الهاتف للتواصل..."
// //                                     onChange={handleChange}
// //                                     value={form.phone}
// //                                     required 
// //                                 />
// //                             </div>

// //                             <button type="submit" className="btn btn-primary">
// //                                 إرسال الطلب
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </section>

// //                 <footer className="main-footer">
// //                     <div className="footer-container">
// //                         <p>© 2025 المكتبة المتجولة. جميع الحقوق محفوظة.</p>
// //                         <p className="footer-links">
// //                             <a href="#">اتصل بنا</a>
// //                             <span> • </span>
// //                             <a href="#">سياسة الخصوصية</a>
// //                         </p>
// //                     </div>
// //                 </footer>
// //             </div>
// //         </>
// //     );
// // }



// import React, { useState, useEffect } from 'react';
// import { Head, Link, router } from '@inertiajs/react';
// import axios from 'axios';

// export default function EventRequestPage({ auth, allPackages }) {
//     const user = auth?.user;
//     const [showDropdown, setShowDropdown] = useState(false);
//     const role = user?.role?.name;
    
//     // Role checks
//     const isRegisteredUser = role === 'registered_user';
//     const isAdminNews = role === 'admin_news';
//     const isAdminEvents = role === 'admin_events';

//     // Step management
//     const [currentStep, setCurrentStep] = useState(1);
//     const [filteredPackages, setFilteredPackages] = useState([]);

//     const [form, setForm] = useState({
//         event_package_id: '',
//         event_date: '',
//         location: '',
//         age: '',
//         nb_of_visitors: '',
//         gender: 'male',
//         phone: user?.phone || '',
//     });

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     // Step 1: Submit form and filter packages
//     const handleStep1Submit = (e) => {
//         e.preventDefault();
        
//         // Filter packages based on criteria
//         const filtered = allPackages.filter(pkg => {
//             const packageRules = {
//                 1: { min_age: 4, max_age: 7, min_visitors: 10, max_visitors: 20, suitable_gender: 'mixed' },
//                 2: { min_age: 8, max_age: 12, min_visitors: 15, max_visitors: 30, suitable_gender: 'mixed' },
//                 3: { min_age: 13, max_age: 18, min_visitors: 20, max_visitors: 50, suitable_gender: 'mixed' },
//             };

//             const rules = packageRules[pkg.id];
//             if (!rules) return true;

//             // Check age
//             if (form.age && (parseInt(form.age) < rules.min_age || parseInt(form.age) > rules.max_age)) {
//                 return false;
//             }

//             // Check visitors
//             if (form.nb_of_visitors && (parseInt(form.nb_of_visitors) < rules.min_visitors || parseInt(form.nb_of_visitors) > rules.max_visitors)) {
//                 return false;
//             }

//             // Check gender
//             if (form.gender && rules.suitable_gender !== 'mixed' && rules.suitable_gender !== form.gender) {
//                 return false;
//             }

//             return true;
//         });

//         setFilteredPackages(filtered);
//         setCurrentStep(2);
//     };

//     // Step 2: Select package and go to confirmation
//     const handlePackageSelect = (packageId) => {
//         setForm({ ...form, event_package_id: packageId });
//         setCurrentStep(3);
//     };

//     // Step 3: Final submission
//     const handleFinalSubmit = (e) => {
//         e.preventDefault();

//         axios.post('/event-requests', form)
//             .then(res => {
//                 alert(res.data.message || 'تم إرسال الطلب بنجاح!');
//                 router.visit('/my-event-requests');
//             })
//             .catch(err => {
//                 if (err.response) {
//                     alert('فشل الإرسال: ' + JSON.stringify(err.response.data.errors));
//                 } else {
//                     alert('فشل في تقديم الطلب');
//                 }
//             });
//     };

//     const selectedPackage = allPackages.find(pkg => pkg.id === parseInt(form.event_package_id));

//     return (
//         <>
//             <Head title="طلب زيارة" />
            
//             <style>{`
//                 :root {
//                     --color-primary: #76499C;
//                     --color-primary-soft: #A189B7;
//                     --color-teal: #4ABC9D;
//                     --color-yellow: #F2C94C;
//                     --color-bg: #F9F7FB;
//                     --color-text: #222222;
//                 }

//                 * {
//                     margin: 0;
//                     padding: 0;
//                     box-sizing: border-box;
//                 }

//                 body {
//                     font-family: "Tajawal", "Cairo", system-ui, sans-serif;
//                     background-color: var(--color-bg);
//                     color: var(--color-text);
//                     line-height: 1.7;
//                     direction: rtl;
//                 }

//                 .event-request-page {
//                     min-height: 100vh;
//                     display: flex;
//                     flex-direction: column;
//                 }

//                 .main-header {
//                     background-color: #ffffff;
//                     border-bottom: 2px solid rgba(118, 73, 156, 0.15);
//                     position: sticky;
//                     top: 0;
//                     z-index: 10;
//                     box-shadow: 0 4px 10px rgba(0,0,0,0.05);
//                 }

//                 .nav-container {
//                     display: flex;
//                     align-items: center;
//                     justify-content: space-between;
//                     padding: 1.3rem 0;
//                     width: 90%;
//                     max-width: 1100px;
//                     margin: 0 auto;
//                 }

//                 .logo {
//                     display: flex;
//                     align-items: center;
//                     gap: 1rem;
//                 }

//                 .logo-img {
//                     height: 85px;
//                     width: auto;
//                 }

//                 .logo-text-wrap {
//                     display: flex;
//                     flex-direction: column;
//                 }

//                 .logo-text-ar-big {
//                     font-size: 2rem;
//                     font-weight: 800;
//                     color: var(--color-primary);
//                     line-height: 1.2;
//                 }

//                 .logo-text-sub {
//                     font-size: 1.05rem;
//                     color: var(--color-teal);
//                 }

//                 .main-nav {
//                     display: flex;
//                     align-items: center;
//                     gap: 1.5rem;
//                 }

//                 .main-nav a {
//                     text-decoration: none;
//                     color: #333;
//                     font-size: 1.15rem;
//                     font-weight: 600;
//                     transition: color 0.3s ease;
//                 }

//                 .main-nav a:hover {
//                     color: var(--color-primary);
//                 }

//                 .user-menu {
//                     position: relative;
//                 }

//                 .user-button {
//                     display: inline-flex;
//                     align-items: center;
//                     padding: 0.5rem 1rem;
//                     border-radius: 999px;
//                     background-color: var(--color-primary);
//                     color: white;
//                     font-size: 1rem;
//                     font-weight: 600;
//                     border: none;
//                     cursor: pointer;
//                     transition: opacity 0.3s ease;
//                 }

//                 .user-button:hover {
//                     opacity: 0.9;
//                 }

//                 .user-button svg {
//                     margin-right: 0.5rem;
//                     width: 1rem;
//                     height: 1rem;
//                 }

//                 .dropdown-menu {
//                     position: absolute;
//                     left: 0;
//                     top: 100%;
//                     margin-top: 0.5rem;
//                     background-color: white;
//                     border-radius: 0.7rem;
//                     box-shadow: 0 10px 25px rgba(0,0,0,0.1);
//                     min-width: 200px;
//                     overflow: hidden;
//                     z-index: 50;
//                 }

//                 .dropdown-item {
//                     display: block;
//                     padding: 0.75rem 1rem;
//                     color: #333;
//                     text-decoration: none;
//                     transition: background-color 0.2s ease;
//                     font-size: 0.95rem;
//                 }

//                 .dropdown-item:hover {
//                     background-color: rgba(118, 73, 156, 0.08);
//                 }

//                 /* Progress Bar Styles */
//                 .progress-container {
//                     max-width: 800px;
//                     margin: 2rem auto 3rem;
//                     padding: 0 1rem;
//                 }

//                 .progress-bar {
//                     display: flex;
//                     justify-content: space-between;
//                     align-items: center;
//                     position: relative;
//                     margin-bottom: 3rem;
//                 }

//                 .progress-bar::before {
//                     content: '';
//                     position: absolute;
//                     top: 50%;
//                     left: 0;
//                     right: 0;
//                     height: 4px;
//                     background: #e0e0e0;
//                     transform: translateY(-50%);
//                     z-index: 0;
//                 }

//                 .progress-bar::after {
//                     content: '';
//                     position: absolute;
//                     top: 50%;
//                     left: 0;
//                     height: 4px;
//                     background: linear-gradient(90deg, var(--color-teal), var(--color-primary));
//                     transform: translateY(-50%);
//                     z-index: 1;
//                     transition: width 0.4s ease;
//                     width: ${currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'};
//                 }

//                 .progress-step {
//                     display: flex;
//                     flex-direction: column;
//                     align-items: center;
//                     z-index: 2;
//                     position: relative;
//                 }

//                 .progress-circle {
//                     width: 50px;
//                     height: 50px;
//                     border-radius: 50%;
//                     background: white;
//                     border: 4px solid #e0e0e0;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     font-weight: 700;
//                     font-size: 1.2rem;
//                     color: #999;
//                     transition: all 0.3s ease;
//                     margin-bottom: 0.5rem;
//                 }

//                 .progress-step.active .progress-circle {
//                     background: linear-gradient(135deg, var(--color-primary), var(--color-teal));
//                     border-color: var(--color-primary);
//                     color: white;
//                     box-shadow: 0 4px 15px rgba(118, 73, 156, 0.4);
//                 }

//                 .progress-step.completed .progress-circle {
//                     background: var(--color-teal);
//                     border-color: var(--color-teal);
//                     color: white;
//                 }

//                 .progress-label {
//                     font-size: 0.9rem;
//                     font-weight: 600;
//                     color: #999;
//                     text-align: center;
//                 }

//                 .progress-step.active .progress-label {
//                     color: var(--color-primary);
//                 }

//                 .progress-step.completed .progress-label {
//                     color: var(--color-teal);
//                 }

//                 .section {
//                     padding: 2.5rem 0;
//                     flex: 1;
//                     background: linear-gradient(
//                         135deg,
//                         rgba(118, 73, 156, 0.04),
//                         rgba(74, 188, 157, 0.06)
//                     );
//                 }

//                 .container {
//                     width: 90%;
//                     max-width: 1100px;
//                     margin: 0 auto;
//                 }

//                 .section-title {
//                     font-size: 1.7rem;
//                     margin-bottom: 0.8rem;
//                     color: var(--color-primary);
//                     font-weight: 700;
//                     text-align: center;
//                 }

//                 .section-intro {
//                     max-width: 700px;
//                     margin: 0 auto 1.8rem;
//                     color: #444;
//                     text-align: center;
//                 }

//                 .event-form {
//                     max-width: 650px;
//                     margin: 0 auto;
//                     background-color: #fff;
//                     padding: 2rem 2.2rem;
//                     border-radius: 1.1rem;
//                     box-shadow: 0 10px 25px rgba(0,0,0,0.06);
//                     border-right: 6px solid var(--color-teal);
//                 }

//                 .form-group {
//                     margin-bottom: 1.2rem;
//                 }

//                 .form-group label {
//                     display: block;
//                     margin-bottom: 0.4rem;
//                     font-weight: 700;
//                     color: var(--color-primary);
//                     font-size: 0.98rem;
//                 }

//                 .form-group input,
//                 .form-group select {
//                     width: 100%;
//                     padding: 0.75rem 0.9rem;
//                     border-radius: 0.7rem;
//                     border: 1px solid rgba(0,0,0,0.12);
//                     font-size: 0.98rem;
//                     background-color: #faf8ff;
//                     transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
//                     font-family: inherit;
//                 }

//                 .form-group input:focus,
//                 .form-group select:focus {
//                     outline: none;
//                     border-color: var(--color-primary);
//                     box-shadow: 0 0 0 3px rgba(118,73,156,0.18);
//                     background-color: #fff;
//                 }

//                 .btn {
//                     display: inline-block;
//                     padding: 0.7rem 1.3rem;
//                     border-radius: 999px;
//                     text-decoration: none;
//                     font-size: 1rem;
//                     border: 1px solid transparent;
//                     transition: all 0.25s ease;
//                     font-weight: 600;
//                     cursor: pointer;
//                 }

//                 .btn-primary {
//                     background-color: var(--color-primary);
//                     color: #fff;
//                     width: 100%;
//                     margin-top: 0.5rem;
//                     font-size: 1.05rem;
//                 }

//                 .btn-primary:hover:not(:disabled) {
//                     opacity: 0.95;
//                 }

//                 .btn-secondary {
//                     background-color: #f0f0f0;
//                     color: var(--color-primary);
//                     margin-left: 1rem;
//                 }

//                 .btn-secondary:hover {
//                     background-color: #e0e0e0;
//                 }

//                 .packages-grid {
//                     display: grid;
//                     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//                     gap: 1.5rem;
//                     margin-top: 2rem;
//                 }

//                 .package-card {
//                     background: white;
//                     border-radius: 1rem;
//                     padding: 1.5rem;
//                     box-shadow: 0 4px 15px rgba(0,0,0,0.08);
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                     border: 3px solid transparent;
//                 }

//                 .package-card:hover {
//                     transform: translateY(-5px);
//                     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
//                     border-color: var(--color-teal);
//                 }

//                 .package-card.selected {
//                     border-color: var(--color-primary);
//                     background: linear-gradient(135deg, rgba(118, 73, 156, 0.05), rgba(74, 188, 157, 0.05));
//                 }

//                 .package-title {
//                     font-size: 1.3rem;
//                     font-weight: 800;
//                     color: var(--color-primary);
//                     margin-bottom: 0.5rem;
//                 }

//                 .package-description {
//                     color: #666;
//                     margin-bottom: 1rem;
//                     line-height: 1.6;
//                 }

//                 .package-price {
//                     font-size: 1.1rem;
//                     font-weight: 700;
//                     color: var(--color-teal);
//                     margin-top: 1rem;
//                 }

//                 .no-packages {
//                     text-align: center;
//                     padding: 3rem 2rem;
//                     background-color: #fff3cd;
//                     border: 2px solid #ffc107;
//                     border-radius: 1rem;
//                     color: #856404;
//                     margin-top: 2rem;
//                 }

//                 .confirmation-box {
//                     background: white;
//                     padding: 2rem;
//                     border-radius: 1rem;
//                     box-shadow: 0 10px 25px rgba(0,0,0,0.08);
//                     max-width: 600px;
//                     margin: 2rem auto;
//                 }

//                 .confirmation-box h3 {
//                     color: var(--color-primary);
//                     margin-bottom: 1.5rem;
//                     font-size: 1.5rem;
//                 }

//                 .confirmation-item {
//                     display: flex;
//                     justify-content: space-between;
//                     padding: 0.8rem 0;
//                     border-bottom: 1px solid #f0f0f0;
//                 }

//                 .confirmation-item:last-child {
//                     border-bottom: none;
//                 }

//                 .confirmation-label {
//                     font-weight: 700;
//                     color: var(--color-primary);
//                 }

//                 .confirmation-value {
//                     color: #666;
//                 }

//                 .button-group {
//                     display: flex;
//                     gap: 1rem;
//                     margin-top: 2rem;
//                 }

//                 .main-footer {
//                     background-color: #3a0d63;
//                     color: #f3e9ff;
//                     padding: 1rem 0;
//                     margin-top: 0.5rem;
//                     font-size: 0.95rem;
//                 }

//                 .footer-container {
//                     display: flex;
//                     align-items: center;
//                     justify-content: space-between;
//                     gap: 1rem;
//                     width: 90%;
//                     max-width: 1100px;
//                     margin: 0 auto;
//                 }

//                 .footer-links {
//                     display: flex;
//                     align-items: center;
//                     gap: 0.5rem;
//                 }

//                 .footer-links a {
//                     color: #e0cffc;
//                     text-decoration: none;
//                 }

//                 .footer-links a:hover {
//                     text-decoration: underline;
//                 }

//                 @media (max-width: 768px) {
//                     .nav-container {
//                         flex-direction: column;
//                         gap: 1rem;
//                     }

//                     .main-nav {
//                         flex-wrap: wrap;
//                         justify-content: center;
//                     }

//                     .logo-img {
//                         height: 60px;
//                     }

//                     .logo-text-ar-big {
//                         font-size: 1.3rem;
//                     }

//                     .event-form {
//                         padding: 1.5rem 1.2rem;
//                     }

//                     .packages-grid {
//                         grid-template-columns: 1fr;
//                     }

//                     .button-group {
//                         flex-direction: column;
//                     }

//                     .btn-secondary {
//                         margin-left: 0;
//                     }

//                     .footer-container {
//                         flex-direction: column;
//                         text-align: center;
//                     }




//                     .package-card {
//         background: white;
//         border-radius: 1rem;
//         padding: 0; /* ✅ Changed from 1.5rem to 0 for better image display */
//         box-shadow: 0 4px 15px rgba(0,0,0,0.08);
//         cursor: pointer;
//         transition: all 0.3s ease;
//         border: 3px solid transparent;
//         overflow: hidden; /* ✅ Added to clip image to border-radius */
//     }

//     .package-card:hover {
//         transform: translateY(-5px);
//         box-shadow: 0 8px 25px rgba(0,0,0,0.12);
//         border-color: var(--color-teal);
//     }

//     .package-card.selected {
//         border-color: var(--color-primary);
//         background: linear-gradient(135deg, rgba(118, 73, 156, 0.05), rgba(74, 188, 157, 0.05));
//     }

//     /* ✅ Add this new class for card content padding */
//     .package-card-content {
//         padding: 1.5rem;
//     }

//     .package-card img {
//         width: 100%;
//         height: 200px;
//         object-fit: cover;
//         transition: transform 0.3s ease;
//     }

//     .package-card:hover img {
//         transform: scale(1.05);
//     }

//                 }
//             `}</style>

//             <div className="event-request-page">
//                 <header className="main-header">
//                     <div className="nav-container">
//                         <div className="logo">
//                             <img src="/assets/images/logo.png" alt="شعار المكتبة المتجولة" className="logo-img" />
//                             <div className="logo-text-wrap">
//                                 <span className="logo-text-ar-big">مكتبة مهدي المتجولة</span>
//                                 <span className="logo-text-sub">مكتبة على عجلات تجوب المناطق اللبنانية</span>
//                             </div>
//                         </div>

//                         <nav className="main-nav">
//                             <Link href="/">الصفحة الرئيسية</Link>
//                             <Link href={route('news')}>الأخبار</Link>

//                             {user ? (
//                                 <div className="user-menu">
//                                     <button 
//                                         className="user-button"
//                                         onClick={() => setShowDropdown(!showDropdown)}
//                                     >
//                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
//                                         </svg>
//                                         {user.name}
//                                     </button>
                                    
//                                     {showDropdown && (
//                                         <div className="dropdown-menu">
//                                             <Link href={route('profile.edit')} className="dropdown-item">
//                                                 الملف الشخصي
//                                             </Link>
//                                             <Link href={route('logout')} method="post" as="button" className="dropdown-item">
//                                                 تسجيل الخروج
//                                             </Link>
//                                         </div>
//                                     )}
//                                 </div>
//                             ) : (
//                                 <>
//                                     <Link href={route('login')}>تسجيل الدخول</Link>
//                                     <Link href={route('register')}>انشاء حساب</Link>
//                                 </>
//                             )}
//                         </nav>
//                     </div>
//                 </header>

//                 <section className="section">
//                     <div className="container">
//                         <h2 className="section-title">طلب زيارة المكتبة المتجولة</h2>
                        
//                         {/* Progress Bar */}
//                         <div className="progress-container">
//                             <div className="progress-bar">
//                                 <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
//                                     <div className="progress-circle">1</div>
//                                     <span className="progress-label">معلومات الزيارة</span>
//                                 </div>
//                                 <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
//                                     <div className="progress-circle">2</div>
//                                     <span className="progress-label">اختيار الباقة</span>
//                                 </div>
//                                 <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
//                                     <div className="progress-circle">3</div>
//                                     <span className="progress-label">تأكيد الطلب</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Step 1: Form */}
//                         {currentStep === 1 && (
//                             <>
//                                 <p className="section-intro">
//                                     املأ النموذج التالي لنعرض لك الباقات المناسبة.
//                                 </p>
//                                 <form className="event-form" onSubmit={handleStep1Submit}>
//                                     <div className="form-group">
//                                         <label htmlFor="age">العمر</label>
//                                         <input 
//                                             type="number" 
//                                             id="age"
//                                             name="age" 
//                                             placeholder="العمر..."
//                                             onChange={handleChange}
//                                             value={form.age}
//                                             min="4"
//                                             max="18"
//                                             required 
//                                         />
//                                     </div>

//                                     <div className="form-group">
//                                         <label htmlFor="nb_of_visitors">عدد الزوار المتوقع</label>
//                                         <input 
//                                             type="number" 
//                                             id="nb_of_visitors"
//                                             name="nb_of_visitors" 
//                                             placeholder="عدد المشاركين..."
//                                             onChange={handleChange}
//                                             value={form.nb_of_visitors}
//                                             min="2"
//                                             required 
//                                         />
//                                     </div>

//                                     <div className="form-group">
//                                         <label htmlFor="gender">الجنس</label>
//                                         <select 
//                                             id="gender"
//                                             name="gender" 
//                                             onChange={handleChange}
//                                             value={form.gender}
//                                             required
//                                         >
//                                             <option value="male">ذكور</option>
//                                             <option value="female">إناث</option>
//                                             <option value="mixed">ذكور وإناث</option>
//                                         </select>
//                                     </div>

//                                     <div className="form-group">
//                                         <label htmlFor="event_date">تاريخ ووقت الزيارة المطلوب</label>
//                                         <input 
//                                             type="datetime-local" 
//                                             id="event_date"
//                                             name="event_date" 
//                                             onChange={handleChange}
//                                             value={form.event_date}
//                                             min={new Date().toISOString().slice(0, 16)}
//                                             required 
//                                         />
//                                     </div>

//                                     <div className="form-group">
//                                         <label htmlFor="location">الموقع</label>
//                                         <input 
//                                             type="text" 
//                                             id="location"
//                                             name="location" 
//                                             placeholder="الموقع..."
//                                             onChange={handleChange}
//                                             value={form.location}
//                                             required 
//                                         />
//                                     </div>

//                                     <div className="form-group">
//                                         <label htmlFor="phone">رقم الهاتف</label>
//                                         <input 
//                                             type="text" 
//                                             id="phone"
//                                             name="phone" 
//                                             placeholder="رقم الهاتف للتواصل..."
//                                             onChange={handleChange}
//                                             value={form.phone}
//                                             required 
//                                         />
//                                     </div>

//                                     <button type="submit" className="btn btn-primary">
//                                         التالي: عرض الباقات المناسبة
//                                     </button>
//                                 </form>
//                             </>
//                         )}

//                         {/* Step 2: Package Selection */}
//                         {/* {currentStep === 2 && (
//                             <>
//                                 <p className="section-intro">
//                                     اختر الباقة المناسبة بناءً على معاييرك
//                                 </p>

//                                 {filteredPackages.length === 0 ? (
//                                     <div className="no-packages">
//                                         <h3>عذراً، لا توجد باقات متاحة تطابق معاييرك</h3>
//                                         <p>يرجى العودة وتعديل العمر أو عدد الزوار.</p>
//                                         <button onClick={() => setCurrentStep(1)} className="btn btn-primary" style={{marginTop: '1rem', width: 'auto'}}>
//                                             العودة للتعديل
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     <>
//                                         <div className="packages-grid">
//                                             {filteredPackages.map(pkg => (
//                                                 <div 
//                                                     key={pkg.id} 
//                                                     className={`package-card ${form.event_package_id === pkg.id ? 'selected' : ''}`}
//                                                     onClick={() => handlePackageSelect(pkg.id)}
//                                                 >
//                                                     <h3 className="package-title">{pkg.package_title}</h3>
//                                                     <p className="package-description">{pkg.description || 'لا يوجد وصف متاح.'}</p>
//                                                     <p><strong>وقت الفعالية:</strong> {pkg.event_time}</p>
//                                                     <p><strong>الأنشطة:</strong> {pkg.activities?.join(', ') || 'غير محدد'}</p>
//                                                     <p className="package-price">السعر: {pkg.total_price} د.ل</p>
//                                                 </div>
//                                             ))}
//                                         </div>
                                        
//                                         <div className="button-group" style={{maxWidth: '650px', margin: '2rem auto'}}>
//                                             <button onClick={() => setCurrentStep(1)} className="btn btn-secondary">
//                                                 السابق
//                                             </button>
//                                         </div>
//                                     </>
//                                 )}
//                             </>
//                         )} */}

// {/* Step 2: Package Selection */}
// {currentStep === 2 && (
//     <>
//         <p className="section-intro">
//             اختر الباقة المناسبة بناءً على معاييرك
//         </p>

//         {filteredPackages.length === 0 ? (
//             <div className="no-packages">
//                 <h3>عذراً، لا توجد باقات متاحة تطابق معاييرك</h3>
//                 <p>يرجى العودة وتعديل العمر أو عدد الزوار.</p>
//                 <button onClick={() => setCurrentStep(1)} className="btn btn-primary" style={{marginTop: '1rem', width: 'auto'}}>
//                     العودة للتعديل
//                 </button>
//             </div>
//         ) : (
//             <>
//                 <div className="packages-grid">
//                     {filteredPackages.map(pkg => (
//                         <div 
//                             key={pkg.id} 
//                             className={`package-card ${form.event_package_id === pkg.id ? 'selected' : ''}`}
//                             onClick={() => handlePackageSelect(pkg.id)}
//                         >
//                             {/* ✅ ADD PACKAGE IMAGE */}
//                             {pkg.main_image && (
//                                 <img 
//                                     src={`/storage/${pkg.main_image}`}
//                                     alt={pkg.package_title}
//                                     style={{
//                                         width: '100%',
//                                         height: '200px',
//                                         objectFit: 'cover',
//                                         borderRadius: '0.8rem',
//                                         marginBottom: '1rem'
//                                     }}
//                                     onError={(e) => {
//                                         e.target.style.display = 'none';
//                                     }}
//                                 />
//                             )}
                            
//                             <h3 className="package-title">{pkg.package_title}</h3>
//                             <p className="package-description">{pkg.description || 'لا يوجد وصف متاح.'}</p>
//                             <p><strong>وقت الفعالية:</strong> {pkg.event_time}</p>
//                             <p><strong>الأنشطة:</strong> {pkg.activities?.join(', ') || 'غير محدد'}</p>
//                             <p className="package-price">السعر: {pkg.total_price} د.ل</p>
//                         </div>
//                     ))}
//                 </div>
                
//                 <div className="button-group" style={{maxWidth: '650px', margin: '2rem auto'}}>
//                     <button onClick={() => setCurrentStep(1)} className="btn btn-secondary">
//                         السابق
//                     </button>
//                 </div>
//             </>
//         )}
//     </>
// )}
//                         {/* Step 3: Confirmation */}
//                         {currentStep === 3 && (
//                             <>
//                                 <p className="section-intro">
//                                     تأكيد الطلب وإرساله
//                                 </p>

//                                 <div className="confirmation-box">
//                                     <h3>ملخص الطلب</h3>
                                    
//                                     <div className="confirmation-item">
//                                         <span className="confirmation-label">الباقة المختارة:</span>
//                                         <span className="confirmation-value">{selectedPackage?.package_title}</span>
//                                     </div>
                                    
//                                     <div className="confirmation-item">
//                                         <span className="confirmation-label">تاريخ الزيارة:</span>
//                                         <span className="confirmation-value">{new Date(form.event_date).toLocaleString('ar')}</span>
//                                     </div>
                                    
//                                     <div className="confirmation-item">
//                                         <span className="confirmation-label">الموقع:</span>
//                                         <span className="confirmation-value">{form.location}</span>
//                                     </div>
                                    
//                                     <div className="confirmation-item">
//                                         <span className="confirmation-label">العمر:</span>
//                                         <span className="confirmation-value">{form.age} سنة</span>
//                                     </div>
                                    
//                                     <div className="confirmation-item">
//                                         <span className="confirmation-label">عدد الزوار:</span>
//                                         <span className="confirmation-value">{form.nb_of_visitors}</span>
//                                     </div>
                                    
//                                     <div className="confirmation-item">
//                                         <span className="confirmation-label">الجنس:</span>
//                                         <span className="confirmation-value">
//                                             {form.gender === 'male' ? 'ذكور' : form.gender === 'female' ? 'إناث' : 'ذكور وإناث'}
//                                         </span>
//                                     </div>
                                    
//                                     <div className="confirmation-item">
//                                         <span className="confirmation-label">رقم الهاتف:</span>
//                                         <span className="confirmation-value">{form.phone}</span>
//                                     </div>
                                    
//                                     <div className="confirmation-item">
//                                         <span className="confirmation-label">السعر الإجمالي:</span>
//                                         <span className="confirmation-value" style={{color: 'var(--color-teal)', fontWeight: '700'}}>
//                                             {selectedPackage?.total_price} د.ل
//                                         </span>
//                                     </div>

//                                     <div className="button-group">
//                                         <button onClick={() => setCurrentStep(2)} className="btn btn-secondary">
//                                             السابق
//                                         </button>
//                                         <button onClick={handleFinalSubmit} className="btn btn-primary">
//                                             تأكيد وإرسال الطلب
//                                         </button>
//                                     </div>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 </section>

//                 <footer className="main-footer">
//                     <div className="footer-container">
//                         <p>© 2025 المكتبة المتجولة. جميع الحقوق محفوظة.</p>
//                         <p className="footer-links">
//                             <a href="#">اتصل بنا</a>
//                             <span> • </span>
//                             <a href="#">سياسة الخصوصية</a>
//                         </p>
//                     </div>
//                 </footer>
//             </div>
//         </>
//     );
// }



import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';

export default function EventRequestPage({ auth, allPackages }) {
    const user = auth?.user;
    const [showDropdown, setShowDropdown] = useState(false);
    const role = user?.role?.name;
    
    // Role checks
    const isRegisteredUser = role === 'registered_user';
    const isAdminNews = role === 'admin_news';
    const isAdminEvents = role === 'admin_events';

    // Step management
    const [currentStep, setCurrentStep] = useState(1);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [isLoadingPackages, setIsLoadingPackages] = useState(false);

    const [form, setForm] = useState({
        event_package_id: '',
        event_date: '',
        location: '',
        age: '',
        nb_of_visitors: '',
        gender: 'male',
        phone: user?.phone || '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Step 1: Submit form and fetch filtered packages from backend
    const handleStep1Submit = (e) => {
        e.preventDefault();
        setIsLoadingPackages(true);
        
        // Build query params for backend filtering
        const params = new URLSearchParams({
            age: form.age,
            visitors: form.nb_of_visitors,
            gender: form.gender,
        });

        // Fetch filtered packages from backend
        axios.get(`/api/packages?${params.toString()}`)
            .then(res => {
                setFilteredPackages(res.data);
                setCurrentStep(2);
            })
            .catch(err => {
                console.error('Error fetching packages:', err);
                alert('حدث خطأ في تحميل الباقات. يرجى المحاولة مرة أخرى.');
            })
            .finally(() => {
                setIsLoadingPackages(false);
            });
    };

    // Step 2: Select package and go to confirmation
    const handlePackageSelect = (packageId) => {
        setForm({ ...form, event_package_id: packageId });
        setCurrentStep(3);
    };

    // Step 3: Final submission
    // const handleFinalSubmit = (e) => {
    //     e.preventDefault();

    //     axios.post('/event-requests', form)
    //         .then(res => {
    //             alert(res.data.message || 'تم إرسال الطلب بنجاح!');
    //             router.visit('/my-event-requests');
    //         })
    //         .catch(err => {
    //             if (err.response) {
    //                 alert('فشل الإرسال: ' + JSON.stringify(err.response.data.errors));
    //             } else {
    //                 alert('فشل في تقديم الطلب');
    //             }
    //         });
    // };
const handleFinalSubmit = (e) => {
    e.preventDefault();

const payload = {
    ...form,
    event_date: form.event_date.replace('T', ' ') + ':00',
};

axios.post('/event-requests', payload)

        .then(res => {
            alert(res.data.message || 'تم إرسال الطلب بنجاح!');
            router.visit('/my-event-requests');
        })
        .catch(err => {
            if (err.response) {
                alert('فشل الإرسال: ' + JSON.stringify(err.response.data.errors));
            } else {
                alert('فشل في تقديم الطلب');
            }
        });
};


const formatDateTime = (dateString) => {
    return new Date(dateString.replace(' ', 'T')).toLocaleString('ar');
};



    const selectedPackage = filteredPackages.find(pkg => pkg.id === parseInt(form.event_package_id));

    return (
        <>
            <Head title="طلب زيارة" />
            
            <style>{`
                :root {
                    --color-primary: #76499C;
                    --color-primary-soft: #A189B7;
                    --color-teal: #4ABC9D;
                    --color-yellow: #F2C94C;
                    --color-bg: #F9F7FB;
                    --color-text: #222222;
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: "Tajawal", "Cairo", system-ui, sans-serif;
                    background-color: var(--color-bg);
                    color: var(--color-text);
                    line-height: 1.7;
                    direction: rtl;
                }

                .event-request-page {
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

                .user-menu {
                    position: relative;
                }

                .user-button {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.5rem 1rem;
                    border-radius: 999px;
                    background-color: var(--color-primary);
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: opacity 0.3s ease;
                }

                .user-button:hover {
                    opacity: 0.9;
                }

                .user-button svg {
                    margin-right: 0.5rem;
                    width: 1rem;
                    height: 1rem;
                }

                .dropdown-menu {
                    position: absolute;
                    left: 0;
                    top: 100%;
                    margin-top: 0.5rem;
                    background-color: white;
                    border-radius: 0.7rem;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    min-width: 200px;
                    overflow: hidden;
                    z-index: 50;
                }

                .dropdown-item {
                    display: block;
                    padding: 0.75rem 1rem;
                    color: #333;
                    text-decoration: none;
                    transition: background-color 0.2s ease;
                    font-size: 0.95rem;
                }

                .dropdown-item:hover {
                    background-color: rgba(118, 73, 156, 0.08);
                }

                /* Progress Bar Styles */
                .progress-container {
                    max-width: 800px;
                    margin: 2rem auto 3rem;
                    padding: 0 1rem;
                }

                .progress-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    margin-bottom: 3rem;
                }

                .progress-bar::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: #e0e0e0;
                    transform: translateY(-50%);
                    z-index: 0;
                }

                .progress-bar::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    height: 4px;
                    background: linear-gradient(90deg, var(--color-teal), var(--color-primary));
                    transform: translateY(-50%);
                    z-index: 1;
                    transition: width 0.4s ease;
                    width: ${currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'};
                }

                .progress-step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    z-index: 2;
                    position: relative;
                }

                .progress-circle {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: white;
                    border: 4px solid #e0e0e0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 1.2rem;
                    color: #999;
                    transition: all 0.3s ease;
                    margin-bottom: 0.5rem;
                }

                .progress-step.active .progress-circle {
                    background: linear-gradient(135deg, var(--color-primary), var(--color-teal));
                    border-color: var(--color-primary);
                    color: white;
                    box-shadow: 0 4px 15px rgba(118, 73, 156, 0.4);
                }

                .progress-step.completed .progress-circle {
                    background: var(--color-teal);
                    border-color: var(--color-teal);
                    color: white;
                }

                .progress-label {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #999;
                    text-align: center;
                }

                .progress-step.active .progress-label {
                    color: var(--color-primary);
                }

                .progress-step.completed .progress-label {
                    color: var(--color-teal);
                }

                .section {
                    padding: 2.5rem 0;
                    flex: 1;
                    background: linear-gradient(
                        135deg,
                        rgba(118, 73, 156, 0.04),
                        rgba(74, 188, 157, 0.06)
                    );
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

                .event-form {
                    max-width: 650px;
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
                    margin-bottom: 0.4rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    font-size: 0.98rem;
                }

                .form-group input,
                .form-group select {
                    width: 100%;
                    padding: 0.75rem 0.9rem;
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

                .btn-secondary {
                    background-color: #f0f0f0;
                    color: var(--color-primary);
                    margin-left: 1rem;
                }

                .btn-secondary:hover {
                    background-color: #e0e0e0;
                }

                .packages-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                    margin-top: 2rem;
                }

                .package-card {
                    background: white;
                    border-radius: 1rem;
                    padding: 0;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 3px solid transparent;
                    overflow: hidden;
                    position: relative;
                }

                .package-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
                    border-color: var(--color-teal);
                }

                .package-card.selected {
                    border-color: var(--color-primary);
                    background: linear-gradient(135deg, rgba(118, 73, 156, 0.05), rgba(74, 188, 157, 0.05));
                }

                .package-card-content {
                    padding: 1.5rem;
                }

                .package-card img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }

                .package-card:hover img {
                    transform: scale(1.05);
                }

                .package-title {
                    font-size: 1.3rem;
                    font-weight: 800;
                    color: var(--color-primary);
                    margin-bottom: 0.5rem;
                }

                .package-description {
                    color: #666;
                    margin-bottom: 1rem;
                    line-height: 1.6;
                }

                .package-price {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--color-teal);
                    margin-top: 1rem;
                }

                .no-packages {
                    text-align: center;
                    padding: 3rem 2rem;
                    background-color: #fff3cd;
                    border: 2px solid #ffc107;
                    border-radius: 1rem;
                    color: #856404;
                    margin-top: 2rem;
                }

                .loading-spinner {
                    text-align: center;
                    padding: 3rem 2rem;
                    color: var(--color-primary);
                    font-size: 1.2rem;
                }

                .confirmation-box {
                    background: white;
                    padding: 2rem;
                    border-radius: 1rem;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
                    max-width: 600px;
                    margin: 2rem auto;
                }

                .confirmation-box h3 {
                    color: var(--color-primary);
                    margin-bottom: 1.5rem;
                    font-size: 1.5rem;
                }

                .confirmation-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.8rem 0;
                    border-bottom: 1px solid #f0f0f0;
                }

                .confirmation-item:last-child {
                    border-bottom: none;
                }

                .confirmation-label {
                    font-weight: 700;
                    color: var(--color-primary);
                }

                .confirmation-value {
                    color: #666;
                }

                .button-group {
                    display: flex;
                    gap: 1rem;
                    margin-top: 2rem;
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

                    .event-form {
                        padding: 1.5rem 1.2rem;
                    }

                    .packages-grid {
                        grid-template-columns: 1fr;
                    }

                    .button-group {
                        flex-direction: column;
                    }

                    .btn-secondary {
                        margin-left: 0;
                    }

                    .footer-container {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>

            <div className="event-request-page">
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
                            <Link href={route('news')}>الأخبار</Link>

                            {user ? (
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
                                    
                                    {showDropdown && (
                                        <div className="dropdown-menu">
                                            <Link href={route('profile.edit')} className="dropdown-item">
                                                الملف الشخصي
                                            </Link>
                                            <Link href={route('logout')} method="post" as="button" className="dropdown-item">
                                                تسجيل الخروج
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link href={route('login')}>تسجيل الدخول</Link>
                                    <Link href={route('register')}>انشاء حساب</Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <section className="section">
                    <div className="container">
                        <h2 className="section-title">طلب زيارة المكتبة المتجولة</h2>
                        
                        {/* Progress Bar */}
                        <div className="progress-container">
                            <div className="progress-bar">
                                <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                                    <div className="progress-circle">1</div>
                                    <span className="progress-label">معلومات الزيارة</span>
                                </div>
                                <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                                    <div className="progress-circle">2</div>
                                    <span className="progress-label">اختيار الباقة</span>
                                </div>
                                <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                                    <div className="progress-circle">3</div>
                                    <span className="progress-label">تأكيد الطلب</span>
                                </div>
                            </div>
                        </div>

                        {/* Step 1: Form */}
                        {currentStep === 1 && (
                            <>
                                <p className="section-intro">
                                    املأ النموذج التالي لنعرض لك الباقات المناسبة.
                                </p>
                                <form className="event-form" onSubmit={handleStep1Submit}>
                                    <div className="form-group">
                                        <label htmlFor="age">العمر</label>
                                        <input 
                                            type="number" 
                                            id="age"
                                            name="age" 
                                            placeholder="العمر..."
                                            onChange={handleChange}
                                            value={form.age}
                                            min="4"
                                            max="18"
                                            required 
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="nb_of_visitors">عدد الزوار المتوقع</label>
                                        <input 
                                            type="number" 
                                            id="nb_of_visitors"
                                            name="nb_of_visitors" 
                                            placeholder="عدد المشاركين..."
                                            onChange={handleChange}
                                            value={form.nb_of_visitors}
                                            min="2"
                                            required 
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="gender">الجنس</label>
                                        <select 
                                            id="gender"
                                            name="gender" 
                                            onChange={handleChange}
                                            value={form.gender}
                                            required
                                        >
                                            <option value="male">ذكور</option>
                                            <option value="female">إناث</option>
                                            <option value="mixed">ذكور وإناث</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="event_date">تاريخ ووقت الزيارة المطلوب</label>
                                        <input 
                                            type="datetime-local" 
                                            id="event_date"
                                            name="event_date" 
                                            onChange={handleChange}
                                            value={form.event_date}
                                            min={new Date().toISOString().slice(0, 16)}
                                            required 
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="location">الموقع</label>
                                        <input 
                                            type="text" 
                                            id="location"
                                            name="location" 
                                            placeholder="الموقع..."
                                            onChange={handleChange}
                                            value={form.location}
                                            required 
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">رقم الهاتف</label>
                                        <input 
                                            type="text" 
                                            id="phone"
                                            name="phone" 
                                            placeholder="رقم الهاتف للتواصل..."
                                            onChange={handleChange}
                                            value={form.phone}
                                            required 
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary" disabled={isLoadingPackages}>
                                        {isLoadingPackages ? 'جاري التحميل...' : 'التالي: عرض الباقات المناسبة'}
                                    </button>
                                </form>
                            </>
                        )}

                        {/* Step 2: Package Selection */}
                        {currentStep === 2 && (
                            <>
                                {isLoadingPackages ? (
                                    <div className="loading-spinner">
                                        <p>جاري تحميل الباقات المناسبة...</p>
                                    </div>
                                ) : (
                                    <>
                                        <p className="section-intro">
                                            اختر الباقة المناسبة بناءً على معاييرك
                                        </p>

                                        {filteredPackages.length === 0 ? (
                                            <div className="no-packages">
                                                <h3>عذراً، لا توجد باقات متاحة تطابق معاييرك</h3>
                                                <p>يرجى العودة وتعديل العمر أو عدد الزوار.</p>
                                                <button onClick={() => setCurrentStep(1)} className="btn btn-primary" style={{marginTop: '1rem', width: 'auto'}}>
                                                    العودة للتعديل
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="packages-grid">
                                                    {filteredPackages.map(pkg => (
                                                        <div 
                                                            key={pkg.id} 
                                                            className={`package-card ${form.event_package_id === pkg.id ? 'selected' : ''}`}
                                                            onClick={() => handlePackageSelect(pkg.id)}
                                                        >
                                                            {pkg.main_image && (
                                                                <img 
                                                                    src={`/storage/${pkg.main_image}`}
                                                                    alt={pkg.package_title}
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                    }}
                                                                />
                                                            )}
                                                            
                                                            <div className="package-card-content">
                                                                <h3 className="package-title">{pkg.package_title}</h3>
                                                                <p className="package-description">{pkg.description || 'لا يوجد وصف متاح.'}</p>
                                                                <p><strong>وقت الفعالية:</strong> {pkg.event_time}</p>
                                                                <p><strong>الأنشطة:</strong> {pkg.activities?.join(', ') || 'غير محدد'}</p>
                                                                <p className="package-price">السعر: {pkg.total_price} د.ل</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                <div className="button-group" style={{maxWidth: '650px', margin: '2rem auto'}}>
                                                    <button onClick={() => setCurrentStep(1)} className="btn btn-secondary">
                                                        السابق
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}

                        {/* Step 3: Confirmation */}
                        {currentStep === 3 && (
                            <>
                                <p className="section-intro">
                                    تأكيد الطلب وإرساله
                                </p>

                                <div className="confirmation-box">
                                    <h3>ملخص الطلب</h3>
                                    
                                    <div className="confirmation-item">
                                        <span className="confirmation-label">الباقة المختارة:</span>
                                        <span className="confirmation-value">{selectedPackage?.package_title}</span>
                                    </div>
                                    
                                    <div className="confirmation-item">
                                        <span className="confirmation-label">تاريخ الزيارة:</span>
                                     <span className="confirmation-value">
    {formatDateTime(form.event_date)}
</span>

                                    </div>
                                    
                                    <div className="confirmation-item">
                                        <span className="confirmation-label">الموقع:</span>
                                        <span className="confirmation-value">{form.location}</span>
                                    </div>
                                    
                                    <div className="confirmation-item">
                                        <span className="confirmation-label">العمر:</span>
                                        <span className="confirmation-value">{form.age} سنة</span>
                                    </div>
                                    
                                    <div className="confirmation-item">
                                        <span className="confirmation-label">عدد الزوار:</span>
                                        <span className="confirmation-value">{form.nb_of_visitors}</span>
                                    </div>
                                    
                                    <div className="confirmation-item">
                                        <span className="confirmation-label">الجنس:</span>
                                        <span className="confirmation-value">
                                            {form.gender === 'male' ? 'ذكور' : form.gender === 'female' ? 'إناث' : 'ذكور وإناث'}
                                        </span>
                                    </div>
                                    
                                    <div className="confirmation-item">
                                        <span className="confirmation-label">رقم الهاتف:</span>
                                        <span className="confirmation-value">{form.phone}</span>
                                    </div>
                                    
                                    <div className="confirmation-item">
                                        <span className="confirmation-label">السعر الإجمالي:</span>
                                        <span className="confirmation-value" style={{color: 'var(--color-teal)', fontWeight: '700'}}>
                                            {selectedPackage?.total_price} د.ل
                                        </span>
                                    </div>

                                    <div className="button-group">
                                        <button onClick={() => setCurrentStep(2)} className="btn btn-secondary">
                                            السابق
                                        </button>
                                        <button onClick={handleFinalSubmit} className="btn btn-primary">
                                            تأكيد وإرسال الطلب
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>

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