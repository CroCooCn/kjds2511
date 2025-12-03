<template>
  <div class="category-page">
    <!-- 搜索框 -->
    <van-sticky>
      <van-search
        v-model="searchValue"
        shape="round"
        background="#fff"
        placeholder="搜索商品"
        @search="onSearch"
      />
    </van-sticky>

    <!-- 左右分栏布局 -->
    <div class="category-container">
      <!-- 左侧一级分类 -->
      <van-sidebar v-model="activeKey" @change="onCategoryChange">
        <van-sidebar-item
          v-for="item in categoryList"
          :key="item.id"
          :title="item.name"
        />
      </van-sidebar>

      <!-- 右侧二级分类和商品 -->
      <div class="category-content">
        <van-loading v-if="loading" class="loading" />
        <div v-else>
          <!-- 二级分类 -->
          <div v-if="subCategoryList.length > 0" class="sub-category">
            <van-grid :column-num="3" :border="false">
              <van-grid-item
                v-for="sub in subCategoryList"
                :key="sub.id"
                @click="goGoodsList(sub.id)"
              >
                <template #icon>
                  <img :src="sub.pic" class="sub-icon" />
                </template>
                <template #text>
                  <span class="sub-name">{{ sub.name }}</span>
                </template>
              </van-grid-item>
            </van-grid>
          </div>

          <!-- 商品列表 -->
          <div v-if="productList.length > 0" class="product-list">
            <van-divider content-position="left">热门商品</van-divider>
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
            </van-card>
          </div>

          <!-- 空状态 -->
          <van-empty v-if="!loading && subCategoryList.length === 0 && productList.length === 0" description="暂无商品" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/store'
import { getProductList } from '@/api/store'

export default {
  name: 'Category',
  data() {
    return {
      searchValue: '',
      activeKey: 0,
      categoryList: [],
      subCategoryList: [],
      productList: [],
      loading: false
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList() {
      const res = await getCategoryList()
      if (res && res.code === 200 && res.data) {
        this.categoryList = res.data
        if (this.categoryList.length > 0) {
          this.onCategoryChange(0)
        }
      } else {
        // 使用模拟数据
        const placeholder = require('@/assets/images/placeholder.svg')
        this.categoryList = [
          { id: 1, name: '手机数码', pic: placeholder },
          { id: 2, name: '电脑办公', pic: placeholder },
          { id: 3, name: '家用电器', pic: placeholder },
          { id: 4, name: '服饰鞋包', pic: placeholder },
          { id: 5, name: '美妆护肤', pic: placeholder },
          { id: 6, name: '食品生鲜', pic: placeholder }
        ]
      }
    },
    async onCategoryChange(index) {
      this.loading = true
      const category = this.categoryList[index]
      
      // 获取二级分类（如果有）
      if (category && category.children) {
        this.subCategoryList = category.children
      } else {
        this.subCategoryList = []
      }
      
      // 获取该分类下的商品
      await this.getProductList(category.id)
      this.loading = false
    },
    async getProductList(cid) {
      const res = await getProductList({ cid, page: 1, limit: 10 })
      if (res && res.code === 200 && res.data) {
        this.productList = res.data.list || res.data || []
      } else {
        // 使用模拟数据
        const placeholder = require('@/assets/images/placeholder.svg')
        this.productList = [
          { id: 1, storeName: '示例商品1', image: placeholder, price: '99.00' },
          { id: 2, storeName: '示例商品2', image: placeholder, price: '199.00' }
        ]
      }
    },
    onSearch() {
      if (this.searchValue) {
        this.$router.push({ path: '/goods/search', query: { keyword: this.searchValue } })
      }
    },
    goGoodsList(cid) {
      this.$router.push({ path: '/goods', query: { cid } })
    },
    goDetail(id) {
      this.$router.push(`/goods/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.category-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 60px;
}

.category-container {
  display: flex;
  height: calc(100vh - 54px - 60px);
  
  ::v-deep .van-sidebar {
    width: 90px;
    
    .van-sidebar-item {
      padding: 20px 8px;
      font-size: 14px;
    }
    
    .van-sidebar-item--select {
      color: #e93323;
      border-left: 3px solid #e93323;
    }
  }
}

.category-content {
  flex: 1;
  overflow-y: auto;
  background: #fff;
  
  .loading {
    padding: 50px 0;
    text-align: center;
  }
  
  .sub-category {
    padding: 10px;
    
    .sub-icon {
      width: 50px;
      height: 50px;
      border-radius: 8px;
    }
    
    .sub-name {
      font-size: 12px;
      color: #666;
    }
  }
  
  .product-list {
    padding: 0 10px;
    
    ::v-deep .van-card {
      margin-bottom: 10px;
      background: #fff;
    }
  }
}
</style>

