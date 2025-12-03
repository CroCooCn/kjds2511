// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2025 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import { formatTime, formatMoney } from '@/utils/util'

/**
 * 时间格式化
 */
export function timeFormat(value, format = 'YYYY-MM-DD HH:mm:ss') {
  return formatTime(value, format)
}

/**
 * 金额格式化
 */
export function moneyFormat(value, decimals = 2) {
  return formatMoney(value, decimals)
}

/**
 * 手机号脱敏
 */
export function phoneFormat(value) {
  if (!value) return ''
  return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

