<template>
  <menu-general>
    <q-card-section class="">
      <div class="text-h6">Muscles</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div v-if="props.muscles" class="q-gutter-y-md">
        <div
          v-for="(m, index) in props.muscles"
          :key="'muscle-' + index">
          {{ m.title }}
          {{ m.description }}
        </div>
      </div>
    </q-card-section>
  </menu-general>
</template>

<script setup>
import {ref} from 'vue'
import MenuGeneral from './MenuGeneral'

const props = defineProps({
  muscles: {
    type: Array,
    default: () => []
  }
})
</script>
<style lang="sass" scoped></style>
