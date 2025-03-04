import TheHome from '@/views/home/TheHome.vue';

const TheVehicleEntry = () => import( '@/views/vehicle-entry/TheVehicleEntry.vue' );
const TheVehicleExit = () => import( '@/views/vehicle-exit/TheVehicleExit.vue' );
const TheParkingManagement = () => import( '@/views/parking-management/TheParkingManagement.vue' );
const TheReports = () => import( '@/views/reports/TheReports.vue' );
const TheAnprSettings = () => import( '@/views/anpr-settings/TheAnprSettings.vue' );
const TheUserManagement = () => import( '@/views/user-management/TheUserManagement.vue' );
const TheTariffSettings = () => import( '@/views/tariff-settings/TheTariffSettings.vue' );
const TheActivityLog = () => import( '@/views/activity-log/TheActivityLog.vue' );
const TheNotFound = () => import( '@/views/not-found/TheNotFound.vue' );

export default [
    {
        path: '/',
        name: 'TheHome',
        component: TheHome,
        meta: {
            title: 'Dashboard - Sistem Parkir ANPR',
            layout: 'withSidebar',
            isPublic: true,
        }
    },
    {
        path: '/kendaraan-masuk',
        name: 'TheVehicleEntry',
        component: TheVehicleEntry,
        meta: {
            title: 'Kendaraan Masuk - Sistem Parkir ANPR',
            layout: 'withSidebar',
            isPublic: true,
        }
    },
    {
        path: '/kendaraan-keluar',
        name: 'TheVehicleExit',
        component: TheVehicleExit,
        meta: {
            title: 'Kendaraan Keluar - Sistem Parkir ANPR',
            layout: 'withSidebar',
            isPublic: true,
        }
    },
    {
        path: '/manajemen-parkir',
        name: 'TheParkingManagement',
        component: TheParkingManagement,
        meta: {
            title: 'Manajemen Parkir - Sistem Parkir ANPR',
            layout: 'withSidebar',
            isPublic: true,
        }
    },
    {
        path: '/laporan',
        name: 'TheReports',
        component: TheReports,
        meta: {
            title: 'Laporan - Sistem Parkir ANPR',
            layout: 'withSidebar',
            isPublic: true,
        }
    },
    {
        path: '/pengaturan-anpr',
        name: 'TheAnprSettings',
        component: TheAnprSettings,
        meta: {
            title: 'Pengaturan ANPR - Sistem Parkir ANPR',
            layout: 'withSidebar',
            isPublic: true,
        }
    },
    {
        path: '/manajemen-pengguna',
        name: 'TheUserManagement',
        component: TheUserManagement,
        meta: {
            title: 'Manajemen Pengguna - Sistem Parkir ANPR',
            layout: 'withSidebar',
            isPublic: true,
        }
    },
    {
        path: '/pengaturan-tarif',
        name: 'TheTariffSettings',
        component: TheTariffSettings,
        meta: {
            title: 'Pengaturan Tarif - Sistem Parkir ANPR',
            layout: 'withSidebar',
            isPublic: true,
        }
    },
    {
        path: '/log-aktivitas',
        name: 'TheActivityLog',
        component: TheActivityLog,
        meta: {
            title: 'Log Aktivitas - Sistem Parkir ANPR',
            layout: 'withSidebar',
            isPublic: true,
        }
    },
    {
        path: '/:catchAll(.*)',
        name: 'TheNotFound',
        component: TheNotFound,
        meta: {
            title: '404 Not Found - Sistem Parkir ANPR',
            layout: 'blank',
            isPublic: true,
        }
    },
];
