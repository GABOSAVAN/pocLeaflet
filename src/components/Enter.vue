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

// const hello = () => {
//     alert("ya me acorde!!!...")
// }

const clean = () => {
    text.value = "";
    textoInput.value = "";
}

</script>

<template>
  <div>
    <div class="box">
      <input
        id="input-texto"
        v-model="textoInput"
        type="text"
        placeholder="escribe..."
      />
      <h1>{{ textoInput }}</h1>
    </div>

    <div>
        <BFormInput
        v-model="text"
        class="form-control"
        placeholder="Enter your name"
        />
        <h1 class="mt-2">{{ text }}</h1>
    </div>

    <div class="d-flex justify-content-center mt-5" @click="clean">
      <b-button>Limpiar</b-button>
    </div>

    <BButton @click="toggleCollapseOne" variant="primary"
      >Toggle Collapse</BButton
    >

    <BCollapse id="collapse-1" v-model="isCollapsedOne">
      <BCard class="mt-4">
        <p class="card-text">Collapse contents Here</p>
        <BButton @click="toggleCollapseInner" size="sm"
          >Toggle Inner Collapse</BButton
        >
        <BCollapse id="collapse-1-inner" v-model="isCollapsedInner">
          <BCard class="mt-4">Hello!</BCard>
        </BCollapse>
      </BCard>
    </BCollapse>
  </div>
</template>

<style scoped>
.box {
  background-color: aqua;
  width: 200px;
  height: 150px;
}
</style>
