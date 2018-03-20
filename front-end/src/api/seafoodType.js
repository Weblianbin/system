import { ajaxPost } from '@/utils/request.js'
// 添加海鲜种类
export function addSeafoodType (data) {
  return ajaxPost('/seafood_type/add', data)
}
// 分页获取海鲜种类
export function seafoodTypeList (data) {
  return ajaxPost('/seafood_type/seafoodTypeList', data)
}
