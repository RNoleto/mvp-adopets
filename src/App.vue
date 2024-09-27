<script setup>
import { useUserStore } from './stores/userStore';
import { onMounted } from 'vue';

const userStore = useUserStore();

onMounted(() => {
    userStore.loadUserDataFromLocalStorage();
})

</script>

<template>        
          <router-view> </router-view>
</template>