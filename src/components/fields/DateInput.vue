<template>
{{ myval }}
  <q-input v-model="date" borderless   class="date" mask="##/##/####" @update:model-value="updateDate">
    <q-tooltip>Date of workout</q-tooltip>
    <template #prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          cover
          transition-show="scale"
          transition-hide="scale">
          <q-date v-model="date" today-btn mask="DD/MM/YYYY" @update:model-value="updateDate">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import {ref} from 'vue'
import dayjs from 'dayjs'
const date = ref(dayjs().format('DD/MM/YYYY'))

const getDate = () => {
  return date.value
}
const setDate = (newDate) => {
   newDate = dayjs(newDate, "DD/MM/YYYY")
  return (date.value = newDate.format('DD/MM/YYYY'))
}
const setDateFormat = (newDate) => {
  newDate = dayjs(newDate, "YYYY-MM-DD")
  return (date.value = newDate.format('DD/MM/YYYY'))
}
defineExpose({
  getDate,
  setDate,
  setDateFormat,
})
const $emit = defineEmits(['updateDate'])
const updateDate = (val) => {
  $emit('updateDate', val)
}
</script>
<style lang="sass" scoped>
.date
    width: 135px
</style>
