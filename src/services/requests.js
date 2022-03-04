import {api} from './axios'
import { useNotify } from 'src/composables/notify'
// Get user info
export function getCurrentUserInfo() {
  return api.get('user/current')
}
export async function postWorkoutResults(WorkoutSession){
try {
  await api.post('workout/post/results/', WorkoutSession).then((response) => {
    useNotify('success', 'Success', 'Workout saved')
  })
} catch (error) {
  console.log(error)
  useNotify('error', 'Error', 'Workout not saved')
}}
