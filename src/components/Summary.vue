<script setup>
// Padrão
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
// Components UI
import Dialog from './ui/Dialog.vue';
import Form from './ui/Form.vue';
import Button from './ui/Button.vue';
import SelectField from './ui/SelectField.vue';
import TextInput from './ui/TextInput.vue';

// Componentes
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'radix-vue';

import { useUserStore } from '../stores/userStore';
import { usePetStore } from '../stores/petStore';

import { Icon } from '@iconify/vue'

const userStore = useUserStore();
const petStore = usePetStore();

//Função para formatar a data
function formatDate(date) {
    return dayjs(date).format('DD/MM/YYYY');
}

// //Função para buscar vacinas e medicamentos do pet selecionado
// const fetchInfos = async (petId) => {
//     // Inicializar as listas com arrays vazios antes de buscar os dados
//     vaccinesList.value = [];
//     medicinesList.value = [];

//     // Tentar buscar as vacinas
//     try {
//         const vaccineResponse = await axios.get(`/vaccines/pet/${petId}`);
//         vaccinesList.value = vaccineResponse.data;
//     } catch (error) {
//         console.log(`Erro ao buscar vacinas do pet ${petId}:`, error);
//         vaccinesList.value = []; // Se der erro, garante que a lista de vacinas fique vazia
//     }

//     // Tentar buscar os medicamentos
//     try {
//         const medicineResponse = await axios.get(`/medicines/pet/${petId}`);
//         medicinesList.value = medicineResponse.data;
//     } catch (error) {
//         console.log(`Erro ao buscar medicamentos do pet ${petId}:`, error);
//         medicinesList.value = []; // Se der erro, garante que a lista de medicamentos fique vazia
//     }
// };

//Função para deletar uma vacina
const deleteVaccine = async (vaccineId) => {
    try {
        await axios.delete(`/vaccines/${vaccineId}`);
        alert('Vacina removida com sucesso!');
        fetchInfos(petId);
    } catch (error) {
        console.log('Erro ao deletar vacina:', error);
        alert('Erro ao deletar a vacina. Tente novamente mais tarde.');
    }
};

//Função para deletar um medicamento
const deleteMedicine = async (medicineId) => {
    try {
        await axios.delete(`/medicines/${medicineId}`);
        alert('Medicamento removido com sucesso!');
        fetchInfos(petId);
    } catch (error) {
        console.log('Erro ao deletar medicamento:', error);
        alert('Erro ao deletar o medicamento. Tente novamente mais tarde.');
    }
}

//Chamar a função ao montar o componente
onMounted(() => {
    userStore.loadUserDataFromLocalStorage(); // Carrega os dados do localStorage
    if(userStore.isLoggedIn){
        petStore.fetchAllPets(userStore.userId); // Busca todos os pets do usuário
    }
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

const limparInfos = async (petId) => {
     // Limpar os campos de input após adicionar
            itemName.value = '';
            itemDate.value = '';
            petStore.vaccines = [];
            petStore.medicines = [];
}

// Função para calcular a idade de um pet específico
const calculatePetAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();

    let ageYears = today.getFullYear() - birth.getFullYear();

    const monthDifference = today.getMonth() - birth.getMonth();
    const dayDifference = today.getDate() - birth.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        ageYears--;
    }

    if (ageYears < 1) {
        const ageMonths = (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth();
        return `${ageMonths} ${ageMonths === 1 ? 'mês' : 'meses'}`;
    } else {
        return `${ageYears} ${ageYears === 1 ? 'ano' : 'anos'}`;
    }
};

//Função para calcular idade do pet
const petAge = computed(() => {
    const birthDate = new Date(pet.birth);
    const today = new Date();

    //Calcula a diferença em anos
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    
    //Ajusta se o mês atual for anterior ao mês de nascimento ou se for o mesmo mês, mas o dia ainda não chegou
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if(monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)){
        ageYears--;
    }

    //Se o pet tiver menos de 1 ano
    if(ageYears < 1){
        const ageMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());
        return `${ageMonths} ${ageMonths === 1 ? 'month' : 'months'}`; // Retorna em meses
    } else {
        return `${ageYears} ${ageYears === 1 ? 'year' : 'years'}`; // Retorna em anos
    }
});
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
                v-for="pet in petStore.pets" :key="pet.id">
                <DialogRoot>
                    <DialogTrigger @click="petStore.fetchPetData(pet.id)">
                        <div class="flex justify-between items-baseline">
                            <p class="text-xl font-semibold">{{ pet.name }}</p>
                            <!-- <p class="text-sm">{{ formatDate(pet.birth) }}</p> -->
                            <p>Idade: {{ calculatePetAge(pet.birth) }}</p>
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
                                    <p><span class="mr-2 text-base text-zinc-900 font-semibold">Idade:</span>{{ calculatePetAge(pet.birth) }} - {{ formatDate(pet.birth) }}</p>
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
                                <!-- Campos com vacinas e medicamentos já registrados -->
                                <div class="mt-4 p-2 rounded-xl bg-zinc-200">
                                    <h4 class="text-lg font-semibold text-blue-500">Vacinas Registradas</h4>
                                    <ul v-if="petStore.vaccines.length">
                                        <li v-for="(vaccine, index) in petStore.vaccines" :key="`vacina-${index}`" class="mb-1 flex flex-wrap gap-1 items-center justify-between hover:bg-zinc-300">
                                            <p>{{ vaccine.name }} - {{ formatDate(vaccine.date) }}</p>
                                            <Button @click="deleteVaccine(vaccine.id)"variant="delete" size="xs"><Icon icon="mi:delete-alt" /></Button>
                                        </li>
                                    </ul>
                                    <p v-else>Nenhuma vacina registrada.</p>
                                    <h4 class="text-lg font-semibold text-green-500 mt-4">Medicamentos Registrados</h4>
                                    <ul v-if="petStore.medicines.length">
                                        <li v-for="(medicine, index) in petStore.medicines" :key="`medicamento-${index}`" class="mb-1 flex flex-wrap gap-1 items-center justify-between hover:bg-zinc-300">
                                            <p>{{ medicine.name }} - {{ formatDate(medicine.date) }}</p>
                                            <Button @click="deleteMedicine(medicine.id)"variant="delete" size="xs"><Icon icon="mi:delete-alt" /></Button>
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