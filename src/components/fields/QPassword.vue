<template>
  <q-input
    v-model="value"
    :error-message="errorMessage"
    :error="!!errorMessage">
    <template #prepend>
      <q-icon name="password" />
    </template>
  </q-input>
</template>

<script>
import {useField} from 'vee-validate'

export default {
  name: 'QPassword',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const {errorMessage, value} = useField(props.name)

    return {
      errorMessage,
      value,
    }
  },
  data() {
    return {
      passwordStrength: 0.5,
    }
  },
}
</script>
