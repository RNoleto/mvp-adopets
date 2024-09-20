<script setup>
import { ref } from 'vue';
import { DialogClose } from 'radix-vue';
import axios from 'axios';

import TextInput from './TextInput.vue';
import DatePickerInput from './DatePickerInput.vue';
import Button from './Button.vue';

import RadioGroup from './RadioGroup.vue';

const petName = ref('')
const petChip = ref('')
const birthDate = ref('')
const breedPet = ref('')
const speciePet = ref('')
const genderPet = ref('')
const isCastrated = ref('')
const petSize = ref('')

const savePet = async () => {
  try{
    const response = await axios.post('/animals', {
      name: petName.value,
      chip_number: petChip.value,
      birth: birthDate.value,
      specie: speciePet.value,
      breed: breedPet.value,
      gender: genderPet.value,
      status: 1,
      ref_id_user: 1
    });

    console.log('Pet cadastrado com sucesso:', response.data);

  }catch(error){
    console.error('Erro ao cadastrar o Pet: ', error);
  }
}
</script>

<template>
  <div class="mt-4 flex flex-col gap-4 h-full">
    <div class="flex flex-col gap-4">
      <!-- Campo de Nome do Pet -->
      <TextInput label="Nome do Pet" id="petName" v-model="petName"/>
      <!-- Numero do Chip -->
      <TextInput type="number" label="Nº do Chip" id="petChip" v-model="petChip"/>
      <!-- Especie do Pet -->
       <RadioGroup 
        groupLabel="Especie do Pet"
        v-model="speciePet"
        :options="[
          { label: 'Cachorro', value: 'dog' },
          { label:'Gato', value: 'cat'}
        ]"
        defaultValue="dog"
       />
      <!-- Campo de Raça do Pet -->
      <TextInput label="Raça do Pet" id="breedPet" v-model="breedPet"/>
      <!-- Campo de Data de Nascimento do Pet -->
      <DatePickerInput label="Data de Nascimento" id="birthDate" v-model="birthDate" />
      <!-- Campo para Sexo do Pet -->
      <RadioGroup
        groupLabel="Sexo do Pet"
        v-model="genderPet" 
        :options="[
          { label: 'Macho', value: 'male'}, 
          {label: 'Fêmea', value: 'female'}
          ]" 
          defaultValue="male" 
      />
      <!-- Castrado? -->
       <RadioGroup
          groupLabel="Castrado"
          v-model="isCastrated"
          :options="[
            { label: 'Sim', value: 'S'},
            { label: 'Não', value: 'N'}
          ]"
          defaultValue="N"
       />
      <!-- Campo para Porte do Pet -->
      <RadioGroup
        groupLabel="Tamanho do Pet" 
        v-model="petSize" 
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
      <Button variant="primary" size="default" class="w-full" @click='savePet'>Cadastrar Pet</Button>
      <DialogClose>
        <Button variant="secondary" class="w-36">Cancelar</Button>
      </DialogClose>
    </div>
  </div>
  
</template>
