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
import SelectField from './ui/SelectField.vue';
import TextInput from './ui/TextInput.vue';

// Componentes
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'radix-vue';

const pets = ref([]);

//Função para buscar os pets da API
const fetchPets = async () => {
    try {
        const response = await axios.get('/animals');
        pets.value = response.data;
    } catch (error) {
        console.log('Erro ao buscar pets:', error);
    }
};

//Função para salvar informações de Vacinas e Medicamentos dos pets


//Função para formatar a data
function formatDate(date) {
    return dayjs(date).format('DD/MM/YYYY');
}

//Chamar a função ao montar o componente
onMounted(() => {
    fetchPets();
});

// Variável para armazenar a opção selecionada
const selectedOption = ref('');

// Variáveis para armazenar o nome e a data do item atual
const itemName = ref('');
const itemDate = ref('');

// Arrays separados para armazenar vacinas e medicamentos
const addedVaccines = ref([]);
const addedMedications = ref([]);

// Opções para o campo select
const myOptions = [
    { value: 'Medicamento', text: 'Medicamento' },
    { value: 'Vacina', text: 'Vacina' }
];

// Função para adicionar um novo item à lista
const addItem = () => {
    if (itemName.value && itemDate.value) {
        if (itemName.value && itemDate.value) {
            const newItem = {
                name: itemName.value,
                date: itemDate.value
            };

            if (selectedOption.value === 'Vacina') {
                addedVaccines.value.push(newItem);
            } else if (selectedOption.value === 'Medicamento') {
                addedMedications.value.push(newItem);
            }

            // Limpar os campos de input após adicionar
            itemName.value = '';
            itemDate.value = '';
        }
    }
};

// Função para remover um item da lista
const removeItem = (index, type) => {
    if (type === 'Vacina') {
        addedVaccines.value.splice(index, 1);
    } else if (type === 'Medicamento') {
        addedMedications.value.splice(index, 1);
    }
}
</script>

<template>
    <div class="h-screen flex flex-col items-center justify-center">
        <img :src="logoAdopets" alt="logo-adopets" class="w-[80px] mb-5">
        <div class="w-[360px] flex flex-col gap-3 mb-5">
            <div class="flex gap-1 font-bold w-[360px]">
                <p>Meus Pets</p>
            </div>
            <!-- Lista de pets cadatrados -->
            <div class="flex flex-col w-[360px] bg-zinc-800 px-2 py-1 rounded-md hover:bg-zinc-700" v-for="pet in pets"
                :key="pet.id">
                <DialogRoot>
                    <DialogTrigger>
                        <div class="flex justify-between items-baseline">
                            <p class="text-xl font-semibold">{{ pet.name }}</p>
                            <p class="text-sm">{{ formatDate(pet.birth) }}</p>
                        </div>
                        <div class="flex justify-between gap-2">
                            <p class="text-sm font-semibold">{{ pet.specie }}</p>
                            <p class="text-sm font-semibold">{{ pet.gender }}</p>
                            <p class="text-sm font-thin">{{ pet.chip_number }}</p>
                        </div>
                    </DialogTrigger>
                    <DialogPortal>
                        <DialogOverlay class="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm" />

                        <!-- Conteúdo do Dialog com detalhes do pet -->
                        <DialogContent
                            class="fixed z-60 right-0 top-0 bottom-0 w-[400px] h-screen border-l border-zinc-900 bg-zinc-950 p-8">
                            <DialogTitle class="text-xl font-semibold">{{ pet.name }}</DialogTitle>
                            <DialogDescription class=" text-zinc-400 text-sm leading-relaxed flex flex-col h-full">
                                <p>Detalhes sobre {{ pet.name }}</p>
                                <hr>
                                <div class="py-2">
                                    <p><span class="mr-2 text-base text-white font-semibold">Idade:</span>{{
                                        formatDate(pet.birth) }}</p>
                                    <p><span class="mr-2 text-base text-white font-semibold">Sexo:</span> {{ pet.gender
                                        }}</p>
                                    <p><span class="mr-2 text-base text-white font-semibold">Espécie:</span> {{
                                        pet.specie }}</p>
                                    <p><span class="mr-2 text-base text-white font-semibold">Nº Chip:</span> {{
                                        pet.chip_number }}</p>
                                </div>
                                <hr>
                                <!-- Criar UI para medicamentos e vacinas? -->
                                <div class="mt-2 gap-2">
                                    <!-- SelectField para escolher a opção -->
                                    <SelectField :options="myOptions" v-model="selectedOption" label="Escolha uma opção"
                                        placeholder="Selecione..." id="select" />

                                    <!-- Exibe os campos para adicionar nova vacina ou medicação -->
                                    <div v-if="selectedOption !== ''"
                                        class="mt-4 flex flex-col align-center gap-2 items-center">
                                        <div class="flex gap-2">
                                            <TextInput type="text" v-model="itemName"
                                                :label="`Nome do ${selectedOption}`" />
                                            <TextInput label="Data" type="date" v-model="itemDate" />
                                        </div>
                                        <div class="w-full">
                                            <Button @click="addItem" variant="primary" size="default"
                                                class="w-full">Adicionar</Button>
                                        </div>
                                        <!-- Lista de vacinas ou medicamentos adicionados -->
                                        <div class="w-full mt-4">
                                            <hr>
                                            <h3 class="text-base font-semibold text-white mb-2">Itens Adicionados</h3>

                                            <!-- Lista de vacinas -->
                                            <div v-if="addedVaccines.length">
                                                <h4 class="text-base font-semibold text-blue-500 mb-2">Vacinas</h4>
                                                <ul>
                                                    <li v-for="(vaccine, index) in addedVaccines"
                                                        :key="`vacina-${index}`"
                                                        class="flex items-baseline justify-between gap-2 mt-1">
                                                        <p>{{ vaccine.name }} - {{ formatDate(vaccine.date) }}</p>
                                                        <Button @click="removeItem(index, 'Vacina')" variant="primary"
                                                            size="sm"
                                                            class="text-xs font-light bg-red-500 hover:bg-red-600">
                                                            Remover
                                                        </Button>
                                                    </li>
                                                </ul>
                                            </div>

                                            <!-- Lista de medicamentos -->
                                            <div v-if="addedMedications.length" class="mt-4">
                                                <h4 class="text-base font-semibold text-green-500 mb-2">Medicamentos
                                                </h4>
                                                <ul>
                                                    <li v-for="(medication, index) in addedMedications"
                                                        :key="`medicamento-${index}`"
                                                        class="flex items-baseline justify-between gap-2 mt-1">
                                                        <p>{{ medication.name }} - {{ formatDate(medication.date) }}</p>
                                                        <Button @click="removeItem(index, 'Medicamento')"
                                                            variant="primary" size="sm"
                                                            class="text-xs font-light bg-red-500 hover:bg-red-600">
                                                            Remover
                                                        </Button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
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
                <Dialog title="Cadastrar meu Pet" description="Detalhes do meu pet" buttonText="Cadastrar Novo Pet">
                    <Form />
                </Dialog>
            </div>
        </div>
    </div>
</template>