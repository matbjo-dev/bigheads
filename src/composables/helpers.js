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
