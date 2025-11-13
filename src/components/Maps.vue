<script setup>
import { onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocationUser } from "../composables/useLocationUser";

const { coords, deviceType, detectDeviceType, requestLocationPermission } =
  useLocationUser();

onMounted(async () => {
  detectDeviceType();
  const permiso = await requestLocationPermission();

  if (permiso && coords.value) {
    const map = L.map("map").setView([coords.value.lat, coords.value.lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([coords.value.lat, coords.value.lng])
      .addTo(map)
      .bindPopup(`Tu ubicación actual (${deviceType.value})`)
      .openPopup();
  }
});
</script>

<template>
  <div>
    <div v-if="!coords">
      <p>Cargando ubicación del usuario...</p>
    </div>
    <div v-else id="map" class="map-container"></div>
  </div>
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
