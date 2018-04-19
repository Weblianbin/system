import { ajaxPost } from '@/utils/request.js'
// 添加
export function addLife (data) {
  return ajaxPost('/life/add', data)
}
// 分页获取
export function lifeList (data) {
  return ajaxPost('/life/list', data)
}
// 修改
export function editLife (data) {
  return ajaxPost('/life/edit', data)
}
// 删除
export function deleteLife (data) {
  return ajaxPost('/life/delete', data)
}
