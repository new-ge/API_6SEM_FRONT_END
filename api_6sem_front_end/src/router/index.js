import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';
import AnalystMainView from '../views/AnalystMainView.vue';
import AnalystNoFAQMainView from '../views/AnalystNoFAQMainVue.vue';

const routes = [
  {
    path: '/main',
    name: 'Main',
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
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



export default router;
