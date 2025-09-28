import naive from 'naive-ui';
import { createApp } from 'vue';
import { Line } from 'vue-chartjs';
import App from './App.vue';
import router from './router';


const app = createApp(App);


app.use(router);
app.use(naive);

app.component('LineChart', Line);


app.mount('#app');
