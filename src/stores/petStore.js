import axios from "axios";
import { defineStore } from 'pinia';
import dayjs from "dayjs";

export const usePetStore = defineStore('pet', {
    state: () => ({
        pets: [], // Adiciona lista de pets
        pet: {
            id: null,
            name: null,
            gender: null,
            birth: null,
            specie: null,
            breed: null,
            chipNumber: null,
            status: null,
            refIdUser: null,
        },
        vaccines: [],
        medicines: [],
    }),
    actions: {
        // Função para buscar todos os pets
        async fetchAllPets(userId) {
            try {
                const response = await axios.get(`/users/${userId}/animals`, {
                    headers: { Authorization: `Bearer ${this.token}` }
                });
                this.pets = response.data;
            } catch (error) {
                console.error('Erro ao buscar a lista de pets:', error);
            }
        },

        // Função para buscar as informações de um pet específico
        async fetchPetData(petId) {
            try {
                const petResponse = await axios.get(`/animals/${petId}`, {
                    headers: { Authorization: `Bearer ${this.token}` }
                });
                this.pet = petResponse.data;

                // Buscar vacinas e medicamentos do pet
                const [vaccinesResponse, medicinesResponse] = await Promise.all([
                    axios.get(`/vaccines/pet/${petId}`, { headers: { Authorization: `Bearer ${this.token}` } }),
                    axios.get(`/medicines/pet/${petId}`, { headers: { Authorization: `Bearer ${this.token}` } })
                ]);

                this.vaccines = vaccinesResponse.data;
                this.medicines = medicinesResponse.data;
            } catch (error) {
                console.error('Erro ao buscar os dados do pet:', error);
            }
        },

        clearPetData() {
            this.pet = {
                id: null,
                name: null,
                gender: null,
                birth: null,
                specie: null,
                breed: null,
                chipNumber: null,
                status: null,
                refIdUser: null,
            };
            this.vaccines = [];
            this.medicines = [];
        },
    },
    getters: {
        formattedBirthDate: (state) => {
            return state.pet.birth ? dayjs(state.pet.birth).format('DD/MM/YYYY') : null;
        },
        hasChip: (state) => {
            return !!state.pet.chipNumber;
        },
    }
});
