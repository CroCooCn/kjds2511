<template>
  <van-tabbar v-model="active" :fixed="true" :placeholder="true" :safe-area-inset-bottom="true">
    <van-tabbar-item to="/" icon="wap-home-o">
      首页
    </van-tabbar-item>
    <van-tabbar-item to="/category" icon="apps-o">
      分类
    </van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o" :badge="cartCount > 0 ? cartCount : ''">
      购物车
    </van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o">
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TabBar',
  data() {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters(['cartCount'])
  },
  watch: {
    $route: {
      handler(route) {
        // 根据路由设置当前激活的标签
        const path = route.path
        if (path === '/' || path === '/index') {
          this.active = 0
        } else if (path.startsWith('/category')) {
          this.active = 1
        } else if (path.startsWith('/cart')) {
          this.active = 2
        } else if (path.startsWith('/user')) {
          this.active = 3
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
// Vant 的 Tabbar 样式已经很完善，这里可以添加自定义样式
::v-deep .van-tabbar-item--active {
  color: #e93323;
}
</style>
