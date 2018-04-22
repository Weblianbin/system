import { ajaxPost } from '@/utils/request.js'

export function register (data) {
  return ajaxPost('/register', data)
}
export function userRegister (data) {
  return ajaxPost('/userRegister', data)
}
