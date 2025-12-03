// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2025 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import { login, getUserInfo, logout } from '@/api/user'
import Cache from '@/utils/cache'

const state = {
  userInfo: Cache.get('userInfo') || {},
  uid: Cache.get('uid') || null
}

const mutations = {
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
    Cache.set('userInfo', userInfo)
  },
  SET_UID: (state, uid) => {
    state.uid = uid
    Cache.set('uid', uid)
  },
  CLEAR_USER_INFO: (state) => {
    state.userInfo = {}
    state.uid = null
    Cache.clear('userInfo')
    Cache.clear('uid')
  }
}

const actions = {
  // 用户登录
  login({ commit, dispatch }, loginData) {
    return new Promise((resolve, reject) => {
      login(loginData).then(response => {
        const { token, uid } = response.data
        // 保存 token
        dispatch('app/setToken', token, { root: true })
        commit('SET_UID', uid)
        // 获取用户信息
        dispatch('getInfo').then(() => {
          resolve(response)
        }).catch(error => {
          // 即使获取用户信息失败，也认为登录成功
          resolve(response)
        })
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        commit('SET_USER_INFO', response.data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  // 退出登录
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('CLEAR_USER_INFO')
        dispatch('app/setToken', '', { root: true })
        Cache.clear('token')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

