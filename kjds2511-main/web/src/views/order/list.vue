<template>
  <div class="order-list-page">
    <div v-if="orderList.length === 0" class="empty-order">
      <p>暂无订单</p>
    </div>
    <div v-else class="order-list">
      <div v-for="item in orderList" :key="item.id" class="order-item" @click="goDetail(item.id)">
        <div class="order-header">
          <span>订单号：{{ item.orderId }}</span>
          <span class="status">{{ item.statusText }}</span>
        </div>
        <div class="order-goods">
          <img :src="item.image" :alt="item.storeName" />
          <div class="goods-info">
            <h4>{{ item.storeName }}</h4>
            <p class="price">¥{{ item.price }}</p>
          </div>
        </div>
        <div class="order-footer">
          <span>共{{ item.totalNum }}件商品 合计：¥{{ item.payPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderList } from '@/api/order'

export default {
  name: 'OrderList',
  data() {
    return {
      orderList: []
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      try {
        const res = await getOrderList({ page: 1, limit: 20 })
        this.orderList = res.data.list || []
      } catch (error) {
        console.error('获取订单列表失败:', error)
      }
    },
    goDetail(id) {
      this.$router.push(`/order/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-list-page {
  padding: 15px;
}

.empty-order {
  text-align: center;
  padding: 100px 20px;
  
  p {
    color: #999;
    font-size: 16px;
  }
}

.order-list {
  .order-item {
    background: #fff;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    
    .order-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #f5f5f5;
      
      .status {
        color: #e93323;
      }
    }
    
    .order-goods {
      display: flex;
      margin-bottom: 15px;
      
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
    
    .order-footer {
      text-align: right;
      color: #666;
      font-size: 14px;
    }
  }
}
</style>

