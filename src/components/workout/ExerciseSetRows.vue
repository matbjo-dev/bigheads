<template>

<template v-if="props.setObj.setRow && props.setObj.setRow.length > 0">
<div v-for="(row, index) in props.setObj.setRow" :key="'fieldsWX' + index" class="full-width flex justify-between row no-wrap q-py-md">
    <template v-for="(field, indexField) in row.fields" :key="'field-'+indexField">
    <set-field wk :field="field" :workout-id="props.workoutId"  :wk-exercise-id="wkExerciseId" :index-row="index" :index-field="indexField" :field-count="row.field_count" :set-type="props.setObj.setRow[index].type" :edit="props.edit" :class="getFieldClass(row.field_count)" @set-row-type="setRowType" @delete-row="deleteRow" @unit-selected="unitSelected" @set-default-value="setDefaultValue" ></set-field>
    </template>
</div>
</template>
<div  class="row justify-center">
<add-set-menu @add-set="addSet"></add-set-menu>
</div>
</template>

<script setup>
import { ref, toRef, reactive, defineEmits } from 'vue'
import setField from 'components/fields/SetField'
import AddSetMenu from './buttons/AddSetMenu'
import { exerciseStore } from 'src/pinia/exercise.js'
import { useRoute } from 'vue-router'

const $route = useRoute()
const $store = exerciseStore()
const props = defineProps({
    defaultUnit: {
        type: String,
        default () {
            return { "title": "kg", "defaultValue": 10, "id": 1 }
        }
    },
    setObj: {
        type: Object,
        default () {
            return {}
        }
    },
    edit: {
        type: Boolean,
        default: false
    },
    workoutId: {
      type: String,
      default: null,
    },
    wkExerciseId: {
      type: String,
      default: null,
    }

})

// add set to default fields. event from component
const addSet = (payload) => {
    $store.addWorkoutSet({workout_id: props.workoutId, wk_exercise_id: props.wkExerciseId,  fieldAmount: payload.fieldAmount, fieldType: payload.fieldType})
}

const deleteRow = (obj) => {
    $store.deleteWKRow(props.workoutId, props.wkExerciseId, obj.indexRow)
}
const setRowType = (obj) => { // value 1 if warm up else 0
    $store.setRowWKType(props.workoutId, props.wkExerciseId, obj.indexRow, obj.setType)
}
const setDefaultValue = ({value, indexRow, indexField}) => {
  $store.setDefaultSetValue({id: $route.params.id, indexRow, indexField, value})
}


const getFieldClass = (fields) => {
    if (fields==1) return 'col-12'
    if (fields==2) return 'col-grow-6'
    if (fields==3) return 'col-4'
    else return 'col-grow'
}

const unitSelected = (obj) => {
   $store.changeWKUnit(props.workoutId, props.wkExerciseId, obj.indexRow, obj.indexField, obj.unitObj)
}
</script>

<style lang="sass" scoped>
.col-grow-6
    width: 49.5%
</style>
