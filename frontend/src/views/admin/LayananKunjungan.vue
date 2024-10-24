<template>
  <div class="bg-custom">
    <b-container>
      <b-row class="my-3 align-items-center">
        <b-col cols="12" md="8">
          <h3>Layanan & Kunjungan</h3>
        </b-col>
      </b-row>

      <b-tabs v-model="activeTab" class="mt-3">
        <b-tab title="Layanan" active>
          <b-form @submit.prevent="addService">
            <b-form-group label="Nama Layanan" label-for="serviceName">
              <b-form-input
                id="serviceName"
                v-model="newService.name"
                required
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Tambah Layanan</b-button>
          </b-form>

          <b-table
            v-if="serviceItems.length"
            :items="serviceItems"
            :fields="serviceFields"
            responsive="md"
            hover
          >
            <template #cell(actions)="row">
              <b-button size="sm" variant="info" @click="viewDetail(row.item, 'service')">Detail</b-button>
              <b-button size="sm" variant="success" @click="print(row.item, 'service')">Cetak</b-button>
            </template>
          </b-table>
        </b-tab>

        <b-tab title="Kunjungan">
          <b-form @submit.prevent="addVisit">
            <b-form-group label="ID Posyandu" label-for="posyanduId">
              <b-form-select
                id="posyanduId"
                v-model="newVisit.posyanduId"
                :options="posyanduOptions"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group label="ID Layanan" label-for="serviceId">
              <b-form-select
                id="serviceId"
                v-model="newVisit.serviceId"
                :options="serviceOptions"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group label="Tanggal Kunjungan" label-for="visitDate">
              <b-form-datepicker
                id="visitDate"
                v-model="newVisit.visitDate"
                required
              ></b-form-datepicker>
            </b-form-group>
            <b-button type="submit" variant="primary">Tambah Kunjungan</b-button>
          </b-form>

          <b-table
            v-if="visitItems.length"
            :items="visitItems"
            :fields="visitFields"
            responsive="md"
            hover
          >
            <template #cell(actions)="row">
              <b-button size="sm" variant="info" @click="viewDetail(row.item, 'visit')">Detail</b-button>
              <b-button size="sm" variant="success" @click="print(row.item, 'visit')">Cetak</b-button>
            </template>
          </b-table>
        </b-tab>
      </b-tabs>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: '0', 
      selectedDate: '',
      newService: {
        name: '',
      },
      newVisit: {
        posyanduId: null,
        serviceId: null,
        visitDate: null,
      },
      serviceItems: [],
      visitItems: [],
      posyanduOptions: [], 
      serviceOptions: [], 
      serviceFields: [
        { key: 'id', label: 'No.', sortable: true },
        { key: 'nama', label: 'Nama Layanan', sortable: true },
        { key: 'actions', label: 'Aksi' },
      ],
      visitFields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'posyanduId', label: 'ID Posyandu', sortable: true },
        { key: 'serviceId', label: 'ID Layanan', sortable: true },
        { key: 'visitDate', label: 'Tanggal Kunjungan', sortable: true },
        { key: 'actions', label: 'Aksi' },
      ],
    };
  },
  methods: {
    addService() {
      if (this.newService.name) {
        const newServiceItem = {
          id: this.serviceItems.length + 1, 
          nama: this.newService.name,
          tanggal: new Date().toLocaleDateString(), 
        };
        this.serviceItems.push(newServiceItem);
        this.newService.name = ''; 
      }
    },
    addVisit() {
      if (this.newVisit.posyanduId && this.newVisit.serviceId && this.newVisit.visitDate) {
        const newVisitItem = {
          id: this.visitItems.length + 1, 
          posyanduId: this.newVisit.posyanduId,
          serviceId: this.newVisit.serviceId,
          visitDate: new Date(this.newVisit.visitDate).toLocaleDateString(), 
        };
        this.visitItems.push(newVisitItem);
        this.newVisit = { posyanduId: null, serviceId: null, visitDate: null }; 
      }
    },
    viewDetail(item, type) {
      this.$router.push(`/detail/${type}/${item.id}`);
    },
    print(item, type) {
    const printData = `
      ${type === 'service' ? 'Layanan' : 'Kunjungan'} ID: ${item.id}
      Nama: ${item.nama}
      Tanggal: ${item.tanggal}
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<pre>${printData}</pre>`);
    printWindow.document.close();
    printWindow.print();
  },
  },
  mounted() {
    this.posyanduOptions = [
      { value: 1, text: 'Posyandu A' },
      { value: 2, text: 'Posyandu B' },
    ];
    this.serviceOptions = [
      { value: 1, text: 'Layanan A' },
      { value: 2, text: 'Layanan B' },
    ];
  },
};
</script>

<style scoped>
.bg-custom {
  background-color: #FFEFF6;
  min-height: 100vh;
  padding: 10px;
}

/* Tambahkan gaya jika diperlukan */
</style>
