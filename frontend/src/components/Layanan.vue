<template>
  <section class="layanan py-5">
    <b-container>
      <h1>Integrasi Layanan Primer Posyandu</h1>
      <b-row class="text-center">
        <b-col cols="12" sm="6" md="4" class="mb-4" v-for="(service, index) in services" :key="index">
          <b-card class="h-100 no-outline">
            <b-img :src="service.img" :alt="service.alt" fluid class="mb-3"></b-img>
            <div class="service-description">
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>

  <section class="card-section py-5">
    <b-container>
      <h1>Program Posyandu</h1>
      <b-row class="text-center">
        <b-col cols="12" sm="6" md="4" class="mb-4" v-for="(program, index) in programs" :key="index">
          <b-card class="h-100">
            <b-img :src="program.img" :alt="program.alt" fluid class="mb-3"></b-img>
            <div class="card-description">
              <h3>{{ program.title }}</h3>
              <p>{{ program.description }}</p>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import icon1 from '@/assets/images/icon_1.png';
import icon2 from '@/assets/images/icon_2.png';
import icon3 from '@/assets/images/icon_3.png';
import icon4 from '@/assets/images/icon_4.png';
import icon5 from '@/assets/images/icon_5.png';
import program1 from '@/assets/images/program_1.jpg';
import program2 from '@/assets/images/program_2.jpg';
import program3 from '@/assets/images/program_3.jpg';

export default {
  name: 'Layanan',
  data() {
    return {
      services: [
        {
          img: icon1,
          alt: 'Service 1',
          title: '1.Pendaftaran',
          description: 'Pendaftaran meliputi kebutuhan administratif ibu dan balita.'
        },
        {
          img: icon2,
          alt: 'Service 2',
          title: '2.Penimbangan dan Pengukuran',
          description: 'Penimbangan berat badan, pengukuran tinggi badan dan lingkar kepala'
        },
        {
          img: icon3,
          alt: 'Service 3',
          title: '3.Pencatatan Penimbangan',
          description: 'Pencatatan hasil atau angka pengukuran oleh kader posyandu.'
        },
        {
          img: icon4,
          alt: 'Service 4',
          title: '4.Penyuluhan dan Pelayanan Gizi',
          description: 'Edukasi atau penyuluhan kesehatan dan gizi pada balita.'
        },
        {
          img: icon5,
          alt: 'Service 5',
          title: '5.Pelayanan Kesehatan',
          description: 'Pemeriksaan kesehatan, pemberian vitamin dan imunisasi.'
        }
      ],
      programs: [
        {
          img: program1,
          alt: 'Program 1',
          title: 'Imunisasi',
          description: 'Pemberian imunisasi dasar dan imunisasi lanjutan atau booster untuk memberikan perlindungan kesehatan terhadap penyakit menular berbahaya.'
        },
        {
          img: program2,
          alt: 'Program 2',
          title: 'Pemantauan Gizi',
          description: 'Program ini melibatkan kegiatan edukasi yang meliputi informasi tentang gizi seimbang, pencegahan penyakit menular, dan perawatan kesehatan pada balita.'
        },
        {
          img: program3,
          alt: 'Program 3',
          title: 'Pemberian Vitamin',
          description: 'Program meliputi pemberian vitamin dan suplemen tambahan untuk meningkatkan daya tahan tubuh dan mencegah defisiensi nutrisi pada balita.'
        }
      ]
    };
  }
};
</script>

<style scoped>
.layanan {
  text-align: center;
  background-color: #fff;
}

.no-outline {
  outline: none;
  border: none;
}

.layanan h1 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #FF5DA6;
}

.service-description {
  text-align: left;
}

.service-description h3 {
  margin-bottom: 0.5rem;
}

.service-description p {
  color: #000000;
}

.card-section {
  background-color: #ffeff6;
  margin-bottom: 0 auto;
}

.card-section h1 {
  font-size: 2rem;
  color: #FF5DA6;
}

.card-description {
  padding: 20px;
}

.card-description h3 {
  margin-bottom: 1rem;
}

.card-description p {
  color: #000000;
  line-height: 1.5;
  text-align: justify;
}

/* Tidak diperlukan CSS Grid, gunakan Bootstrap Grid langsung */
.b-row {
  display: flex; /* Ganti dari grid ke flex untuk responsivitas yang lebih baik */
  flex-wrap: wrap; /* Membuat kolom terbungkus di layar kecil */
  justify-content: center; /* Pusatkan item */
}
</style>
