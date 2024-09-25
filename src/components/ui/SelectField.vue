<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

//Propriedades recebidas
const props = defineProps({
    options:{
        type: Array,
        required: true,
        default: () => []
    },
    label:{
        type: String,
        default: ''
    },
    modelValue:{
        type: [String, Number],
        default: ''
    },
    placeholder:{
        type: String,
        default: 'Selecione uma opção'
    },
    id:{
        type: String,
        default: ''
    }
})
//Emissor de eventos
const emit = defineEmits(['update:modelValue']);

//Valor selecionado
const selectedValue = ref(props.modelValue);

//Verificar mudanças externas no valor e atualizar o select
watch(() => props.modelValue, (newValue) => {
    selectedValue.value = newValue;
});

//Função para emitir mudanças no valor selecionado
const handleChange = () => {
    emit('update:modelValue', selectedValue.value);
}

</script>

<template>
    <div class="select-field">
        <label v-if="label" :for="id" class="block text-base text-white font-semibold">
            {{ label }}
        </label>
        <select 
            :id="id"
            v-model="selectedValue"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outiline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            @change="handleChange"
            >
                <option disable value="">{{ placeholder }}</option>
                <option v-for="(option,index) in options" :key="index" :value="option.value">
                    {{ option.text }}
                </option>
        </select>
    </div>
</template>