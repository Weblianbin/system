import { ajaxPost } from '@/utils/request.js'
// 添加
export function addCircle (data) {
  return ajaxPost('/circle/add', data)
}
// 分页获取
export function circleList (data) {
  return ajaxPost('/circle/list', data)
}
export function allList (data) {
  return ajaxPost('/circle/allList', data)
}
// 修改
export function editCircle (data) {
  return ajaxPost('/circle/edit', data)
}
// 删除
export function deleteCircle (data) {
  return ajaxPost('/circle/delete', data)
}
