<template>
  <div class="bg-custom">
    <b-container>
      <b-row v-if="!showForm" class="my-3 align-items-center">
        <b-col cols="12" md="8">
          <h3>Imunisasi Balita</h3>
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
            <h4 class="mb-3">Form Imunisasi</h4>
            <b-form-group label="Tanggal Imunisasi">
              <b-input-group>
                <b-form-input type="date" v-model="imunisasiTanggal" class="custom-input"></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group label="posyandu">
              <b-form-select
                v-model="selectedPosyandu"
                :options="posyanduOptions"
                placeholder="Pilih nama anak"
                class="custom-input"
              ></b-form-select>
            </b-form-group>

            <b-form-group label="Usia">
              <b-form-input v-model="usia" placeholder="Masukkan usia" class="custom-input"></b-form-input>
            </b-form-group>

            <b-form-group label="Jenis Imunisasi">
              <b-form-select
                v-model="selectedImunisasi"
                :options="imunisasiOptions"
                placeholder="Pilih jenis imunisasi"
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
      items: [], // Data imunisasi yang telah diambil
      fields: [
        { key: "id", label: "No." },
        { key: "date", label: "Tanggal Imunisasi" },
        { key: "posyandu", label: "Posyandu" },
        { key: "usia", label: "Usia" },
        { key: "imunisasi", label: "Jenis Imunisasi" },
        { key: "actions", label: "Aksi" }
      ],
      showForm: false,
      selectedPosyandu: null,
      posyanduOptions: [], // Data opsi posyandu
      selectedPosyanduData: null, // Data posyandu yang dipilih
      imunisasiTanggal: '',
      usia: '',
      editingItem: null,
      imunisasiOptions: [],
      selectedImunisasi: null,
      showNotification: false
    };
  },
  computed: {
    filteredItems() {
      if (this.searchQuery) {
        return this.items.filter(item => 
          item.posyandu.nama.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.items;
    }
  },
  methods: {
    getAuthHeader() {
      const token = localStorage.getItem('token');
      return { Authorization: `Bearer ${token}` };
    },
    async fetchImunisasiData() {
      try {
        const response = await axios.get('https://sigapkembiritan.or.id/api/imunisasi-balitas', {
          headers: this.getAuthHeader(),
        });
        // Mengakses target array dan mengambil nama posyandu
        this.items = response.data.items.map(item => ({
          ...item,
          posyandu: item.posyandu.nama // Mengambil nama posyandu
        }));
        console.log("Fetched Imunisasi Data:", this.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchImunisasiOptions() {
      try {
        const response = await axios.get('https://sigapkembiritan.or.id/api/imunisasis', {
          headers: this.getAuthHeader(),
        });
        this.imunisasiOptions = response.data.items.map(option => ({
          value: option.hashid,
          text: option.nama_imunisasi
        }));
        console.log("Fetched Imunisasi Options:", this.imunisasiOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    },
    async fetchPosyanduOptions() {
      try {
        const response = await axios.get('https://sigapkembiritan.or.id/api/posyandus', {
          headers: this.getAuthHeader(),
        });
        this.posyanduOptions = response.data.items.map(posyandu => ({
          value: posyandu.hashid,
          text: posyandu.nama
        }));
        console.log("Fetched Posyandu Options:", this.posyanduOptions);
      } catch (error) {
        console.error("Error fetching posyandu options:", error);
      }
    },
    showAddForm() {
      this.showForm = true;
      this.clearForm();
      this.fetchImunisasiOptions();
      this.fetchPosyanduOptions(); // Fetch posyandu options when adding new data
    },
    cancelForm() {
      this.showForm = false;
    },
    async saveForm() {
      try {
        const payload = {
          posyandu_id: this.selectedPosyandu,
          tanggal_imunisasi: this.imunisasiTanggal,
          usia: this.usia,
          imunisasi_id: this.selectedImunisasi,
        };

        console.log("Payload Data:", payload); // Log the payload data

        let response;
        if (this.editingItem) {
          // Edit existing item
          response = await axios.put(`https://sigapkembiritan.or.id/api/imunisasi-balitas/${this.editingItem.id}`, payload, {
            headers: this.getAuthHeader(),
          });
          const index = this.items.findIndex(item => item.id === this.editingItem.id);
          if (index !== -1) {
            this.items.splice(index, 1, response.data); // Update the item in the list
          }
        } else {
          // Add new item
          response = await axios.post('https://sigapkembiritan.or.id/api/imunisasi-balitas', payload, {
            headers: this.getAuthHeader(),
          });
          this.items.push(response.data); // Add the new item to the list
        }

        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 3000);

        console.log("Saved Data:", response.data);
        this.showForm = false;
        this.clearForm();
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },
    async loadSelectedPosyanduData() {
      if (this.selectedPosyandu) {
        try {
          const response = await axios.get(`https://sigapkembiritan.or.id/api/posyandus/${this.selectedPosyandu}`, {
            headers: this.getAuthHeader(),
          });
          this.selectedPosyanduData = response.data;
          console.log('Selected Posyandu Data:', this.selectedPosyanduData);
        } catch (error) {
          console.error("Error fetching posyandu data:", error);
        }
      }
    },
    editItem(item) {
      console.log('Edit item:', item);
      this.showForm = true;
      this.editingItem = item;
      this.imunisasiTanggal = item.date;
      this.usia = item.usia;
      this.selectedImunisasi = item.imunisasi;
      this.selectedPosyandu = item.posyandu_id;
      this.loadSelectedPosyanduData(); // Load data for the selected posyandu
    },
    deleteItem(item) {
      // Implement delete functionality if needed
      console.log('Delete item:', item);
    },
    clearForm() {
      this.selectedPosyandu = null;
      this.imunisasiTanggal = '';
      this.usia = '';
      this.selectedImunisasi = null;
      this.selectedPosyanduData = null;
      this.editingItem = null;
    }
  },
  created() {
    this.fetchImunisasiData(); // Fetch initial data
    this.fetchImunisasiOptions(); // Fetch initial imunisasi options
    this.fetchPosyanduOptions(); // Fetch initial posyandu options
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
