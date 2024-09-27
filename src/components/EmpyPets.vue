<script setup>
import Dialog from './ui/Dialog.vue';
import letsStart from '../../public/src/assets/lets-start-illustration.svg';
import logoAdopets from '../../public/src/assets/Adopets.svg';
import Form from './ui/Form.vue';
</script>

<template>
    <div class="h-screen flex flex-col items-center justify-center gap-8">
        <div class="w-[360px] flex flex-col items-center gap-8 justify-center">
            <h2 class="text-2xl font-semibold">Adopets!</h2>
            <img :src="letsStart" alt="adopets">
            <p class="text-zinc-800 leading-relaxed max-w-80 text-center">Você ainda não cadastrou nenhum Pet</p>
            <Dialog
                title="Cadastrar meu Pet"
                description="Detalhes do meu pet"
                buttonText="Cadastrar Novo Pet"
            >
                <Form />
            </Dialog>
        </div>
    </div>
</template>