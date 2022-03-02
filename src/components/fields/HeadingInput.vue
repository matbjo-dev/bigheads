<template>
  <q-input
    borderless
    maxlength="100"
    hide-bottom-space
    :class="props.classes"
    :style="props.style">
    
    </q-input>
</template>

<script setup>
import {ref} from 'vue'
const props = defineProps({
  style: {
    type: String,
    default: "font-size: 32px"
  },
  classes: {
    type: String,
    default: '',
  }
})
</script>
<style lang="sass"></style>
