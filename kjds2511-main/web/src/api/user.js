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
 * 用户登录（账号密码）
 */
export function login(data) {
  return request({
    url: 'login',
    method: 'post',
    data: data,
    noAuth: true
  })
}

/**
 * 用户登录（手机号验证码）
 */
export function loginMobile(data) {
  return request({
    url: 'login/mobile',
    method: 'post',
    data: data,
    noAuth: true
  })
}

/**
 * 用户注册
 */
export function register(data) {
  return request({
    url: 'register',
    method: 'post',
    data: data,
    noAuth: true
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request.get('user')
}

/**
 * 退出登录
 */
export function logout() {
  return request.get('logout')
}

