import AdminLayout from '@/layouts/AdminLayout';

import admin from './groups/admin'

export default [
  {
    path: "/admin/",
    component: AdminLayout,
    children: [
        ...admin
    ]
  }
];
