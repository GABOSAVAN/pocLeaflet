<script setup>
import { ref } from "vue";
import {
  BFormInput,
  BButton,
  BCollapse,
  BCard
  
} from "bootstrap-vue-next";

const isCollapsedOne = ref(false);
const isCollapsedInner = ref(false);

const textoInput = ref("");

const text = ref("");

const toggleCollapseOne = () => {
  isCollapsedOne.value = !isCollapsedOne.value;
};

const toggleCollapseInner = () => {
  isCollapsedInner.value = !isCollapsedInner.value;
};

const clean = () => {
    text.value = "";
    textoInput.value = "";
}

</script>

<template>
  <div>    

    <div>
        <BFormInput
        v-model="text"
        class="form-control mt-lg-5"
        placeholder="Escribe cualquier wea..."
        />
        <div style="height: 100px;">
          <h1 class="mt-2">{{ text }}</h1>
        </div>
    </div>

    <div class="d-flex justify-content-center mt-5" @click="clean">
      <b-button>Limpiar</b-button>
    </div>
    
  </div>
</template>