<template>
  <div class="bg-custom">
    <b-container>
      <b-row class="my-3 align-items-center">
        <b-col cols="12" md="8">
          <h3>Data Imunisasi</h3>
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

    <b-modal v-model="showModal" title="Form Data Imunisasi" hide-footer>
      <b-form @submit.prevent="saveItem">
        <b-form-group label="Nama Imunisasi" label-for="imunisasiName">
          <b-form-input
            id="nama_layanan"
            v-model="formData.nama_layanan"
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
        nama_layanan: '',
      },
      items: [], // Awalnya kosong
      fields: [
        { key: 'id', label: 'No.', sortable: true },
        { key: 'nama_imunisasi', label: 'Nama Imunisasi', sortable: true },
        { key: 'actions', label: 'Aksi' },
      ],
    };
  },
  computed: {
    filteredItems() {
      console.log("Items sebelum difilter:", this.items);
      if (this.searchQuery) {
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        return this.items.filter((item) =>
          Object.values(item).some((value) =>
            value
              .toString()
              .toLowerCase()
              .includes(lowerCaseQuery)
          )
        );
      }
      return this.items;
    },
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('https://sigapkembiritan.or.id/api/imunisasis', {
          headers: this.getAuthHeader()
        });
        console.log("Data dari API:", response.data);
        this.items = Array.isArray(response.data.items) ? response.data.items : [];
        console.log("Items yang diterima:", this.items); // Cek data items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    getAuthHeader() {
      const token = localStorage.getItem('token');
      return token ? { Authorization: `Bearer ${token}` } : {};
    },
    showAddModal() {
      this.resetForm();
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    resetForm() {
      this.formData = { id: null, nama_layanan: '' };
    },
    async saveItem() {
      try {
        if (this.formData.id) {
          // Update existing item
          await axios.put(`https://sigapkembiritan.or.id/api/imunisasis/${this.formData.id}`, this.formData, {
            headers: this.getAuthHeader()
          });
        } else {
          // Add new item
          await axios.post('https://sigapkembiritan.or.id/api/imunisasis', this.formData, {
            headers: this.getAuthHeader()
          });
        }
        await this.fetchItems(); // Refresh data
        this.hideModal();
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },
    editItem(item) {
      this.formData = { ...item };
      this.showModal = true;
    },
    async deleteItem(item) {
      try {
        await axios.delete(`https://sigapkembiritan.or.id/api/imunisasis/${item.id}`, {
          headers: this.getAuthHeader()
        });
        await this.fetchItems(); // Refresh data
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },
  },
  created() {
    this.fetchItems(); // Memanggil fetchItems saat komponen dibuat
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
