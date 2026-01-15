// import React, { useState } from 'react';
// import { Inertia } from '@inertiajs/react';

// export default function ManagerDashboard({ admins, roles }) {
//     const [newAdmin, setNewAdmin] = useState({
//         name: '',
//         email: '',
//         password: '',
//         role_id: roles.length > 0 ? roles[0].id : ''
//     });

//     const handleAddAdmin = (e) => {
//         e.preventDefault();
//         Inertia.post('/manager-dashboard/add-admin', newAdmin);
//     };

//     const handleDelete = (id) => {
//         if (confirm('Are you sure you want to delete this admin?')) {
//             Inertia.delete(`/manager-dashboard/delete/${id}`);
//         }
//     };

//     const handlePause = (id) => {
//         if (confirm('Pause this admin?')) {
//             Inertia.post(`/manager-dashboard/pause/${id}`);
//         }
//     };

//     const handlePasswordChange = (id) => {
//         const newPass = prompt('Enter new password:');
//         if (newPass) {
//             Inertia.post(`/manager-dashboard/update-password/${id}`, { password: newPass });
//         }
//     };

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>

//             {/* Add New Admin Form */}
//             <form onSubmit={handleAddAdmin} className="mb-6 border p-4 rounded">
//                 <h2 className="font-semibold mb-2">Add New Admin</h2>
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={newAdmin.name}
//                     onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })}
//                     className="border p-1 mr-2"
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={newAdmin.email}
//                     onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })}
//                     className="border p-1 mr-2"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={newAdmin.password}
//                     onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })}
//                     className="border p-1 mr-2"
//                 />
//                 <select
//                     value={newAdmin.role_id}
//                     onChange={e => setNewAdmin({ ...newAdmin, role_id: e.target.value })}
//                     className="border p-1 mr-2"
//                 >
//                     {roles.map(role => (
//                         <option key={role.id} value={role.id}>{role.name}</option>
//                     ))}
//                 </select>
//                 <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Add Admin</button>
//             </form>

//             {/* Admins List */}
//             <table className="w-full border">
//                 <thead>
//                     <tr className="border-b">
//                         <th className="p-2">ID</th>
//                         <th className="p-2">Name</th>
//                         <th className="p-2">Email</th>
//                         <th className="p-2">Role</th>
//                         <th className="p-2">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {admins.map(admin => (
//                         <tr key={admin.id} className="border-b">
//                             <td className="p-2">{admin.id}</td>
//                             <td className="p-2">{admin.name}</td>
//                             <td className="p-2">{admin.email}</td>
//                             <td className="p-2">{admin.role.name}</td>
//                             <td className="p-2 space-x-2">
//                                 <button
//                                     onClick={() => handlePasswordChange(admin.id)}
//                                     className="bg-yellow-500 text-white px-2 py-1 rounded"
//                                 >
//                                     Change Password
//                                 </button>
//                                 <button
//                                     onClick={() => handlePause(admin.id)}
//                                     className="bg-gray-500 text-white px-2 py-1 rounded"
//                                 >
//                                     Pause
//                                 </button>
//                                 <button
//                                     onClick={() => handleDelete(admin.id)}
//                                     className="bg-red-500 text-white px-2 py-1 rounded"
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
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
    if (confirm('Pause this admin?')) {
      post(`/manager-dashboard/pause/${id}`);
    }
  };

//   const handlePasswordChange = (id) => {
//     const newPass = prompt('Enter new password:');
//     if (newPass) {
//       post(`/manager-dashboard/update-password/${id}`, { password: newPass });
//     }
//   };
const handlePasswordChange = (id) => {
  const newPass = prompt('Enter new password:');
  if (newPass) {
    router.post(`/manager-dashboard/update-password/${id}`, { 
      password: newPass 
    }, {
      preserveScroll: true,
      onSuccess: () => {
        alert('Password updated successfully!');
      },
      onError: (errors) => {
        console.error('Validation errors:', errors);
        alert('Failed to update password: ' + (errors.password || 'Unknown error'));
      }
    });
  }
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">لوحة إدارة المدير</h1>

      {/* Add New Admin Form */}
      <form onSubmit={handleAddAdmin} className="mb-6 border p-4 rounded">
        <h2 className="font-semibold mb-2">إضافة مسؤول جديد</h2>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="الاسم"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            className="border p-1"
            required
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            className="border p-1"
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={data.password}
            onChange={e => setData('password', e.target.value)}
            className="border p-1"
            required
          />
          <select
            value={data.role_id}
            onChange={e => setData('role_id', e.target.value)}
            className="border p-1"
          >
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            إضافة مسؤول
          </button>
        </div>
      </form>

      {/* Admins List */}
      <table className="w-full border table-auto">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2">#</th>
            <th className="p-2">الاسم</th>
            <th className="p-2">البريد الإلكتروني</th>
            <th className="p-2">الدور</th>
            <th className="p-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id} className="border-b">
              <td className="p-2">{admin.id}</td>
              <td className="p-2">{admin.name}</td>
              <td className="p-2">{admin.email}</td>
              <td className="p-2">{admin.role ? admin.role.name : 'لا يوجد دور'}</td>
              <td className="p-2 space-x-2 flex flex-wrap gap-1">
                <button
                  onClick={() => handlePasswordChange(admin.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  تغيير كلمة المرور
                </button>
                <button
                  onClick={() => handlePause(admin.id)}
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  إيقاف
                </button>
                <Link
                  href={`/manager-dashboard/delete/${admin.id}`}
                  method="delete"
                  as="button"
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={(e) => {
                    if (!confirm('هل تريد حذف هذا المسؤول؟')) e.preventDefault();
                  }}
                >
                  حذف
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
