<template>
  <div class="bg-custom">
    <b-container>
      <b-row v-if="!showForm" class="my-3 align-items-center">
        <b-col cols="12" md="8">
          <h3>Vitamin</h3>
        </b-col>
        <b-col cols="12" md="4" class="d-flex justify-content-end align-items-center">
          <b-input-group class="custom-input-group">
            <b-form-input
              v-model="searchQuery"
              placeholder="Cari..."
              class="search-input"
            ></b-form-input>
          </b-input-group>
          <b-button class="custom-button ml-3" @click="showAddForm">
            Tambah Data
          </b-button>
        </b-col>
      </b-row>

      <b-table
        v-if="!showForm"
        :items="filteredItems"
        :fields="fields"
        class="mt-3"
        responsive="md"
        hover
      >
        <template #cell(actions)="row">
          <b-button size="sm" variant="warning" @click="editItem(row.item)" class="rounded-button">Edit</b-button>
          <b-button size="sm" variant="danger" @click="deleteItem(row.item)" class="rounded-button">Hapus</b-button>
        </template>
      </b-table>

      <div v-if="showForm" class="container mt-5">
        <div class="row">
          <div class="col-md-7">
            <h4 class="mb-3">Form Vitamin</h4>
            <b-form-group label="Tanggal Vitamin">
              <b-input-group>
                <b-form-input type="date" v-model="vitaminTanggal" class="custom-input"></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group label="Usia">
              <b-form-input v-model="usia" placeholder="Masukkan usia" class="custom-input"></b-form-input>
            </b-form-group>

            <b-form-group label="Jenis Vitamin">
              <b-form-select
                v-model="selectedVitamin"
                :options="vitaminOptions"
                placeholder="Pilih jenis vitamin"
                class="custom-input"
              ></b-form-select>
            </b-form-group>

            <b-form-group label="Posyandu">
              <b-form-select
                v-model="selectedPosyandu"
                :options="posyanduOptions"
                placeholder="Pilih posyandu"
                class="custom-input"
              ></b-form-select>
            </b-form-group>

            <b-form-group label="Balita">
              <b-form-select
                v-model="selectedBalita"
                :options="balitaOptions"
                placeholder="Pilih balita"
                class="custom-input"
              ></b-form-select>
            </b-form-group>

            <div class="d-flex justify-content-end">
              <b-button class="cancel-button" @click="cancelForm">
                <b-icon-x-circle></b-icon-x-circle> Batal
              </b-button>
              <b-button class="custom-button ml-3" @click="saveForm">
                <b-icon-check-circle></b-icon-check-circle> Simpan
              </b-button>
            </div>
          </div>
        </div>
        <b-alert
          v-if="showNotification"
          variant="success"
          dismissible
          @dismissed="showNotification = false"
        >
          Data berhasil disimpan
        </b-alert>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      items: [], // Items for the table
      fields: [
        { key: 'id', label: 'No.' },
        { key: 'tanggal_pemberian_vitamin', label: 'Tanggal' },
        { key: 'vitamin', label: 'Jenis Vitamin' },
        { key: 'posyandu', label: 'Posyandu' },
        { key: 'balita', label: 'Balita' },
        { key: 'actions', label: 'Aksi' }
      ],
      showForm: false,
      vitaminTanggal: '',
      usia: '',
      editingItem: null,
      vitaminOptions: [],
      posyanduOptions: [],
      balitaOptions: [],
      selectedVitamin: null,
      selectedPosyandu: null,
      selectedBalita: null,
      showNotification: false
    };
  },
  computed: {
    filteredItems() {
      if (this.searchQuery) {
        return this.items.filter(item => 
          item.vitamin.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.items;
    }
  },
  methods: {
    async fetchVitaminOptions() {
      try {
        const token = localStorage.getItem('token');
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get('https://sigapkembiritan.or.id/api/vitamins', { headers });
        this.vitaminOptions = response.data.items.map(vitamin => ({
          value: vitamin.hashid,
          text: vitamin.nama_vitamin
        }));
        console.log('Vitamin options fetched:', this.vitaminOptions);
      } catch (error) {
        console.error("Error fetching vitamin options:", error.response ? error.response.data : error.message);
      }
    },
    async fetchPosyanduOptions() {
      try {
        const token = localStorage.getItem('token');
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get('https://sigapkembiritan.or.id/api/posyandus', { headers });
        this.posyanduOptions = response.data.items.map(posyandu => ({
          value: posyandu.hashid,
          text: posyandu.nama
        }));
        console.log('Posyandu options fetched:', this.posyanduOptions);
      } catch (error) {
        console.error("Error fetching posyandu options:", error.response ? error.response.data : error.message);
      }
    },
    async fetchBalitaOptions() {
      try {
        const token = localStorage.getItem('token');
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get('https://sigapkembiritan.or.id/api/balitas', { headers });
        this.balitaOptions = response.data.items.map(balita => ({
          value: balita.hashid,
          text: balita.nama
        }));
        console.log('Balita options fetched:', this.balitaOptions);
      } catch (error) {
        console.error("Error fetching balita options:", error.response ? error.response.data : error.message);
      }
    },
    async fetchVitaminServices() {
      try {
        const token = localStorage.getItem('token');
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get('https://sigapkembiritan.or.id/api/vitaminbalitas', { headers });
        this.items = await Promise.all(response.data.items.map(async item => {
          return {
            id: item.id,
            tanggal_pemberian_vitamin: item.tanggal_pemberian_vitamin,
            vitamin: await this.getVitaminName(item.vitamin_id),
            posyandu: await this.getPosyanduName(item.posyandu_id),
            balita: await this.getBalitaName(item.balita_id)
          };
        }));
        console.log('Vitamin services fetched:', this.items);
      } catch (error) {
        console.error("Error fetching vitamin services:", error.response ? error.response.data : error.message);
      }
    },
    async getVitaminName(hashId) {
      try {
        const token = localStorage.getItem('token');
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get(`https://sigapkembiritan.or.id/api/vitamins/${hashId}`, { headers });
        return response.data.nama_vitamin; // Ganti dengan field yang sesuai dari API
      } catch (error) {
        console.error("Error fetching vitamin name:", error.response ? error.response.data : error.message);
        return hashId; // Jika ada error, kembalikan hashId sebagai fallback
      }
    },
    async getPosyanduName(hashId) {
      try {
        const token = localStorage.getItem('token');
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get(`https://sigapkembiritan.or.id/api/posyandus/${hashId}`, { headers });
        return response.data.nama; // Ganti dengan field yang sesuai dari API
      } catch (error) {
        console.error("Error fetching posyandu name:", error.response ? error.response.data : error.message);
        return hashId; // Jika ada error, kembalikan hashId sebagai fallback
      }
    },
    async getBalitaName(hashId) {
      try {
        const token = localStorage.getItem('token');
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get(`https://sigapkembiritan.or.id/api/balitas/${hashId}`, { headers });
        return response.data.nama; // Ganti dengan field yang sesuai dari API
      } catch (error) {
        console.error("Error fetching balita name:", error.response ? error.response.data : error.message);
        return hashId; // Jika ada error, kembalikan hashId sebagai fallback
      }
    },
    showAddForm() {
      this.showForm = true;
      this.clearForm();
      this.fetchVitaminOptions();
      this.fetchPosyanduOptions();
      this.fetchBalitaOptions();
    },
    cancelForm() {
      this.showForm = false;
    },
    saveForm() {
      if (!this.vitaminTanggal || !this.usia || !this.selectedVitamin || !this.selectedPosyandu || !this.selectedBalita) {
        alert('Harap lengkapi semua field.');
        return;
      }

      const token = localStorage.getItem('token');
      const headers = { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      axios.post('https://sigapkembiritan.or.id/api/vitaminbalitas', {
        posyandu_id: this.selectedPosyandu,
        vitamin_id: this.selectedVitamin,
        balita_id: this.selectedBalita,
        tanggal_pemberian_vitamin: this.vitaminTanggal
      }, { headers })
      .then(response => {
        console.log('Data disimpan', response.data);
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
        this.showForm = false;
        this.clearForm();
        this.fetchVitaminServices(); // Refresh the table data
      })
      .catch(error => {
        console.error("Error saving data:", error.response ? error.response.data : error.message);
      });
    },
    editItem(item) {
      console.log('Edit item:', item);
      this.showForm = true;
      this.editingItem = item;
      this.vitaminTanggal = item.tanggal_pemberian_vitamin;
      this.usia = item.usia;
      this.selectedVitamin = item.vitamin_id;
      this.selectedPosyandu = item.posyandu_id;
      this.selectedBalita = item.balita_id;
    },
    deleteItem(item) {
      console.log('Hapus item:', item);
      // You might want to call an API to delete the item here
      this.items = this.items.filter(i => i.id !== item.id);
    },
    clearForm() {
      this.vitaminTanggal = '';
      this.usia = '';
      this.selectedVitamin = null;
      this.selectedPosyandu = null;
      this.selectedBalita = null;
      this.editingItem = null;
    }
  },
  mounted() {
    this.fetchVitaminServices(); // Fetch data when the component is mounted
    this.fetchVitaminOptions();
    this.fetchPosyanduOptions();
    this.fetchBalitaOptions();
  }
};
</script>



<style scoped>
h4 {
  color: #333;
}
.b-button {
  border-radius: 25px;
}
.b-form-group {
  margin-bottom: 1.5rem;
}
.bg-custom {
  background-color: #ffeff6;
  min-height: 100vh;
  padding: 10px;
}
.cancel-button {
  background-color: #626262;
  border-radius: 25px;
  border: none;
  color: white;
}

.custom-input-group {
  max-width: 250px;
}

.custom-input {
  border-radius: 25px;
}

.search-input {
  border-radius: 25px;
}

.ml-3 {
  margin-left: 1rem;
}

.custom-button {
  background-color: #ff5da6;
  border-radius: 25px;
  border: none;
  color: white;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #007da8;
}

.custom-print-button {
  color: #FFFFFF; 
  border-radius: 25px; 
  background-color: #007DA8; 
}

.custom-print-button:hover {
  background-color: #ff5da6;
}

.rounded-button {
  border-radius: 25px;
}
.position-fixed {
  position: fixed;
}
.top-0 {
  top: 0;
}
.end-0 {
  right: 0;
}
</style>
