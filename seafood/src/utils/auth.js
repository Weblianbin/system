export async function setUserInfo (data) {
  window.localStorage.setItem('userInfo', JSON.stringify(data))
}
