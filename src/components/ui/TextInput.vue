<script setup>
const props = defineProps({
  label: String,
  id: String,
  modelValue: String,
  type: {
    type: String,
    default: 'text', // Definindo o padrão como 'text'
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <fieldset>
    <label class="text-base font-semibold text-white" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      class="w-full bg-blackA5 shadow-blackA9 inline-flex appearance-none items-center justify-center rounded-lg px-1 py-2 text-sm leading-none text-zinc-500 outline-none"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </fieldset>
</template>
