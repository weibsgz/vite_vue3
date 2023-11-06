import axios from 'axios'
import store from '@/store'
console.log(import.meta.env.VITE_BASE_API)

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 50000
})

service.interceptors.request.use((config) => {
  config.headers.icode = `4B81F91271CF6BBF`
  if(store.getters.getToken) {
    config.headers.Authorization = `Bearer ${store.getters.getToken}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  const { success, data, message } = response.data

  if (success) {
    return data
  }

  return Promise.reject(new Error(message))
},(error) => {
  //处理登录超时
  if(error.response && error.response.data && error.response.data.code === 401) {
    store.dispatch('user_/logout')
  }
  return Promise.reject(error)
})

export default service
