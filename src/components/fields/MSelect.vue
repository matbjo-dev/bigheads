<template>
  <q-select
    ref="selectField"
    v-model="itemSelect"
    outline
    :options="options"
    use-input
    input-debounce="0"
    :label="props.label"
    :rules="[]"
    style="width: 100%"
    multiple
    @filter="filterFn"
    @update:model-value="selectItem"
    @new-value="createItem">
    <template #append>
      <q-btn flat icon="add" @click.stop="addItem"></q-btn>
    </template>
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">No results</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { ref, defineEmits, onMounted} from 'vue'
const itemSelect = ref(null)
const options = ref([])
const optionsComplete = ref([])
const selectField = ref(null)

const props = defineProps({
  label:{
    type: String,
    default: "Select item"
  },
    list:{
      type: Array,
      default() { return [] }
    },
})
const emit = defineEmits([
'createItem', 'selectItem', 'needOptions'
])
onMounted(()=>{
  if (!props.list) needOptions()
  makeOptions(props.list)
})
const makeOptions = (arr) => {
    options.value = []
    optionsComplete.value = []
    arr.forEach((item) => {
    options.value.push({
        value: item.id,
        label: item.title,
    })
    optionsComplete.value.push({
        value: item.id,
        label: item.title,
    })
    })
}
const needOptions = () => {
  emit('needOptions')
}
defineExpose([
makeOptions
])
const filterFn = (val, update) => {
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
const selectItem = () => {
      if (!itemSelect.value) return
      emit('selectItem', {
        item: itemSelect
       
      })
}
function createItem(val, done) {
    emit('createItem', val)
}

</script>
<style lang="sass" scoped>

</style>