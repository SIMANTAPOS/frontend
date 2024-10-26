<template>
  <div>
    <b-sidebar id="sidebar" shadow backdrop visible>
      <div class="p-3">
        <div class="sidebar-logo text-center">
          <img src="@/assets/images/logos.png" alt="Logo" class="logo-img mr-2" />
          <h3 class="d-inline-block">SIMANTAPOS</h3>
        </div>
        <b-nav vertical class="custom-nav">
          <h6 class="sidebar-title">DASHBOARD</h6>
          <b-nav-item
            :to="dashboardRoute"
            :class="{'active': isActive(dashboardRoute), 'custom-nav-item': true}"
            class="sidebar-item"
            @click="setActiveRoute(dashboardRoute)"
          >
            <i class="fas fa-tachometer-alt mr-2"></i> Dashboard
          </b-nav-item>

          <h6 class="sidebar-title mt-0" v-if="masterDataItems.length > 0">MASTER DATA</h6>
          <b-nav-item
            v-for="item in masterDataItems"
            :key="item.name"
            :to="item.route"
            :class="{'active': isActive(item.route), 'custom-nav-item': true}"
            class="sidebar-item"
            @click="setActiveRoute(item.route)"
          >
            <i :class="item.icon" class="mr-2"></i> {{ item.name }}
          </b-nav-item>

          <h6 class="sidebar-title mt-0" v-if="halamanItems.length > 0">HALAMAN</h6>
          <b-nav-item
            v-for="item in halamanItems"
            :key="item.name"
            :to="item.route"
            :class="{'active': isActive(item.route), 'custom-nav-item': true}"
            class="sidebar-item"
            @click="setActiveRoute(item.route)"
          >
            <i :class="item.icon" class="mr-2"></i> {{ item.name }}
          </b-nav-item>
        </b-nav>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeRoute: '',
      masterDataItems: [],
      halamanItems: [],
      role: '',
    };
  },
  computed: {
    dashboardRoute() {
      return '/admin'; // Gunakan /admin untuk semua role agar sesuai rute
    },
  },
  created() {
    this.getUserRole();
    this.setupMenuItems();
  },
  methods: {
    getUserRole() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData && userData.roles && userData.roles.length > 0) {
        this.role = userData.roles[0].name;
        console.log('User Role:', this.role); // Log untuk melihat role dari localStorage
      } else {
        console.log('Roles tidak ditemukan pada localStorage');
      }
    },
    setupMenuItems() {
      // Selalu gunakan prefix /admin untuk semua role
      const routePrefix = '/admin';

      if (this.role === 'Super Admin') {
        this.masterDataItems = [
          { name: 'Data Balita', route: `${routePrefix}/data-balita`, icon: 'fas fa-child' },
          { name: 'Data Orangtua', route: `${routePrefix}/data-orangtua`, icon: 'fas fa-user-friends' },
          { name: 'Data Imunisasi', route: `${routePrefix}/data-imunisasi`, icon: 'fas fa-syringe' },
          { name: 'Data Posyandu', route: `${routePrefix}/data-posyandu`, icon: 'fas fa-hospital' },
          { name: 'Data User', route: `${routePrefix}/data-user`, icon: 'fas fa-users-cog' },
        ];
        this.halamanItems = [
          { name: 'Pemeriksaan', route: `${routePrefix}/pemeriksaan`, icon: 'fas fa-notes-medical' },
          { name: 'Imunisasi', route: `${routePrefix}/imunisasi`, icon: 'fas fa-syringe' },
          { name: 'Vitamin', route: `${routePrefix}/vitamin`, icon: 'fas fa-capsules' },
          { name: 'Kunjungan', route: `${routePrefix}/kunjungan`, icon: 'fas fa-user-md' },
          { name: 'Pengumuman', route: `${routePrefix}/pengumuman`, icon: 'fas fa-bullhorn' },
        ];
      } else if (this.role === 'Kader') {
        this.masterDataItems = [
          { name: 'Data Balita', route: `${routePrefix}/data-balita`, icon: 'fas fa-child' },
          { name: 'Data Orangtua', route: `${routePrefix}/data-orangtua`, icon: 'fas fa-user-friends' },
          { name: 'Data Imunisasi', route: `${routePrefix}/data-imunisasi`, icon: 'fas fa-syringe' },
          { name: 'Data Vitamin', route: `${routePrefix}/data-vitamin`, icon: 'fas fa-capsules' },
          { name: 'Data Layanan', route: `${routePrefix}/data-layanan`, icon: 'fas fa-concierge-bell' },
          { name: 'Data User', route: `${routePrefix}/data-user`, icon: 'fas fa-users-cog' },
        ];
        this.halamanItems = [
          { name: 'Pemeriksaan', route: `${routePrefix}/pemeriksaan`, icon: 'fas fa-notes-medical' },
          { name: 'Imunisasi', route: `${routePrefix}/imunisasi`, icon: 'fas fa-syringe' },
          { name: 'Vitamin', route: `${routePrefix}/vitamin`, icon: 'fas fa-capsules' },
          { name: 'Kunjungan', route: `${routePrefix}/kunjungan`, icon: 'fas fa-user-md' },
          { name: 'Pengumuman', route: `${routePrefix}/pengumuman`, icon: 'fas fa-bullhorn' },
        ];
      } else {
        console.log('Role tidak dikenali:', this.role);
      }
    },
    setActiveRoute(route) {
      this.activeRoute = route;
    },
    isActive(route) {
      return this.activeRoute === route;
    },
  },
};
</script>

<style scoped>
.sidebar {
  background-color: #FF5DA6;
}

.sidebar-logo {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  height: 40px;
  width: auto;
}

h3.d-inline-block {
  color: #FFFFFF;
}

.custom-nav {
  --bs-nav-link-color: #FFFFFF;
  --bs-nav-link-hover-color: #000000;
}

.custom-nav-item {
  color: var(--bs-nav-link-color) !important;
  border-radius: 25px;
  transition: background-color 0.3s, color 0.3s;
}

.custom-nav-item:hover {
  color: var(--bs-nav-link-hover-color) !important;
}

.custom-nav-item.active {
  background-color: #FFFFFF !important;
  color: var(--bs-nav-link-hover-color) !important;
}

.sidebar-title {
  color: #FFFFFF;
  padding: 5px;
  margin-bottom: 5px;
}

.sidebar-item {
  color: #FFFFFF;
  border-radius: 25px;
  margin-bottom: 5px;
}

.sidebar-item.active {
  color: #000000 !important;
}

@media (min-width: 768px) {
  .sidebar-item.active {
    background-color: #FFFFFF;
    color: #000000;
  }
}
</style>
