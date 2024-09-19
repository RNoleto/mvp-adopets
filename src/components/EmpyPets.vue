<script setup>
import Dialog from './ui/Dialog.vue';
import letsStart from '../assets/lets-start-illustration.svg'
import logoAdopets from '../assets/Adopets.svg'
import Form from './ui/Form.vue';
</script>

<template>
    <div class="h-screen flex flex-col items-center justify-center gap-8">
        <img :src="logoAdopets" alt="logo-adopets" class="w-[80px]">
        <img :src="letsStart" alt="adopets">
        <p class="text-zinc-300 leading-relaxed max-w-80 text-center">Você ainda não cadastrou nenhum Pet</p>
        <Dialog
            title="Cadastrar meu Pet"
            description="Detalhes do meu pet"
            buttonText="Cadastrar Novo Pet"
        >
            <Form />
        </Dialog>
    </div>
</template>