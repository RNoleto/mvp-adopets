import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'

const storageBaseUrl = 'http://127.0.0.1:8000/storage/';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

axios.storageBaseUrl = storageBaseUrl;

createApp(App).mount('#app')
