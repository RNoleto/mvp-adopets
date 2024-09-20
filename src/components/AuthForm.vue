<script setup>
import { ref } from 'vue';
import TextInput from './ui/TextInput.vue';
import Button from './ui/Button.vue';

const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');

const handleSubmit = () => {
  const formData = {
    name: userName.value,
    email: userEmail.value,
    password: userPassword.value,
  };
  
  console.log('Form data:', formData);
  // Aqui você pode adicionar a lógica de requisição para a API de cadastro
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
      >
        Registrar
      </Button>
    </form>
  </div>
</template>
