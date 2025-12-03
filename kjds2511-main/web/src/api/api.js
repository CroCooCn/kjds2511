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
 * 获取主页数据 无需授权
 */
export function getIndexData() {
  return request.get('index', {}, { noAuth: true })
}

/**
 * 校验token是否有效
 * 注意：後端接口是 /api/front/token/is/exist (POST)，已被排除在攔截器外，不需要認證
 */
export function tokenIsExistApi() {
  return request.post('token/is/exist', {}, { noAuth: true })
}

/**
 * 获取登录授权logo
 */
export function getLogo() {
  return request.get('wechat/getLogo', {}, { noAuth: true })
}

/**
 * 领取优惠券
 */
export function setCouponReceive(couponId) {
  return request.post('coupon/receive', { couponId })
}

/**
 * 优惠券列表
 */
export function getCoupons(data) {
  return request.get('coupons', data, { noAuth: true })
}

/**
 * 我的优惠券
 */
export function getUserCoupons(data) {
  return request.get('coupon/list', data)
}

/**
 * 文章分类列表
 */
export function getArticleCategoryList() {
  return request.get('article/category/list', {}, { noAuth: true })
}

/**
 * 文章列表
 */
export function getArticleList(cid, data) {
  return request.get('article/list/' + cid, data, { noAuth: true })
}

