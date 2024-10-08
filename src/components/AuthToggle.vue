<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import axios from 'axios'; 

// Componente UI
import Button from './ui/Button.vue';
import TextInput from './ui/TextInput.vue';

const router = useRouter(); // Cria uma instância do router
const userStore = useUserStore();

const isFormVisible = ref(false); // Controla a exibição dos formulários
const isAuthForm = ref(true); // Controla qual formulário exibir

// Campos de entrada
const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');
const loginEmail = ref('');
const loginPassword = ref('');

// Funções para alternar entre os formulários
const showAuthForm = () => {
    isAuthForm.value = true;
    isFormVisible.value = true; // Exibe os formulários ao clicar
};

const showLoginForm = () => {
    isAuthForm.value = false;
    isFormVisible.value = true; // Exibe os formulários ao clicar
};

const goBack = () => {
    isFormVisible.value = false;
}

// Função para manipular a submissão do formulário
const handleSubmit = async () => {
    if (isAuthForm.value) {
        // Chamada à API para registrar o usuário
        try {
            const response = await axios.post('register', {
                name: userName.value,
                email: userEmail.value,
                password: userPassword.value
            });
            console.log('Usuário registrado:', response.data);
        } catch (error) {
            console.error('Erro ao registrar:', error.response?.data || error.message);
        }
    } else {
        // Chamada à API para fazer login
        try {
            const response = await axios.post('/login', {
                email: loginEmail.value,
                password: loginPassword.value
            });

            // console.log('Login realizado:', response.data);
            userStore.setUserData(response.data);

            await userStore.fetchPets(); // Chama a função para buscar os pets
            // console.log('Pets buscados:', userStore.pets); // Verifique os pets

            if (userStore.pets.length > 0) {
                router.push('/summary');
            } else {
                router.push('/empy-pets');
            }
        } catch (error) {
            console.error('Erro no login:', error.response?.data || error.message);
        }
    }

    // Resetar os campos após a submissão
    resetFields();
};

// Função para resetar os campos do formulário
const resetFields = () => {
    userName.value = '';
    userEmail.value = '';
    userPassword.value = '';
    loginEmail.value = '';
    loginPassword.value = '';
};
</script>

<template>
    <div class="auth-container flex flex-col items-center justify-center h-screen">
        <h2 class="text-2xl font-semibold mb-4">Bem-vindo ao Adopets!</h2>
        <div class="flex space-x-4 mb-4" v-if="!isFormVisible"> <!-- Mostra os botões apenas quando os formulários não estão visíveis -->
            <Button @click="showAuthForm" class="w-full" :variant="isAuthForm ? 'primary' : 'secondary'">
                Criar Cadastro
            </Button>
            <Button @click="showLoginForm" class="w-full" :variant="isAuthForm ? 'secondary' : 'primary'">
                Fazer Login
            </Button>
        </div>

        <div class="w-full max-w-md" v-if="isFormVisible"> <!-- Mostra os formulários apenas quando visíveis -->
            <form @submit.prevent="handleSubmit">
                <!-- Exibe o formulário de cadastro ou login com base na variável isAuthForm -->
                <div v-if="isAuthForm">
                    <TextInput id="name" v-model="userName" label="Nome" placeholder="Seu nome" />
                    <TextInput id="email" v-model="userEmail" label="Email" placeholder="Seu email" type="email" />
                    <TextInput id="password" v-model="userPassword" label="Senha" placeholder="Sua senha" type="password" />
                </div>

                <div v-else>
                    <TextInput id="loginEmail" v-model="loginEmail" label="Email" placeholder="Seu email" type="email" />
                    <TextInput id="loginPassword" v-model="loginPassword" label="Senha" placeholder="Sua senha" type="password" />
                </div>

                <div v-if="isFormVisible" class="flex w-full gap-2">
                <Button type="submit" class="w-full mt-4">
                    {{ isAuthForm ? 'Registrar' : 'Login' }}
                </Button>
                <Button @click="goBack" class="w-full mt-4" variant="secondary">
                    Voltar
                </Button>
                </div>
            </form>
        </div>
    </div>
</template>
