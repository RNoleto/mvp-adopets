<script setup>
import { ref } from 'vue';
import axios from 'axios';
import TextInput from './ui/TextInput.vue';
import Button from './ui/Button.vue';

const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');
const loading = ref(false);
const errorMessage = ref(null);

const handleSubmit = async () => {
  loading.value = true;
  errorMessage.value = null;

  const formData = {
    name: userName.value,
    email: userEmail.value,
    password: userPassword.value,
  };

  try {
    // Enviando dados do formulário para a API
    const response = await axios.post('/register', formData);
    
    // Exibir sucesso ou realizar alguma ação após o cadastro
    console.log('Usuário cadastrado:', response.data);
    
    // Resetar os campos após o cadastro bem-sucedido
    userName.value = '';
    userEmail.value = '';
    userPassword.value = '';
  } catch (error) {
    // Exibir uma mensagem de erro caso o cadastro falhe
    errorMessage.value = 'Ocorreu um erro ao cadastrar o usuário. Tente novamente.';
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <form @submit.prevent="handleSubmit" class="space-y-4 max-w-[400px] mt-0 my-auto">
      <!-- Campo de Nome -->
      <TextInput
        id="name"
        v-model="userName"
        label="Nome"
        placeholder="Seu nome"
      />
  
      <!-- Campo de Email -->
      <TextInput
        id="email"
        v-model="userEmail"
        label="Email"
        placeholder="Seu email"
        type="email"
      />
  
      <!-- Campo de Senha -->
      <TextInput
        id="password"
        v-model="userPassword"
        label="Senha"
        placeholder="Sua senha"
        type="password"
      />
  
      <!-- Botão de Submissão -->
      <Button
        variant="primary"
        size="default"
        class="w-full"
        type="submit"
        :disabled="loading"
      >
        {{ loading ? 'Cadastrando...' : 'Registrar' }}
      </Button>

      <!-- Exibindo Mensagem de Erro -->
      <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
    </form>
  </div>
</template>
