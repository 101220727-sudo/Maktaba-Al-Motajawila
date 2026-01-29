import React, { useState } from 'react';
import { Link, useForm, Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function ManagerDashboard({ admins, roles }) {
  // useForm hook for handling the add admin form
  const { data, setData, post, processing, reset } = useForm({
    name: '',
    email: '',
    password: '',
    role_id: roles.length > 0 ? roles[0].id : '',
  });

  const handleAddAdmin = (e) => {
    e.preventDefault();
    post('/manager-dashboard/add-admin', {
      onSuccess: () => reset(), // clear form after success
    });
  };

  const handlePause = (id) => {
    if (confirm('إيقاف هذا المسؤول؟')) {
      post(`/manager-dashboard/pause/${id}`);
    }
  };

  const handlePasswordChange = (id) => {
    const newPass = prompt('أدخل كلمة المرور الجديدة:');
    if (newPass) {
      router.post(`/manager-dashboard/update-password/${id}`, { 
        password: newPass 
      }, {
        preserveScroll: true,
        // onSuccess: () => {
        //   alert('تم تحديث كلمة المرور بنجاح!');
        // },

                    onSuccess: (page) => {
                // Check for flash message
                if (page.props.flash?.success) {
                    alert(page.props.flash.success);
                } else {
                    alert('تم تحديث كلمة المرور بنجاح!');
                }
            },
        onError: (errors) => {
          console.error('أخطاء التحقق:', errors);
          alert('فشل في تحديث كلمة المرور: ' + (errors.password || 'خطأ غير معروف'));
        }
      });
    }
  };

  return (
    <>
      <Head title="صفحة المدير" />
      
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

        .dashboard-page {
          min-height: 100vh;
          padding: 3rem 0;
          position: relative;
        }

        .dashboard-page::before {
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

        .dashboard-page::after {
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
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .page-title {
          font-size: 2.5rem;
          margin-bottom: 2.5rem;
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
          width: 150px;
          height: 4px;
          background: linear-gradient(90deg, var(--color-teal), var(--color-primary));
          border-radius: 2px;
        }

        .page-title::before {
          content: '👨‍💼';
          margin-left: 1rem;
          font-size: 2.3rem;
        }

        .add-admin-form {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
          border-right: 6px solid var(--color-teal);
          margin-bottom: 3rem;
          position: relative;
          animation: fadeInUp 0.6s ease-out 0.2s backwards;
        }

        .add-admin-form::before {
          content: '➕';
          position: absolute;
          top: -20px;
          left: -20px;
          font-size: 100px;
          opacity: 0.04;
          transform: rotate(-15deg);
          pointer-events: none;
        }

        .form-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--color-primary);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        .form-title::before {
          content: '';
          width: 4px;
          height: 30px;
          background: linear-gradient(180deg, var(--color-teal), var(--color-primary));
          border-radius: 2px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group input,
        .form-group select {
          padding: 0.9rem 1.2rem;
          border-radius: 12px;
          border: 2px solid rgba(118, 73, 156, 0.15);
          font-size: 1rem;
          background: linear-gradient(135deg, #faf8ff 0%, #fff 100%);
          transition: var(--transition);
          font-family: inherit;
        }

        .form-group select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2376499C' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: left 1rem center;
          padding-left: 2.5rem;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px rgba(118, 73, 156, 0.12);
          background: white;
          transform: translateY(-2px);
        }

        .form-group input::placeholder {
          color: #aaa;
        }

        .btn {
          display: inline-block;
          padding: 0.9rem 2rem;
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

        .admins-table-wrapper {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
          overflow-x: auto;
          animation: fadeInUp 0.6s ease-out 0.4s backwards;
        }

        .admins-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        .admins-table thead {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-soft) 100%);
          color: white;
        }

        .admins-table th {
          padding: 1.2rem 1rem;
          text-align: right;
          font-weight: 700;
          font-size: 1.05rem;
          white-space: nowrap;
        }

        .admins-table th:first-child {
          border-top-right-radius: 12px;
        }

        .admins-table th:last-child {
          border-top-left-radius: 12px;
        }

        .admins-table tbody tr {
          border-bottom: 1px solid rgba(118, 73, 156, 0.1);
          transition: var(--transition);
        }

        .admins-table tbody tr:hover {
          background: linear-gradient(90deg, rgba(118, 73, 156, 0.03) 0%, transparent 100%);
        }

        .admins-table tbody tr:last-child {
          border-bottom: none;
        }

        .admins-table td {
          padding: 1.2rem 1rem;
          color: var(--color-text-light);
          font-size: 0.98rem;
        }

        .admins-table td:first-child {
          font-weight: 700;
          color: var(--color-primary);
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .btn-small {
          padding: 0.6rem 1rem;
          border-radius: 50px;
          border: none;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          text-decoration: none;
          display: inline-block;
          white-space: nowrap;
        }

        .btn-warning {
          background: linear-gradient(135deg, var(--color-yellow), #F2B94C);
          color: var(--color-primary);
          box-shadow: 0 2px 8px rgba(242, 201, 76, 0.3);
        }

        .btn-warning:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(242, 201, 76, 0.4);
        }

        .btn-pause {
          background: linear-gradient(135deg, #757575, #616161);
          color: white;
          box-shadow: 0 2px 8px rgba(117, 117, 117, 0.3);
        }

        .btn-pause:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(117, 117, 117, 0.4);
        }

        .btn-danger {
          background: linear-gradient(135deg, #c62828, #a01515);
          color: white;
          box-shadow: 0 2px 8px rgba(198, 40, 40, 0.3);
        }

        .btn-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(198, 40, 40, 0.4);
        }

        .role-badge {
          display: inline-block;
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
          background: var(--color-teal-light);
          color: var(--color-teal);
        }

        .no-role {
          background: var(--color-yellow-light);
          color: #856404;
        }

        @media (max-width: 968px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-page {
            padding: 2rem 0;
          }

          .page-title {
            font-size: 1.9rem;
          }

          .add-admin-form,
          .admins-table-wrapper {
            padding: 1.5rem;
          }

          .admins-table {
            font-size: 0.9rem;
          }

          .admins-table th,
          .admins-table td {
            padding: 0.8rem 0.6rem;
          }

          .action-buttons {
            flex-direction: column;
          }

          .btn-small {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.6rem;
          }

          .add-admin-form {
            padding: 1.2rem;
          }

          .form-title {
            font-size: 1.3rem;
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

      <div className="dashboard-page">
        <div className="container">

          
        <Link href={route('logout')} method="post" as="button" className="dropdown-item">
                                                تسجيل الخروج
                                            </Link>  

                                            
          <h1 className="page-title">لوح التحكم</h1>

          {/* Add New Admin Form */}
          <form onSubmit={handleAddAdmin} className="add-admin-form">
            <h2 className="form-title">إضافة مسؤول جديد</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <select
                  value={data.role_id}
                  onChange={e => setData('role_id', e.target.value)}
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="btn btn-primary"
            >
              {processing ? 'جارٍ الإضافة...' : 'إضافة مسؤول'}
            </button>
          </form>

          {/* Admins List */}
          <div className="admins-table-wrapper">
            <table className="admins-table">
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>البريد الإلكتروني</th>
                  <th>الدور</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>
                      <span className={`role-badge ${!admin.role ? 'no-role' : ''}`}>
                        {admin.role ? admin.role.name : 'لا يوجد دور'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handlePasswordChange(admin.id)}
                          className="btn-small btn-warning"
                        >
                          تغيير كلمة المرور
                        </button>
                        {/* <button
                          onClick={() => handlePause(admin.id)}
                          className="btn-small btn-pause"
                        >
                          إيقاف
                        </button> */}
                        <Link
                          href={`/manager-dashboard/delete/${admin.id}`}
                          method="delete"
                          as="button"
                          className="btn-small btn-danger"
                          onClick={(e) => {
                            if (!confirm('هل تريد حذف هذا المسؤول؟')) e.preventDefault();
                          }}
                        >
                          إلغاء هذا المسؤول
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
