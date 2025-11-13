<template>
  <div class="ocr-container">
    <h2>📷 Escaneo OCR</h2>

    <video
      v-if="!ocrResult"
      ref="videoRef"
      class="video-preview"
      autoplay
      playsinline
    ></video>

    <div v-if="processing" class="processing-message">
      Procesando imagen...
    </div>

    <div v-if="ocrResult" class="ocr-result">
      <h4>Texto detectado:</h4>
      <pre>{{ ocrResult }}</pre>
    </div>

    <button class="scan-button" @click="iniciarEscaneo">
      Escanear
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useOcr } from '../composables/useOcr'

const videoRef = ref<HTMLVideoElement | null>(null)

const {
  deviceType,
  hasCamera,
  ocrResult,
  processing,
  detectDeviceType,
  checkCameraAvailability,
  startCamera,
  scanFrame,
  resetOcr
} = useOcr()

const iniciarEscaneo = async () => {
  resetOcr()
  detectDeviceType()
  await checkCameraAvailability()

  if (hasCamera.value && videoRef.value) {
    await startCamera(videoRef.value)

    // Esperar 4 segundos antes de escanear
    setTimeout(() => {
      scanFrame(videoRef.value!)
    }, 4000)
  }
}

onMounted(() => {
  iniciarEscaneo()
})
</script>

<style scoped>
.ocr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.video-preview {
  width: 100%;
  max-width: 500px;
  border: 2px solid #ccc;
  border-radius: 8px;
}

.processing-message {
  margin-top: 1rem;
  font-weight: bold;
  color: #555;
}

.ocr-result {
  margin-top: 2rem;
  text-align: center;
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
}

.scan-button {
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.scan-button:hover {
  background-color: #0056b3;
}
</style>