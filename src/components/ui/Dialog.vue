<script setup>
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from 'radix-vue'

import Form from './Form.vue';
import Button from './Button.vue';

</script>

<template>
  <DialogRoot>
    <!-- Trigger do Dialog -->
    <DialogTrigger>
      <Button variant="primary" size="default" class="w-full">Cadastrar Pet</Button>
    </DialogTrigger>

    <!-- Portal e Overlay -->
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm" />

      <!-- Conteúdo do Dialog -->
      <DialogContent class="fixed z-60 right-0 top-0 bottom-0 w-[400px] h-screen border-l border-zinc-900 bg-zinc-950 p-8">
        <!-- Título e Descrição -->
        <DialogTitle class="text-lg font-semibold">Cadastro do meu Pet</DialogTitle>
        <DialogDescription class="text-zinc-400 text-sm leading-relaxed">
          Detalhes do meu pet
        </DialogDescription>
        <!-- Botão para fechar o Dialog -->
        <DialogClose as="button" class="absolute top-2 right-2">X</DialogClose>
        <!-- Formulario de Cadastro -->
         <hr>
        <Form />
    </DialogContent>
</DialogPortal>
</DialogRoot>
</template>
