<template>
  <div class="container mt-0">
    <h2 class="mb-4">Riwayat Imunisasi</h2>
    <b-table :items="records" :fields="fields" striped hover responsive="sm">
      <template #cell(nama_balita)="data">
        {{ data.item.nama_balita }}
      </template>
      <template #cell(nik)="data">
        {{ data.item.nik }}
      </template>
      <template #cell(tanggal_imunisasi)="data">
        {{ formatDate(data.item.tanggal_imunisasi) }}
      </template>
      <template #cell(usia)="data">
        {{ data.item.usia }} bulan
      </template>
      <template #cell(nama_imunisasi)="data">
        {{ data.item.nama_imunisasi }}
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'RiwayatImunisasi',
  data() {
    return {
      records: [],
      fields: [
        { key: 'tanggal_imunisasi', label: 'Tanggal Imunisasi' },
        { key: 'nama_balita', label: 'Nama Balita' },
        { key: 'nik', label: 'NIK' },
        { key: 'usia', label: 'Usia (bulan)' },
        { key: 'nama_imunisasi', label: 'Jenis Imunisasi' }
      ]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://sigapkembiritan.or.id/api/imunisasi-balitas', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        console.log('Data Imunisasi:', data); // Log data untuk pemantauan
        this.records = data.items;
      } catch (error) {
        console.error('Error fetching immunization data:', error);
      }
    },
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #FFEFF6;
  min-height: 100vh;
  padding: 20px;
}

h2 {
  color: #000000;
  text-align: left;
  margin-bottom: 40px;
}

.table {
  background-color: white;
}

.table thead th {
  background-color: #007DA8;
  color: #FFFFFF;
  text-align: center;
  font-weight: bold;
}

.table tbody td {
  text-align: center;
  background-color: #E6F2F6;
  color: #000000;
}
</style>
