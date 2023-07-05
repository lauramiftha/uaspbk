<template>
  <div class="gps-app">
    <div class="map-container">
      <div class="map">
        <div class="map-marker"></div>
      </div>
    </div>
    <div class="lokasi-widget">
      <h2>Lokasi Anda</h2>
      <div v-if="latitude && longitude">
        <p>Lintang: {{ latitude }}</p>
        <p>Bujur: {{ longitude }}</p>
      </div>
      <div v-else>
        <p>Mencari lokasi Anda...</p>
      </div>

      <div class="lokasi-input">
        <label for="latitude">Lintang:</label>
        <input type="text" id="latitude" v-model="inputLatitude" />
      </div>
      <div class="lokasi-input">
        <label for="longitude">Bujur:</label>
        <input type="text" id="longitude" v-model="inputLongitude" />
      </div>

      <button @click="fetchDetailLokasi">Temukan Detail Lokasi</button>

      <div v-if="lokasiDitemukan">
        <h3>Detail Lokasi</h3>
        <p>Negara: {{ lokasiDitemukan.components.country }}</p>
        <p>Kota: {{ lokasiDitemukan.components.city }}</p>
        <p>Jalan: {{ lokasiDitemukan.components.road }}</p>
        <p>Kode Pos: {{ lokasiDitemukan.components.postcode }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      latitude: null,
      longitude: null,
      inputLatitude: '',
      inputLongitude: '',
      lokasiDitemukan: null,
    };
  },
  mounted() {
    this.getDapatkanPosisi();
  },
  methods: {
    getDapatkanPosisi() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.updatePosisi, this.tidakDapatDapatkanPosisi);
      } else {
        console.error('Geolocation tidak didukung pada perangkat ini.');
      }
    },
    updatePosisi(posisi) {
      this.latitude = posisi.coords.latitude;
      this.longitude = posisi.coords.longitude;
    },
    tidakDapatDapatkanPosisi(error) {
      console.error('Tidak dapat mendapatkan posisi:', error.message);
    },
    async fetchDetailLokasi() {
      try {
        const apiKey = '92591005a7b94008909d59a64b6d2a49';
        const latitude = encodeURIComponent(this.inputLatitude);
        const longitude = encodeURIComponent(this.inputLongitude);
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        const respon = await fetch(apiUrl);
        const data = await respon.json();

        if (data.results && data.results.length > 0) {
          const lokasi = data.results[0];
          this.lokasiDitemukan = lokasi;
          console.log('Lokasi:', lokasi);
        }
      } catch (error) {
        console.error('Error saat mengambil data lokasi:', error);
      }
    },
  },
};
</script>
  
  <style scoped>
  .gps-app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f2f2f2;
  }
  
  .map-container {
    width: 300px;
    height: 300px;
    border: 2px solid #4caf50;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .map {
    width: 100%;
    height: 100%;
    background-color: #e8f5e9;
    position: relative;
  }
  
  .map-marker {
    width: 30px;
    height: 30px;
    background-color: #4caf50;
    border: 2px solid #fff;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .lokasi-widget {
    text-align: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
  }
  
  .lokasi-widget h2 {
    color: #4caf50;
    font-size: 24px;
    margin-bottom: 20px;
    font-family: 'Arial', sans-serif;
  }

  .lokasi-widget {
    width: 400px;
    height: auto;
    margin: 20px auto;
    padding: 30px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .lokasi-widget h2 {
    color: #4caf50;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  .lokasi-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }
  
  .lokasi-input label {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .lokasi-input input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .lokasi-details {
    text-align: left;
  }
  
  .lokasi-details h3 {
    font-size: 18px;
    color: #4caf50;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .lokasi-details p {
    margin: 5px 0;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  button:disabled {
    background-color: #ccc;
    color: #999;
    cursor: not-allowed;
  }
  </style>
  