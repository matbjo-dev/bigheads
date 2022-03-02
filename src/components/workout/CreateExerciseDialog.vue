<template>
  <menu-general>
    <q-card-section class="">
      <div class="text-h6">Create exercise {{ props.title }}</div>
    </q-card-section>

    <q-card-section class="q-gutter-y-lg">
      <q-input
        v-model="createExercise.title"
        outlined
        color="primary"
        label-color="white"
        class="text-white"
        label="Name">
      </q-input>
      <q-input
        v-model="createExercise.description"
        outlined
        class="text-white"
        label="Description">
      </q-input>
      <q-select
        v-model="createExercise.muscles"
        outlined
        :options="muscleOpt"
        class="text-white"
        label="Muscles">
      </q-select>
      <q-input
        v-model="createExercise.group"
        outlined
        class="text-white"
        label="Type">
      </q-input>
      <q-input
        v-model="createExercise.image"
        outlined
        class="text-white"
        label="Image">
      </q-input>
      <q-input
        v-model="createExercise.tags"
        outlined
        class="text-white"
        label="Tags">
      </q-input>

      <q-btn
        outlined
        label="create"
        flat
        class="q-my-lg"
        @click="postExercise"></q-btn>
    </q-card-section>
  </menu-general>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import MenuGeneral from './MenuGeneral'
import useNotify from 'src/composables/notify'
import {api} from 'src/services/axios.js'
const props = defineProps({
  title: String,
})
const emit = defineEmits(['getExercises'])

const getExercises = () => {
  emit('getExercises')
}

const createExercise = reactive({
  title: props.title,
  description: '',
  muscles: [],
  type: [],
  image: '',
  tags: '',
  group: null,
})
let muscleresp = reactive({})
const muscleOpt = reactive([])
onMounted(() => {
  getMuscles()
})

const getMuscles = () => {
  api.get('workout/muscles/').then((resp) => {
    if (muscleresp != resp.data) {
      muscleresp = resp.data
      appendToOptionsMuscle(resp.data)
    }
  })
}
const postExercise = () => {
  try {
    api.post('workout/exercise/', createExercise).then((resp) => {
      useNotify('success', 'Success', 'Created.')
      getExercises()
    })
  } catch (error) {
    useNotify('error', 'Could not create exercise', 'Try again.')
  }
}
const appendToOptionsMuscle = (inputVar) => {
  for (let x of inputVar) {
    muscleOpt.push({
      value: x.id,
      label: x.title,
    })
  }
}
const setTitle = (title) => {
  createExercise.title = title
}
defineExpose({
  setTitle,
  getMuscles,
})
</script>
<style lang="sass" scoped></style>
