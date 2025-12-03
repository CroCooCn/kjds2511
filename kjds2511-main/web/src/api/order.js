// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2025 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import request from '@/utils/request'

/**
 * 订单列表
 */
export function getOrderList(data) {
  return request.get('order/list', data)
}

/**
 * 订单详情
 */
export function getOrderDetail(id) {
  return request.get('order/detail/' + id)
}

/**
 * 创建订单
 */
export function createOrder(data) {
  return request.post('order/create', data)
}

/**
 * 取消订单
 */
export function cancelOrder(id) {
  return request.post('order/cancel/' + id)
}

