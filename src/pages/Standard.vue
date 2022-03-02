<template>
  <q-page class="flex justify-center m-page-container">
    <router-view></router-view>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Standard',
})
</script>
<style lang="sass" scoped>
.m-page-container
  @media (min-width: $breakpoint-md-min)
    padding: 20px
</style>
