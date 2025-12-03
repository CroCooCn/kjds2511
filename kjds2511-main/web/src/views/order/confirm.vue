<template>
  <div class="order-confirm-page">
    <div class="order-goods">
      <h3>商品信息</h3>
      <div class="goods-item">
        <img src="/static/default-goods.png" alt="商品" />
        <div class="goods-info">
          <h4>商品名称</h4>
          <p class="price">¥0.00</p>
        </div>
      </div>
    </div>
    <div class="order-amount">
      <p>合计：<span class="price">¥0.00</span></p>
    </div>
    <div class="order-footer">
      <button @click="submitOrder">提交订单</button>
    </div>
  </div>
</template>

<script>
import { createOrder } from '@/api/order'

export default {
  name: 'OrderConfirm',
  methods: {
    async submitOrder() {
      try {
        const res = await createOrder({})
        this.$router.push(`/order/${res.data.id}`)
      } catch (error) {
        alert(error.message || '提交订单失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-confirm-page {
  min-height: 100vh;
  padding: 15px;
  padding-bottom: 80px;
}

.order-goods {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  
  h3 {
    font-size: 16px;
    margin-bottom: 15px;
  }
  
  .goods-item {
    display: flex;
    
    img {
      width: 80px;
      height: 80px;
      border-radius: 4px;
      margin-right: 15px;
    }
    
    .goods-info {
      flex: 1;
      
      h4 {
        font-size: 14px;
        margin-bottom: 5px;
      }
      
      .price {
        color: #e93323;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}

.order-amount {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  text-align: right;
  
  .price {
    color: #e93323;
    font-size: 20px;
    font-weight: bold;
  }
}

.order-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: #fff;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  
  button {
    width: 100%;
    height: 44px;
    background: #e93323;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>

