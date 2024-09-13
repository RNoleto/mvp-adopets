<script setup>
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue'
</script>

<template>
    <PopoverRoot>
        <PopoverTrigger class="inline-flex items-center justify-center rounded px-4 text-base leading-none font-medium h-9 bg-white text-violet-500">More info</PopoverTrigger>
        <PopoverPortal >
            <PopoverContent>
                Some more info ...
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore sequi minima libero amet blanditiis tenetur temporibus omnis quas eveniet, veritatis nesciunt tempore, earum est, illum deserunt. Quia quos dolore animi.
            </PopoverContent>
        </PopoverPortal>
    </PopoverRoot>
</template>


<!-- inline-flex items-center justify-center rounded px-4 text-base leading-none font-medium h-9 bg-white text-violet-11 shadow-[0_2px_10px_var(--black-a7)] -->
