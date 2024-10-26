<template>
  <b-container fluid class="login-container">
    <b-row no-gutters class="h-100">
      <b-col md="6" class="login-left d-flex flex-column justify-content-center align-items-center">
        <img src="@/assets/images/logo.png" alt="Logo" class="logo-image mb-5" />
        <b-form @submit.prevent="login" class="custom-form">
          <b-form-group label="Username" label-for="username">
            <b-form-input
              id="username"
              v-model="username"
              type="text"
              required
              class="custom-input"
            />
          </b-form-group>
          <b-form-group label="Password" label-for="password">
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              required
              class="custom-input"
            />
          </b-form-group>
          <b-button type="submit" block class="custom-button mt-3">
            Login
          </b-button>
        </b-form>
        <div class="register-link mt-3 text-center">
          <p>Belum punya akun? <router-link to="/register">Register</router-link></p>
        </div>
      </b-col>
      <b-col md="6" class="d-none d-md-flex justify-content-center align-items-center login-right">
        <img src="@/assets/images/logins.png" alt="Login" class="login-image" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
  async login() {
    try {
      // Membuat FormData untuk dikirim ke API
      const formData = new FormData();
      formData.append('email_or_username', this.username);
      formData.append('password', this.password);

      const response = await fetch('https://sigapkembiritan.or.id/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Login failed: ' + response.statusText);
      }

      const data = await response.json();

      // Simpan token dan data pengguna ke localStorage jika login berhasil
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token); // Simpan token
      localStorage.setItem('userData', JSON.stringify(data.user)); // Simpan data pengguna

      // Ambil data user dari localStorage
      const userData = JSON.parse(localStorage.getItem('userData'));

      // Cek peran dari userData
      const isSuperAdmin = userData.roles.some(role => role.name === 'Super Admin');
      const isKader = userData.roles.some(role => role.name === 'Kader');

      // Redirect berdasarkan role pengguna
      if (isSuperAdmin || isKader) {
        // Jika Super Admin atau Kader, redirect ke /admin
        this.$router.push('/admin');
      } else {
        // Jika bukan, redirect ke /user
        this.$router.push('/user');
      }

    } catch (error) {
      console.error('Error:', error.message);
      alert('Login gagal, silakan cek username dan password Anda.');
    }
  }
}
};
</script>

<style scoped>
.login-container {
  height: 100vh;
}

.login-left {
  background-color: #FFFFFF;
}

.login-right {
  background-color: #FFEFF6;
}

.logo-image {
  max-width: 150px;
}

.login-image {
  max-width: 100%;
}

.register-link a {
  color: #FF5DA6;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}

.custom-form {
  width: 400px;
  padding: 20px;
}

.custom-input {
  border-radius: 25px;
  border: 1px solid #ced4da;
}

.custom-button {
  width: 360px;
  background-color: #FF5DA6;
  border-radius: 25px;
  padding: 10px 15px;
  border: none;
  color: white;
}

.custom-button:hover {
  background-color: #007DA8;
}
</style>
