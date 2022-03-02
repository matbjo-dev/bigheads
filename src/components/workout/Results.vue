<template>
  <div class="q-pa-md full-width">
    <q-btn
      flat
      icon="arrow_back"
      color="dark"
      style="width: 40px"
      @click="$router.push({name: 'workout'})"></q-btn>
    <h5>Results</h5>
    {{ result }}
    <h6 class="q-mb-sm">
      {{ result.title }}
      <q-popup-edit v-model="result.title">
        <q-input v-model="result.title" dense autofocus counter />
      </q-popup-edit>
    </h6>
    <div class="row">
      <date-input ref="date_input" class="q-ml-md"></date-input>
      <time-input ref="time_input" class="q-ml-md"></time-input>
      <time-input ref="time_input_end" class="q-ml-md"></time-input>
    </div>
    <div v-if="result.description" class="q-mb-lg">
      {{ result.description }}
      <q-popup-edit v-model="result.title">
        <q-editor
          v-model="result.description"
          flat
          min-height="5rem"
          placeholder="Notes..."
          dense
          autofocus
          counter
          :toolbar="[['bold', 'italic', 'strike', 'underline']]" />
      </q-popup-edit>
    </div>
    <q-list v-if="result.data" bordered separator>
      <q-item
        v-for="(item, index) in result.data"
        :key="index"
        v-ripple
        clickable>
        <q-item-section>
          <q-item-label class="q-mb-xs">
            <b>{{ item.title }}</b></q-item-label
          >
          <q-item-label
            v-for="(i, index2) in item.sets"
            :key="'result' + index2"
            caption
            ><span v-if="(i.order == 1) | (i.order == 2)">
              <li v-if="i.order == 1">
                {{ i.result }}
                <q-popup-edit v-model="i.result">
                  <q-input v-model="i.result" dense autofocus counter />
                </q-popup-edit>
                {{ i.unit.title }}
                x {{ item.sets[index2 + 1].result }}
              </li>
            </span>
            <li v-else>
              {{ i.result }}
              <q-popup-edit v-model="i.result">
                <q-input v-model="i.result" dense autofocus counter />
              </q-popup-edit>
              {{ i.unit.title }}
            </li>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn
      label="save"
      icon="save"
      color="primary"
      class="full-width q-my-lg"
      @click="postResults()"></q-btn>
  </div>
</template>

<script setup>
import {ref, onMounted, reactive} from 'vue'
import {useQuasar} from 'quasar'
import {useRouter, useRoute} from 'vue-router'
import {api} from 'src/services/axios.js'
import useNotify from 'src/composables/notify'
import DateInput from 'components/fields/DateInput'
import TimeInput from 'components/fields/TimeInput'
import { exerciseStore } from 'src/pinia/exercise'

// external
const $store = exerciseStore()
const $q = useQuasar()
const $router = useRouter()

// props
const props = defineProps({
  workoutId: {
    type: String,
    default: null
  }
})


const result = reactive({})
const date_input = ref(null)
const time_input = ref(null)
const time_input_end = ref(null)
onMounted(() => {
  getActiveWorkout()


})


const getActiveWorkout = () => {
  Object.assign(result, $store.getActiveWorkout(props.workoutId))
}
onMounted(() => {
  date_input.value.setDate(result.date)
  time_input.value.setTime(result.start_time)
  time_input_end.value.setTime(result.end_time)
})

const postResults = async () => {
  $q.localStorage.remove('result')
  $q.localStorage.set('workout', result)
  result.created
  try {
    await api.post('workout/post/results/', result).then((response) => {
      console.log(response)
      useNotify('success', 'Success', 'Workout saved')
    })
  } catch (error) {
    console.log(error)
    useNotify('error', 'Error', 'Workout not saved')
  }
}
</script>
<style lang="sass" scoped></style>
