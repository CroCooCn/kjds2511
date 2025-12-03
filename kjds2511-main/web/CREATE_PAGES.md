# Web端页面创建指南

## 已完成
✅ 路由配置已更新 - `src/router/index.js`
✅ 目录结构已创建

## 需要创建的页面列表

### 商品相关 (goods/)
- [x] list.vue - 商品列表 (已存在)
- [x] detail.vue - 商品详情 (已存在)
- [x] search.vue - 搜索商品 (已存在)
- [ ] comment.vue - 商品评价
- [ ] logistics.vue - 物流信息

### 订单相关 (order/)
- [x] confirm.vue - 确认订单 (已存在)
- [x] list.vue - 订单列表 (已存在)
- [x] detail.vue - 订单详情 (已存在)
- [ ] payment.vue - 订单支付
- [ ] pay-status.vue - 支付结果
- [ ] refund.vue - 申请退款
- [ ] refund-list.vue - 退款列表

### 用户中心 (user/)
- [x] index.vue - 个人中心 (已存在)
- [ ] info.vue - 个人资料
- [ ] address.vue - 地址管理
- [ ] address-edit.vue - 编辑地址
- [ ] coupon.vue - 我的优惠券
- [ ] coupon-receive.vue - 领取优惠券
- [ ] collection.vue - 我的收藏
- [ ] sign.vue - 签到
- [ ] sign-record.vue - 签到记录
- [ ] account.vue - 我的账户
- [ ] bill.vue - 账单明细
- [ ] integral.vue - 积分详情
- [ ] recharge.vue - 余额充值
- [ ] vip.vue - 会员中心
- [ ] password.vue - 修改密码
- [ ] phone.vue - 修改手机号

### 推广相关 (promoter/)
- [ ] index.vue - 推广中心
- [ ] list.vue - 推广人列表
- [ ] order.vue - 推广订单
- [ ] rank.vue - 推广排行
- [ ] commission.vue - 佣金记录
- [ ] poster.vue - 分销海报

### 活动相关 (activity/)
- [ ] seckill.vue - 限时秒杀
- [ ] seckill-detail.vue - 秒杀详情
- [ ] combination.vue - 拼团活动
- [ ] combination-detail.vue - 拼团详情
- [ ] bargain.vue - 砍价活动
- [ ] bargain-detail.vue - 砍价详情
- [ ] bargain-record.vue - 砍价记录

### 资讯相关 (news/)
- [ ] list.vue - 资讯列表
- [ ] detail.vue - 资讯详情

## 基础模板

每个页面使用以下基础模板：

```vue
<template>
  <div class="page-container">
    <div class="page-header">
      <h1>{{ pageTitle }}</h1>
    </div>
    <div class="page-content">
      <p>{{ pageTitle }}页面正在开发中...</p>
      <p>参考app端对应页面进行开发</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageName',
  data() {
    return {
      pageTitle: '页面标题'
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      // TODO: 加载数据
      console.log('加载数据...')
    }
  }
}
</script>

<style scoped>
.page-container {
  padding: 20px;
  min-height: 100vh;
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
}

.page-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>
```

## 快速创建命令

使用PowerShell批量创建页面文件（在web目录下执行）：

```powershell
# 创建所有缺失的页面
$pages = @(
  "goods/comment.vue",
  "goods/logistics.vue",
  "order/payment.vue",
  "order/pay-status.vue",
  "order/refund.vue",
  "order/refund-list.vue",
  "user/info.vue",
  "user/address.vue",
  "user/address-edit.vue",
  "user/coupon.vue",
  "user/coupon-receive.vue",
  "user/collection.vue",
  "user/sign.vue",
  "user/sign-record.vue",
  "user/account.vue",
  "user/bill.vue",
  "user/integral.vue",
  "user/recharge.vue",
  "user/vip.vue",
  "user/password.vue",
  "user/phone.vue",
  "promoter/index.vue",
  "promoter/list.vue",
  "promoter/order.vue",
  "promoter/rank.vue",
  "promoter/commission.vue",
  "promoter/poster.vue",
  "activity/seckill.vue",
  "activity/seckill-detail.vue",
  "activity/combination.vue",
  "activity/combination-detail.vue",
  "activity/bargain.vue",
  "activity/bargain-detail.vue",
  "activity/bargain-record.vue",
  "news/list.vue",
  "news/detail.vue"
)

foreach ($page in $pages) {
  $fullPath = "src/views/$page"
  if (!(Test-Path $fullPath)) {
    Write-Host "Creating $fullPath"
    # 这里需要手动创建或使用模板
  }
}
```

## 下一步

1. 运行上面的PowerShell脚本创建所有页面文件
2. 每个页面使用基础模板
3. 根据app端对应页面逐步完善功能
4. 测试所有路由是否可以正常访问
