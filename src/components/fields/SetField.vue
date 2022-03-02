<template>
 <q-input
    v-model="value"
    filled
    :placeholder="props.field.defaultValue"
    stack-label
    @focusout.prevent="setValue"

    >
<template v-if="props.setType != 0 && props.indexField == 0" #prepend>
<q-icon  v-if="props.setType == 1" name="fas fa-fire-alt" class="text-grey"></q-icon>
<q-icon v-if="props.setType == 2" name="fas fa-fist-raised" class="text-grey"></q-icon>
<q-icon  v-if="props.setType == 3" name="fas fa-fire-alt" class="text-primary"></q-icon>
</template>
<template #append>
    <q-item v-if="!(props.edit && !firstInManyField)">
        <q-item-section  class="text-grey" clickable>
        <span v-if="props.field.unit?.title">{{props.field.unit.title}}</span>
        <span v-else style="color: transparent">kg</span>
        <q-popup-proxy  ref="popup" @show="showPopup">
            <q-banner >
               <m-select  label="Select unit" autofocus multiple="false" :list="unitList" @select-item="unitSelected" ></m-select>
            </q-banner>
            </q-popup-proxy></q-item-section>
    </q-item>
    <q-btn v-if="props.edit && !firstInManyField" class="text-grey full-height" flat label="Warm up" @click="makeWarmup(); setRowType(1)"></q-btn>
    <q-btn  v-if="props.edit && !firstInManyField"  class="inputdeletebtn text-grey full-height" flat label="Delete" @click="deleteRow"></q-btn>
</template>
</q-input>
</template>

<script setup>
import {ref, toRaw,toRef, reactive, defineEmits, onMounted, computed} from 'vue'
import MSelect from 'components/fields/MSelect'
import { exerciseStore } from 'src/pinia/exercise.js'

const emit = defineEmits(['deleteRow','makeWarmup', 'showUnits', 'unitSelected', "setDefaultValue", "setRowType"])
const props = defineProps({
      field :{
        type: Object,
        default(){ return {} }
      },
      edit: {
          default() {return false},
          type: Boolean,
      },
      fieldCount: {
          default: 1,
          type: Number
      },
      indexField: {
          default: null,
          type: Number
      },
      indexRow: {
          default: null,
          type: Number
      },
      setType: {
          default: 0,
          type: Number
      },
      wk: {
        type: Boolean,
        default: false
      },
      workoutId: {
          default: null,
          type: String
      },
      wkExerciseId: {
          default: null,
          type: String
      },

})
const popup = ref(null)
const value = ref(null)
const firstInManyField = computed(()=>{ return props.fieldCount > 1 && props.field.order == 1})
const $store = exerciseStore()
const makeWarmup = () => {
    const value = props.setType == 1 ? 0 : 1 // 1 for warmup 0 for off
    emit('makeWarmup', {value: value, index: props.indexRow})
}

const setRowType = (setType) => {
    const value = props.setType == setType ? 0 : 1 // toggle on / of
    emit('setRowType', {setType: value, indexRow: props.indexRow})
}

const deleteRow = () => {
    emit('deleteRow', {indexRow: props.indexRow})
}
const setValue = () => {
  if (props.wk) setWKScore()
  else  setDefaultValue()
}
const setDefaultValue = () => {
  emit('setDefaultValue', {value, indexRow: props.indexRow, indexField: props.indexField})
}
const setWKScore = () => {
  $store.setScoreValue(props.workoutId, props.wkExerciseId, props.indexRow, props.indexField, value.value)
}


// unit get from store
const unitList= reactive([])

onMounted(async () => await getUnit())
const getUnit = async () => {
    await $store.getUnitOptions()
    unitList.push(...$store.unitOptions)
}
onMounted(()=>  getValueScore())
const getValueScore = () => {
  if (!props.wk) return
  value.value = $store.getScoreValue(props.workoutId, props.wkExerciseId, props.indexRow, props.indexField)
}


const unitSelected = (obj) => {
    const unitObj = {title: obj.item.value.label, id: obj.item.value.value}
    popup.value.hide()
    emit('unitSelected', {unitObj:  unitObj, indexField: props.indexField, indexRow: props.indexRow})
}

</script>
<style lang="sass" scoped>

</style>
