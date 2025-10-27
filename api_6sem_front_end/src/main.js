import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import { Line } from 'vue-chartjs'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(naive)

app.component('LineChart', Line)

app.mount('#app')
