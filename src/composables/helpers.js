import dayjs from 'dayjs'
export function makeOptions (data) {
  let array = []
  let endArray = []
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
  return endArray
}

function dateFormatForApi(date){
  date = dayjs(date, "DD/MM/YYYY")
  return date.format("YYYY/MM/DD")
}

function formatFields(fields){
  let newFields = []
  fields.forEach((field) =>{
    let newField = {}
    newField["unit"] = field.unit?.id ?? 1
    newField["result"] = field.score
    newField["order"] = field.order
    newFields.push(newField)
  })
  return newFields
}

function formatSetRow (setRow){
  let results = []
  let order = 1
  setRow.forEach((row) =>{
    let newRow = {}
    newRow["field_type"] = row.type
    newRow["order"] = order
    order = order + 1
    newRow['fields'] = formatFields(row.fields)
    results.push(newRow)
  })
  return results
}
function formatExerciseResults(results){
  let newResults = []
  let order = 1
  results.forEach((item) => {
    let newItem = {}
    newItem['exercise'] = item.exercise.id
    newItem["order"] = order
    order = order + 1
    newItem['exercise_result'] = formatSetRow(item.workout_fields.setRow)
    newResults.push(newItem)
  })
  return newResults
}
export function createWorkoutResultForApi(wk){
  wk.start_date = dateFormatForApi(wk.start_date)
  wk.end_date = dateFormatForApi(wk.start_date)
  wk.workout_exercise = formatExerciseResults(wk.results)
  return wk
}
