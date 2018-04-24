import { ajaxPost } from '@/utils/request.js'
// 添加
export function addMessage (data) {
  return ajaxPost('/message/add', data)
}

export function userInfoUpdate (data) {
  return ajaxPost('/userRegister/update', data)
}

export function userDetail (data) {
  return ajaxPost('/userRegister/detail', data)
}
