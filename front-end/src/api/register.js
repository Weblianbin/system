import { ajaxPost } from '@/utils/request.js'

export function register (data) {
  return ajaxPost('/register', data)
}
