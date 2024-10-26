<template>
  <div class="bg-custom">
    <b-container>
      <!-- Header Section -->
      <b-row v-if="!showForm" class="my-3 align-items-center">
        <b-col cols="12" md="8">
          <h3>Pemeriksaan</h3>
        </b-col>
        <b-col
          cols="12"
          md="4"
          class="d-flex justify-content-end align-items-center"
        >
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

      <!-- Print Report Button -->
      <b-row class="my-3">
        <b-col>
          <b-button class="custom-print-button" @click="printReport">
            Cetak Laporan
          </b-button>
        </b-col>
      </b-row>

      <!-- Loading Indicator -->
      <b-row v-if="isLoading" class="my-3">
        <b-col class="text-center">
          <b-spinner label="Loading..."></b-spinner>
        </b-col>
      </b-row>

      <!-- Data Table -->
      <b-table
        v-if="!showForm"
        :items="filteredItems"
        :fields="fields"
        class="mt-3"
        responsive="md"
        hover
      >
        <template #cell(actions)="row">
          <b-button
            size="sm"
            variant="warning"
            @click="editItem(row.item)"
            class="rounded-button"
          >Edit</b-button>
          <b-button
            size="sm"
            variant="danger"
            @click="deleteItem(row.item)"
            class="rounded-button"
          >Hapus</b-button>
        </template>
      </b-table>

      <!-- Form Add/Edit Data -->
      <div v-if="showForm" class="container mt-5">
        <div class="row">
          <!-- Search and Display Child Data -->
          <div class="col-md-5">
            <h4 class="mb-3">Cari Data Anak</h4>
            <b-form-group label="Nama Anak">
              <b-form-select
                v-model="selectedChildId"
                @change="fetchChildData"
                :options="childOptions"
                class="custom-input"
              >
                <option :value="null">Pilih Nama Anak</option>
              </b-form-select>
            </b-form-group>

            <div v-if="childData" class="mt-4">
              <p><strong>Nama Anak:</strong> {{ childData.nama }}</p>
              <p><strong>NIK Anak:</strong> {{ childData.nik }}</p>
              <p><strong>Jenis Kelamin:</strong> {{ childData.jenis_kelamin }}</p>
              <p><strong>Tanggal Lahir:</strong> {{ childData.tanggal_lahir }}</p>
              <p><strong>Golongan:</strong> {{ childData.tipe }}</p>
            </div>
          </div>

          <!-- Form Input for Data -->
          <div class="col-md-7">
            <h4 class="mb-3">Form Penimbangan</h4>
            <b-form-group label="Tanggal Pemeriksaan">
              <b-form-input
                type="date"
                v-model="tanggalPemeriksaan"
                class="custom-input"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Berat Badan (kg)">
              <b-form-input
                v-model="beratBadan"
                placeholder="Masukkan berat badan"
                class="custom-input"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Tinggi Badan (cm)">
              <b-form-input
                v-model="tinggiBadan"
                placeholder="Masukkan tinggi badan"
                class="custom-input"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Lingkar Lengan (cm)">
              <b-form-input
                v-model="lingkarLengan"
                placeholder="Masukkan lingkar lengan"
                class="custom-input"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Lingkar Kepala (cm)">
              <b-form-input
                v-model="lingkarKepala"
                placeholder="Masukkan lingkar kepala"
                class="custom-input"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Vitamin">
              <b-form-select
                v-model="selectedVitaminId"
                :options="vitaminOptions"
                class="custom-input"
              >
                <option :value="null">Pilih Vitamin</option>
              </b-form-select>
            </b-form-group>

            <b-form-group label="Layanan Imunisasi">
              <b-form-select
                v-model="selectedLayananId"
                :options="layananOptions"
                class="custom-input"
              >
                <option :value="null">Pilih Layanan Imunisasi</option>
              </b-form-select>
            </b-form-group>

            <div class="d-flex justify-content-end">
              <b-button class="cancel-button" @click="cancelForm">
                <b-icon icon="x-circle"></b-icon> Batal
              </b-button>
              <b-button class="custom-button ml-3" @click="saveForm">
                <b-icon icon="check-circle"></b-icon> Simpan
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
      searchQuery: "",
      items: [],
      fields: [
        { key: "id", label: "No." },
        { key: "tanggal_pemeriksaan", label: "Tanggal Pemeriksaan" },
        { key: "nama", label: "Nama" },
        { key: "berat_badan", label: "Berat Badan (kg)" },
        { key: "tinggi_badan", label: "Tinggi Badan (cm)" },
        { key: "lingkar_lengan", label: "Lingkar Lengan (cm)" },
        { key: "lingkar_kepala", label: "Lingkar Kepala (cm)" },
        { key: "status_gizi", label: "Status Gizi" },
        { key: "actions", label: "Aksi" },
      ],
      showForm: false,
      childOptions: [],
      selectedChildId: null,
      childData: null,
      tanggalPemeriksaan: "",
      beratBadan: "",
      tinggiBadan: "",
      lingkarLengan: "",
      lingkarKepala: "",
      selectedVitaminId: null,
      vitaminOptions: [],
      selectedLayananId: null,
      layananOptions: [],
      editingItem: null,
      showNotification: false,
      isLoading: false,
    };
  },
  computed: {
    filteredItems() {
      if (this.searchQuery) {
        return this.items.filter((item) =>
          item.nama.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.items;
    },
  },
  watch: {
    selectedChildId(newId) {
      if (newId) {
        this.fetchChildData();
      } else {
        this.childData = null;
      }
    },
  },
  methods: {
    async fetchData() {
  this.isLoading = true;
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://sigapkembiritan.or.id/api/pemeriksaans', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Data pemeriksaan:', response.data);

    // Map data to include child's name directly
    this.items = response.data.items.map(item => ({
      ...item,
      nama: item.balita ? item.balita.nama : 'Nama tidak tersedia',
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    this.isLoading = false;
  }
},

    async fetchChildOptions() {
      this.isLoading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://sigapkembiritan.or.id/api/balitas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Response Data Balita:', response.data);
        if (response.data.items && Array.isArray(response.data.items)) {
          this.childOptions = response.data.items.map(child => ({
            value: child.hashid,
            text: child.nama
          }));
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching child options:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchVitaminOptions() {
      this.isLoading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://sigapkembiritan.or.id/api/vitamins', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.items && Array.isArray(response.data.items)) {
          this.vitaminOptions = response.data.items.map(vitamin => ({
            value: vitamin.hashid,
            text: vitamin.nama_vitamin
          }));
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching vitamin options:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchLayananOptions() {
      this.isLoading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://sigapkembiritan.or.id/api/imunisasi-balitas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.items && Array.isArray(response.data.items)) {
          this.layananOptions = response.data.items.map(layanan => ({
            value: layanan.hashid,
            text: layanan.imunisasi_id
          }));
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching layanan options:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchChildData() {
      if (!this.selectedChildId) return;
      this.isLoading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://sigapkembiritan.or.id/api/balitas/${this.selectedChildId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Data anak:', response.data);
        this.childData = response.data;
      } catch (error) {
        console.error('Error fetching child data:', error);
      } finally {
        this.isLoading = false;
      }
    },
    validateForm() {
      // Allow form submission even with missing data
      return true;
    },
    async saveForm() {
      if (!this.validateForm()) {
        return;
      }

      this.isLoading = true;
      try {
        const token = localStorage.getItem('token');
        const payload = {
          balita_id: this.selectedChildId || null,
          vitamin_balita_id: this.selectedVitaminId || null,
          imunisasi_balita_id: this.selectedLayananId || null,
          tanggal_pemeriksaan: this.tanggalPemeriksaan || null,
          berat_badan: this.beratBadan || null,
          tinggi_badan: this.tinggiBadan || null,
          lingkar_lengan: this.lingkarLengan || null,
          lingkar_kepala: this.lingkarKepala || null,
        };

        console.log('Data yang akan disubmit:', payload);

        let response;
        if (this.editingItem) {
          response = await axios.put(
            `https://sigapkembiritan.or.id/api/pemeriksaans/${this.editingItem.id}`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          response = await axios.post('https://sigapkembiritan.or.id/api/pemeriksaans', payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        console.log('Response from server:', response.data);
        this.showNotification = true;
        this.resetForm();
        this.fetchData(); // Refresh data after saving
      } catch (error) {
        console.error('Error saving data:', error);
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.selectedChildId = null;
      this.tanggalPemeriksaan = "";
      this.beratBadan = "";
      this.tinggiBadan = "";
      this.lingkarLengan = "";
      this.lingkarKepala = "";
      this.selectedVitaminId = null;
      this.selectedLayananId = null;
      this.editingItem = null;
      this.showForm = false;
    },
    editItem(item) {
      this.editingItem = item;
      this.selectedChildId = item.balita_id;
      this.tanggalPemeriksaan = item.tanggal_pemeriksaan;
      this.beratBadan = item.berat_badan;
      this.tinggiBadan = item.tinggi_badan;
      this.lingkarLengan = item.lingkar_lengan;
      this.lingkarKepala = item.lingkar_kepala;
      this.selectedVitaminId = item.vitamin_balita_id;
      this.selectedLayananId = item.imunisasi_balita_id;
      this.showForm = true;
    },
    deleteItem(item) {
      if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        const token = localStorage.getItem('token');
        axios
          .delete(`https://sigapkembiritan.or.id/api/pemeriksaans/${item.hashid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log('Data deleted:', response.data);
            this.fetchData();
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });
      }
    },
    showAddForm() {
      this.resetForm();
      this.showForm = true;
    },
    cancelForm() {
      this.resetForm();
    },
  },
  mounted() {
    this.fetchData();
    this.fetchChildOptions();
    this.fetchVitaminOptions();
    this.fetchLayananOptions();
  },
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
