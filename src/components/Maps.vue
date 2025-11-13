
<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

onMounted(() => {
  const map = L.map('map').setView([40.4168, -3.7038], 13) // Coordenadas de Madrid

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  L.marker([40.4168, -3.7038]).addTo(map)
    .bindPopup('¡Hola desde Madrid!')
    .openPopup()
})
</script>

<template>
  <div id="map" class="map-container"></div>
  <div>
    <h1>
        Mi ubicacion
        <span>(Lat xx, Long xx)</span>
    </h1>
    
  </div>
</template>

<style scoped>
.map-container {
  height: 500px;
  width: 100%;
}
</style>