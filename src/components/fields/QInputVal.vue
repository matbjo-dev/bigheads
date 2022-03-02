<template>
  <q-input
    v-model="value"
    :error-message="errorMessage"
    :error="!!errorMessage">
    <template v-if="preIcon" #prepend>
      <q-icon :name="preIcon" />
    </template>
    <template v-if="hintVal" #hint>
      {{ hintVal }}
    </template>
  </q-input>
</template>

<script>
import {useField} from 'vee-validate'

export default {
  name: 'QInputVal',
  props: {
    name: {
      type: String,
      required: true,
    },
    preIcon: {
      type: String,
      required: false,
    },
    hintVal: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const {errorMessage, value} = useField(props.name)

    return {
      errorMessage,
      value,
    }
  },
}
</script>
