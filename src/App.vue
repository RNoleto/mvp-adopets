<script setup>
import { useUserStore } from './stores/userStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from './components/ui/Button.vue';

const router = useRouter();
const userStore = useUserStore();

const handleLogout = () => {
    userStore.clearUserData();
    router.push('/');
}

onMounted(() => {
    userStore.loadUserDataFromLocalStorage();
})

</script>

<template>
<div v-if="userStore.userId">
    <Button @click="handleLogout">Logout</Button>
</div>        
          <router-view> </router-view>
</template>