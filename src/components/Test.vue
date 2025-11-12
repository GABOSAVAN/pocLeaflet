<script setup>
// Importa la función 'ref' para declarar una variable reactiva
import { ref } from 'vue'
    
// La variable reactiva que almacenará el texto del input
const textoInput = ref('')

</script>

<template>
    <div>
        
        <div class="box">
            <input 
                id="input-texto"
                v-model="textoInput" 
                type="text" 
                placeholder="escribe..."
            >
        </div>

        <h1>
            <span>{{ textoInput }}</span>
        </h1>

        
    </div>
</template>

<style scoped>
.box{
    background-color: aqua;
    width: 200px;
    height: 150px;
}
</style>