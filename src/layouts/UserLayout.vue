<template>
  <div class="user-layout d-flex">
    <b-sidebar
        id="sidebar"
        shadow
        backdrop
        visible
        class="custom-sidebar"
      >
        <div class="p-3">
          <div class="sidebar-logo text-center">
            <img src="@/assets/images/logos.png" alt="Logo" class="logo-img mr-2">
            <h3 class="d-inline-block">SIMANTAPOS</h3>
          </div>
          <b-nav vertical class="custom-nav">
            <b-nav-item
              :to="'/user'"
              :class="{'active': isActive('/user'), 'custom-nav-item': true}"
              class="sidebar-item"
              @click="setActiveRoute('/user')"
            >
              <i class="fas fa-baby mr-2"></i> Data Anak
            </b-nav-item>

            <h6 class="sidebar-title mt-0">MENU</h6>
            <b-nav-item
              v-for="item in menuItems"
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
    <div class="content flex-grow-1">
    <Header />
      <router-view>
      </router-view>
  </div>
  </div>
</template>

<script>
import Header from '../components/dashboard/Header.vue';

export default {
  name: 'UserLayout',
  components: {
    Header,
  },
  data() {
    return {
      activeRoute: '',
      menuItems: [
        { name: 'Pemeriksaan', route: '/user/riwayat-pemeriksaan', icon: 'fas fa-stethoscope' },
        { name: 'Imunisasi', route: '/user/riwayat-imunisasi', icon: 'fas fa-syringe' },
        { name: 'Vitamin', route: '/user/riwayat-vitamin', icon: 'fas fa-pills' },
      ],
    };
  },
  methods: {
    setActiveRoute(route) {
      this.activeRoute = route;
    },
    isActive(route) {
      return this.activeRoute === route;
    }
  }
};
</script>

<style scoped>
.user-layout {
  height: 100vh;
  overflow: hidden;
}

.content {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.custom-sidebar {
  background-color: #FF5DA6; 
  height: 100%; 
  width: 250px;
}

.sidebar-logo {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  height: 40px; /* Adjust logo height */
  width: auto;
}

h3.d-inline-block {
  color: #FFFFFF; /* White color for h3 text */
}

.custom-nav {
  --bs-nav-link-color: #FFFFFF; /* Override default link color */
  --bs-nav-link-hover-color: #FF5DA6; /* Override default hover color */
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
  color: #000000 !important; 
}

.sidebar-title {
  color: white;
  padding: 5px 10px;
}

.sidebar-item {
  padding: 5px 10px;
  color: #FFFFFF;
  border-radius: 25px;
}

@media (max-width: 768px) {
  .custom-sidebar {
    width: 200px; /* Adjust sidebar width for tablets */
  }
}

@media (max-width: 576px) {
  .custom-sidebar {
    width: 150px; /* Adjust sidebar width for smartphones */
  }
}
</style>
