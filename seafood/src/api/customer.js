import { ajaxPost } from '@/utils/request.js'
// 添加
export function addCustomer (data) {
  return ajaxPost('/customer/add', data)
}
// 分页获取
export function CustomerList (data) {
  return ajaxPost('/customer/list', data)
}
// 修改
export function editCustomer (data) {
  return ajaxPost('/customer/edit', data)
}
// 删除
export function deleteCustomer (data) {
  return ajaxPost('/customer/delete', data)
}
