export function transformTimestamp (data) {
  let result = null
  result = new Date(data)
  console.log('result', result)
  return result.getTime()
}
