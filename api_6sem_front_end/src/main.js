import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import { Line } from 'vue-chartjs'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(naive)

const toastOptions = {
  position: "top-center",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: false,
};

app.use(Toast, toastOptions)

app.component('LineChart', Line)

app.mount('#app')
