<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { DialogClose } from 'radix-vue';
import axios from 'axios';
import { useUserStore } from '../../stores/userStore';

// Componentes importados
import TextInput from './TextInput.vue';
import Button from './Button.vue';

// Componentes Ui
import Select from './Select.vue';

const userStore = useUserStore();

// Variáveis reativas para armazenar os dados do formulário
const petData = ref({
  name: '',
  chip_number: '',
  birth: '',
  specie: '',
  breed: '',
  gender: '',
  is_castred: '',
  size: '',
  status: 1,
  ref_id_user: userStore.userId, // Define o ID do usuário logado a partir da store
  ativo: 1 // Ativo padrão
});

const speciesOptions = ['Cachorro', 'Gato'];
const genderOptions = ['Macho', 'Femea'];
const castredOptions = ['Sim', 'Não'];
const sizeOptions = ['Pequeno', 'Médio', 'Grande', 'Gigante'];

// Função para salvar os dados do pet
const router = useRouter();

const savePet = async () => {  
  try {
    const response = await axios.post('/animals', petData.value);
    console.log('Pet cadastrado com sucesso:', response.data);
    router.push('/summary');
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
      <Select
        selectLabel="Espécie do Pet"
        v-model="petData.specie"
        :options="speciesOptions"
        label="Selecione uma opção"
      />
      <!-- Campo de Sexo do Pet -->
      <Select
        selectLabel="Sexo do Pet"
        v-model="petData.gender"
        :options="genderOptions"
        label="Selecione uma opção"
      />

      <!-- Campo de Raça do Pet -->
      <TextInput label="Raça do Pet" id="breedPet" v-model="petData.breed" required />
      
      <!-- Campo de Data de Nascimento do Pet -->
       <TextInput type="date" class="w-1" label="Data de Nascimento" id="birthDate" v-model="petData.birth" required />
      
      <!-- Campo para Castrado -->
      <Select
        selectLabel="Castrado?"
        v-model="petData.is_castred"
        :options="castredOptions"
        label="Selecione uma opção"
      />
      
      <!-- Campo para Tamanho do Pet -->
      <Select
        selectLabel="Tamanho do Pet"
        v-model="petData.size"
        :options="sizeOptions"
        label="Selecione uma opção"
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
