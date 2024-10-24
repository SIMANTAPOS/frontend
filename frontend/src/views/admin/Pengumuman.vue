<template>
  <div class="bg-custom">
    <b-container>
      <b-row class="my-3 align-items-center">
        <b-col cols="12" md="8">
          <h3>Pengumuman</h3>
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

      <b-modal v-model="showModal" title="Form Data Pengumuman" hide-footer>
        <b-form @submit.prevent="saveItem">
          <b-form-group label="Judul" label-for="judul">
            <b-form-input
              id="judul"
              v-model="formData.judul"
              required
              class="custom-input"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Slug" label-for="slug">
            <b-form-input
              id="slug"
              v-model="formData.slug"
              required
              class="custom-input"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Tagline" label-for="tagline">
            <b-form-input
              id="tagline"
              v-model="formData.tagline"
              required
              class="custom-input"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Konten" label-for="konten">
            <b-form-textarea
              id="konten"
              v-model="formData.konten"
              rows="5"
              required
              class="custom-input"
            ></b-form-textarea>
          </b-form-group>

          <b-form-group label="Tanggal Publish" label-for="publish-date">
            <b-form-datepicker
              id="publish-date"
              v-model="formData.publish"
              required
            ></b-form-datepicker>
          </b-form-group>

          <b-form-group label="Upload Gambar" label-for="file-upload">
            <b-form-file
              id="file-upload"
              v-model="file"
              accept=".png,.jpg,.jpeg"
              required
              @change="validateImage"
            ></b-form-file>
          </b-form-group>

          <b-button type="submit" class="custom-button" :disabled="!imageValid">Simpan</b-button>
          <b-button class="cancel-button ml-0 ml-3" @click="hideModal">Batal</b-button>
        </b-form>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      showModal: false,
      imageValid: true,
      file: null,
      formData: {
        id: null,
        judul: '',
        slug: '',
        tagline: '',
        konten: '',
        publish: null,
        gambar: '',
      },
      items: [
        { id: 1, judul: 'Pengumuman 1', slug: 'pengumuman-1', tagline: 'Tagline 1', konten: 'Konten untuk pengumuman 1.', publish: '2024-08-10', gambar: 'url_to_image_1' },
        { id: 2, judul: 'Pengumuman 2', slug: 'pengumuman-2', tagline: 'Tagline 2', konten: 'Konten untuk pengumuman 2.', publish: '2024-08-15', gambar: 'url_to_image_2' },
      ],
      fields: [
        { key: 'id', label: 'No.', sortable: true },
        { key: 'judul', label: 'Judul', sortable: true },
        { key: 'slug', label: 'Slug', sortable: true },
        { key: 'tagline', label: 'Tagline', sortable: true },
        { key: 'konten', label: 'Konten', sortable: true },
        { key: 'publish', label: 'Tanggal Publish', sortable: true },
        { key: 'actions', label: 'Aksi' },
      ],
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) =>
        item.judul.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    validateImage(event) {
      const file = event.target.files[0];
      this.imageValid = true; // Reset validasi gambar
      if (file) {
        const fileSize = file.size / 1024 / 1024; // Convert to MB
        const validFormats = ['image/png', 'image/jpeg'];
        if (fileSize > 10 || !validFormats.includes(file.type)) {
          this.imageValid = false;
        } else {
          // Simpan URL file gambar yang diunggah
          this.formData.gambar = URL.createObjectURL(file);
          this.file = file; // Simpan file untuk digunakan nanti
        }
      }
    },
    showAddModal() {
      this.resetForm();
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
      this.imageValid = true; // Reset image validity on modal close
    },
    resetForm() {
      this.formData = { id: null, judul: '', slug: '', tagline: '', konten: '', publish: null, gambar: '' };
      this.file = null; // Reset file input
    },
    saveItem() {
      if (this.formData.id) {
        // Edit existing data
        const index = this.items.findIndex(item => item.id === this.formData.id);
        if (index !== -1) {
          this.items[index] = { ...this.formData };
        }
      } else {
        // Add new data
        this.formData.id = this.items.length + 1;
        this.items.push({ ...this.formData });
      }
      this.hideModal();
    },
    editItem(item) {
      this.formData = { ...item };
      this.showModal = true;
    },
    deleteItem(item) {
      this.items = this.items.filter(i => i.id !== item.id);
    },
  },
};
</script>

<style scoped>
.bg-custom {
  background-color: #FFEFF6;
  min-height: 100vh;
  padding: 10px;
}

.custom-input {
  border-radius: 25px;
}

.custom-input-group {
  max-width: 250px;
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
