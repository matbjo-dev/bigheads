import { defineStore, acceptHMRUpdate } from 'pinia';
import {api} from 'src/services/axios'
import {makeOptions} from 'src/composables/helpers'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const exerciseStore = defineStore('exerciseStore', {
  state: () => {
    return {
    exercises: [],
    muscles: [],
    default_unit: { title: "kg", defaultValue: 10, id: 1},
    exercise_groups: [],
    units: [],
    unitOptions: [],
    exercise_edit: [],
    activeWorkouts: [],
    }
  },
  persist: true,
  getters: {
    exerciseById: (state) => {
     return (id) => {
      return state.exercises.find(item => item.id == id)
     }
    },
    get_exercise_edit: (state) => { return (id) => { return state.exercise_edit.find(item => item.id == id) }},
    getDefaultSets: (state) => { return (id) => {
      const exercise = state.exercise_edit.find(item => item.id == id)
      return exercise.defaultfields
    }},
  },
  actions: {
getExercises(){
  return api
    .get('workout/exercise/')
    .then((response)=>{
      let array = []
      Object.entries(response.data).map(item => {
            const i = item[1]
            array.push(i)
        })
      this.exercises = array
    })
    .catch(error=>console.log(error))
},

getMuscles(){
return api
  .get('workout/muscles/')
  .then((response)=>{ this.muscles = response.data})
  .catch(error=>console.log(error))
},

getDefaultSettings(){
  return api
    .get('workout/settings/')
    .then((response)=>{this.default_unit = response.data.unit})
    .catch(error=>console.log(error))
},
getExerciseGroups(){
  return api
    .get('workout/group/')
    .then((response)=>{ this.exercise_groups = response.data })
    .catch(error=>console.log(error))
},
getUnits(){
  return api
    .get('workout/unit/')
    .then((response)=>{ this.units = response.data })
    .catch(error=>console.log(error))
},
getUnitOptions(){
  if (this.units.length == 0) this.getUnits()
  if (this.unitOptions.length == 0) this.makeUnitOptions()
},
makeUnitOptions(){
  this.unitOptions = makeOptions(this.units)
},
changeUnit(obj){
  if(!this.exercise_edit.find(item => item?.id == obj.exercise_id)) return // check if obj is in exercise_edit
  this.exercise_edit.find(item => item?.id == obj.exercise_id).defaultfields.setRow[obj.indexRow].fields[obj.indexField].unit = obj.unitObj
},
makeExerciseEdit(id){
  if (!id) return
  this.exercise_edit = this.exercise_edit.filter(item => item) // remove null, undefiened
  if(this.exercise_edit.find(item => item?.id == id)) return // check if already exist
  const exercise = this.exercises.find(item => item?.id == id) // find correct exercise
  this.exercise_edit.push(exercise) // add to temp var for edit
},

getDefaultUnit () {
  this.getDefaultSettings()
  return this.defaultUnit // must fix is currently array
},
addDefaultSet(payload){
  // const unit = dispatch('getDefaultUnit')
  const unit = { title: "kg", defaultValue: 10, id: 1}
  let fields = []
  if (!payload.fieldAmount) payload.fieldAmount = 1 // set default value
  for (let order=1; order <= payload.fieldAmount; order++){ // create order and amount of fields
      fields.push(
          {
              defaultValue: 0,
              order: order,
              unit: unit,
          }
      )
  }
  const row = {fields: fields, field_count: payload.fieldAmount, type: payload.fieldType}
  this.exercise_edit.find(item => item.id == payload.id).defaultfields.setRow.push(row)
},

getEmptySetRow(payload){
  // const unit = dispatch('getDefaultUnit')
  const unit = { title: "kg", defaultValue: 10, id: 1}
  let fields = []
  if (!payload.fieldAmount) payload.fieldAmount = 1 // set default value
  for (let order=1; order <= payload.fieldAmount; order++){ // create order and amount of fields
      fields.push(
          {
              defaultValue: 0,
              order: order,
              unit: unit,
              score: null,
          }
      )
  }
  return {fields: fields, field_count: payload.fieldAmount, type: payload.fieldType}

},

setRowType(obj){
  if ( obj.id == undefined  || obj.index == undefined || obj.setType == undefined ) return
  obj = {id: obj.id, index: obj.index, setType: obj.setType}
  if(!this.exercise_edit.find(item => item?.id == obj.id)) return // check if obj is in exercise_edit
  this.exercise_edit.find(item => item?.id == obj.id).defaultfields.setRow[obj.index].type = obj.setType // find correct exercise
},
deleteRow(obj){
  if ( obj.id == undefined  || obj.indexRow == undefined) return
  obj = {id: obj.id, indexRow: obj.indexRow}
  if(!this.exercise_edit.find(item => item?.id == obj.id)) return // check if obj is in exercise_edit
  this.exercise_edit.find(item => item?.id == obj.id).defaultfields.setRow.splice(obj.indexRow, 1)
},
setDefaultSetValue( {id, value, indexRow, indexField}){
  if(!this.exercise_edit.find(item => item?.id == id)) return
  this.exercise_edit.find(item => item?.id == id).defaultfields.setRow[indexRow].fields[indexField].defaultValue = value
},

changeExercise(exercise_id, key, value){
  if ( exercise_id == undefined  || key == undefined) return
  if(!this.exercise_edit.find(item => item?.id == exercise_id)) return
  this.exercise_edit.find(item => item?.id == exercise_id)[key] = value // change local state
  let obj = {}
  obj[key] = value
  this.updateExercise({exercise_id: exercise_id, obj}) // api call

},
updateExercise({exercise_id, obj}){
  return api
    .patch(`workout/exercise/${exercise_id}/`, obj)
    .then((response)=>{ })
    .catch(error=>console.log(error))
},
newWorkout(payload){
  this.activeWorkouts.push(
    payload
  )
},
getActiveWorkout(id){
  return this.activeWorkouts.find((wk)=>wk.workout_id == id)
},
getActiveWorkoutExercise(wk_id, wk_exercise_id){
  return this.getActiveWorkout(wk_id).results.find((exercise)=>exercise.wk_exercise_id ==  wk_exercise_id)

},

getWorkoutSetRow(fieldAmount,fieldType){
  // const unit = dispatch('getDefaultUnit')
  const unit = { title: "kg", defaultValue: 10, id: 1}
  let fields = []
  if (!fieldAmount) fieldAmount = 1 // set default value
  for (let order=1; order <= fieldAmount; order++){ // create order and amount of fields
      fields.push(
          {
              defaultValue: 0,
              order: order,
              unit: unit,
              score: "",
          }
      )
  }
  const row = {fields: fields, field_count: fieldAmount, type: fieldType}
  return row
},

addWorkoutSet(row){
  let exercise = this.getActiveWorkoutExercise(row.workout_id, row.wk_exercise_id)
  let set = this.getWorkoutSetRow(row.fieldAmount,row.fieldType)
  exercise.workout_fields.setRow.push(set)
},
getExerciseMuscleInfo(workout_id, wk_exercise_id){
  return this.getActiveWorkoutExercise(workout_id, wk_exercise_id).exercise.muscles
},
deleteWKExercise(workout_id, wk_exercise_id){
  let wkResults = this.getActiveWorkout(workout_id).results
  const wkExerciseIndex = wkResults.findIndex((exercise)=>exercise.wk_exercise_id ==  wk_exercise_id)
  wkResults.splice(wkExerciseIndex, 1)
},
toggleEditSets(workout_id, wk_exercise_id){
  this.getActiveWorkoutExercise(workout_id, wk_exercise_id).showEdit = !this.getActiveWorkoutExercise(workout_id, wk_exercise_id).showEdit
},
deleteWKRow(workout_id, wk_exercise_id, rowIndex){
  this.getActiveWorkoutExercise(workout_id, wk_exercise_id).workout_fields.setRow.splice(rowIndex, 1)
},
changeWKUnit(workout_id, wk_exercise_id, indexRow, indexField, unitObj){
  this.getActiveWorkoutExercise(workout_id, wk_exercise_id).workout_fields.setRow[indexRow].fields[indexField].unit = unitObj

},
setRowWKType(workout_id, wk_exercise_id, indexRow, setType){
  this.getActiveWorkoutExercise(workout_id, wk_exercise_id).workout_fields.setRow[indexRow].type = setType
},
getScoreValue(workout_id, wk_exercise_id, indexRow, indexField){
  if(!this.getActiveWorkoutExercise(workout_id, wk_exercise_id).workout_fields.setRow[indexRow].fields[indexField]?.score) {
    this.getActiveWorkoutExercise(workout_id, wk_exercise_id).workout_fields.setRow[indexRow].fields[indexField].score = ""
  }
  return this.getActiveWorkoutExercise(workout_id, wk_exercise_id).workout_fields.setRow[indexRow].fields[indexField].score
},
setScoreValue(workout_id, wk_exercise_id, indexRow, indexField, value){
  this.getActiveWorkoutExercise(workout_id, wk_exercise_id).workout_fields.setRow[indexRow].fields[indexField].score = value
}

// end actions
  },
})
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(acceptHMRUpdate(exerciseStore, import.meta.webpackHot))
}
