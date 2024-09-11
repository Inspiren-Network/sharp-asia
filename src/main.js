import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vue3Toastify from 'vue3-toastify'

const app = createApp(App)

app.use(Vue3Toastify, {
  autoClose: 5000,
})

app.mount('#oks-vue')
