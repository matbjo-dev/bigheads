<template>
  <q-select
    ref="selectEx"
    v-model="exerciseSelect"
    outline
    :options="options"
    use-input
    input-debounce="0"
    label="Add exercise"
    :rules="[]"
    style="width: 100%"
    class="q-px-md"
    @filter="filterFn"
    @update:model-value="addExercise()"
    @new-value="createExercise">
    <template #append>
      <q-btn flat icon="add" @click.stop="addExercise()"></q-btn>
    </template>
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">No results</q-item-section>
      </q-item>
    </template>
  </q-select>
  <create-exercise
    ref="createExerciseComp"
    v-model="showCreateExercise"
    :title="createTitle"
    @getExercises="getExercises()"
    ></create-exercise>
</template>

<script>
import {defineComponent, ref, readonly, onMounted, defineEmits} from 'vue'
import {api} from 'src/services/axios.js'
import CreateExercise from './CreateExerciseDialog'
export default defineComponent({
  name: 'SelectExercise',
  components: {
    CreateExercise,
  },
  emits: ['showExercises', 'selectExercise'],
  setup(props, {emit}) {
    const exerciseSelect = ref('')
    const options = ref([])
    const optionsComplete = ref([])
    const exerciseResponse = ref({})
    const showCreateExercise = ref(false)
    const createTitle = ref('Exercise')
    const createExerciseComp = ref(null)
    onMounted(async () => {
      getExercises()
    })
    async function getExercises() {
      try {
        const response = await api.get('workout/exercise/')
        appendToOptions(response.data)
        exerciseResponse.value = response.data
      } catch (error) {
        console.log(error)
      }
    }

    function appendToOptions(response) {
      for (let exercise of response) {
        options.value.push({
          value: exercise.id,
          label: exercise.title,
        })
        optionsComplete.value.push({
          value: exercise.id,
          label: exercise.title,
        })
      }
    }

    function filterFn(val, update, abort) {
      val = val.toLowerCase()
      if (val === '') {
        update(() => {
          return (options.value = optionsComplete.value)
        })
      }
      setTimeout(() => {
        update(
          () => {
            options.value = optionsComplete.value.filter((v) => {
              return v.label.toLowerCase().includes(val)
            })
          },
          (ref) => {
            if (val !== '' && ref.options.length > 0) {
              ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
              ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
            }
          },
        )
      }, 300)
    }
    function addExercise() {
      if (!exerciseSelect.value) return
      emit('selectExercise', exerciseSelect.value )
      showExercises()
    }
    function showExercises() {
      emit('showExercises')
    }
    function createExercise(val, done) {
      createTitle.value = val
      createExerciseComp.value.setTitle(val)
      showCreateExercise.value = true
    }

    return {
      options,
      showExercises,
      filterFn,
      addExercise,
      exerciseSelect,
      createExercise,
      showCreateExercise,
      createTitle,
      createExerciseComp
    }
  },
})
</script>
<style lang="sass" scoped></style>
