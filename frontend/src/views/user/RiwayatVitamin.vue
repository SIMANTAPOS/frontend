<template>
    <div class="container mt-0">
      <h2 class="mb-4">Riwayat Vitamin</h2>
      <b-table :items="records" :fields="fields" striped hover responsive="sm">
        <template #cell(name)="data">
          {{ data.item.name }}
        </template>
        <template #cell(nik)="data">
          {{ data.item.nik }}
        </template>
        <template #cell(vitaminDate)="data">
          {{ formatDate(data.item.vitaminDate) }}
        </template>
        <template #cell(age)="data">
          {{ data.item.age }} bulan
        </template>
        <template #cell(vitaminType)="data">
          {{ data.item.vitaminType }}
        </template>
      </b-table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RiwayatVitamin',
    data() {
      return {
        records: [],
        fields: [
          { key: 'vitaminDate', label: 'Tanggal Vitamin' },
          { key: 'name', label: 'Nama Balita' },
          { key: 'nik', label: 'NIK' },
          { key: 'age', label: 'Usia (bulan)' },
          { key: 'vitaminType', label: 'Jenis Vitamin' }
        ]
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        // Simulasi pengambilan data dari API atau database
        this.records = [
          {
            vitaminDate: '2024-05-18',
            name: 'Moh. Faaz Al Kahfi',
            nik: '3201010101010001',
            age: 12,
            vitaminType: 'Vitamin A'
          },
        ];
      },
      formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Menambahkan 1 karena getMonth() dimulai dari 0
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
  