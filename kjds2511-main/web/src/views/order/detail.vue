<template>
  <div class="order-detail-page">
    <div v-if="orderInfo.id" class="order-info">
      <div class="order-header">
        <h3>订单详情</h3>
        <span class="status">{{ orderInfo.statusText }}</span>
      </div>
      <div class="order-goods">
        <h4>商品信息</h4>
        <div class="goods-item">
          <img :src="orderInfo.image" :alt="orderInfo.storeName" />
          <div class="goods-info">
            <h5>{{ orderInfo.storeName }}</h5>
            <p class="price">¥{{ orderInfo.price }}</p>
          </div>
        </div>
      </div>
      <div class="order-amount">
        <p>合计：<span class="price">¥{{ orderInfo.payPrice }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderDetail } from '@/api/order'

export default {
  name: 'OrderDetail',
  data() {
    return {
      orderInfo: {}
    }
  },
  created() {
    this.getOrderDetail()
  },
  methods: {
    async getOrderDetail() {
      try {
        const id = this.$route.params.id
        const res = await getOrderDetail(id)
        this.orderInfo = res.data || {}
      } catch (error) {
        console.error('获取订单详情失败:', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-detail-page {
  padding: 15px;
}

.order-info {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  
  .order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f5f5f5;
    
    h3 {
      font-size: 18px;
    }
    
    .status {
      color: #e93323;
    }
  }
  
  .order-goods {
    margin-bottom: 20px;
    
    h4 {
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
        
        h5 {
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
    text-align: right;
    padding-top: 15px;
    border-top: 1px solid #f5f5f5;
    
    .price {
      color: #e93323;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>

