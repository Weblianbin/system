import { ajaxPost } from '@/utils/request.js'
// 添加海鲜种类
export function addImgSrc (data) {
  return ajaxPost('/imgSrc/add', data)
}
