import { ajaxPost } from '@/utils/request.js'

export function login (data) {
  return ajaxPost('/login', data)
}
