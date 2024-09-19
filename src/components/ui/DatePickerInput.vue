<script setup>
import { Icon } from '@iconify/vue'
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerInput,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
  Label,
} from 'radix-vue'

const props = defineProps({
  label: String,
  id: String,
  modelValue: String,
})
</script>

<template>
  <div class="flex flex-col">
    <Label
      class="text-sm font-semibold text-white"
      for="date-field"
    >{{ label }}</Label>
    <DatePickerRoot
      id="date-field"
    >
      <DatePickerField
        v-slot="{ segments }"
        class="flex select-none bg-white items-center justify-between rounded-lg text-center text-zinc-500 border border-transparent p-1 w-40 data-[invalid]:border-red-500"
      >
        <div class="flex items-center">
          <template
            v-for="item in segments"
            :key="item.part"
          >
            <DatePickerInput
              v-if="item.part === 'literal'"
              :part="item.part"
            >
              {{ item.value }}
            </DatePickerInput>
            <DatePickerInput
              v-else
              :part="item.part"
              class="rounded-md p-0.5 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-blue-500 data-[placeholder]:text-green9 "
            >
              {{ item.value }}
            </DatePickerInput>
          </template>
        </div>
        <!-- Icone de calendario -->
        <DatePickerTrigger class="focus:shadow-[0_0_0_2px] rounded-md text-xl p-1 focus:shadow-black">
          <Icon icon="radix-icons:calendar" />
        </DatePickerTrigger>
      </DatePickerField>
      <!-- Inicio do Mini Calendario -->
       <DatePickerContent 
        :side-offset="4"
        class="rounded-xl bg-white z-60"
       >
       <DatePickerArrow class="fill-white" />
       <DatePickerCalendar v-slot="{ weekDays, grid}" class="p-4">
          <DatePickerHeader class="flex flex-col items-center justify-between">
            <div class="flex items-center justify-between">
              <DatePickerPrev class="inline-flex items-center cursor-pointer text-black justify-center rounded-[9px] bg-transparent w-8 h-8 hover:bg-black hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black">
                <Icon
                  icon="radix-icons:chevron-left"
                  class="w-6 h-6"
                />
              </DatePickerPrev>
  
              <DatePickerHeading class="text-black font-medium" />
              <DatePickerNext
                class="inline-flex items-center cursor-pointer text-black justify-center rounded-[9px] bg-transparent w-8 h-8 hover:bg-black hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
              >
                <Icon
                  icon="radix-icons:chevron-right"
                  class="w-6 h-6"
                />
              </DatePickerNext>
            </div>
            <div
            class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <DatePickerGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="w-full border-collapse select-none space-y-1"
            >
              <DatePickerGridHead>
                <DatePickerGridRow class="mb-1 flex w-full justify-between">
                  <DatePickerHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="w-8 rounded-md text-xs text-green8"
                  >
                    {{ day }}
                  </DatePickerHeadCell>
                </DatePickerGridRow>
              </DatePickerGridHead>
              <DatePickerGridBody>
                <DatePickerGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="flex w-full"
                >
                  <DatePickerCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <DatePickerCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="relative flex items-center justify-center whitespace-nowrap rounded-[9px] border border-transparent bg-transparent text-sm font-normal text-black w-8 h-8 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black hover:border-blue-500 data-[selected]:bg-blue-500 data-[selected]:font-medium data-[disabled]:text-black/30 data-[selected]:text-white data-[unavailable]:pointer-events-none data-[unavailable]:text-black/30 data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[today]:before:bg-green9 data-[selected]:before:bg-white"
                    />
                  </DatePickerCell>
                </DatePickerGridRow>
              </DatePickerGridBody>
            </DatePickerGrid>
          </div>
          </DatePickerHeader>
       </DatePickerCalendar>
       </DatePickerContent>

    </DatePickerRoot>
  </div>
</template>