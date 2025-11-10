import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';
import AnalystMainView from '../views/AnalystMainView.vue';
import AnalystNoFAQMainView from '../views/AnalystNoFAQMainView.vue';
import HomeView from '../views/HomeView.vue';
import LoginScreenView from '@/views/LoginScreenView.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: HomeView
  },
  {
    path: '/gestor',
    name: 'Gestor',
    component: MainView
  },
  {
    path: '/analystn1',
    name: 'AnalystN1',
    component: AnalystMainView
  },
  {
    path: '/analystn2',
    name: 'AnalystN2',
    component: AnalystNoFAQMainView
  },
  {
    path: '/analystn3',
    name: 'AnalystN3',
    component: AnalystNoFAQMainView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginScreenView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



export default router;
