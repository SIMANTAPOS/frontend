<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const route = useRoute();
    const showHeaderFooter = computed(() => !['/login'].includes(route.path));
    return { showHeaderFooter };
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
body {
  margin: 0;
  font-family: 'Poppins';
}

</style>