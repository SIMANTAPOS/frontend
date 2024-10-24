<template>
  <div class="bg-custom">
    <b-container>
      <b-row class="my-3 align-items-center">
        <b-col cols="12" md="8">
          <h3>Manajemen User</h3>
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
        :items="filteredUsers"
        :fields="userFields"
        class="mt-3"
        responsive="md"
        hover
      > 
      <template #cell(actions)="row">
          <b-button
            size="sm"
            variant="warning"
            @click="editUser(row.item)"
            class="rounded-button"
          >
            Edit
          </b-button>
          <b-button
            size="sm"
            variant="danger"
            @click="deleteUser(row.item)"
            class="rounded-button"
          >
            Hapus
          </b-button>
        </template>
      </b-table>

      <!-- Modal untuk Tambah/Edit User -->
      <b-modal id="add-user-modal" v-model="showModal" title="Form Manajemen User" hide-footer>
        <b-form @submit.prevent="saveUser">
          <b-form-group label="Username" label-for="username">
            <b-form-input
              id="username"
              v-model="newUser.username"
              type="text"
              required
              class="custom-input"
            ></b-form-input>
          </b-form-group>
          
          <b-form-group label="Email" label-for="email">
            <b-form-input
              id="email"
              v-model="newUser.email"
              type="email"
              required
              class="custom-input"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Password" label-for="password">
            <b-form-input
              id="password"
              v-model="newUser.password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="custom-input"
            ></b-form-input>
            <b-button @click="togglePasswordVisibility" variant="link">
              {{ showPassword ? 'Sembunyikan' : 'Tampilkan' }}
            </b-button>
          </b-form-group>
          
          <b-form-group label="Role" label-for="role">
            <b-form-select
              id="role"
              v-model="newUser.role"
              :options="roles"
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
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      showModal: false,
      showPassword: false,
      newUser: {
        id: null,
        username: '',
        email: '', 
        password: '',
        role: ''
      },
      users: [], // Array untuk menyimpan data user dari API
      roles: [
        { value: 'Kader', text: 'Kader' },
        { value: 'Orang Tua', text: 'Orang Tua' }
      ],
      userFields: [
        { key: "id", label: "No." },
        { key: 'username', label: 'Username', sortable: true },
        { key: 'email', label: 'Email', sortable: true }, 
        { key: 'role', label: 'Role', sortable: true },
        { key: 'actions', label: 'Aksi' }
      ]
    };
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) {
        return this.users;
      }
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(user =>
        user.username.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://sigapkembiritan.or.id/api/users', {
          headers: this.getAuthHeader()
        });
        this.users = response.data.items || []; // Sesuaikan dengan struktur data API
        console.log('data fecth', response.data);
        
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    getAuthHeader() {
      const token = localStorage.getItem('token');
      return token ? { Authorization: `Bearer ${token}` } : {};
    },
    showAddModal() {
      this.newUser = { id: null, username: '', email: '', password: '', role: '' }; 
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async saveUser() {
      if (this.newUser.id) {
        await this.updateUser();
      } else {
        await this.addUser();
      }
      this.fetchUsers(); // Refresh data setelah penyimpanan
    },
    async addUser() {
      try {
        if (this.newUser.username && this.newUser.email && this.newUser.password && this.newUser.role) {
          await axios.post('https://sigapkembiritan.or.id/api/users', this.newUser, {
            headers: this.getAuthHeader()
          });
          this.hideModal();
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
    editUser(user) {
      this.newUser = { ...user }; 
      this.showModal = true;
    },
    async updateUser() {
      try {
        const url = `https://sigapkembiritan.or.id/api/users/${this.newUser.id}`;
        await axios.put(url, this.newUser, {
          headers: this.getAuthHeader()
        });
        this.hideModal();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    async deleteUser(user) {
      try {
        const url = `https://sigapkembiritan.or.id/api/users/${user.id}`;
        await axios.delete(url, {
          headers: this.getAuthHeader()
        });
        this.fetchUsers(); // Refresh data setelah penghapusan
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  },
  created() {
    this.fetchUsers(); // Memanggil fetchUsers saat komponen dibuat
  }
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

.ml-3 {
  margin-left: 1rem;
}

.rounded-button {
  border-radius: 25px;
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
