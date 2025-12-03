<template>
  <div class="page-container">
    <div class="page-header">
      <h1>商品评价</h1>
    </div>
    <div class="page-content">
      <div class="developing-notice">
        <i class="el-icon-info"></i>
        <p>商品评价页面正在开发中...</p>
        <p class="tip">参考app端对应页面进行开发</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsComment',
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log('商品评价页面初始化')
      this.loadData()
    },
    loadData() {
      // TODO: 实现数据加载逻辑
    }
  }
}
</script>

<style scoped>
.page-container {
  padding: 20px;
  min-height: calc(100vh - 60px);
  background: #f5f5f5;
}

.page-header {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.page-header h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
  font-weight: 500;
}

.page-content {
  background: #fff;
  padding: 40px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-height: 400px;
}

.developing-notice {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.developing-notice i {
  font-size: 64px;
  color: #409EFF;
  margin-bottom: 20px;
}

.developing-notice p {
  font-size: 18px;
  margin: 10px 0;
}

.developing-notice .tip {
  font-size: 14px;
  color: #ccc;
}
</style>
