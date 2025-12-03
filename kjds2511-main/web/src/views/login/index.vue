<template>
  <div class="login-page">
    <div class="login-box">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-item">
          <input 
            v-model="form.account" 
            type="text" 
            placeholder="请输入账号（5-16位字母或数字）"
            required
          />
        </div>
        <div class="form-item">
          <input 
            v-model="form.password" 
            type="password" 
            placeholder="请输入密码"
            required
          />
        </div>
        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
      <div class="links">
        <router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        account: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    async handleLogin() {
      if (!this.form.account || !this.form.password) {
        alert('请填写完整信息')
        return
      }
      
      // 账号格式验证（5-16位字母数字）
      if (!/^[\w\d]{5,16}$/i.test(this.form.account)) {
        alert('请输入正确的账号（5-16位字母或数字）')
        return
      }
      
      this.loading = true
      try {
        // 添加推广人ID（如果有）
        const spreadSpid = this.$store.state.app.spread || ''
        const loginData = {
          account: this.form.account,
          password: this.form.password,
          spread_spid: spreadSpid
        }
        
        await this.login(loginData)
        alert('登录成功')
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
      } catch (error) {
        alert(error.message || error.msg || '登录失败')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.login-box {
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  
  h2 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
  }
  
  .form-item {
    margin-bottom: 20px;
    
    input {
      width: 100%;
      height: 44px;
      padding: 0 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      
      &:focus {
        border-color: #e93323;
        outline: none;
      }
    }
  }
  
  .login-btn {
    width: 100%;
    height: 44px;
    background: #e93323;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    &:hover:not(:disabled) {
      background: #d6281a;
    }
  }
  
  .links {
    margin-top: 20px;
    text-align: center;
    
    a {
      color: #e93323;
      text-decoration: none;
    }
  }
}
</style>

