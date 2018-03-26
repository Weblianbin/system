export function transformTimestamp (data) {
  let result = null
  result = new Date(data)
  return result.getTime()
}
export function transformDate (data) {
  console.log('data', data)
  let result = null
  result = new Date(data)
  let y = result.getFullYear()
  console.log('y', y)
  let m = result.getMonth() + 1
  if (m <= 9) {
    m = '0' + m
  }
  let d = result.getDate()
  if (d <= 9) {
    d = '0' + d
  }
  result = y + '-' + m + '-' + d
  console.log('result', result)
  return result
}
