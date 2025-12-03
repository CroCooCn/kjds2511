<template>
  <div id="app">
    <router-view />
    <!-- 底部导航栏 - 只在特定页面显示 -->
    <tab-bar v-if="showTabBar" />
  </div>
</template>

<script>
import { tokenIsExistApi } from '@/api/api'
import TabBar from '@/components/TabBar/index.vue'

export default {
  name: 'App',
  components: {
    TabBar
  },
  data() {
    return {
      showTabBar: true
    }
  },
  watch: {
    $route: {
      handler(route) {
        // 判断是否显示底部导航栏
        const hideTabBarPages = ['/login', '/register', '/goods/']
        this.showTabBar = !hideTabBarPages.some(path => route.path.startsWith(path))
      },
      immediate: true
    }
  },
  created() {
    // 初始化配置
    this.initConfig()
  },
  methods: {
    async initConfig() {
      // 检查 token 是否有效
      const token = this.$store.state.app.token
      if (token) {
        try {
          const res = await tokenIsExistApi()
          if (!res.data) {
            // token 无效，清除
            this.$store.dispatch('user/logout')
          }
        } catch (error) {
          // token 驗證失敗時，靜默處理，不清除 token
          // 因為 token 驗證接口本身需要認證，如果沒有 token 會返回 401
          // 這不應該影響頁面正常使用，讓用戶可以正常訪問公開頁面
          console.warn('Token 驗證失敗（可能是未登錄狀態）:', error.message || error)
          // 只有在明確的 token 無效時才清除（例如 410000, 410001, 410002）
          if (error.response && error.response.data) {
            const errorCode = error.response.data.code
            if ([410000, 410001, 410002].indexOf(errorCode) !== -1) {
              // 這些是明確的 token 過期錯誤碼，才清除 token
              this.$store.dispatch('user/logout')
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f5f5f5;
}
</style>

