<script setup>
import { ref } from 'vue';
import { DialogClose } from 'radix-vue';
import axios from 'axios';
import dayjs from 'dayjs';

// Componentes importados
import TextInput from './TextInput.vue';
import DatePickerInput from './DatePickerInput.vue';
import Button from './Button.vue';
import RadioGroup from './RadioGroup.vue';

// Variáveis reativas para armazenar os dados do formulário
const petData = ref({
  name: '',
  chip_number: '',
  birth: '01/12/2019',
  specie: 'Canina', // Especie padrão definida como "Canina"
  breed: '',
  gender: 'F', // Sexo padrão definido como "F"
  status: 1,
  ref_id_user: 1, // ID do usuário
  ativo: 1 // Ativo padrão
});

// Função para salvar os dados do pet
const savePet = async () => {
  // Garantir que a data está no formato YYYY-MM-DD
  petData.value.birth = dayjs(petData.value.birth).format('YYYY-MM-DD');

  try {
    const response = await axios.post('/animals', petData.value);
    console.log('Pet cadastrado com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao cadastrar o Pet:', error.response.data);
    console.log("Dados do Pet cadastrado: ", petData.value);
  }
};
</script>

<template>
  <div class="mt-4 flex flex-col gap-4 h-full">
    <div class="flex flex-col gap-4">
      <!-- Campo de Nome do Pet -->
      <TextInput label="Nome do Pet" id="petName" v-model="petData.name" required />
      
      <!-- Campo de Nº do Chip -->
      <TextInput type="number" label="Nº do Chip" id="petChip" v-model="petData.chip_number" />
      
      <!-- Campo de Espécie do Pet -->
      <RadioGroup 
        groupLabel="Espécie do Pet"
        v-model="petData.specie"
        :options="[ 
          { label: 'Canina', value: 'Canina' }, 
          { label: 'Felina', value: 'Felina' } 
        ]"
        defaultValue="Canina"
      />
      
      <!-- Campo de Raça do Pet -->
      <TextInput label="Raça do Pet" id="breedPet" v-model="petData.breed" required />
      
      <!-- Campo de Data de Nascimento do Pet -->
      <DatePickerInput label="Data de Nascimento" id="birthDate" v-model="petData.birth" required />
      
      <!-- Campo de Sexo do Pet -->
      <RadioGroup
        groupLabel="Sexo do Pet"
        v-model="petData.gender"
        :options="[ 
          { label: 'Macho', value: 'M' }, 
          { label: 'Fêmea', value: 'F' } 
        ]"
        defaultValue="F"
      />
      
      <!-- Campo para Castrado -->
      <RadioGroup
        groupLabel="Castrado"
        v-model="petData.is_castrated"
        :options="[ 
          { label: 'Sim', value: 'S' }, 
          { label: 'Não', value: 'N' } 
        ]"
        defaultValue="N"
      />
      
      <!-- Campo para Tamanho do Pet -->
      <RadioGroup
        groupLabel="Tamanho do Pet"
        v-model="petData.pet_size"
        :options="[ 
          { label: 'Pequeno', value: 'small' }, 
          { label: 'Médio', value: 'medium' }, 
          { label: 'Grande', value: 'large' } 
        ]"
        defaultValue="small"
      />
    </div>
    
    <!-- Botões de ação -->
    <div class="flex justify-between gap-4">
      <Button variant="primary" size="default" class="w-full" @click="savePet">Cadastrar Pet</Button>
      <DialogClose>
        <Button variant="secondary" class="w-36">Cancelar</Button>
      </DialogClose>
    </div>
  </div>
</template>
