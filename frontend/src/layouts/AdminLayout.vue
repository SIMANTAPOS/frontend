<template>
  <div class="admin-layout d-flex">
    <Sidebar class="sidebar" role="admin" />
    <div class="content flex-grow-1">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '../components/dashboard/Header.vue';
import Sidebar from '../components/dashboard/Sidebar.vue';

export default {
  name: 'AdminLayout',
  components: {
    Header,
    Sidebar,
  },
};
</script>

<style>
.admin-layout {
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 250px; 
}

.content {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
