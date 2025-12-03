<template>
  <div class="index-page">
    <!-- 搜索框 -->
    <van-sticky>
      <van-search
        v-model="searchValue"
        shape="round"
        background="#fff"
        placeholder="搜索商品"
        @click="goSearch"
        readonly
      />
    </van-sticky>

    <!-- 轮播图 -->
    <van-swipe class="banner" :autoplay="3000" indicator-color="#e93323">
      <van-swipe-item v-for="(item, index) in bannerList" :key="index">
        <img :src="item" alt="banner" />
      </van-swipe-item>
    </van-swipe>

    <!-- 分类导航 -->
    <div class="category-section">
      <van-grid :column-num="4" :border="false">
        <van-grid-item
          v-for="item in categoryList"
          :key="item.id"
          :icon="item.pic"
          :text="item.name"
          @click="goCategory(item.id)"
        >
          <template #icon>
            <img :src="item.pic" :alt="item.name" class="category-icon" />
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 商品列表 -->
    <div class="product-section">
      <van-divider content-position="left">
        <span class="section-title">热门商品</span>
      </van-divider>
      <div class="product-list">
        <van-card
          v-for="item in productList"
          :key="item.id"
          :price="item.price"
          :title="item.storeName"
          :thumb="item.image"
          @click="goDetail(item.id)"
        >
          <template #tags>
            <van-tag plain type="danger">热卖</van-tag>
          </template>
          <template #footer>
            <van-button size="mini" type="danger" round>立即购买</van-button>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getIndexData } from '@/api/api'
import { getCategoryList } from '@/api/store'
import { getProductList } from '@/api/store'

export default {
  name: 'Index',
  data() {
    return {
      searchValue: '',
      bannerList: [],
      categoryList: [],
      productList: []
    }
  },
  created() {
    this.getIndexData()
    this.getCategoryData()
    this.getProductData()
  },
  methods: {
    async getIndexData() {
      const res = await getIndexData()
      // 檢查返回的數據是否有效
      if (res && res.code === 200 && res.data && res.data.banner) {
        this.bannerList = res.data.banner
      } else {
        // 使用模拟数据 - 使用本地占位图
        this.bannerList = [require('@/assets/images/placeholder.svg')]
      }
    },
    async getCategoryData() {
      const res = await getCategoryList()
      // 檢查返回的數據是否有效
      if (res && res.code === 200 && res.data) {
        this.categoryList = res.data.slice(0, 8)
      } else {
        // 使用模拟数据 - 使用本地占位图
        const placeholder = require('@/assets/images/placeholder.svg')
        this.categoryList = [
          { id: 1, name: '手机数码', pic: placeholder },
          { id: 2, name: '电脑办公', pic: placeholder },
          { id: 3, name: '家用电器', pic: placeholder },
          { id: 4, name: '服饰鞋包', pic: placeholder },
          { id: 5, name: '美妆护肤', pic: placeholder },
          { id: 6, name: '食品生鲜', pic: placeholder },
          { id: 7, name: '运动户外', pic: placeholder },
          { id: 8, name: '图书文娱', pic: placeholder }
        ]
      }
    },
    async getProductData() {
      const res = await getProductList({ page: 1, limit: 10 })
      // 檢查返回的數據是否有效
      if (res && res.code === 200 && res.data) {
        this.productList = res.data.list || res.data || []
      } else {
        // 使用模拟数据 - 使用本地占位图
        const placeholder = require('@/assets/images/placeholder.svg')
        this.productList = [
          { id: 1, storeName: '示例商品1', image: placeholder, price: '99.00' },
          { id: 2, storeName: '示例商品2', image: placeholder, price: '199.00' },
          { id: 3, storeName: '示例商品3', image: placeholder, price: '299.00' },
          { id: 4, storeName: '示例商品4', image: placeholder, price: '399.00' }
        ]
      }
    },
    goSearch() {
      this.$router.push('/goods/search')
    },
    goCategory(id) {
      this.$router.push({ path: '/goods', query: { cid: id } })
    },
    goDetail(id) {
      this.$router.push(`/goods/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.index-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 60px;
}

.banner {
  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
}

.category-section {
  background: #fff;
  margin-top: 10px;
  padding: 10px 0;
  
  .category-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}

.product-section {
  margin-top: 10px;
  
  .section-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  
  .product-list {
    background: #fff;
    
    ::v-deep .van-card {
      background: #fff;
      margin-bottom: 10px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>

