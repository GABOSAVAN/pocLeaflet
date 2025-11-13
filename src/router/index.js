// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Enter',
    component: () => import('../views/Init.vue')
  },
  {
    path: '/mapa',
    name: 'Mapa',
    component: () => import('../views/MapaView.vue')
  },
  {
    path: '/pdf',
    name: 'PDF',
    component: () => import('../views/PdfView.vue')
  },
  {
    path: '/ocr',
    name: 'OCR',
    component: () => import('../views/OcrView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router