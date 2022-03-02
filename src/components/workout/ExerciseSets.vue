<template>

  <div v-if="props.activeWorkout">

    <q-item
      v-for="(row, index) in props.activeWorkout.results"
      :key="'exercise-' + index">
      <q-item-section>
        <menu-btn :workout-id="props.activeWorkout.workout_id" :wk-exercise-id="row.wk_exercise_id" @show-description="showExerciseDescription" @show-muscle="showMuscle"></menu-btn>
        <q-item-label class="q-mb-md">{{ row.exercise?.title ?? "Exercise" }}</q-item-label>
        <div  class="q-gutter-y-md q-mb-md">
           <exercise-edit-fields :default-unit="defaultUnit" :edit="row.showEdit" :set-obj="row.workout_fields" :workout-id="props.activeWorkout.workout_id" :wk-exercise-id="row.wk_exercise_id" @add-set="addSet" @make-warmup="makeWarmup" @delete-set="deleteSet" @unit-selected="unitSelected"></exercise-edit-fields>
        </div>
        </q-item-section>
        </q-item>
        </div>
  <muscle-info v-model="showMuscleInfo" :muscles="muscleFocus"></muscle-info>
  <dialog-box v-model="dialog.show" :title="dialog.title" :description="dialog.description"></dialog-box>
</template>

<script setup>
/* eslint-disable */
import { ref, toRef, reactive, defineEmits } from 'vue'
import MuscleInfo from './MuscleInfo'
import MenuBtn from './buttons/SetRowEditBtn'
import ExerciseEditFields from './ExerciseSetRows'
import { exerciseStore } from 'src/pinia/exercise'
import DialogBox from './Dialog'

// setup
const $store = exerciseStore()
const emit = defineEmits(['addSet', 'addSetDouble', 'makeWarmup', 'deleteExercise'])
const props = defineProps({
    activeWorkout: Object,
    defaultUnit: String,
    exerciseResponse: Object,
})

// Variables
const showMuscleInfo = ref(false)
const editSets = reactive({})
const muscleFocus = reactive([])
const dialog = reactive({ show: false, title: "", description: ""})


// functions

const showMuscle = (payload) => {
    muscleFocus.length = 0
    muscleFocus.push(...$store.getExerciseMuscleInfo(payload.workoutId, payload.wkExerciseId))
    showMuscleInfo.value = true
}

const createDialog = (title, description) => {
  console.log(title, description)
  dialog.title = title
  dialog.description = description
  dialog.show = true
}

const showExerciseDescription = (payload) => {
  console.log(payload)
  let exercise = $store.getActiveWorkoutExercise(payload.workoutId, payload.wkExerciseId).exercise
  createDialog( exercise.title, exercise.description)
}

</script>

<style lang="sass" scoped>
.exerciseBtn
    position: absolute
    top: 0
    right: 0
.ghost
    opacity: 0.2
    background: gray
    border-radius: 4px
    color: black

.inputdeletebtn
    margin-right: -12px
    &hover
        background-color: $negative
        color: white !important

[contenteditable]
    outline: 0px solid transparent



</style>
