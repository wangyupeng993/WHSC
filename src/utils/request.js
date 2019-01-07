import axios from 'axios'
import queryString from 'queryString'
import md5 from 'js-md5'
// import CryptoJs from '@/api/crypto'
import { Message } from 'element-ui'

// 取消请求配置
/* const CancelToken = axios.CancelToken
const source = CancelToken.source() */

const service = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  responseType: 'json',
  // 向后端发送请求数据
  transformRequest: [RequestData => {
    if (RequestData && RequestData.passWord) {
      RequestData.passWord = md5(RequestData.passWord)
    }
    return queryString.stringify(RequestData)
  }],
  // 后端返回数据
  transformResponse: [ResponseData => {
    if (ResponseData && ResponseData.result && ResponseData.result.token) {
      ResponseData.result.token = md5(ResponseData.result.token)
    }
    return ResponseData
  }]
  // cancelToken: source.token  取消请求
})
// 请求前拦截
service.interceptors.request.use(config => {
  // 在发送请求之前做某事 拦截
  return config
}, error => {
  // 请求错误时做莫事
  return Promise.reject(error)
})

// 请求响应后拦截
service.interceptors.response.use(response => {
  // 请求响应后成功拦截 resp_code resp_message
  if (response.data.resp_code.toString() === '000000') {
    Message({
      message: response.data.resp_message,
      type: 'success',
      duration: 2 * 1000
    })
  }

  if (response.data.resp_code.toString() !== '000000') {
    Message({
      message: response.data.resp_message,
      type: 'error',
      duration: 5 * 1000
    })
  }
  return response
}, error => {
  const timeout = error.toString().split(' ').filter(item => item === 'timeout')
  if (timeout && timeout != null && timeout.join() !== '') {
    Message({
      message: '请求超时！',
      type: 'error',
      duration: 5 * 1000
    })
  }
  // 请求响应后失败拦截
  return Promise.reject(error)
})

export default service
