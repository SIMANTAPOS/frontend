<template>
  <b-container fluid class="register-container">
    <b-row no-gutters class="h-100">
      <b-col md="6" class="left-register d-none d-md-flex justify-content-center align-items-center">
        <img src="@/assets/images/logins.png" alt="Register Image" class="register-image" />
      </b-col>
      <b-col md="6" class="right-register d-flex flex-column justify-content-center align-items-center">
        <b-form @submit.prevent="register" class="custom-form">
          
          <b-row>
            <b-col md="6">
              <h3 class="text-center mb-5 custom-title">Buat akun</h3>
              <b-form-group label="Nama Lengkap" label-for="name">
                <b-form-input
                  id="name"
                  v-model="registerData.name"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  class="custom-input"
                />
              </b-form-group>

              <b-form-group label="Username" label-for="username">
                <b-form-input
                  id="username"
                  v-model="registerData.username"
                  type="text"
                  placeholder="Masukkan username"
                  class="custom-input"
                />
              </b-form-group>

              <b-form-group label="Email" label-for="email">
                <b-form-input
                  id="email"
                  v-model="registerData.email"
                  type="email"
                  placeholder="Masukkan email"
                  class="custom-input"
                />
              </b-form-group>

              <b-form-group label="Password" label-for="password">
                <b-form-input
                  id="password"
                  v-model="registerData.password"
                  type="password"
                  placeholder="Masukkan password"
                  class="custom-input"
                />
              </b-form-group>

              <b-form-group label="Konfirmasi Password" label-for="password_confirmation">
                <b-form-input
                  id="password_confirmation"
                  v-model="registerData.password_confirmation"
                  type="password"
                  placeholder="Masukkan konfirmasi password"
                  class="custom-input"
                />
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group label="Alamat" label-for="address">
                <b-form-input
                  id="address"
                  v-model="registerData.alamat"
                  type="text"
                  placeholder="Masukkan alamat lengkap"
                  class="custom-input"
                />
              </b-form-group>

              <b-form-group label="No. HP" label-for="telephone">
                <b-form-input
                  id="telephone"
                  v-model="registerData.telephone"
                  type="tel"
                  placeholder="Masukkan nomor telepon"
                  class="custom-input"
                />
              </b-form-group>

              <b-form-group label="NIK Ayah" label-for="nik_ayah">
                <b-form-input
                  id="nik_ayah"
                  v-model="registerData.nik_ayah"
                  type="text"
                  placeholder="Masukkan NIK Ayah"
                  class="custom-input"
                />
              </b-form-group>

              <b-form-group label="Nama Ayah" label-for="nama_ayah">
                <b-form-input
                  id="nama_ayah"
                  v-model="registerData.nama_ayah"
                  type="text"
                  placeholder="Masukkan nama Ayah"
                  class="custom-input"
                />
              </b-form-group>

              <b-form-group label="NIK Ibu" label-for="nik_ibu">
                <b-form-input
                  id="nik_ibu"
                  v-model="registerData.nik_ibu"
                  type="text"
                  placeholder="Masukkan NIK Ibu"
                  class="custom-input"
                />
              </b-form-group>

              <b-form-group label="Nama Ibu" label-for="nama_ibu">
                <b-form-input
                  id="nama_ibu"
                  v-model="registerData.nama_ibu"
                  type="text"
                  placeholder="Masukkan nama Ibu"
                  class="custom-input"
                />
              </b-form-group>
            </b-col>
          </b-row>

          <div class="d-flex justify-content-center">
            <b-button type="submit" block class="custom-button mt-3 mb-0">
              Register
            </b-button>
          </div>
        </b-form>

        <div class="register-link mt-3">
          <p>Sudah punya akun? <router-link to="/login">Login</router-link></p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const registerData = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  alamat: '',
  telephone: '',
  nik_ayah: '',
  nama_ayah: '',
  nik_ibu: '',
  nama_ibu: ''
});

const register = async () => {
  try {
    const response = await axios.post('https://sigapkembiritan.or.id/api/register', registerData);
    console.log('Registration successful:', response.data);

    router.push('/login');
  } catch (error) {
    console.error('Registration failed:', error.response.data);
    console.log('Detailed error:', error.response.data.errors);
  }
};
</script>

<style scoped>
.register-container {
  height: 100vh;
}

.left-register {
  background-color: #FFEFF6;
}

.register-image {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

.right-register {
  background-color: white;
  padding: 2rem;
}

.custom-form {
  width: 100%;
  max-width: 800px;
}

.custom-title {
  padding: 5px;
  color: #1F1F1F;
}

.custom-input {
  border-radius: 25px;
  padding: 10px 15px;
  border: 1px solid #ced4da;
}

.custom-button {
  width: 100%;
  max-width: 370px; /* Adjust this to match the form-group width */
  background-color: #FF5DA6;
  border-radius: 50px;
  border: none;
  color: white;
  padding: 10px 20px;
}

.custom-button:hover {
  background-color: #007DA8;
}

.register-link p {
  font-size: 0.875rem;
}

.register-link a {
  color: #FF5DA6;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .left-register {
    display: none;
  }

  .custom-form {
    padding: 20px;
  }
}
</style>
