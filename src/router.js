import {createRouter, createWebHistory } from 'vue-router';
import AuthToggle from './components/AuthToggle.vue';
import EmpyPets from './components/EmpyPets.vue';
import Summary from './components/Summary.vue';

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
    },
    {
        path: '/summary',
        name: 'Summary',
        component: Summary
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;