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

const text = ref("");

const toggleCollapseOne = () => {
  isCollapsedOne.value = !isCollapsedOne.value;
};

const toggleCollapseInner = () => {
  isCollapsedInner.value = !isCollapsedInner.value;
};

const clean = () => {
    text.value = "";
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

    <div v-if="text.length > 0" class="d-flex justify-content-center mt-5" @click="clean">
      <b-button>Limpiar</b-button>
    </div>
    
  </div>
</template>