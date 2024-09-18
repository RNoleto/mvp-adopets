<script setup>
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'radix-vue'
import {} from 'vue'
</script>

<template>
    <RadioGroupRoot
        class="flex gap-5"
        default-value="default"
        aria-label="View density"
    >
    <div class="flex items-center">
        <RadioGroupItem 
            id="r1" 
            class="bg-white w-[25px] h-[25px] rounded-full hover:bg-blue-200" 
            value="default"
            >
                <RadioGroupIndicator 
                    class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-blue-500" />
        </RadioGroupItem>
        <label for="r1" class="text-white text-[15px] leading-none pl-[15px]">Macho</label>
    </div>
    <div class="flex items-center">
        <RadioGroupItem 
            id="r2" 
            class="bg-white w-[25px] h-[25px] rounded-full hover:bg-blue-200"
            >
                <RadioGroupIndicator class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-blue-500" />
            </RadioGroupItem>
            <label for="r2" class="text-white text-[15px] leading-none pl-[15px]">Fêmea</label>
    </div>    
    </RadioGroupRoot>
</template>