<template>
  <div class="goods-list-page">
    <div class="goods-list">
      <div 
        v-for="item in goodsList" 
        :key="item.id"
        class="goods-item"
        @click="goDetail(item.id)"
      >
        <img :src="item.image" :alt="item.storeName" />
        <div class="goods-info">
          <h4>{{ item.storeName }}</h4>
          <p class="price">¥{{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductList } from '@/api/store'

export default {
  name: 'GoodsList',
  data() {
    return {
      goodsList: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      try {
        const res = await getProductList({
          page: 1,
          limit: 20,
          cid: this.$route.query.cid
        })
        this.goodsList = res.data.list || []
      } catch (error) {
        console.error('获取商品列表失败:', error)
      }
    },
    goDetail(id) {
      this.$router.push(`/goods/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list-page {
  padding: 15px;
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  .goods-item {
    width: calc(50% - 5px);
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    
    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    
    .goods-info {
      padding: 10px;
      
      h4 {
        font-size: 14px;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .price {
        color: #e93323;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>

