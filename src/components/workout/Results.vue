<template>
  <div class="q-pa-md full-width">
    <q-btn
      flat
      icon="arrow_back"
      color="dark"
      style="width: 40px"
      @click="$router.push({name: 'workout'})"></q-btn>
    <h5>Results</h5>
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
    <q-list v-if="result.results" bordered separator>
      <q-item
        v-for="(item, index) in result.results"
        :key="index"
        v-ripple
        clickable>
        <q-item-section>
          <q-item-label class="q-mb-xs">
            <b>{{ item.exercise.title }}</b></q-item-label
          >
          <q-item-label
            v-for="(i, index2) in item.workout_fields.setRow"
            :key="'result' + index2"
            caption
            >
            <div>
              <span v-for="(set, index3) in i.fields" :key="'fieldid-'+index3">
                {{ set.score }} {{ set.unit?.title }}
                <q-popup-edit v-model="set.score">
                  <q-input v-model="set.score" dense autofocus counter />
                </q-popup-edit>
                <span v-if="index3 != i.fields.length - 1">x </span>
              </span>
            </div>
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
import {ref, onMounted, reactive, isRef, isReactive} from 'vue'
import { toRefs } from '@vueuse/core'
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
const $route = useRoute()

// props
const props = defineProps({
  workoutId: {
    type: String,
    default: null
  }
})


const date_input = ref(null)
const time_input = ref(null)
const time_input_end = ref(null)



const result  = $store.getActiveWorkoutRefs($route.params.workoutId)



onMounted(() => {
  date_input.value.setDate(result.date)
  time_input.value.setTime(result.start_time)
  time_input_end.value.setTime(result.end_time)
})

const postResults = async () => {
  $store.saveWorkout($route.params.workoutId)
}
</script>
<style lang="sass" scoped></style>
