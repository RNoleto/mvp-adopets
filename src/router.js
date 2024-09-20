import {createRouter, createWebHistory } from 'vue-router';
import AuthToggle from './components/AuthToggle.vue';
import EmpyPets from './components/EmpyPets.vue';

const routes = [
    {
        path: '/',
        name: 'AuthToggle',
        component: AuthToggle
    },
    {
        path: '/empy-pets',
        name: 'EmpyPets',
        component: EmpyPets
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;