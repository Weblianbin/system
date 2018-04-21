export function arrToStr (arr) {
  var str = null
  var newArr = []
  newArr.push(...arr)
  str = newArr.toString()
  return str
}
export function strToArr (str) {
  var arr = []
  var newArr = str.split(',')
  arr = newArr
  return arr
}
