<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const toggle = () => {
    alert('toggle');
  isOpen.value = !isOpen.value;
};

</script>
<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container-fluid">
        <h2>POC</h2>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div  class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link text-white" active-class="active" to="/mapa">Mapa</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" active-class="active" to="/pdf">PDF</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" active-class="active" to="/ocr">OCR</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<style scoped>
.navbar {
  border-bottom: 1px solid #444;
}

.nav-link.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>