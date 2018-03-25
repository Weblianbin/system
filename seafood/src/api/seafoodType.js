import { ajaxPost } from '@/utils/request.js'
// 添加海鲜种类
export function addSeafoodType (data) {
  return ajaxPost('/seafood_type/add', data)
}
// 分页获取海鲜种类
export function seafoodTypeList (data) {
  return ajaxPost('/seafood_type/seafoodTypeList', data)
}
// 分页获取海鲜种类,不分页
export function seafoodTypeListAll (data) {
  return ajaxPost('/seafood_type/seafoodTypeListAll', data)
}
// 修改
export function editSeafoodType (data) {
  return ajaxPost('/seafood_type/edit', data)
}
// 删除
export function deleteSeafoodType (data) {
  return ajaxPost('/seafood_type/delete', data)
}
