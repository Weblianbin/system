import { ajaxPost } from '@/utils/request.js'
// 添加
export function addMessage (data) {
  return ajaxPost('/message/add', data)
}
