<script setup>
// Padrão
import { ref, onMounted } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
// Imagens
import logoAdopets from '../assets/Adopets.svg'
// Components UI
import Dialog from './ui/Dialog.vue';
import Form from './ui/Form.vue';
import Button from './ui/Button.vue';
import Combobox from './ui/Combobox.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
// Componentes
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'radix-vue';

const pets = ref([]);

//Função para buscar os pets da API
const fetchPets = async () => {
  try{
    const response = await axios.get('/animals');
    pets.value = response.data;
  } catch(error){
    console.log('Erro ao buscar pets:', error);
  }
};

//Função para formatar a data
function formatDate(date){
  return dayjs(date).format('DD/MM/YYYY');
}

//Chamar a função ao montar o componente
onMounted(() => {
  fetchPets();
});

//Vacinas e medicamentos para o modal
const vacines = ['Raiva', 'Giardia']
const medicines = ['Antipulgas', 'Vermifugo']
</script>

<template>
    <div class="h-screen flex flex-col items-center justify-center">
        <img :src="logoAdopets" alt="logo-adopets" class="w-[80px] mb-5">
        <div class="w-[360px] flex flex-col gap-3 mb-5">
            <div class="flex gap-1 font-bold w-[360px]">
                <p>Meus Pets</p>
            </div>
            <!-- Lista de pets cadatrados -->
            <div class="flex flex-col w-[360px] bg-zinc-800 px-2 py-1 rounded-md hover:bg-zinc-700" v-for="pet in pets" :key="pet.id">
                <DialogRoot>
                    <DialogTrigger>
                        <div class="flex justify-between items-baseline">
                            <p class="text-xl font-semibold">{{ pet.name }}</p>
                            <p class="text-sm">{{ formatDate(pet.birth) }}</p>
                        </div>
                        <div class="flex justify-between gap-2">
                          <p class="text-sm font-semibold">{{ pet.specie }}</p>
                            <p class="text-sm font-semibold">{{ pet.gender }}</p>
                            <p class="text-sm font-thin">{{  pet.chip_number }}</p>
                        </div>
                    </DialogTrigger>
                    <DialogPortal>
                        <DialogOverlay class="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm" />

                        <!-- Conteúdo do Dialog com detalhes do pet -->
                        <DialogContent class="fixed z-60 right-0 top-0 bottom-0 w-[400px] h-screen border-l border-zinc-900 bg-zinc-950 p-8">
                            <DialogTitle class="text-xl font-semibold">{{ pet.name }}</DialogTitle>
                            <DialogDescription class=" text-zinc-400 text-sm leading-relaxed flex flex-col h-full">
                                <p>Detalhes sobre {{ pet.name }}</p>
                                <hr>
                                <div class="py-2">
                                    <p><span class="mr-2 text-base text-white font-semibold">Idade:</span>{{ formatDate(pet.birth) }}</p>
                                    <p><span class="mr-2 text-base text-white font-semibold">Sexo:</span> {{ pet.gender }}</p>
                                    <p><span class="mr-2 text-base text-white font-semibold">Espécie:</span> {{ pet.specie }}</p>
                                    <p><span class="mr-2 text-base text-white font-semibold">Nº Chip:</span> {{ pet.chip_number }}</p>
                                </div>
                                <hr>
                                <!-- Criar UI ou não? -->
                                <div class="mt-2 flex gap-2">
                                    <Combobox 
                                        :options="vacines"
                                        :medicamentos="medicines"
                                        placeholder="Selecione a opção"
                                        label1="Vacinas"
                                        label2="Medicamentos"
                                    />
                                    <Button >
                                        <Icon icon="radix-icons:plus-circled" />
                                    </Button>
                                    <!-- Vacinas -->
                                    <!-- Medicamentos -->
                                    <!-- Outros  -->
                                </div>
                                <div class="mt-4 flex gap-2 py-2">
                                    <Button variant="primary" size="default" class="w-full">Salvar</Button>
                                    <DialogClose class="w-full">
                                        <Button variant="secondary" size="default" class="w-full">Cancelar</Button>
                                    </DialogClose>
                                </div>
                            </DialogDescription>
                            <DialogClose as="button" class="absolute top-2 right-2">X</DialogClose>
                        </DialogContent>
                    </DialogPortal>
                </DialogRoot>
                            
            </div>
            <!-- Formulario para cadastar novo pet -->
            <div>
                <Dialog
                    title="Cadastrar meu Pet"
                    description="Detalhes do meu pet"
                    buttonText="Cadastrar Novo Pet"
                >
                    <Form />
                </Dialog>
            </div>
        </div>
    </div>
</template>