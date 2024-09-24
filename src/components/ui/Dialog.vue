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
} from 'radix-vue';
import Button from './Button.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  buttonText:{
    type: String,
    default: 'Abrir Diálogo',
  }
});
</script>

<template>
  <DialogRoot>
    <!-- Trigger do Dialog -->
    <DialogTrigger class="w-full">
      <Button variant="primary" size="default" class="w-full">{{ buttonText }}</Button>
    </DialogTrigger>

    <!-- Portal e Overlay -->
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm" />

      <!-- Conteúdo do Dialog -->
      <DialogContent class="fixed z-60 right-0 top-0 bottom-0 w-[400px] h-screen border-l border-zinc-900 bg-zinc-950 p-8">
        <!-- Título e Descrição -->
        <DialogTitle class="text-lg font-semibold">{{ title }}</DialogTitle>
        <DialogDescription class="text-zinc-400 text-sm leading-relaxed">
          {{ description }}
        </DialogDescription>
        
        <!-- Botão para fechar o Dialog -->
        <DialogClose as="button" class="absolute top-2 right-2">X</DialogClose>
        <!-- Slot para conteúdo personalizado -->
        <hr>
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
