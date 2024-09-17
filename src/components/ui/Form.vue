<script setup>
import { ref } from 'vue';

import TextInput from './TextInput.vue';
import DatePickerInput from './DatePickerInput.vue';
import { DatePickerCalendar } from 'radix-vue';

const petName = ref('')
const birthDate = ref('')
</script>

<template>
  <div class="mt-2 flex flex-wrap items-center gap-4">
    <!-- Campo de Nome do Pet -->
    <TextInput label="Nome do Pet" id="petName" v-model="petName" />

    <!-- Campo de Data de Nascimento do Pet -->
    <DatePickerInput label="Data de Nascimento" id="birthDate" v-model="birthDate" />
  </div>
  
</template>
