<template>
  <div>
    <h2>📷 Escaneo OCR</h2>

    <video ref="videoRef" class="video-preview" autoplay playsinline></video>

    <div v-if="processing">Procesando imagen...</div>

    <div v-if="ocrResult">
      <h4>Texto detectado:</h4>
      <pre>{{ ocrResult }}</pre>
    </div>
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
  scanFrame
} = useOcr()

onMounted(async () => {
  detectDeviceType()
  await checkCameraAvailability()

  if (hasCamera.value && videoRef.value) {
    await startCamera(videoRef.value)

    // Esperar 4 segundos antes de escanear
    setTimeout(() => {
      scanFrame(videoRef.value!)
    }, 4000)
  }
})
</script>

<style scoped>
.video-preview {
  width: 100%;
  max-width: 500px;
  border: 2px solid #ccc;
  border-radius: 8px;
}
</style>
