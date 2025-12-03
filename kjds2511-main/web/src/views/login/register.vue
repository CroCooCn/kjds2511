<template>
  <div class="register-page">
    <div class="register-box">
      <h2>注册</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-item">
          <input 
            v-model="form.phone" 
            type="text" 
            placeholder="请输入手机号"
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
        <div class="form-item">
          <input 
            v-model="form.confirmPassword" 
            type="password" 
            placeholder="请确认密码"
            required
          />
        </div>
        <button type="submit" class="register-btn" :disabled="loading">
          {{ loading ? '注册中...' : '注册' }}
        </button>
      </form>
      <div class="links">
        <router-link to="/login">已有账号，立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '@/api/user'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        phone: '',
        password: '',
        confirmPassword: ''
      },
      loading: false
    }
  },
  methods: {
    async handleRegister() {
      if (!this.form.phone || !this.form.password) {
        alert('请填写完整信息')
        return
      }
      
      if (this.form.password !== this.form.confirmPassword) {
        alert('两次密码输入不一致')
        return
      }
      
      this.loading = true
      try {
        await register(this.form)
        alert('注册成功，请登录')
        this.$router.push('/login')
      } catch (error) {
        alert(error.message || '注册失败')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.register-box {
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
  
  .register-btn {
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

