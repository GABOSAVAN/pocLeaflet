
import { createApp } from 'vue'
import App from './App.vue'
// import './scss/styles.scss';
import router from './router'
// import {BootstrapVueNext}  from 'bootstrap-vue-next';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App);
app.use(router);
// app.use(BootstrapVueNext.BootstrapVueNext)
app.mount('#app')
