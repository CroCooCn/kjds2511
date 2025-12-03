// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2025 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'

// 引入 Vant UI 组件库
import Vant from 'vant'
import 'vant/lib/index.css'

import * as filters from '@/filters'
import util from '@/utils/util'
import Cache from '@/utils/cache'
import configs from '@/config/app'

Vue.config.productionTip = false

// 使用 Vant
Vue.use(Vant)

// 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 全局属性
Vue.prototype.$util = util
Vue.prototype.$config = configs
Vue.prototype.$Cache = Cache

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // 隐藏加载动画
    const loading = document.getElementById('loading')
    if (loading) {
      loading.style.display = 'none'
    }
  }
}).$mount('#app')

