// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2025 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import axios from 'axios'
import store from '@/store'
import config from '@/config/app'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: config.HTTP_REQUEST_URL + '/api/front/',
  timeout: 10000,
  headers: config.HEADER
})

// 请求拦截器
service.interceptors.request.use(
  requestConfig => {
    // 处理 noAuth 参数
    const noAuth = requestConfig.noAuth
    delete requestConfig.noAuth
    
    // 添加token（除非是 noAuth 请求）
    if (!noAuth) {
      const token = store.state.app.token
      if (token) {
        requestConfig.headers[store.state.app.TOKENNAME] = token
      }
    }
    return requestConfig
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else if ([410000, 410001, 410002].indexOf(res.code) !== -1) {
      // Token 過期（明確的過期錯誤碼）
      store.dispatch('user/logout')
      // 只有在訪問需要認證的頁面時才跳轉
      if (router.currentRoute.meta.requiresAuth) {
        router.push('/login')
      }
      console.warn('登录已过期，请重新登录')
      return Promise.reject(new Error(res.message || '登录已过期'))
    } else if (res.code === 401 || res.code === 402) {
      // 401/402 未登錄錯誤 - 靜默處理，不拋出錯誤
      const isTokenCheck = response.config && response.config.url && response.config.url.includes('/token')
      const isPublicPage = !router.currentRoute.meta.requiresAuth
      
      if (!isTokenCheck && !isPublicPage) {
        // 非公開頁面且非 token 驗證，才清除並跳轉
        store.dispatch('user/logout')
        router.push('/login')
      }
      
      // 靜默處理：返回空數據而不是拋出錯誤
      console.warn('接口需要登录:', response.config.url)
      return Promise.resolve({ code: 401, data: null, message: '未登录' })
    } else if (res.code === 500) {
      console.warn('系统异常:', res.message)
      return Promise.reject(new Error(res.message || '系统异常'))
    } else if (res.code === 400) {
      console.warn('参数校验失败:', res.message)
      return Promise.reject(new Error(res.message || '参数校验失败'))
    } else if (res.code === 404) {
      console.warn('没有找到相关数据:', res.message)
      return Promise.reject(new Error(res.message || '没有找到相关数据'))
    } else if (res.code === 403) {
      console.warn('没有相关权限:', res.message)
      return Promise.reject(new Error(res.message || '没有相关权限'))
    } else {
      console.warn('请求失败:', res.message)
      return Promise.reject(new Error(res.message || '系统错误'))
    }
  },
  error => {
    // 處理 HTTP 錯誤（如網絡錯誤、401 等）
    if (error.response) {
      const status = error.response.status
      
      if (status === 401) {
        // HTTP 401 錯誤 - 靜默處理
        const isTokenCheck = error.config && error.config.url && error.config.url.includes('/token')
        const isPublicPage = !router.currentRoute || !router.currentRoute.meta || !router.currentRoute.meta.requiresAuth
        
        if (!isTokenCheck && !isPublicPage) {
          store.dispatch('user/logout')
          router.push('/login')
        }
        
        // 靜默處理：返回空數據
        console.warn('HTTP 401 未授权:', error.config.url)
        return Promise.resolve({ code: 401, data: null, message: '未授权' })
      } else if (status === 404) {
        console.warn('接口不存在:', error.config.url)
        return Promise.resolve({ code: 404, data: null, message: '接口不存在' })
      } else if (status === 500) {
        console.warn('服务器错误:', error.message)
        return Promise.resolve({ code: 500, data: null, message: '服务器错误' })
      }
    } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.warn('请求超时')
      return Promise.resolve({ code: 408, data: null, message: '请求超时' })
    } else if (error.message.includes('Network Error')) {
      console.warn('网络错误，后端服务可能未启动')
      return Promise.resolve({ code: 0, data: null, message: '网络错误' })
    }
    
    console.warn('请求异常:', error.message)
    return Promise.resolve({ code: 0, data: null, message: error.message || '请求失败' })
  }
)

// 封装请求方法
const request = {
  get(url, params = {}, config = {}) {
    return service({
      url,
      method: 'get',
      params,
      ...config
    })
  },
  post(url, data = {}, config = {}) {
    return service({
      url,
      method: 'post',
      data,
      ...config
    })
  },
  put(url, data = {}, config = {}) {
    return service({
      url,
      method: 'put',
      data,
      ...config
    })
  },
  delete(url, params = {}, config = {}) {
    return service({
      url,
      method: 'delete',
      params,
      ...config
    })
  }
}

export default request
