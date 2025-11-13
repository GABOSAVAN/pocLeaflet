<template>
  <div class="default-layout">
    <Navbar />
    <main class="container mt-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>