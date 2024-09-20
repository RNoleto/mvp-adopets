<script setup>
// Ui components
import Button from './components/ui/Button.vue';

import EmpyPets from './components/EmpyPets.vue';
import Summary from './components/Summary.vue';

// Formularios de Cadastro e Login
import AuthForm from './components/AuthForm.vue';
import LoginForm from './components/LoginForm.vue';
import { ref } from 'vue';

const showAuthForm = ref(true); // Controla a exibição do formulário de cadastro ou login

// Funções para alternar entre os formulários
const showLogin = () => {
  showAuthForm.value = false;
};

const showAuth = () => {
        showAuthForm.value = true;
}

</script>

<template>        
        <div v-if="showAuthForm">
                <AuthForm />
                <Button @click="showLogin" variant="primary" size="default">Fazer Login</Button>
        </div>
        <div v-else>
                <LoginForm />
                <Button @click="showAuth" variant="primary" size="default">Fazer Cadastro</Button>
        </div>

        <!-- <EmpyPets /> -->
        <!-- <Summary /> -->

</template>