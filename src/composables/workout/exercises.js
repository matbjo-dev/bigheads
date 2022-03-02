import {ref} from 'vue'
import {api} from 'src/services/axios.js'

const options = []

export const getExercises = async () => {
  try {
    const response = await api.get('workout/exercise/')
    appendToOptions(response.data)
    return {
      options,
    }
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
  }
}
