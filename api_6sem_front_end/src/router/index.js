import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';
import AnalystMainView from '@/views/AnalystMainView.vue';

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: MainView
  },

  {
    path: '/analyst',
    name: 'Analyst',
    component: AnalystMainView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



export default router;
