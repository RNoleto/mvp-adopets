<script setup>
import { RadioGroupRoot, RadioGroupItem, RadioGroupIndicator } from 'radix-vue'
import { defineProps } from 'vue'

// Definindo props para receber valores dinâmicos
const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  modelValue: {
    type: String,
    default: ''
  },
  defaultValue: {
    type: String,
    default: ''
  },
  groupLabel: {
    type: String,
    required: false,
    default: 'grupo'
  }
})
</script>

<template>
    <div>
        <label v-if="groupLabel" class="text-sm font-semibold text-white">{{ groupLabel }}</label>
    </div>
  <RadioGroupRoot class="flex flex-wrap w-full gap-5" :default-value="defaultValue" aria-label="View density" >
    <!-- Usando v-for para iterar sobre as opções -->
    <div v-for="option in options" :key="option.value" class="flex items-center">
      <RadioGroupItem 
        :id="option.value" 
        class="bg-white w-[25px] h-[25px] rounded-full hover:bg-blue-200"
        :value="option.value"
      >
        <RadioGroupIndicator 
          class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-blue-500" />
      </RadioGroupItem>
      <!-- Usando slots para o rótulo -->
      <label :for="option.value" class="text-white text-[15px] leading-none pl-[15px]">
        <slot name="label" :label="option.label">{{ option.label }}</slot>
      </label>
    </div>
  </RadioGroupRoot>
</template>
