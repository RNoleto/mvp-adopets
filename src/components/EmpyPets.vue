<script setup>
import Dialog from './ui/Dialog.vue';
import { DialogTrigger } from 'radix-vue';
import letsStart from '../assets/lets-start-illustration.svg'
import logoAdopets from '../assets/Adopets.svg'
</script>

<template>
    <div class="h-screen flex flex-col items-center justify-center gap-8">
        <img :src="logoAdopets" alt="logo-adopets" class="w-[80px]">
        <img :src="letsStart" alt="adopets">
        <p class="text-zinc-300 leading-relaxed max-w-80 text-center">Você ainda não cadastrou nenhum Pet</p>
        <Dialog>
            <DialogTrigger>
            </DialogTrigger>
        </Dialog>
    </div>
</template>