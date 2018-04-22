import { ajaxPost } from '@/utils/request.js'

export function login (data) {
  return ajaxPost('/login', data)
}
export function userLogin (data) {
  return ajaxPost('/userLogin', data)
}

export function userInfoUpdate (data) {
  return ajaxPost('/auth/update', data)
}

export function userDetail (data) {
  return ajaxPost('/auth/detail', data)
}
