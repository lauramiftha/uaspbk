import { createRouter, createWebHistory } from 'vue-router';

import Cuaca from '../components/Cuaca.vue';
import Lokasi from '../components/Lokasi.vue';
import Stopwatch from '../components/Stopwatch.vue';
import TicTacToe from '../components/TicTacToe.vue';
import Foto from '../components/Foto.vue';

const routes = [
  { path: '/', component: Cuaca },
  { path: '/lokasi', component: Lokasi },
  { path: '/stopwatch', component: Stopwatch },
  { path: '/ticTacToe', component: TicTacToe },
  { path: '/foto', component: Foto },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;