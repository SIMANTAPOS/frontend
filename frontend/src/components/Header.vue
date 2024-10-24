<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="custom-navbar">
      <b-navbar-brand to="/">
        <img src="@/assets/images/logo_simantapos.png" alt="Logo" class="logo">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" @click="toggleMenu"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav :visible="isMenuOpen">
        <b-navbar-nav class="mx-auto">
          <b-nav-item 
            :class="{ active: activeSection === 'Beranda' }" 
            @click="scrollToSection('Beranda')" 
            class="nav-link-custom">
            Beranda
          </b-nav-item>
          <b-nav-item 
            :class="{ active: activeSection === 'Tentang' }" 
            @click="scrollToSection('Tentang')" 
            class="nav-link-custom">
            Tentang
          </b-nav-item>
          <b-nav-item 
            :class="{ active: activeSection === 'Layanan' }" 
            @click="scrollToSection('Layanan')" 
            class="nav-link-custom">
            Layanan
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-button @click="handleLogin" class="login-button">Login</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <section id="beranda" class="hero">
      <b-container>
        <div class="hero-content">
          <div class="hero-text">
            <h1>Posyandu sebagai Garda Terdepan Pantau Balita</h1>
            <p>
              Pos Pelayanan Terpadu memegang peran penting dalam pemantauan kesehatan balita di Indonesia. 
              Posyandu memastikan tumbuh kembang anak berlangsung secara optimal melalui layanan yang komprehensif dan berkelanjutan.
            </p>
          </div>
          <div class="image-content">
            <img src="@/assets/images/hero_image.png" alt="Hero Image" />
          </div>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isMenuOpen: false, 
      activeSection: 'Beranda'
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    handleLogin() {
      this.$router.push('/login');
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    scrollToSection(section) {
      const element = document.getElementById(section);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 50, 
          behavior: 'smooth'
        });
      }
    },
    onScroll() {
      const sections = ['Beranda', 'Tentang', 'Layanan'];
      let currentSection = '';

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 55) {
          currentSection = section;
        }
      });

      this.activeSection = currentSection || 'Beranda';
    }
  }
}
</script>

<style scoped>
.custom-navbar {
  background-color: #007DA8;
  --bs-emphasis-color-rgb: 255, 255, 255;
}

.nav-link-custom.active {
  color: rgb(var(--bs-emphasis-color-rgb)) !important; /* Menggunakan warna emphasis yang telah diubah */
}

.navbar-nav .nav-item:hover {
  color: rgb(var(--bs-emphasis-color-rgb)) !important; /* Menggunakan warna emphasis yang telah diubah */
}

.custom-navbar .login-button {
  background-color: #FF5DA6;
  color: #FFEFF6;
  border: none;
  padding: 5px 20px;
  border-radius: 25px;
}

.custom-navbar .login-button:hover {
  background-color: #FFFFFF;
  color: #007DA8;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.hero {
  background-color: #FFEFF6;
  padding: 60px 0;
}

.hero-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.hero-text {
  max-width: 50%;
}

.hero-text h1 {
  color: #FF5DA6;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-text p {
  color: #333;
  font-size: 1.125rem;
  line-height: 1.6;
}

.image-content img {
  max-width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .hero-text {
    max-width: 100%;
  }

  .image-content {
    margin-top: 20px;
  }
}
</style>
