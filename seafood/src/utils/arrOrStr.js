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
export function strTextSlice (str) {
  console.log(str)
  let result = null
  if (str.length > 90) {
    result = str.slice(0, 90) + '......'
  }
  return result
}
