<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { usePdf417 } from '@/composables/usePdf417';

const { startCamera, stopCamera, encodeTextToPdf417 } = usePdf417();

const mode = ref<'encode' | 'decode'>('decode');
const showScanner = ref(true);
const scannedValue = ref('');
const inputText = ref('');
const pdf417Image = ref('');
const videoRef = ref<HTMLVideoElement | null>(null);

const resetScanner = () => {
  scannedValue.value = '';
  showScanner.value = true;
  if (videoRef.value) {
    startCamera(videoRef.value, (result: string) => {
      scannedValue.value = result;
      showScanner.value = false;
      // Evitar error de strict mode usando setTimeout
      setTimeout(() => stopCamera(), 100);
    });
  }
};

// const convertToPdf417 = () => {
//   pdf417Image.value = encodeTextToPdf417(inputText.value);
// };


const convertToPdf417 = async () => {
  pdf417Image.value = await encodeTextToPdf417(inputText.value);
};


const switchMode = (newMode: 'encode' | 'decode') => {
  mode.value = newMode;
};

watch(mode, (newMode) => {
  if (newMode === 'decode' && showScanner.value && videoRef.value) {
    startCamera(videoRef.value, (result: string) => {
      scannedValue.value = result;
      showScanner.value = false;
      setTimeout(() => stopCamera(), 100);
    });
  } else {
    stopCamera();
  }
});

onMounted(() => {
  if (mode.value === 'decode' && videoRef.value) {
    startCamera(videoRef.value, (result: string) => {
      scannedValue.value = result;
      showScanner.value = false;
      setTimeout(() => stopCamera(), 100);
    });
  }
});

onUnmounted(() => {
  stopCamera();
});
</script>

<template>
  <div class="container py-4">
    <h2 class="mb-4">Lector y Generador PDF417</h2>

    <!-- Sección A: Escaneo -->
    <div v-if="mode === 'decode'" class="mb-4">
      <div v-if="showScanner">
        <video ref="videoRef" class="border rounded w-100 mb-3" autoplay muted playsinline></video>
      </div>
      <div v-else>
        <div class="alert alert-success">Resultado escaneado: <strong>{{ scannedValue }}</strong></div>
        <button class="btn btn-primary" @click="resetScanner">Escanear otro código</button>
      </div>
    </div>

    <!-- Sección B: Codificación -->
    <div v-if="mode === 'encode'" class="mb-4">
      <div class="mb-3">
        <input v-model="inputText" class="form-control" placeholder="Texto a convertir" />
      </div>
      <button class="btn btn-success mb-3" @click="convertToPdf417">Convertir</button>
      <div v-if="pdf417Image">
        <img :src="pdf417Image" alt="Código PDF417 generado" class="img-fluid border rounded" />
      </div>
    </div>

    <!-- Botones de modo -->
    <div class="d-flex gap-2">
      <button v-if="mode !== 'encode'" class="btn btn-outline-secondary" @click="switchMode('encode')">Encode</button>
      <button v-if="mode !== 'decode'" class="btn btn-outline-secondary" @click="switchMode('decode')">Decode</button>
    </div>
  </div>
</template>
