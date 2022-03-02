<template>
    <q-card class="mx-auto" flat bordered>
        <q-card-section class="q-px-xs">
            <q-editor v-model="exercise.description" flat min-height="5rem" class="m-paragraph" placeholder="Notes..." :toolbar="[['bold', 'italic', 'strike', 'underline']]" @blur.prevent="changeDescription"/>
        </q-card-section>
        <q-card-section>
            <div class="m-header-paragraph"> Muscles </div>
            <m-select v-if="muscleList && muscleList.length" ref="MSelectRef" v-model="state.muscleSelect" :list="muscleList"  @select-item="muscleSelectItem"></m-select>
            <div class="m-header-paragraph q-pt-md"> Type </div>
            <m-select v-if="groupsList && groupsList.length" ref="MSelectRef" v-model="state.groupSelect" :list="groupsList"  @select-item="groupSelectItem"></m-select>
        </q-card-section>
        <q-card-section>
            <div class="row">
            <div class="m-header-paragraph col"> Default fields </div>
            <default-set-btn class="edit-sets col-auto" @edit="editSets"></default-set-btn>
            </div>
            <exercise-edit-fields v-if="setObj.setRow" ref="editFieldsRef" :default-unit="defaultUnit" :edit="editSetsVal" :set-obj="setObj" @add-set="addSet" @make-warmup="makeWarmup" @delete-set="deleteSet" @unit-selected="unitSelected"></exercise-edit-fields>

        </q-card-section>

    </q-card>

</template>

<script setup>
import { ref, reactive, onMounted, teleport } from 'vue'
import { exerciseStore } from 'src/pinia/exercise.js'
import { useRoute } from 'vue-router'
import MSelect from 'components/fields/MSelect'
import ExerciseEditFields from './ExerciseEditFields'
import DefaultSetBtn from './buttons/DefaultSetEdit'

const $store = exerciseStore()
const get_exercise_edit = $store.get_exercise_edit
const getDefaultSets = $store.getDefaultSets


const $route = useRoute()
const defaultUnitVal = ref(false)
const MSelectRef = ref(null)
const exercise = reactive({})
const muscleList = reactive([])
const setObj = reactive({})
const editSetsVal = ref(false)
const editFieldsRef = ref(null)
const state = reactive({
    muscleSelect: [],
    groupSelect: [],
})

// get current exercise
onMounted(async () => await getExerciseById($route.params.id))
const getExerciseById = async (id) => {
    $store.getExercises(id)
    $store.makeExerciseEdit(id)
    const exercise_resp = get_exercise_edit(id)
    Object.assign(exercise, exercise_resp)
    createDefaultFields()

}

// get musclelist
const muscles = reactive({})
onMounted(async () => await getMuscles())
const getMuscles = async () => {
    await $store.getMuscles()
    const muscle_resp = $store.muscles
    Object.assign(muscles, muscle_resp)
    makeOptions(muscles, muscleList)
    setMuscleSelect()
}
// set selected muscle
const setMuscleSelect = () => {
   exercise.muscles.forEach((muscle)=>{
        const selectedMuscles = muscleList.filter(muscleItem =>{ return muscleItem.id === muscle.id})
        selectedMuscles.forEach((val) => { state.muscleSelect.push({
            label: val.title,
            value: val.id
        })
        })
   })
}
// select new muscle item from selection field
const muscleSelectItem = (item) => {
    state.muscleSelect = item
}
// get exercise category groups
const groups = reactive({})
const groupsList = reactive([])
onMounted(async () => await getExerciseGroups())
const getExerciseGroups = async () => {
    await $store.getExerciseGroups()
    const resp = $store.exercise_groups
    Object.assign(groups, resp)
    makeOptions(groups, groupsList)
    setGroupSelect()
}
// set selection from server
const setGroupSelect = () => {
   exercise.group.forEach((group)=>{
        const selected = groupsList.filter(Item =>{ return Item.id === group.id})
        selected.forEach((val) => { state.groupSelect.push({
            label: val.title,
            value: val.id
        })
        })
   })
}
// set new group from field selection
const groupSelectItem = (item) => {
    state.groupSelect = item
}

// create options to selection fields
const makeOptions = (data, endArray) => {
    let array = []
    Object.entries(data).map(item => {
        const i = item[1]
        array.push(i)
    })

    array.forEach((i) => {
        endArray.push({
            id: i.id,
            title: i.title
        })
    })
}
const changeDescription = () => {
  $store.changeExercise($route.params.id, 'description', exercise.description)
}

// get default fields of exercise
const createDefaultFields = () => {
    if (!getDefaultSets($route.params.id)) $store.addDefaultSet({id: $route.params.id, fieldAmount: 2, fieldType: 0})
    Object.assign(setObj, $store.exercise_edit.find(item => item.id == $route.params.id).defaultfields)
}

// edit sets clicked
const editSets = () => {
    editSetsVal.value = !editSetsVal.value
}

</script>

<style lang="sass" scoped>

</style>
