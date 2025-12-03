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
 * 商品列表（优选商品）
 */
export function getProductList(data) {
  return request.get('product/good', data, { noAuth: true })
}

/**
 * 商品列表（全部）
 */
export function getProductListAll(data) {
  return request.get('product/list', data, { noAuth: true })
}

/**
 * 商品详情
 */
export function getProductDetail(id) {
  return request.get('product/detail/' + id, {}, { noAuth: true })
}

/**
 * 商品分类
 */
export function getCategoryList() {
  return request.get('category/list', {}, { noAuth: true })
}

/**
 * 商品搜索
 */
export function searchProduct(data) {
  return request.get('product/search', data, { noAuth: true })
}

