import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const storageBaseUrl = 'http://127.0.0.1:8000/storage/';
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.baseURL = 'https://adopets-api.vercel.app/api/api/';
axios.storageBaseUrl = storageBaseUrl;

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app')
