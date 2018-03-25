export function arrToStr (arr) {
  var str = null
  var newArr = []
  newArr.push(...arr)
  console.log('newArr', newArr)
  str = newArr.toString()
  return str
}
export function strToArr (str) {
  console.log('str', str)
  var arr = []
  var newArr = str.split(',')
  console.log(newArr)
  arr = newArr
  return arr
}
