<script setup>
// Imagens
import logoAdopets from '../assets/Adopets.svg'
// Components UI
import Dialog from './ui/Dialog.vue';
import Form from './ui/Form.vue';
import TextInput from './ui/TextInput.vue';
import DatePickerInput from './ui/DatePickerInput.vue';
import Button from './ui/Button.vue';
import Combobox from './ui/Combobox.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
// Componentes
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'radix-vue';

const vacines = ['Raiva', 'Giardia']
const medicines = ['Antipulgas', 'Vermifugo']

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
                            <DialogTitle class="text-xl font-semibold">Snow</DialogTitle>
                            <DialogDescription class=" text-zinc-400 text-sm leading-relaxed flex flex-col h-full">
                                <p>Detalhes sobre Snow</p>
                                <hr>
                                <div class="py-2">
                                    <p><span class="mr-2 text-base text-white font-semibold">Idade:</span>7 Anos</p>
                                    <p><span class="mr-2 text-base text-white font-semibold">Sexo:</span> Macho</p>
                                    <p><span class="mr-2 text-base text-white font-semibold">Espécie:</span> Cachorro</p>
                                    <p><span class="mr-2 text-base text-white font-semibold">ID:</span> 21131321331</p>
                                </div>
                                <hr>
                                <!-- Criar UI ou não? -->
                                <div class="mt-2 flex gap-2">
                                    <Combobox 
                                        :options="vacines"
                                        :medicamentos="medicines"
                                        placeholder="Selecione a opção"
                                        label1="Vacinas"
                                        label2="Medicamentos"
                                    />
                                    <Button >
                                        <Icon icon="radix-icons:plus-circled" />
                                    </Button>
                                    <!-- Vacinas -->
                                    <!-- Medicamentos -->
                                    <!-- Outros  -->
                                </div>
                                <div class="mt-4 flex gap-2 py-2">
                                    <Button variant="primary" size="default" class="w-full">Salvar</Button>
                                    <DialogClose class="w-full">
                                        <Button variant="secondary" size="default" class="w-full">Cancelar</Button>
                                    </DialogClose>
                                </div>
                            </DialogDescription>
                            <DialogClose as="button" class="absolute top-2 right-2">X</DialogClose>
                        </DialogContent>
                    </DialogPortal>
                </DialogRoot>
                <hr>            
            </div>
        </div>
        <!-- Formulario para cadastar novo pet -->
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