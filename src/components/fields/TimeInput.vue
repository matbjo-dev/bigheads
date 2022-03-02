<template>
  <q-input v-model="time" borderless class="time" mask="time" :rules="['time']">
    <template #append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-model="time" format24h>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import {ref} from 'vue'
const time = ref(new Date().toISOString().slice(11, 16))

const getTime = () => {
  return time.value
}
const setTime = (newTime) => {
  return (time.value = newTime)
}
defineExpose({
  getTime,
  setTime,
})
</script>
<style lang="sass" scoped>
.time
    width: 100px
</style>
