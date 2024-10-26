<template>
  <div class="bg-custom">
    <b-container>
      <b-row class="my-3 align-items-center">
        <b-col cols="12" md="8">
          <h3>Data Balita</h3>
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
          <b-button
            size="sm"
            variant="warning"
            @click="editItem(row.item)"
            class="rounded-button"
          >
            Edit
          </b-button>
          <!-- <b-button
            size="sm"
            variant="danger"
            @click="deleteItem(row.item)"
            class="rounded-button"
          >
            Hapus
          </b-button> -->
        </template>
      </b-table>
    </b-container>

    <b-modal v-model="showModal" title="Form Data Balita" hide-footer>
      <b-form @submit.prevent="saveItem">
        <b-form-group label="Nama" label-for="nama">
          <b-form-input
            id="nama"
            v-model="formData.nama"
            required
            class="custom-input"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="NIK" label-for="nik">
          <b-form-input
            id="nik"
            v-model="formData.nik"
            
            class="custom-input"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Tanggal Lahir" label-for="dob">
          <b-form-input
            id="dob"
            type="date"
            v-model="formData.dob"
            required
            class="custom-input"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Jenis Kelamin" label-for="gender">
          <b-form-radio-group
            id="gender"
            v-model="formData.gender"
            :options="genderOptions"
            name="genderRadios"
            required
          ></b-form-radio-group>
        </b-form-group>

        <b-form-group label="Golongan" label-for="category">
          <b-form-select
            id="category"
            v-model="formData.category"
            :options="categoryOptions"
            required
            class="custom-input"
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Orangtua" label-for="orangtua_id">
          <b-form-select
            id="orangtua_id"
            v-model="formData.orangtua_id"
            :options="orangtuaOptions"
            required
            class="custom-input"
          ></b-form-select>
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
      searchQuery: "",
      showModal: false,
      formData: {
        id: null,
        orangtua_id: "", // Field ini akan menyimpan ID orangtua
        nama: "",
        nik: "",
        dob: "",
        gender: "",
        category: "",
      },
      genderOptions: [
        { value: "L", text: "Laki-laki" },
        { value: "P", text: "Perempuan" },
      ],
      categoryOptions: [
        { value: "Baduta", text: "Baduta" },
        { value: "Balita", text: "Balita" },
      ],
      orangtuaOptions: [], // Ini akan menyimpan daftar orangtua dari API
      items: [],
      fields: [
        { key: "id", label: "No." },
        { key: "nama", label: "Nama" },
        { key: "nik", label: "NIK" },
        { key: "tanggal_lahir", label: "Tanggal Lahir" },
        { key: "jenis_kelamin", label: "Jenis Kelamin" },
        { key: "tipe", label: "Golongan" },
        { key: "actions", label: "Aksi", sortable: false },
      ],
    };
  },
  computed: {
    filteredItems() {
      if (this.searchQuery) {
        return this.items.filter((item) =>
          Object.values(item).some((value) =>
            value
              .toString()
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
          )
        );
      }
      return this.items;
    },
  },
  methods: {
    getAuthToken() {
      return localStorage.getItem('token');
    },
    async fetchItems() {
      try {
        const response = await axios.get('https://sigapkembiritan.or.id/api/balitas', {
          headers: {
            'Authorization': `Bearer ${this.getAuthToken()}`,
            'Accept': 'application/json'
          }
        });
        console.log("Data received:", response.data);
        this.items = response.data.items; // Pastikan kamu menggunakan 'items'
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    },
    async fetchOrangtuas() {
      try {
        const response = await axios.get('https://sigapkembiritan.or.id/api/orangtuas', {
          headers: {
            'Authorization': `Bearer ${this.getAuthToken()}`,
            'Accept': 'application/json'
          }
        });
        console.log("Orangtua data received:", response.data);
        this.orangtuaOptions = response.data.items.map(orangtua => ({
          value: orangtua.hashid,
          text: orangtua.nama_ibu, // Menggunakan nama ibu sebagai teks
        }));
      } catch (error) {
        console.error("There was an error fetching the orangtuas data:", error);
        console.log(orangtua.id);
        
      }
    },
    async saveItem() {
  try {
    const formData = new FormData();
    formData.append('orangtua_id', this.formData.orangtua_id);
    formData.append('nama', this.formData.nama);
    formData.append('nik', this.formData.nik);
    formData.append('tanggal_lahir', this.formData.dob);
    formData.append('jenis_kelamin', this.formData.gender);
    formData.append('tipe', this.formData.category);

    console.log("Data to be submitted:", {
      orangtua_id: this.formData.orangtua_id,
      nama: this.formData.nama,
      nik: this.formData.nik,
      tanggal_lahir: this.formData.dob,
      jenis_kelamin: this.formData.gender,
      tipe: this.formData.category,
    });

    const headers = {
      'Authorization': `Bearer ${this.getAuthToken()}`,
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    };

    if (this.formData.id) {
      // Update existing item
      const response = await axios.put(`https://sigapkembiritan.or.id/api/balitas/${this.formData.id}`, formData, { headers });
      console.log("Data updated:", response.data);

      // Update local state
      const index = this.items.findIndex(item => item.id === this.formData.id);
      if (index !== -1) {
        this.items[index] = response.data; // Update item in local state with the updated data
      }
    } else {
      // Create new item
      const response = await axios.post('https://sigapkembiritan.or.id/api/balitas', formData, { headers });
      console.log("Data saved:", response.data);
      this.items.push(response.data);
    }
    this.hideModal();
  } catch (error) {
    console.error("There was an error saving the data:", error.response ? error.response.data : error.message);
  }
},
    async deleteItem(item) {
      if (!item.hashid) {
        console.error("Item ID is undefined");
        return;
      }
      try {
        console.log("Deleting item with ID:", item.hashid); // Log ID untuk debugging
        await axios.delete(`https://sigapkembiritan.or.id/api/balitas/${item.hashid}`, {
          headers: {
            'Authorization': `Bearer ${this.getAuthToken()}`,
            'Accept': 'application/json'
          }
        });
        console.log("Data deleted:", item);
        this.items = this.items.filter((i) => i.hashid !== item.hashid);
      } catch (error) {
        console.error("There was an error deleting the data:", error);
      }
    },
    showAddModal() {
      this.resetForm();
      this.fetchOrangtuas(); // Fetch data orangtua setiap kali modal dibuka
      this.showModal = true;
    },
    editItem(item) {
      this.formData = { ...item };
      this.fetchOrangtuas(); // Fetch data orangtua juga ketika mengedit
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        id: null,
        orangtua_id: "",
        nama: "",
        nik: "",
        dob: "",
        gender: "",
        category: "",
      };
    },
  },
  created() {
    this.fetchItems();
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
