<template>
  <div class="data-anak-container">
    <h2 class="mb-4">Data Anak</h2>
    <div class="row">
      <div v-for="child in children" :key="child.nik" class="col-md-4">
        <b-card class="mb-3" bg-variant="light">
          <b-card-header class="card-header-custom">
            <h5>{{ child.nama }}</h5>
          </b-card-header>
          <b-card-body class="card-body-custom">
            <p><strong>NIK:</strong> {{ child.nik }}</p>
            <p><strong>Tanggal Lahir:</strong> {{ formatDate(child.tanggal_lahir) }}</p>
            <p><strong>Jenis Kelamin:</strong> {{ formatGender(child.jenis_kelamin) }}</p>
            <p><strong>Golongan:</strong> {{ child.tipe }}</p>
            
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DataAnak',
  data() {
    return {
      children: []
    };
  },
  created() {
    this.fetchChildrenData();
  },
  methods: {
    async fetchChildrenData() {
      try {
        // Ambil token dari localStorage
        const token = localStorage.getItem('token');
        
        // Buat header dengan Authorization Bearer token
        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        };

        const response = await axios.get('https://sigapkembiritan.or.id/api/balitas', { headers });
        
        // Log hasil respons untuk debugging
        console.log('Response data:', response.data);

        // Assign hasil fetch ke children
        this.children = response.data.items;
      } catch (error) {
        console.error('Error fetching children data:', error);
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    formatGender(gender) {
      return gender === 'L' ? 'Laki-laki' : 'Perempuan';
    }
  }
};
</script>

<style scoped>
.data-anak-container {
  background-color: #FFEFF6;
  min-height: 100vh;
  padding: 20px;
}

.card-header-custom {
  background-color: #007DA8;
  color: #FFFFFF;
  font-weight: bold;
}

.card-body-custom {
  background-color: #E6F2F6;
  color: #000000;
}

h2 {
  color: #000000;
  text-align: left;
  margin-bottom: 40px;
}
</style>
