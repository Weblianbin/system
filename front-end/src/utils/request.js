import axios from 'axios'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:3000', // api的base_url
  timeout: 15000, // 请求超时时间
  withCredentials: false
})
const ajaxGet = async function (url) {
  return service(
    {
      url,
      method: 'get'
    }
  )
}
const ajaxPost = async function (url, data) {
  return service(
    {
      url,
      method: 'post',
      data
    }
  )
}
export { ajaxGet, ajaxPost }
