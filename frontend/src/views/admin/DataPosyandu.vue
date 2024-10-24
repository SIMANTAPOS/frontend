<template>
  <div class="bg-custom">
    <b-container>
      <b-row class="my-3 align-items-center">
        <b-col cols="12" md="8">
          <h3>Data Layanan Posyandu</h3>
        </b-col>
        <b-col
          cols="12"
          md="4"
          class="d-flex justify-content-end align-items-center"
        >
          <b-button class="custom-button" @click="showAddModal">
            Tambah Data
          </b-button>
        </b-col>
      </b-row>

      <b-table
        :items="items"
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
          >
            Edit
          </b-button>
          <b-button
            size="sm"
            variant="danger"
            @click="deleteItem(row.item)"
            class="rounded-button"
          >
            Hapus
          </b-button>
        </template>
      </b-table>
    </b-container>

    <b-modal v-model="showModal" title="Form Data Layanan Posyandu" hide-footer>
      <b-form @submit.prevent="saveItem">
        <b-form-group label="Balita" label-for="balita">
          <b-form-select
            id="balita"
            v-model="formData.balita_id"
            :options="balitaOptions"
            required
            class="custom-input"
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Nama Posyandu" label-for="name">
          <b-form-input
            id="name"
            v-model="formData.nama"
            required
            class="custom-input"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Alamat" label-for="alamat">
          <b-form-input
            id="alamat"
            v-model="formData.alamat"
            required
            class="custom-input"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" class="custom-button">Simpan</b-button>
        <b-button class="cancel-button ml-0 ml-3" @click="hideModal">
          Batal
        </b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showModal: false,
      formData: {
        id: null,
        balita_id: "",
        nama: "",
        alamat: "",
      },
      items: [],
      balitaOptions: [],
      fields: [
        { key: "id", label: "No." },
        { key: "nama", label: "Nama Layanan" },
        { key: "alamat", label: "Alamat" },
        { key: "actions", label: "Aksi", sortable: false },
      ],
    };
  },
  methods: {
    getAuthHeader() {
      const token = localStorage.getItem('token');
      return { Authorization: `Bearer ${token}` };
    },
    async fetchItems() {
      try {
        const response = await axios.get('https://sigapkembiritan.or.id/api/posyandus', {
          headers: this.getAuthHeader(),
        });
        this.items = response.data.items;
        console.log(response.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchBalitaOptions() {
      try {
        const response = await axios.get('https://sigapkembiritan.or.id/api/balitas', {
          headers: this.getAuthHeader(),
        });
        this.balitaOptions = response.data.items.map(balita => ({
          value: balita.hashid,
          text: balita.nama,
        }));
      } catch (error) {
        console.error("Error fetching balita options:", error);
      }
    },
    async saveItem() {
      try {
        if (this.formData.id) {
          // Update item
          const response = await axios.put(`https://sigapkembiritan.or.id/api/posyandus/${this.formData.id}`, {
            balita_id: this.formData.balita_id,
            nama: this.formData.nama,
            alamat: this.formData.alamat,
          }, {
            headers: this.getAuthHeader(),
          });
          const index = this.items.findIndex(item => item.id === this.formData.id);
          if (index !== -1) {
            this.items.splice(index, 1, response.data); // Replace updated item
          }
        } else {
          // Add new item
          const response = await axios.post('https://sigapkembiritan.or.id/api/posyandus', {
            balita_id: this.formData.balita_id,
            nama: this.formData.nama,
            alamat: this.formData.alamat,
          }, {
            headers: this.getAuthHeader(),
          });
          this.items.push(response.data); // Add new item to the list
        }
        this.hideModal();
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },
    async deleteItem(item) {
      try {
        await axios.delete(`https://sigapkembiritan.or.id/api/posyandus/${item.hashid}`, {
          headers: this.getAuthHeader(),
        });
        this.items = this.items.filter(i => i.hashid !== item.hashid); // Remove deleted item
      } catch (error) {
        console.error("Error deleting data:", error);
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
    hideModal() {
      this.showModal = false;
    },
    resetForm() {
      this.formData = {
        id: null,
        balita_id: "",
        nama: "",
        alamat: "",
      };
    },
  },
  created() {
    this.fetchItems();
    this.fetchBalitaOptions();
  },
};
</script>

<style scoped>
.bg-custom {
  background-color: #ffeff6;
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

.custom-input {
  border-radius: 25px;
}

.rounded-button {
  border-radius: 25px;
}
</style>
