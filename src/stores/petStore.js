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

        //Função para deletar um pet
        async deletePet(petId) {
            try {
                const response = await axios.delete(`/animals/${petId}`, {
                    headers: { Authorization: `Bearer ${this.token}` }
                });
                console.log('Pet deletado com sucesso:', response.data);
        
                // Atualize a lista de pets após a exclusão
                await this.fetchAllPets(this.userId);
                location.reload();
            } catch (error) {
                console.error('Erro ao deletar o Pet:', error);
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
                const vaccinesRequest = axios.get(`/vaccines/pet/${petId}`, { headers: { Authorization: `Bearer ${this.token}`}})
                    .catch(error => {
                        if(error.response && error.response.status === 404){
                            // Retorna um array vazio se não encontrar vacinas
                            return { data: [] };
                        }
                        throw error; // Lança o erro se não for 404
                    });

                const medicinesRequest = axios.get(`/medicines/pet/${petId}`, { headers: { Authorization: `Bearer ${this.token}`}})
                    .catch(error => {
                         if(error.response && error.response.status === 404){
                            return { data: [] };
                         }
                         throw error;
                    });

                // Aguarda ambas as requisições
                const [ vaccinesResponse, medicinesResponse ] = await Promise.all([vaccinesRequest, medicinesRequest]);

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
