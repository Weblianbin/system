import axios from 'axios'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  withCredentials: true
})
const ajaxGet = async function (url) {
  await checkToken()
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
