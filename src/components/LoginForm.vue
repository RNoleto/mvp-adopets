<script setup>
import { ref } from 'vue';
import axios from 'axios';
import TextInput from './ui/TextInput.vue';
import Button from './ui/Button.vue';

const userEmail = ref('');
const userPassword = ref('');
const loading = ref(false);
const errorMessage = ref(null);

const handleSubmit = async () => {
  loading.value = true;
  errorMessage.value = null;

  const formData = {
    email: userEmail.value,
    password: userPassword.value,
  };

  try {
    // Enviando dados do formulário para a API
    const response = await axios.post('/login', formData);
    
    // Exibir sucesso ou realizar alguma ação após o login
    console.log('Usuário logado:', response.data);
    
    // Resetar os campos após o login bem-sucedido
    userEmail.value = '';
    userPassword.value = '';
    
    // Redirecionar ou fazer outra ação, como armazenar o token
  } catch (error) {
    // Exibir uma mensagem de erro caso o login falhe
    errorMessage.value = 'Ocorreu um erro ao fazer login. Tente novamente.';
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center gap-8">
    <form @submit.prevent="handleSubmit" class="space-y-4 max-w-[400px]">
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
        {{ loading ? 'Entrando...' : 'Login' }}
      </Button>

      <!-- Exibindo Mensagem de Erro -->
      <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
    </form>
  </div>
</template>
