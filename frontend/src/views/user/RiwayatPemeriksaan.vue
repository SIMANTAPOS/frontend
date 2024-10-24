<template>
  <div class="container mt-0">
    <h2 class="mb-4">Riwayat Pemeriksaan</h2>
    <b-table :items="records" :fields="fields" striped hover responsive="sm">
      <template #cell(tanggal_pemeriksaan)="data">
        {{ formatDate(data.item.tanggal_pemeriksaan) }}
      </template>
      <template #cell(balita_id)="data">
        {{ data.item.balita_id }}
      </template>
      <template #cell(berat_badan)="data">
        {{ data.item.berat_badan }} kg
      </template>
      <template #cell(tinggi_badan)="data">
        {{ data.item.tinggi_badan }} cm
      </template>
      <template #cell(lingkar_kepala)="data">
        {{ data.item.lingkar_kepala }} cm
      </template>
      <template #cell(lingkar_lengan)="data">
        {{ data.item.lingkar_lengan }} cm
      </template>
      <template #cell(status_gizi)="data">
        {{ data.item.status_gizi }}
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'RiwayatPemeriksaan',
  data() {
    return {
      records: [],
      fields: [
        { key: 'tanggal_pemeriksaan', label: 'Tanggal Pemeriksaan' },
        { key: 'balita_id', label: 'ID Balita' },
        { key: 'berat_badan', label: 'Berat Badan (kg)' },
        { key: 'tinggi_badan', label: 'Tinggi Badan (cm)' },
        { key: 'lingkar_kepala', label: 'Lingkar Kepala (cm)' },
        { key: 'lingkar_lengan', label: 'Lingkar Lengan (cm)' },
        { key: 'status_gizi', label: 'Status Gizi' }
      ]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      console.log('Memulai pengambilan data riwayat pemeriksaan...');

      try {
        const response = await fetch('https://sigapkembiritan.or.id/api/pemeriksaans', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log('Status respons:', response.status);

        if (!response.ok) {
          console.error('Gagal mengambil data: ', response.statusText);
          throw new Error('Gagal mengambil data');
        }

        const data = await response.json();
        console.log('Data respons dari API:', data);

        this.records = data.items;
        console.log('Data yang di-set ke records:', this.records);

      } catch (error) {
        console.error('Error fetching records:', error);
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
  background-color: #E6F2F6;
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
