<template>
  <div class="bg-custom">
    <b-container>
      <b-row class="my-3 align-items-center">
        <b-col cols="12" md="8">
          <h3>Data Orang Tua</h3>
        </b-col>
        <b-col cols="12" md="4" class="d-flex justify-content-end align-items-center">
          <b-input-group class="custom-input-group">
            <b-form-input
              v-model="searchQuery"
              placeholder="Cari..."
              class="search-input"
            ></b-form-input>
          </b-input-group>
          <b-button class="custom-button ml-3" @click="showAddModal">Tambah Data</b-button>
        </b-col>
      </b-row>

      <b-table
        :items="filteredItems"
        :fields="fields"
        class="mt-3"
        responsive="md"
        hover
      >
        <template #cell(no)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="warning" @click="editItem(row.item)" class="rounded-button mr-2">Edit</b-button>
          <b-button size="sm" variant="danger" @click="deleteItem(row.item)" class="rounded-button">Hapus</b-button>
        </template>
      </b-table>
    </b-container>

    <b-modal v-model="showModal" title="Tambah/Edit Data Orang Tua">
      <b-form @submit.prevent="saveItem">
        <b-form-group label="Nama Ayah">
          <b-form-input v-model="formData.nama_ayah" required></b-form-input>
        </b-form-group>
        <b-form-group label="NIK Ayah">
          <b-form-input v-model="formData.nik_ayah" required></b-form-input>
        </b-form-group>
        <b-form-group label="Nama Ibu">
          <b-form-input v-model="formData.nama_ibu" required></b-form-input>
        </b-form-group>
        <b-form-group label="NIK Ibu">
          <b-form-input v-model="formData.nik_ibu" required></b-form-input>
        </b-form-group>
        <b-form-group label="Alamat">
          <b-form-input v-model="formData.alamat" required></b-form-input>
        </b-form-group>
        <b-form-group label="Nomor Telepon">
          <b-form-input v-model="formData.nomor_telepon" required></b-form-input>
        </b-form-group>
        <b-form-group label="Email"> <!-- Menambahkan field email -->
          <b-form-input v-model="formData.email" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Simpan</b-button>
        <b-button variant="secondary" @click="hideModal">Batal</b-button>
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
        hashid: null,
        nama_ayah: '',
        nik_ayah: '',
        nama_ibu: '',
        nik_ibu: '',
        alamat: '',
        nomor_telepon: '',
        email: '', // Menambahkan field email
      },
      items: [],
      fields: [
        { key: "no", label: "No" },
        { key: 'nama_ayah', label: 'Nama Ayah' },
        { key: 'nik_ayah', label: 'NIK Ayah' },
        { key: 'nama_ibu', label: 'Nama Ibu' },
        { key: 'nik_ibu', label: 'NIK Ibu' },
        { key: 'alamat', label: 'Alamat' },
        { key: 'nomor_telepon', label: 'Nomor Telepon' },
        { key: 'actions', label: 'Aksi', sortable: false },
      ],
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
  getAuthHeader() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  },
  async fetchData() {
    try {
      const response = await axios.get('https://sigapkembiritan.or.id/api/orangtuas', {
        headers: this.getAuthHeader(),
      });
      console.log("Data fetched successfully:", response.data);
      this.items = response.data.items;
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
    }
  },
  showAddModal() {
    this.resetForm();
    this.showModal = true;
  },
  editItem(item) {
    this.formData = { ...item };
    this.showModal = true;
  },
  async deleteItem(item) {
  if (!item.hashid) {
    console.error("Item ID is undefined");
    return;
  }

  try {
    console.log("Deleting item with ID:", item.hashid); // Log ID untuk debugging
    await axios.delete(`https://sigapkembiritan.or.id/api/orangtuas/${item.hashid}`, {
      headers: this.getAuthHeader() // Menggunakan metode getAuthHeader untuk konsistensi
    });
    console.log("Data deleted:", item);
    this.items = this.items.filter((i) => i.id !== item.id);
  } catch (error) {
    console.error("There was an error deleting the data:", error.response ? error.response.data : error.message);
  }
},

  async saveItem() {
    try {
      const headers = this.getAuthHeader();

      if (this.formData.hashid) {
        // Update data
        await axios.post(`https://sigapkembiritan.or.id/api/orangtuas/${this.formData.hashid}`, this.formData, {
          headers: headers
        });
        console.log("Item updated successfully:", this.formData); // Log data yang diperbarui
        const index = this.items.findIndex(item => item.hashid === this.formData.hashid);
        if (index !== -1) {
          this.items.splice(index, 1, { ...this.formData });
        }
      } else {
        // Create new data
        await axios.post('https://sigapkembiritan.or.id/api/orangtuas', this.formData, {
          headers: headers
        });
        console.log("New item created successfully:", this.formData); // Log data item baru
        this.items.push({ ...this.formData });
      }
      this.hideModal();
    } catch (error) {
      console.error("Error saving data:", error.response ? error.response.data : error.message);
    }
  },
  hideModal() {
    this.showModal = false;
  },
  resetForm() {
    this.formData = {
      hashid: null,
      nama_ayah: '',
      nik_ayah: '',
      nama_ibu: '',
      nik_ibu: '',
      alamat: '',
      nomor_telepon: '',
      email: '', // Menambahkan field email
    };
  },
},

  created() {
    this.fetchData(); // Panggil fetchData saat komponen dibuat
  },
};
</script>

<style scoped>
.bg-custom {
  background-color: #FFEFF6;
  min-height: 100vh;
  padding: 10px;
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

.cancel-button {
  background-color: #8f8f8f;
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
