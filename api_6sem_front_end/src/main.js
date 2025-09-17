import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import naive from 'naive-ui';
import { Line } from 'vue-chartjs';

createApp(App)
  .use(router)
  .use(naive)
  .mount('#app');

app.component('LineChart', Line)

