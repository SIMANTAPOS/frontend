import { createRouter, createWebHistory } from 'vue-router'
import SuperAdminLayout from '../layouts/SuperAdminLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import UserLayout from '../layouts/UserLayout.vue'
import Beranda from '../views/Beranda.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Beranda',
    component: Beranda,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
      { path: '/login', name: 'Login', component: () => import('../views/auth/Login.vue') },
      { path: '/register', name: 'Register', component: () => import('../views/auth/Register.vue')},
      {
        path: '/',
        component: SuperAdminLayout,
        children: [
          { path: '', name: 'Dashboard', component: () => import('../views/admin/Dashboard.vue'), props: { isSuperAdmin: true }, },
          { path: 'data-balita', name: 'DataBalita', component: () => import('../views/admin/DataBalita.vue') },
          { path: 'data-orangtua', name: 'DataOrangTua', component: () => import('../views/admin/DataOrangtua.vue') },
          { path: 'data-posyandu', name: 'DataPosyandu', component: () => import('../views/admin/DataPosyandu.vue') },
          { path: 'data-user', name: 'User', component: () => import('../views/admin/DataUser.vue') },
          { path: 'pemeriksaan', name: 'Pemeriksaan', component: () => import('../views/admin/Pemeriksaan.vue') },
          { path: 'imunisasi', name: 'Imunisasi', component: () => import('../views/admin/Imunisasi.vue') },
          { path: 'vitamin', name: 'Vitamin', component: () => import('../views/admin/Vitamin.vue') },
          { path: 'layanan-kunjungan', name: 'LayananKunjungan', component: () => import('../views/admin/LayananKunjungan.vue') },
        ],
      },
      {
        path: '/admin',
        component: AdminLayout,
        children: [
          { path: '', name: 'Dashboard', component: () => import('../views/admin/Dashboard.vue'), props: { isSuperAdmin: false }, },
          { path: 'data-balita', name: 'DataBalita', component: () => import('../views/admin/DataBalita.vue') },
          { path: 'data-orangtua', name: 'DataOrangTua', component: () => import('../views/admin/DataOrangtua.vue') },
          { path: 'data-imunisasi', name: 'DataImunisasi', component: () => import('../views/admin/DataImunisasi.vue') },
          { path: 'data-vitamin', name: 'DataVitamin', component: () => import('../views/admin/DataVitamin.vue') },
          { path: 'data-posyandu', name: 'DataPosyandu', component: () => import('../views/admin/DataPosyandu.vue') },

          { path: 'data-user', name: 'User', component: () => import('../views/admin/DataUser.vue') },
          { path: 'pemeriksaan', name: 'Pemeriksaan', component: () => import('../views/admin/Pemeriksaan.vue') },
          { path: 'imunisasi', name: 'Imunisasi', component: () => import('../views/admin/Imunisasi.vue') },
          { path: 'layanan', name: 'Layanan', component: () => import('../views/admin/layanan.vue') },
          { path: 'vitamin', name: 'Vitamin', component: () => import('../views/admin/Vitamin.vue') },
          { path: 'layanan-kunjungan', name: 'LayananKunjungan', component: () => import('../views/admin/LayananKunjungan.vue') },
          { path: 'pengumuman', name: 'Pengumuman', component: () => import('../views/admin/Pengumuman.vue') },
        ],
      },
      {
        path: '/user',
        component: UserLayout,
        children: [
          { path: '', name: 'DataAnak', component: () => import('../views/user/DataAnak.vue') },
          { path: 'riwayat-pemeriksaan', name: 'RiwayatPemeriksaan', component: () => import('../views/user/RiwayatPemeriksaan.vue') },
          { path: 'riwayat-imunisasi', name: 'RiwayatImunisasi', component: () => import('../views/user/RiwayatImunisasi.vue') },
          { path: 'riwayat-vitamin', name: 'RiwayatVitamin', component: () => import('../views/user/RiwayatVitamin.vue') },
        ],
      },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes,
})

export default router