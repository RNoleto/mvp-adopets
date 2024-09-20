import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const storageBaseUrl = 'http://127.0.0.1:8000/storage/';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.storageBaseUrl = storageBaseUrl;


const app = createApp(App);
app.use(router);
app.mount('#app')
