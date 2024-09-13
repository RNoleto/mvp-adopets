<script setup>
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue'
</script>

<template>
    <PopoverRoot>
        <PopoverTrigger class="bg-blue-500 rounded-sm py-1 px-2 hover:bg-blue-900">More info</PopoverTrigger>
        <PopoverPortal >
            <PopoverContent>
                Some more info ...
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore sequi minima libero amet blanditiis tenetur temporibus omnis quas eveniet, veritatis nesciunt tempore, earum est, illum deserunt. Quia quos dolore animi.
            </PopoverContent>
        </PopoverPortal>
    </PopoverRoot>
</template>

