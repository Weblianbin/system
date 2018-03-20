import { ajaxPost } from '@/utils/request.js'
// 添加
export function addCustomer (data) {
  return ajaxPost('/addCustomer', data)
}
