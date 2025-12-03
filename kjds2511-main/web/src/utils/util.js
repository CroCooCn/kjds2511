// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2025 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

/**
 * 格式化时间
 */
export function formatTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!time) return ''
  const date = new Date(time)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second)
}

/**
 * 格式化金额
 */
export function formatMoney(money, decimals = 2) {
  if (!money && money !== 0) return '0.00'
  return Number(money).toFixed(decimals)
}

/**
 * 防抖函数
 */
export function debounce(func, wait) {
  let timeout
  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

/**
 * 节流函数
 */
export function throttle(func, wait) {
  let previous = 0
  return function(...args) {
    const now = Date.now()
    if (now - previous > wait) {
      previous = now
      func.apply(this, args)
    }
  }
}

/**
 * 解析URL参数
 */
export function parseQuery(url = window.location.href) {
  const query = {}
  const urlSearchParams = new URLSearchParams(url.split('?')[1])
  for (const [key, value] of urlSearchParams) {
    query[key] = value
  }
  return query
}

export default {
  formatTime,
  formatMoney,
  debounce,
  throttle,
  parseQuery
}

