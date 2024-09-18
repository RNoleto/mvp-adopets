<script setup>
import logoAdopets from '../assets/Adopets.svg'
</script>

<template>
    <div class="h-screen flex flex-col items-center justify-center">
        <img :src="logoAdopets" alt="logo-adopets" class="w-[80px] mb-5">
        <div class="flex flex-col gap-3">
            <div class="flex gap-1 font-bold w-[360px]">
                <p>Meus Pets</p>
            </div>
            <div class="flex flex-col gap-1 w-[360px]">
                <hr>
                <div class="flex justify-between items-baseline">
                    <p class="text-xl font-semibold">Snow</p>
                    <p class="text-sm">7 Anos</p>
                </div>
                <div class="flex justify-between gap-2">
                    <p class="text-sm font-semibold">Macho</p>
                    <p class="text-sm font-semibold">Cachorro</p>
                    <p class="text-sm font-thin">21131321331</p>
                </div>
                <hr>
                <div class="flex justify-between items-baseline">
                    <p class="text-xl font-semibold">Fred</p>
                    <p class="text-sm">6 Anos</p>
                </div>
                <div class="flex justify-between gap-2">
                    <p class="text-sm font-semibold">Macho</p>
                    <p class="text-sm font-semibold">Cachorro</p>
                    <p class="text-sm font-thin">2112331123311</p>
                </div>
                <hr>            
            </div>
        </div>
    </div>
</template>