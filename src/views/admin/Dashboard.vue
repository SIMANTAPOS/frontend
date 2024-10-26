<template>
  <div class="bg-custom">
    <b-container>
      <b-row class="my-3 align-items-center">
        <b-col cols="12" md="8">
          <h3>{{ isSuperAdmin ? 'Super Admin Dashboard' : 'Admin Dashboard' }}</h3>
        </b-col>
      </b-row>

      <b-row class="my-4">
        <b-col md="3" v-if="isSuperAdmin || hasBalita">
          <b-card
            class="text-center"
            :footer="balitaCount + ' Balita'"
            footer-class="footer-custom"
          >
            <b-card-text class="icon-right">
              <span>Jumlah Balita</span>
              <i class="fas fa-child"></i>
            </b-card-text>
          </b-card>
        </b-col>

        <b-col md="3" v-if="isSuperAdmin || hasBaduta">
          <b-card
            class="text-center"
            :footer="badutaCount + ' Baduta'"
            footer-class="footer-custom"
          >
            <b-card-text class="icon-right">
              <span>Jumlah Baduta</span>
              <i class="fas fa-baby"></i>
            </b-card-text>
          </b-card>
        </b-col>

        <b-col md="3" v-if="isSuperAdmin || hasUser">
          <b-card
            class="text-center"
            :footer="userCount + ' User'"
            footer-class="footer-custom"
          >
            <b-card-text class="icon-right">
              <span>Jumlah User</span>
              <i class="fas fa-users"></i>
            </b-card-text>
          </b-card>
        </b-col>

        <b-col md="3" v-if="isSuperAdmin || hasKunjungan">
          <b-card
            class="text-center"
            :footer="kunjunganCount + ' Kunjungan'"
            footer-class="footer-custom"
          >
            <b-card-text class="icon-right">
              <span>Jumlah Kunjungan</span>
              <i class="fas fa-calendar-alt"></i>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Dashboard',
  props: {
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    hasBalita: {
      type: Boolean,
      default: true,
    },
    hasBaduta: {
      type: Boolean,
      default: true,
    },
    hasUser: {
      type: Boolean,
      default: true,
    },
    hasKunjungan: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const balitaCount = ref(0);
    const badutaCount = ref(0);
    const userCount = ref(0);
    const kunjunganCount = ref(0);

    const getAuthHeader = () => {
      const token = localStorage.getItem('token');
      return { Authorization: `Bearer ${token}` };
    };

    onMounted(async () => {
      try {
        // Fetch data for balitas
        const balitaResponse = await axios.get('https://sigapkembiritan.or.id/api/balitas', {
          headers: getAuthHeader(),
        });
        console.log('Balita Data:', balitaResponse.data);
        const balitas = balitaResponse.data.items;
        balitaCount.value = balitas.filter(b => b.tipe === 'balita').length;
        badutaCount.value = balitas.filter(b => b.tipe === 'baduta').length;

        // Fetch data for users
        const userResponse = await axios.get('https://sigapkembiritan.or.id/api/users', {
          headers: getAuthHeader(),
        });
        console.log('User Data:', userResponse.data);
        userCount.value = userResponse.data.resultTotal;

        // Fetch data for kunjungans
        const kunjunganResponse = await axios.get('https://sigapkembiritan.or.id/api/kunjungans', {
          headers: getAuthHeader(),
        });
        console.log('Kunjungan Data:', kunjunganResponse.data);
        kunjunganCount.value = kunjunganResponse.data.resultTotal;

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    return {
      balitaCount,
      badutaCount,
      userCount,
      kunjunganCount,
    };
  },
};
</script>

<style scoped>
.bg-custom {
  background-color: #ffeff6;
  min-height: 100vh;
  padding: 10px;
}

.b-card {
  border: 1px solid #ddd;
}

.footer-custom {
  background-color: #007DA8;
  color: white;
}

.icon-right {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.icon-right i {
  position: absolute;
  right: 5px;
}
</style>
