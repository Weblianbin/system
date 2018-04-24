export function transformTimestamp (data) {
  let result = null
  result = new Date(data)
  return result.getTime()
}
export function transformDate (data) {
  let result = null
  result = new Date(data)
  let y = result.getFullYear()
  let m = result.getMonth() + 1
  if (m <= 9) {
    m = '0' + m
  }
  let d = result.getDate()
  if (d <= 9) {
    d = '0' + d
  }
  result = y + '-' + m + '-' + d
  return result
}
export function transformMonth (data) {
  let result = null
  result = new Date(data)
  let y = result.getFullYear()
  let m = result.getMonth() + 1
  if (m <= 9) {
    m = '0' + m
  }
  result = y + '-' + m
  return result
}
