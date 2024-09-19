<script setup>
import logoAdopets from '../assets/Adopets.svg'
import Dialog from './ui/Dialog.vue';
import Button from './ui/Button.vue';
import Form from './ui/Form.vue';
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'radix-vue';
</script>

<template>
    <div class="h-screen flex flex-col items-center justify-center">
        <img :src="logoAdopets" alt="logo-adopets" class="w-[80px] mb-5">
        <div class="flex flex-col gap-3 mb-5">
            <div class="flex gap-1 font-bold w-[360px]">
                <p>Meus Pets</p>
            </div>
            <div class="flex flex-col gap-1 w-[360px]">
                <hr>
                <DialogRoot>
                    <DialogTrigger>
                        <div class="flex justify-between items-baseline">
                            <p class="text-xl font-semibold">Snow</p>
                            <p class="text-sm">7 Anos</p>
                        </div>
                        <div class="flex justify-between gap-2">
                            <p class="text-sm font-semibold">Macho</p>
                            <p class="text-sm font-semibold">Cachorro</p>
                            <p class="text-sm font-thin">21131321331</p>
                        </div>
                    </DialogTrigger>
                    <DialogPortal>
                        <DialogOverlay class="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm" />

                        <!-- Conteúdo do Dialog com detalhes do pet -->
                        <DialogContent class="fixed z-60 right-0 top-0 bottom-0 w-[400px] h-screen border-l border-zinc-900 bg-zinc-950 p-8">
                            <DialogTitle class="text-lg font-semibold">Detalhes do Pet</DialogTitle>
                            <DialogDescription class=" text-zinc-400 text-sm leading-relaxed">
                                Informações sobre o pet:
                                <hr class="mt-2 mb-2">
                                <div>
                                    <ul class="flex flex-col gap-1">
                                        <li><span class="text-base text-white font-semibold">Nome:</span> Snow</li>
                                        <li><span class="text-base text-white font-semibold">Idade:</span> 7 Anos</li>
                                        <li><span class="text-base text-white font-semibold">Sexo:</span> Macho</li>
                                        <li><span class="text-base text-white font-semibold">Espécie:</span> Cachorro</li>
                                        <li><span class="text-base text-white font-semibold">ID:</span> 21131321331</li>
                                    </ul>
                                </div>
                            </DialogDescription>
                            <DialogClose as="button" class="absolute top-2 right-2">X</DialogClose>
                        </DialogContent>
                    </DialogPortal>
                </DialogRoot>
                <hr>            
            </div>
        </div>
        <div class="w-[360px]">
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