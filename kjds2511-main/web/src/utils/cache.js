// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2025 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import Cookies from 'js-cookie'
import { EXPIRE } from '@/config/app'

class Cache {
  constructor() {
    this.cacheExpire = '_expire_2019_12_17_18_44'
  }

  /**
   * 获取当前时间戳
   */
  time() {
    return Math.round(new Date() / 1000)
  }

  /**
   * 设置过期时间缓存
   */
  setItem(params) {
    const obj = {
      name: '',
      value: '',
      expires: '',
      startTime: new Date().getTime()
    }
    const options = Object.assign({}, obj, params)
    if (options.expires) {
      Cookies.set(options.name, JSON.stringify(options), { expires: options.expires / 86400 })
    } else {
      const type = Object.prototype.toString.call(options.value)
      if (type === '[object Object]' || type === '[object Array]') {
        options.value = JSON.stringify(options.value)
      }
      Cookies.set(options.name, options.value)
    }
  }

  /**
   * 获取缓存
   */
  getItem(name) {
    const item = Cookies.get(name)
    if (!item) return null
    try {
      const parsed = JSON.parse(item)
      if (parsed.startTime) {
        const date = new Date().getTime()
        if (date - parsed.startTime > parsed.expires) {
          Cookies.remove(name)
          return false
        } else {
          return parsed.value
        }
      } else {
        return parsed
      }
    } catch (e) {
      return item
    }
  }

  /**
   * 设置缓存
   */
  set(key, data, expire) {
    if (typeof data === 'object') {
      data = JSON.stringify(data)
    }
    if (expire) {
      Cookies.set(key, data, { expires: expire / 86400 })
    } else {
      Cookies.set(key, data)
    }
  }

  /**
   * 获取缓存
   */
  get(key, defaultValue) {
    const data = Cookies.get(key)
    if (data) {
      try {
        return JSON.parse(data)
      } catch (e) {
        return data
      }
    }
    return defaultValue
  }

  /**
   * 删除缓存
   */
  clear(key) {
    Cookies.remove(key)
  }

  /**
   * 检测缓存是否存在
   */
  has(key) {
    return !!Cookies.get(key)
  }
}

export default new Cache()

