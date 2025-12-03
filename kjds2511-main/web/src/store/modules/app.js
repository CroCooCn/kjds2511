// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2025 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import Cache from '@/utils/cache'
import config from '@/config/app'

const state = {
  token: Cache.get('token') || '',
  TOKENNAME: config.TOKENNAME,
  userInfo: Cache.get('userInfo') || {},
  spread: Cache.get('spread') || 0,
  theme: Cache.get('theme') || 'theme1'
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    Cache.set('token', token)
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
    Cache.set('userInfo', userInfo)
  },
  SET_SPREAD: (state, spread) => {
    state.spread = spread
    Cache.set('spread', spread)
  },
  SET_THEME: (state, theme) => {
    state.theme = theme
    Cache.set('theme', theme)
  }
}

const actions = {
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  setUserInfo({ commit }, userInfo) {
    commit('SET_USER_INFO', userInfo)
  },
  setSpread({ commit }, spread) {
    commit('SET_SPREAD', spread)
  },
  setTheme({ commit }, theme) {
    commit('SET_THEME', theme)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

