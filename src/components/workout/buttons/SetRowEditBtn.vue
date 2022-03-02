<template>
 <q-btn-dropdown
          size="12px"
          flat
          dropdown-icon="more_vert"
          class="exerciseBtn"
          text-color="dark">
          <q-list>
            <q-item v-close-popup clickable  @click="description()">
              <q-item-section avatar>
                <q-avatar icon="edit" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>Description</q-item-section>
            </q-item>
            <q-item v-close-popup clickable @click="showMuscle()">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  <q-icon name="img:muscleicons.svg"></q-icon>
                </q-avatar>
              </q-item-section>
              <q-item-section>Muscles</q-item-section>
            </q-item>
            <q-item v-close-popup clickable @click="edit">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  <q-icon name="settings"></q-icon>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <span>Edit sets</span>
              </q-item-section>
            </q-item>

            <q-item v-close-popup clickable @click="deleteExercise()">
              <q-item-section avatar>
                <q-avatar icon="delete" color="accent" text-color="white" />
              </q-item-section>
              <q-item-section>Delete</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
</template>

<script setup>
import { exerciseStore } from 'src/pinia/exercise'
const $store = exerciseStore()
const props = defineProps({
  workoutId: {
    type: String,
    default: null
  },
  wkExerciseId: {
    type: String,
    default: null
  }
})

const emits = defineEmits('showMuscle', 'showDescription')

const showMuscle = () => {
  emits('showMuscle', {workoutId: props.workoutId, wkExerciseId: props.wkExerciseId })
}
const deleteExercise = () => {
  $store.deleteWKExercise(props.workoutId, props.wkExerciseId)
}
const description = () => {
  emits('showDescription', {workoutId: props.workoutId, wkExerciseId: props.wkExerciseId })
}
const edit = () => {
  $store.toggleEditSets(props.workoutId, props.wkExerciseId)
}
</script>
<style lang="sass" scoped>

</style>
