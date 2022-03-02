<template>
    <div class="full-width m-main">


        <q-btn class="float-right" icon="menu" flat @click="showMenu"></q-btn>

        <heading-input v-model="wk.title" class="q-ml-sm q-mb-md" @input="updateTitle"></heading-input>
        {{ $store.activeWorkouts }}
        <div class="row">
            <date-input ref="date_input" class="q-ml-md" @update="updateStartDate"></date-input>
            <time-input ref="time_input" class="q-ml-md"></time-input>
        </div>
        <q-editor v-model="description" flat min-height="5rem" placeholder="Notes..." :toolbar="[['bold', 'italic', 'strike', 'underline']]" />
        <exercise-sets :active-workout="activeWorkout" :default-unit="defaultUnit"></exercise-sets>
        <select-exercise @select-exercise="selectExercises" @show-exercise="showExercise"></select-exercise>
    </div>

    <menu-dialog v-model="showMenux" @end-workout="endWorkout" @recover-workout="recoverWorkout()">
    </menu-dialog>
</template>

<script setup>
import { ref, toRefs, reactive, toRef, isRef, isReactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import SelectExercise from './SelectExercise'
import ExerciseSets from './ExerciseSets'
import MenuDialog from './Menu'
import HeadingInput from 'components/fields/HeadingInput'
import DateInput from 'components/fields/DateInput'
import TimeInput from 'components/fields/TimeInput'
import { exerciseStore } from 'src/pinia/exercise'

const $q = useQuasar()
const $router = useRouter()
const $store = exerciseStore()

const exerciseById = $store.exerciseById

const workoutTitle = ref('Workout')
const showExercises = ref('false')
const date_input = ref(null)
const time_input = ref(null)
const wk = reactive({
  title: "Workout",
  description: "",
  start_date: "",
  start_time: "",
  end_date: "",
  end_time: "",
})

const defaultUnit = ref('kg')
const showMenux = ref(false)
const activeWorkout = reactive({})
const workoutId = ref(0)
const description = ref('')

onMounted(()=>{
  createWorkout()
  getActiveWorkout()
})
const createWorkoutId = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}
const createWorkout = () => {
  if ($store.activeWorkouts[workoutId.value]) return
  $store.newWorkout(
    {
      title: 'Workout2',
      description: "",
      start_date: null,
      start_time: null,
      results: [],
      workout_id: createWorkoutId()

    }
  )
}
const getActiveWorkout = () => {
  const actWK = toRefs($store.activeWorkouts[workoutId.value])
  wk.title = actWK.title
  wk.description = actWK.description
}


const showExercise = () => {
    showExercises.value = true
}
const getExerciseById = async (id) => {
    await $store.getExercises()
    return exerciseById(id)

}
async function selectExercises(exerciseSelected) {
    const exerciseId = exerciseSelected.value
    let exercise = await getExerciseById(exerciseId)
    let workout_fields = {setRow: []}

    if (exercise.defaultfields){

      exercise.defaultfields.setRow.forEach((row)=>{
        workout_fields.setRow.push(row)
      })
    }
    else {
      workout_fields.setRow.push($store.getEmptySetRow({fieldAmount: 2, fieldType: 0}))
    }
    $store.activeWorkouts[workoutId.value].results.push(
      {
        exercise: exercise,
        workout_fields: workout_fields,
        wk_exercise_id: createWorkoutId(),
        showEdit: false,
      }
    )
}
const updateStartDate = (val) => {
  console.log(val)
}




const showMenu = () => {
    showMenux.value = true
}
const setDateTime = () => {
   activeWorkout.start_date = date_input.value.getDate()
   activeWorkout.start_time = time_input.value.getTime()
   activeWorkout.end_time = new Date().toISOString().slice(11, 16)
}
const endWorkout = () => {
    setDateTime()
    $router.push({ name: 'workoutResults',  params: {workoutId: activeWorkout.workout_id} })
}



const recoverWorkout = () => {
    let recover = $q.localStorage.getItem('workout')
    workoutTitle.value = recover.title
    description.value = recover.description
    date_input.value.setDate(recover.date)
    time_input.value.setTime(recover.start_time)
    // = recover.data
    showMenux.value = false
}
</script>

<style lang="sass" scoped>

[contenteditable]
    outline: 0px solid transparent

</style>
