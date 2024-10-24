import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { BootstrapVue3 } from 'bootstrap-vue-3'

createApp(App)
  .use(router)
  .use(BootstrapVue3)
  .mount('#app');

