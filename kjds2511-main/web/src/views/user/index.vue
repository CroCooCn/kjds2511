<template>
  <div class="user-page">
    <div class="user-header">
      <div class="avatar">
        <img :src="userInfo.avatar || '/static/default-avatar.png'" alt="头像" />
      </div>
      <div class="user-info">
        <h3>{{ userInfo.nickname || '未登录' }}</h3>
        <p v-if="userInfo.phone">{{ userInfo.phone | phoneFormat }}</p>
      </div>
    </div>
    
    <div class="menu-list">
      <div class="menu-item" @click="goOrderList">
        <span>我的订单</span>
        <i>></i>
      </div>
      <div class="menu-item" @click="handleLogout">
        <span>退出登录</span>
        <i>></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'User',
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    goOrderList() {
      this.$router.push('/order/list')
    },
    async handleLogout() {
      try {
        await this.logout()
        this.$router.push('/login')
      } catch (error) {
        console.error('退出登录失败:', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.user-header {
  display: flex;
  align-items: center;
  padding: 30px 20px;
  background: #fff;
  margin-bottom: 10px;
  
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .user-info {
    h3 {
      font-size: 18px;
      margin-bottom: 5px;
    }
    
    p {
      color: #999;
      font-size: 14px;
    }
  }
}

.menu-list {
  background: #fff;
  
  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #f5f5f5;
    cursor: pointer;
    
    &:active {
      background: #f5f5f5;
    }
    
    i {
      color: #999;
    }
  }
}
</style>

