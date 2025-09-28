import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: MainView
  },
  {
    path: '/',
    redirect: '/main' // redireciona a raiz para /main
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



export default router;
