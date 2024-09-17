<script setup>
import { ref } from 'vue';

import TextInput from './TextInput.vue';
import DatePickerInput from './DatePickerInput.vue';
import Button from './Button.vue';

const petName = ref('')
const birthDate = ref('')
</script>

<template>
  <div class="mt-4 flex flex-col gap-4 h-full">
    <div class="flex flex-col gap-4">
      <!-- Campo de Nome do Pet -->
      <TextInput label="Nome do Pet" id="petName" v-model="petName"/>
      <!-- Campo de Data de Nascimento do Pet -->
      <DatePickerInput label="Data de Nascimento" id="birthDate" v-model="birthDate" />
    </div>
    <!-- Campo de Botões -->
    <div class="flex justify-between gap-4">
      <Button variant="primary" size="default" class="w-full">Cadastrar Pet</Button>
      <Button variant="secondary" size="sm" class="w-36">Cancelar</Button>
    </div>
  </div>
  
</template>
