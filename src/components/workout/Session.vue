<template>
<div class="q-px-md full-width">
    <q-btn
      flat
      icon="arrow_back"
      color="dark"
      style="width: 40px"
      @click="$router.push({name: 'sessions'})"></q-btn>
    <h5>Results</h5>
    <h6 class="q-mb-sm">
      {{ result.title }}
      <q-popup-edit v-model="result.title">
        <q-input v-model="result.title" dense autofocus counter />
      </q-popup-edit>
    </h6>
    <div class="row">
      <date-input ref="date_input" ></date-input>
      <time-input  ref="time_input" class="q-ml-md"></time-input>
      <time-input ref="time_input_end" class="q-ml-md"></time-input>
    </div>
    <div v-if="result.description" class="q-mb-lg">
        <span v-html="result.description"></span>
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
    <q-list v-if="result.workout_exercise" bordered separator>
      <q-item
        v-for="(item, index) in result.workout_exercise"
        :key="index"
        v-ripple
        clickable>
        <q-item-section>
          <q-item-label class="q-mb-xs">
            <b>{{ item.exercise.title  }}</b></q-item-label
          >
          <q-item-label
            v-for="(i, index2) in item.exercise_result"
            :key="'result' + index2"
            caption
            >
            <li>
              {{ i.result_one }} <span v-if="i.result_two">x {{ i.result_two }}</span>
              <q-popup-edit v-model="i.result" class="row">
                <q-input v-model="i.result_one" dense autofocus class="q-pa-sm"/> <span v-if="i.result_two"> <q-input v-model="i.result_two" dense autofocus class="q-pa-sm" /></span>
              </q-popup-edit>
              {{ i.unit.title }}
            </li>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script setup>
import {ref, onMounted, reactive, computed} from 'vue'
import {useQuasar} from 'quasar'
import {useRouter, useRoute} from 'vue-router'
import {api} from 'src/services/axios.js'
import useNotify from 'src/composables/notify'
import DateInput from 'components/fields/DateInput'
import TimeInput from 'components/fields/TimeInput'

const $q = useQuasar()
const $router = useRouter()
const $route = useRoute()
const result = reactive({})
const id = $route.params.id
const date_input = ref(null)
const time_input = ref(null)
const time_input_end = ref(null)

onMounted(() => {
    getResults()
})

const getResults = async () => {
    try {
    const response = await api.get('workout/session/' + id)
    Object.assign(result, response.data)
    gotResponse()
    } catch (error) {
    console.log(error)
    }
}
const gotResponse = () => {
    date_input.value.setDate(result.date)
    time_input.value.setTime(result.started)
    time_input_end.value.setTime(result.ended)
}
const goToSession = (item) => {
    $router.push({ name: 'sessions', params: { id: item.id }})
}

</script><style lang="sass" scoped></style>
