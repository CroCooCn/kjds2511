<template>
  <div class="goods-detail-page">
    <div v-if="goodsInfo.id">
      <div class="goods-images">
        <img :src="goodsInfo.image" :alt="goodsInfo.storeName" />
      </div>
      <div class="goods-info">
        <h2>{{ goodsInfo.storeName }}</h2>
        <p class="price">¥{{ goodsInfo.price }}</p>
        <div class="goods-desc" v-html="goodsInfo.description"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductDetail } from '@/api/store'

export default {
  name: 'GoodsDetail',
  data() {
    return {
      goodsInfo: {}
    }
  },
  created() {
    this.getGoodsDetail()
  },
  methods: {
    async getGoodsDetail() {
      try {
        const id = this.$route.params.id
        const res = await getProductDetail(id)
        this.goodsInfo = res.data || {}
      } catch (error) {
        console.error('获取商品详情失败:', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-detail-page {
  background: #fff;
}

.goods-images {
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
}

.goods-info {
  padding: 20px;
  
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .price {
    color: #e93323;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  .goods-desc {
    line-height: 1.6;
  }
}
</style>

