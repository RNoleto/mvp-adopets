<script setup>
import { Label } from 'radix-vue'
</script>

<template>
    <div class="mt-2 flex flex-wrap items-center">
    <Label
      class="text-sm font-semibold leading-[35px] text-white"
      for="firstName"
    > Nome do Pet:</Label>
    <input
      id="firstName"
      class="w-full bg-blackA5 shadow-blackA9 inline-flex appearance-none items-center justify-center rounded-sm px-1 py-2 text-sm leading-none text-zinc-500 outline-none"
      type="text"
      value="Nome do Pet"
    >
  </div>
</template>