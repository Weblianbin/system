import { ajaxPost } from '@/utils/request.js'
// 添加
export function addSell (data) {
  return ajaxPost('/sell/add', data)
}
// 分页获取
export function sellList (data) {
  return ajaxPost('/sell/list', data)
}
// 修改
export function editSell (data) {
  return ajaxPost('/sell/edit', data)
}
// 删除
export function deleteSell (data) {
  return ajaxPost('/sell/delete', data)
}
