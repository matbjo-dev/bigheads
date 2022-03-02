<template>
<q-table
      title="Exercises"
      :rows="rows"
      :columns="columns"
      class="m-table"
      row-key="id"
      :visible-columns="visibleColumns"
      :filter="filter"
      :pagination="initialPagination"

    @row-click="goToExercise"
>
<template #top-right>
    <q-input v-model="filter" borderless dense debounce="300" placeholder="Search">
        <template #append>
        <q-icon name="search" />
        </template>
    </q-input>
    </template>
</q-table>
</template>

<script setup>
import { ref, reactive, onMounted, toRaw } from 'vue'
import {api} from 'src/services/axios.js'
import { exerciseStore } from 'src/pinia/exercise.js'
import {useRouter, useRoute} from 'vue-router'
const $store = exerciseStore()
const $router = useRouter()

const filter = ref('')
const visibleColumns = ref([])
const exercises = reactive([])

const columns = reactive(
[ { name: 'id', label: 'id', align: 'center', field: 'id'},
  { name: 'title', label: 'name', align: 'left', field: 'title', sortable: true, required: true},
  { name: 'muscles', label: 'muscles', align: 'left', field: 'muscles', sortable: true, required: true},
]
)
const rows = reactive(
    [
]
)
 const initialPagination = reactive({
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 15

})
onMounted(()=>getExercises())
async function getExercises() {
      try {
        await $store.getExercises()
        exercises.length = 0
        exercises.push(...$store.exercises)
        addToExercises()

      } catch (error) {
        console.log(error)
      }
}
const addToExercises = () =>{
    exercises.forEach((i)=>{
        rows.push({
             id: i.id,
            title: i.title ? i.title : 'Exercise',
            muscles: i.muscles[0]?.title ? i.muscles[0].title : ''
        })
    })

}
const goToExercise = (event,row, index) => {
    $router.push({ name: 'exercise_view', params: { id: row.id }})
}
</script>
<style lang="sass" scoped>
.m-table
    width: 60%
@media (max-width: $breakpoint-md-max)
    .m-table
        width: 100%


</style>
