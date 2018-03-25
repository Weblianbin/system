import { ajaxPost } from '@/utils/request.js'
// 添加海鲜种类
export function addSeafood (data) {
  return ajaxPost('/seafood/add', data)
}
// 分页获取海鲜种类
export function seafoodList (data) {
  return ajaxPost('/seafood/seafoodList', data)
}
// 修改
export function editSeafood (data) {
  return ajaxPost('/seafood/edit', data)
}
// 删除
export function deleteSeafood (data) {
  return ajaxPost('/seafood/delete', data)
}
