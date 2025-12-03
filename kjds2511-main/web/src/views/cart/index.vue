<template>
  <div class="cart-page">
    <!-- 空购物车 -->
    <van-empty v-if="cartList.length === 0" description="购物车还是空的">
      <van-button round type="danger" class="bottom-button" @click="goIndex">去逛逛</van-button>
    </van-empty>

    <!-- 购物车列表 -->
    <div v-else>
      <!-- 提示信息 -->
      <van-notice-bar
        left-icon="volume-o"
        text="100%正品保证，所有商品精挑细选，售后无忧"
      />

      <!-- 有效商品 -->
      <div v-if="validList.length > 0" class="cart-section">
        <div class="section-header">
          <span>购物数量 <text class="count">{{ cartCount }}</text></span>
          <van-button plain size="small" @click="isEdit = !isEdit">
            {{ isEdit ? '完成' : '管理' }}
          </van-button>
        </div>

        <van-checkbox-group v-model="checkedIds" @change="onCheckChange">
          <van-swipe-cell v-for="item in validList" :key="item.id">
            <div class="cart-item">
              <van-checkbox :name="item.id" />
              <van-card
                :price="item.vipPrice || item.price"
                :title="item.storeName"
                :thumb="item.image"
                @click="goDetail(item.productId)"
              >
                <template #desc>
                  <div v-if="item.suk" class="sku-info">属性：{{ item.suk }}</div>
                </template>
                <template #num>
                  <van-stepper
                    v-model="item.cartNum"
                    :min="1"
                    :max="item.stock"
                    @change="onNumChange(item)"
                  />
                </template>
              </van-card>
            </div>
            <template #right>
              <van-button square type="danger" text="删除" @click="deleteItem(item.id)" />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>

      <!-- 失效商品 -->
      <div v-if="invalidList.length > 0" class="invalid-section">
        <van-cell-group>
          <van-cell title="失效商品" :value="`${invalidList.length}件`">
            <template #right-icon>
              <van-button plain size="small" @click="clearInvalid">清空</van-button>
            </template>
          </van-cell>
          <div v-for="item in invalidList" :key="item.id" class="invalid-item">
            <van-card
              :title="item.storeName"
              :thumb="item.image"
            >
              <template #price>
                <span class="invalid-price">已失效</span>
              </template>
              <template #desc>
                <div class="reselect-btn" @click="reselect(item)">重新选择</div>
              </template>
            </van-card>
          </div>
        </van-cell-group>
      </div>

      <!-- 底部结算栏 -->
      <van-submit-bar
        :price="totalPrice * 100"
        :disabled="checkedIds.length === 0"
        :button-text="isEdit ? `删除(${checkedIds.length})` : `结算(${checkedIds.length})`"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checkAll" @click="onCheckAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { getCartList, changeCartNum, deleteCart } from '@/api/order'

export default {
  name: 'Cart',
  data() {
    return {
      cartList: [],
      validList: [],
      invalidList: [],
      checkedIds: [],
      checkAll: false,
      isEdit: false
    }
  },
  computed: {
    cartCount() {
      return this.validList.reduce((total, item) => total + item.cartNum, 0)
    },
    totalPrice() {
      return this.validList
        .filter(item => this.checkedIds.includes(item.id))
        .reduce((total, item) => {
          const price = item.vipPrice || item.price
          return total + price * item.cartNum
        }, 0)
    }
  },
  created() {
    this.getCartList()
  },
  methods: {
    async getCartList() {
      const res = await getCartList()
      if (res && res.code === 200 && res.data) {
        this.validList = res.data.valid || []
        this.invalidList = res.data.invalid || []
        // 默认全选
        this.checkedIds = this.validList.map(item => item.id)
        this.checkAll = this.checkedIds.length === this.validList.length
      } else {
        // 使用模拟数据
        const placeholder = require('@/assets/images/placeholder.svg')
        this.validList = [
          { 
            id: 1, 
            productId: 1,
            storeName: '示例商品1', 
            image: placeholder, 
            price: '99.00',
            cartNum: 1,
            stock: 100,
            suk: '黑色 128G'
          }
        ]
        this.checkedIds = [1]
      }
    },
    onCheckChange() {
      this.checkAll = this.checkedIds.length === this.validList.length
    },
    onCheckAll() {
      if (this.checkAll) {
        this.checkedIds = this.validList.map(item => item.id)
      } else {
        this.checkedIds = []
      }
    },
    async onNumChange(item) {
      // 调用 API 更新数量
      await changeCartNum({ id: item.id, number: item.cartNum })
    },
    async deleteItem(id) {
      this.$dialog.confirm({
        title: '提示',
        message: '确定要删除该商品吗？'
      }).then(async () => {
        await deleteCart({ ids: id })
        this.validList = this.validList.filter(item => item.id !== id)
        this.checkedIds = this.checkedIds.filter(cid => cid !== id)
        this.$toast.success('删除成功')
      }).catch(() => {})
    },
    async clearInvalid() {
      this.$dialog.confirm({
        title: '提示',
        message: '确定要清空失效商品吗？'
      }).then(async () => {
        const ids = this.invalidList.map(item => item.id).join(',')
        await deleteCart({ ids })
        this.invalidList = []
        this.$toast.success('清空成功')
      }).catch(() => {})
    },
    reselect(item) {
      this.$router.push(`/goods/${item.productId}`)
    },
    onSubmit() {
      if (this.isEdit) {
        // 删除模式
        if (this.checkedIds.length === 0) {
          this.$toast('请选择要删除的商品')
          return
        }
        this.$dialog.confirm({
          title: '提示',
          message: `确定要删除选中的${this.checkedIds.length}件商品吗？`
        }).then(async () => {
          await deleteCart({ ids: this.checkedIds.join(',') })
          this.validList = this.validList.filter(item => !this.checkedIds.includes(item.id))
          this.checkedIds = []
          this.$toast.success('删除成功')
        }).catch(() => {})
      } else {
        // 结算模式
        if (this.checkedIds.length === 0) {
          this.$toast('请选择要结算的商品')
          return
        }
        this.$router.push({ 
          path: '/order/confirm', 
          query: { cartIds: this.checkedIds.join(',') }
        })
      }
    },
    goIndex() {
      this.$router.push('/')
    },
    goDetail(id) {
      this.$router.push(`/goods/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 60px;
}

.bottom-button {
  margin-top: 20px;
}

.cart-section {
  margin-bottom: 10px;
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background: #fff;
    
    .count {
      color: #e93323;
      font-weight: bold;
    }
  }
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: #fff;
  
  ::v-deep .van-checkbox {
    margin-right: 10px;
  }
  
  ::v-deep .van-card {
    flex: 1;
    background: transparent;
    
    .van-card__thumb {
      width: 80px;
      height: 80px;
    }
  }
  
  .sku-info {
    color: #999;
    font-size: 12px;
    margin-top: 5px;
  }
}

.invalid-section {
  margin-top: 10px;
  
  .invalid-item {
    padding: 10px 15px;
    background: #fff;
    
    ::v-deep .van-card {
      background: transparent;
      opacity: 0.6;
      
      .van-card__thumb {
        width: 80px;
        height: 80px;
      }
    }
    
    .invalid-price {
      color: #999;
      font-size: 14px;
    }
    
    .reselect-btn {
      display: inline-block;
      padding: 4px 12px;
      background: #e93323;
      color: #fff;
      border-radius: 4px;
      font-size: 12px;
      margin-top: 5px;
    }
  }
}

::v-deep .van-submit-bar {
  bottom: 50px;
  
  .van-checkbox {
    margin-right: 10px;
  }
}
</style>

