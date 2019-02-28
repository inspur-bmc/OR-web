import axios from 'axios'

// 创建axios的一个实例
let http = axios.create({
  timeout: 6000
})

// 请求拦截器
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})

export default function (method, url, data = null) {
  method = method.toLowerCase()
  if (method === 'post') {
    return http.post(url, data)
  } else if (method === 'get') {
    return http.get(url, {
      params: data
    })
  } else if (method === 'delete') {
    return http.delete(url, {
      params: data
    })
  } else if (method === 'put') {
    return http.put(url, data)
  } else {
    console.error('未知的method' + method)
    return false
  }
}
