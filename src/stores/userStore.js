import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null,
        userId: null,
        userName: null,
        userEmail: null,
    }),
    actions: {
        setUserData(userData) {
            this.token = userData.access_token;
            this.userId = userData.user_id;
            this.userName = userData.user_name;
            this.userEmail = userData.user_email;
            
            // Armazena no localStorage para persistência após recarregar a página
            localStorage.setItem('access_token', userData.access_token);
            localStorage.setItem('user_id', userData.user_id);
            localStorage.setItem('user_name', userData.user_name);
            localStorage.setItem('user_email', userData.user_email);
        },
        clearUserData() {
            this.token = null;
            this.userId = null;
            this.userName = null;
            this.userEmail = null;

            // Remove os dados do localStorage ao deslogar
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_email');
        },
        loadUserDataFromLocalStorage() {
            this.token = localStorage.getItem('access_token');
            this.userId = localStorage.getItem('user_id');
            this.userName = localStorage.getItem('user_name');
            this.userEmail = localStorage.getItem('user_email');
        }
    },
    getters: {
        isLoggedIn: (state) => !!state.token, // Verifica se o usuário está logado
    }
});
