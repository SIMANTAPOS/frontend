<template>
   <div>
      <Header />
        <main>
          <Tentang />
          <Layanan />
        </main>
      <Footer />
   </div>
</template>

<script>

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Tentang from '../components/Tentang.vue'
import Layanan from '../components/Layanan.vue'

export default {
  name: 'Beranda',
  components: {
    Header,
    Footer,
    Tentang,
    Layanan,
  },
};

</script>