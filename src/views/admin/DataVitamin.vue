<template>
  <div class="bg-custom">
    <b-container>
      <b-row class="my-3 align-items-center">
        <b-col cols="12" md="8">
          <h3>Data Vitamin</h3>
        </b-col>
        <b-col cols="12" md="4" class="d-flex justify-content-end align-items-center">
          <b-input-group class="custom-input-group">
            <b-form-input
              v-model="searchQuery"
              placeholder="Cari..."
              class="search-input"
            ></b-form-input>
          </b-input-group>
          <b-button class="custom-button ml-3" @click="showAddModal">
            Tambah Data
          </b-button>
        </b-col>
      </b-row>

      <b-table
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
    </b-container>

    <b-modal v-model="showModal" title="Form Data Vitamin" hide-footer>
      <b-form @submit.prevent="saveItem">
        <b-form-group label="Nama Vitamin" label-for="VitaminName">
          <b-form-input
            id="VitaminName"
            v-model="formData.nama_vitamin"
            required
            class="custom-input"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Nama Layanan" label-for="LayananID">
          <b-form-select
            id="layananOptions"
            v-model="formData.layanan_id"
            :options="layananOptions"
            required
            class="custom-input"
          ></b-form-select>
        </b-form-group>
        <b-form-group label="Jadwal Pemberian" label-for="JadwalPemberian">
          <b-form-input
            id="JadwalPemberian"
            v-model="formData.jadwal_pemberian"
            required
            class="custom-input"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" class="custom-button">Simpan</b-button>
        <b-button class="cancel-button ml-0 ml-3" @click="hideModal">Batal</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      showModal: false,
      formData: {
        id: null,
        nama_vitamin: '',
        layanan_id: '',
        jadwal_pemberian: '',
      },
      items: [],
      layananOptions: [],
      fields: [
        { key: 'id', label: 'No.', sortable: true },
        { key: 'nama_vitamin', label: 'Nama Vitamin', sortable: true },
        { key: 'layanan_id', label: 'Nama Layanan', sortable: true },
        { key: 'jadwal_pemberian', label: 'Jadwal Pemberian', sortable: true },
        { key: 'actions', label: 'Aksi' },
      ],
      apiUrl: 'https://sigapkembiritan.or.id/api/vitamins',
      layananApiUrl: 'https://sigapkembiritan.or.id/api/layanans'
    };
  },
  computed: {
    filteredItems() {
      if (this.searchQuery) {
        return this.items.filter(item =>
          Object.values(item).some(value =>
            value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        );
      }
      return this.items;
    },
  },
  methods: {
    async fetchData() {
      try {
        const token = localStorage.getItem('token');
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get(this.apiUrl, { headers });
        console.log("Data fetched:", response.data);
        this.items = Array.isArray(response.data.items) ? response.data.items : [];
      } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
      }
    },
    async fetchLayanan() {
      try {
        const token = localStorage.getItem('token');
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get(this.layananApiUrl, { headers });
        console.log("Layanan fetched:", response.data);
        
        this.layananOptions = response.data.items.map(layanan => ({
          value: layanan.hashid,
          text: layanan.nama_layanan,
        }));
      } catch (error) {
        console.error("Error fetching layanan:", error.response ? error.response.data : error.message);
      }
    },
    showAddModal() {
      this.resetForm();
      this.fetchLayanan(); // Mengambil data layanan saat modal ditampilkan
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    resetForm() {
      this.formData = { id: null, nama_vitamin: '', layanan_id: '', jadwal_pemberian: '' };
    },
    async saveItem() {
      if (!this.formData.nama_vitamin || !this.formData.layanan_id || !this.formData.jadwal_pemberian) {
        console.error("Semua field harus diisi.");
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        if (this.formData.id) {
          await axios.put(`${this.apiUrl}/${this.formData.id}`, this.formData, { headers });
          const index = this.items.findIndex(item => item.id === this.formData.id);
          if (index !== -1) {
            this.items[index] = { ...this.formData };
          }
        } else {
          await axios.post(this.apiUrl, this.formData, { headers });
          this.items.push({ ...this.formData });
        }
        this.hideModal();
      } catch (error) {
        console.error("Error saving data:", error.response ? error.response.data : error.message);
      }
    },
    editItem(item) {
      this.formData = { ...item };
      this.fetchLayanan(); // Mengambil data layanan saat modal ditampilkan
      this.showModal = true;
    },
    async deleteItem(item) {
      try {
        const token = localStorage.getItem('token');
        const headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        if (confirm(`Apakah Anda yakin ingin menghapus data vitamin ${item.hashid}?`)) {
          await axios.delete(`${this.apiUrl}/${item.hashid}`, { headers });
          this.items = this.items.filter(i => i.hashid !== item.hashid);
        }
      } catch (error) {
        console.error("Error deleting data:", error.response ? error.response.data : error.message);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.bg-custom {
  background-color: #FFEFF6;
  min-height: 100vh;
  padding: 10px;
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

.custom-button {
  background-color: #FF5DA6;
  border-radius: 25px;
  border: none;
  color: white;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #007DA8;
}

.cancel-button {
  background-color: #8f8f8f;
  border-radius: 25px;
  border: none;
  color: white;
}

.rounded-button {
  border-radius: 25px;
}

.ml-3 {
  margin-left: 1rem;
}

@media (max-width: 576px) {
  .custom-button {
    font-size: 0.9rem;
  }
  .search-input {
    font-size: 0.9rem;
  }
}
</style>
