// 存入
export async function setUserInfo (data) {
  window.localStorage.setItem('userInfo', JSON.stringify(data))
}
// 取出
export function getUserInfo () {
  var userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  return userInfo
}
// 移除
export function clearUserInfo () {
  window.localStorage.clear()
}
