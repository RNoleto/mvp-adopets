<script setup>
import { ref } from 'vue';
import { DialogClose } from 'radix-vue';

import TextInput from './TextInput.vue';
import DatePickerInput from './DatePickerInput.vue';
import Button from './Button.vue';

import RadioGroup from './RadioGroup.vue';

const petName = ref('')
const birthDate = ref('')
const breedPet = ref('')
</script>

<template>
  <div class="mt-4 flex flex-col gap-4 h-full">
    <div class="flex flex-col gap-4">
      <!-- Campo de Nome do Pet -->
      <TextInput label="Nome do Pet" id="petName" v-model="petName"/>
      <!-- Especie do Pet -->
       <RadioGroup 
        groupLabel="Especie do Pet",
        :options="[
          { label: 'Cachorro', value:'dog' },
          { label:'Gato', value:'cat'}
        ]"
        defaultValue="dog"
       />
      <!-- Campo de Raça do Pet -->
      <TextInput label="Raça do Pet" id="breedPet" v-model="breedPet"/>
      <!-- Campo de Data de Nascimento do Pet -->
      <DatePickerInput label="Data de Nascimento" id="birthDate" v-model="birthDate" />
      <!-- Campo para Sexo do Pet -->
      <RadioGroup
        groupLabel="Sexo do Pet", 
        :options="[
          { label: 'Macho', value: 'male'}, 
          {label: 'Fêmea', value: 'female'}
          ]" 
          defaultValue="male" 
      />
      <!-- Campo para Porte do Pet -->
      <RadioGroup
        groupLabel="Tamanho do Pet",  
        :options="[
          { label: 'Pequeno', value: 'small'},
          { label: 'Médio', value: 'medium' },
          { label: 'Grande', value: 'large' }
        ]"
        defaultValue="small"
      />
    </div>
    <!-- Campo de Botões -->
    <div class="flex justify-between gap-4">
      <Button variant="primary" size="default" class="w-full">Cadastrar Pet</Button>
      <DialogClose>
        <Button variant="secondary" class="w-36">Cancelar</Button>
      </DialogClose>
    </div>
  </div>
  
</template>
