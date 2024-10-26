<template>
  <header class="header d-flex justify-content-between align-items-center">
    <div class="header-title">
      <!-- Header Title (optional) -->
    </div>
    <div class="header-user d-flex align-items-center ms-auto position-relative">
      <span class="user-name me-2">{{ userName }}</span>
      <button class="btn btn-link p-0" @click="toggleDropdown">
        <i class="fas fa-chevron-down"></i> 
      </button>
      <div v-if="dropdownVisible" class="dropdown-menu">
        <a href="#" @click="logout">Logout</a>
      </div>
    </div>
  </header>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Header',
  data() {
    return {
      dropdownVisible: false,
      userName: ''
    };
  },
  created() {
    // Ambil data user dari localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.name) {
      this.userName = userData.name;
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    logout() {
      // Hapus token dari localStorage
      localStorage.removeItem('token');
      // Redirect ke halaman login
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.header {
  background-color: #ffffff;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
  z-index: 1000;
}

.header-title h1 {
  font-size: 24px;
}

.header-user {
  position: relative;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 100px;
  z-index: 1000;
}

.dropdown-menu a {
  padding: 5px;
  color: #333;
  text-decoration: none;
  display: block;
}

.dropdown-menu a:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .header-title h1 {
    font-size: 20px;
  }

  .header-user {
    justify-content: flex-end;
  }

  .header-user span {
    display: none;
  }
}
</style>
