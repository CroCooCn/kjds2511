<template>
  <div class="goods-search-page">
    <div class="search-box">
      <input 
        v-model="keyword" 
        type="text" 
        placeholder="搜索商品"
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch">搜索</button>
    </div>
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
import { searchProduct } from '@/api/store'

export default {
  name: 'GoodsSearch',
  data() {
    return {
      keyword: '',
      goodsList: []
    }
  },
  methods: {
    async handleSearch() {
      if (!this.keyword.trim()) {
        alert('请输入搜索关键词')
        return
      }
      
      try {
        const res = await searchProduct({ keyword: this.keyword })
        this.goodsList = res.data.list || []
      } catch (error) {
        console.error('搜索失败:', error)
      }
    },
    goDetail(id) {
      this.$router.push(`/goods/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-search-page {
  padding: 15px;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  
  input {
    flex: 1;
    height: 40px;
    padding: 0 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 0 20px;
    height: 40px;
    background: #e93323;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
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

