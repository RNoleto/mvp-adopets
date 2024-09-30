<script setup>
// Padrão
import { ref, onMounted } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
// Components UI
import Dialog from './ui/Dialog.vue';
import Form from './ui/Form.vue';
import Button from './ui/Button.vue';
import SelectField from './ui/SelectField.vue';
import TextInput from './ui/TextInput.vue';

import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();

// Componentes
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'radix-vue';

const pets = ref([]);
const vaccinesList = ref([]);
const medicinesList = ref([]);

//Função para buscar os pets da API
const fetchPets = async () => {
    try {
        const response = await axios.get(`/users/${userStore.userId}/animals`);
        pets.value = response.data;
    } catch (error) {
        console.log('Erro ao buscar pets:', error);
    }
};

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
const medicineName = ref('');

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
};

//Função para salvar informações de Vacinas e Medicamentos dos pets
const saveInfos = async (petId) => {
    try {
        //Salvar Vacinas
        for (const vaccine of addedVaccines.value) {
            await axios.post('/vaccines', {
                name: vaccine.name,
                date: vaccine.date,
                ref_id_animal: petId
            });
        }

        //Salvar Medicamentos
        for (const medication of addedMedications.value) {
            await axios.post('/medicines', {
                name: medication.name,
                date: medication.date,
                ref_id_animal: petId
            });
        }

        alert('Itens salvos com sucesso!');

    } catch (error) {
        console.log('Erro ao salvar informações do pet:', error);
        alert('Erro ao salvar itens. Tente novamente.');
    }
};

const limparInfos = async (petid) => {
     // Limpar os campos de input após adicionar
            itemName.value = '';
            itemDate.value = '';
            medicineName.value = '';
            vaccinesList.value = '';
            medicinesList.value = '';
}

//Função para retornar as Vacinas e Medicamentos do pet selecionado
const fetchInfos = async (petId) => {
    try {
        const [vaccinesResponse, medicinesResponse] = await Promise.allSettled([
            axios.get(`/vaccines/pet/${petId}`),
            axios.get(`/medicines/pet/${petId}`)
        ]);

        // Verifica o status de cada requisição
        if (vaccinesResponse.status === 'fulfilled') {
            vaccinesList.value = vaccinesResponse.value.data;
        } else {
            console.log('Nenhuma vacina encontrada ou erro ao buscar vacinas');
        }

        if (medicinesResponse.status === 'fulfilled') {
            medicinesList.value = medicinesResponse.value.data;
        } else {
            console.log('Nenhum medicamento encontrado ou erro ao buscar medicamentos');
        }
        
    } catch (error) {
        console.log('Erro inesperado ao buscar informações do pet: ', error);
    }
};
</script>

<template>
    <div class="h-screen flex flex-col items-center justify-center">
        <h2 class="text-2xl font-semibold">Adopets!</h2>
        <p class="text-sm mt-2 mb-2">Seja bem vindo <span class="text-blue-600">{{ userStore.userName }}</span></p>
        <div class="w-[360px] flex flex-col gap-3 mb-5">
            <div class="flex gap-1 font-bold w-[360px]">
                <p>Meus Pets</p>
            </div>
            <!-- Lista de pets cadatrados -->
            <div class="flex flex-col w-[360px] bg-zinc-300 px-2 py-1 rounded-md hover:bg-zinc-400 hover:text-zinc-100"
                v-for="pet in pets" :key="pet.id">
                <DialogRoot>
                    <DialogTrigger @click="fetchInfos(pet.id)">
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
                            class="fixed z-60 right-0 top-0 bottom-0 w-[400px] h-screen border-l border-zinc-600 bg-zinc-300 p-8">
                            <DialogTitle class="text-xl font-semibold text-zinc-900">{{ pet.name }}</DialogTitle>
                            <DialogDescription class=" text-zinc-800 text-sm leading-relaxed flex flex-col h-full">
                                <p>Detalhes sobre {{ pet.name }}</p>
                                <hr>
                                <div class="py-2">
                                    <p><span class="mr-2 text-base text-zinc-900 font-semibold">Espécie:</span> {{pet.specie }}</p>
                                    <p><span class="mr-2 text-base text-zinc-900 font-semibold">Raça:</span>{{ pet.breed }}</p>
                                    <p><span class="mr-2 text-base text-zinc-900 font-semibold">Sexo:</span> {{pet.gender}}</p>
                                    <p><span class="mr-2 text-base text-zinc-900 font-semibold">Idade:</span>{{formatDate(pet.birth) }}</p>
                                    <p v-if="pet.chip_number !== null"><span class="mr-2 text-base text-zinc-900 font-semibold">Nº Chip:</span> {{pet.chip_number }}</p>
                                    <p v-else><span class="mr-2 text-base text-zinc-900 font-semibold">Nº Chip:</span> Não informado</p>
                                </div>
                                <hr>
                                <!-- Criar UI para medicamentos e vacinas? -->
                                <div class="mt-2 gap-2">
                                    <!-- SelectField para escolher a opção -->
                                    <SelectField :options="myOptions" v-model="selectedOption" label="Escolha uma opção"
                                        placeholder="Selecione..." id="select" />

                                    <!-- Exibe os campos para adicionar nova vacina ou medicação -->
                                    <div v-if="selectedOption !== ''"
                                        class="mt-2 flex flex-col align-center gap-2 items-center">
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
                                            <h3 class="text-base font-semibold text-zinc-900 mb-2">Itens Adicionados
                                            </h3>
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
                                                <h4 class="text-base font-semibold text-green-700 mb-2">Medicamentos
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
                                <div class="mt-4 p-2 rounded-xl bg-zinc-200">
                                    <h4 class="text-lg font-semibold text-blue-500">Vacinas Registradas</h4>
                                    <ul v-if="vaccinesList.length">
                                        <li v-for="(vaccine, index) in vaccinesList" :key="`vacina-${index}`">
                                            <p>{{ vaccine.name }} - {{ formatDate(vaccine.date) }}</p>
                                        </li>
                                    </ul>
                                    <p v-else>Nenhuma vacina registrada.</p>
                                    <h4 class="text-lg font-semibold text-green-500 mt-4">Medicamentos Registrados</h4>
                                    <ul v-if="medicinesList.length">
                                        <li v-for="(medicine, index) in medicinesList" :key="`medicamento-${index}`">
                                            <p>{{ medicine.name }} - {{ formatDate(medicine.date) }}</p>
                                        </li>
                                    </ul>
                                    <p v-else>Nenhum medicamento registrado.</p>
                                </div>
                                <div class="mt-4 flex gap-2 py-2">
                                    <Button @click="saveInfos(pet.id)" variant="primary" size="default"
                                        class="w-full">Salvar</Button>
                                    <DialogClose class="w-full">
                                        <Button variant="secondary" size="default" class="w-full" @click="limparInfos(pet.id)">Cancelar</Button>
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