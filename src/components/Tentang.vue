<template>
  <section class="about-page py-4">
  <b-container class="about-content">
    <b-row class="align-items-center">
      <b-col md="6" class="image-content mb-4 mb-md-0">
        <img src="@/assets/images/about_image.png" alt="About Image" />
      </b-col>
      <b-col md="6" class="text-content">
        <h2>SIMANTAPOS</h2>
        <ul>
          <li>Aplikasi SIMANTAPOS (Sistem Informasi Manajemen Pelayanan Terpadu Posyandu) hadir sebagai platform digitalisasi layanan posyandu.</li>
          <li>Memudahkan kader posyandu dalam mengelola data, memantau kesehatan balita, dan memberikan edukasi kepada orang tua.</li>
          <li>Posyandu dapat memberikan layanan yang lebih terintegrasi, efisien, dan efektif dalam meningkatkan kesehatan ibu dan anak.</li>
        </ul>
      </b-col>
    </b-row>
  </b-container>
</section>
<section class="features py-4">
  <b-container>
    <b-row>
      <b-col xs="12" sm="6" md="3" class="feature-item mb-4 mb-md-0">
        <img src="@/assets/images/fitur_1.png" alt="Icon 1" class="img-fluid mb-3"/>
        <div class="feature-text">Manajemen</div>
      </b-col>
      <b-col xs="12" sm="6" md="3" class="feature-item mb-4 mb-md-0">
        <img src="@/assets/images/fitur_2.png" alt="Icon 2" class="img-fluid mb-3"/>
        <div class="feature-text">Monitoring</div>
      </b-col>
      <b-col md="3" class="feature-item mb-4 mb-md-0">
        <img src="@/assets/images/fitur_3.png" alt="Icon 3" class="img-fluid mb-3"/>
        <div class="feature-text">Pencatatan</div>
      </b-col>
      <b-col md="3" class="feature-item mb-4 mb-md-0">
        <img src="@/assets/images/fitur_4.png" alt="Icon 4" class="img-fluid mb-3"/>
        <div class="feature-text">Pelaporan</div>
      </b-col>
    </b-row>
  </b-container>
</section>
</template>

<script>
export default {
  name: 'Tentang'
}
</script>

<style scoped>
.about-page {
  padding: 2rem 0;
  background-color: #FFFFFF;
}

.about-content {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.image-content {
  margin-bottom: 2rem;
}

.image-content img {
  max-width: 100%;
  height: auto;
}

.text-content {
  text-align: left;
}

.text-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ff5da6;
}

.text-content ul {
  list-style-type: disc;
  margin-left: 2rem;
  padding: 0;
  text-align: justify;
}

.text-content li {
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

@media screen and (min-width: 768px) {
  .about-content {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }

  .image-content {
    margin-bottom: 0;
    max-width: 50%;
  }

  .text-content {
    max-width: 50%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.features {
  background-color: #ffeff6;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.feature-item img {
  margin-bottom: 10px; 
}

.feature-text {
  background-color: #ff5da6;
  color: white;
  font-weight: 400;
  padding: 0.5rem;
  border-radius: 25px;
  display: inline-block;
}

@media screen and (max-width: 768px) {
  .features .container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .feature-item {
    margin-bottom: 1rem;
  }
}
</style>
