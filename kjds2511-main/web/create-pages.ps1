# 批量创建Vue页面文件
# 在web目录下执行: .\create-pages.ps1

$baseTemplate = @'
<template>
  <div class="page-container">
    <div class="page-header">
      <h1>{{PAGE_TITLE}}</h1>
    </div>
    <div class="page-content">
      <div class="developing-notice">
        <i class="el-icon-info"></i>
        <p>{{PAGE_TITLE}}页面正在开发中...</p>
        <p class="tip">参考app端对应页面进行开发</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '{{COMPONENT_NAME}}',
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
      console.log('{{PAGE_TITLE}}页面初始化')
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
'@

# 定义所有需要创建的页面
$pages = @{
  "goods/comment.vue" = @{ title = "商品评价"; component = "GoodsComment" }
  "goods/logistics.vue" = @{ title = "物流信息"; component = "GoodsLogistics" }
  "order/payment.vue" = @{ title = "订单支付"; component = "OrderPayment" }
  "order/pay-status.vue" = @{ title = "支付结果"; component = "OrderPayStatus" }
  "order/refund.vue" = @{ title = "申请退款"; component = "OrderRefund" }
  "order/refund-list.vue" = @{ title = "退款列表"; component = "OrderRefundList" }
  "user/info.vue" = @{ title = "个人资料"; component = "UserInfo" }
  "user/address.vue" = @{ title = "地址管理"; component = "UserAddress" }
  "user/address-edit.vue" = @{ title = "编辑地址"; component = "UserAddressEdit" }
  "user/coupon.vue" = @{ title = "我的优惠券"; component = "UserCoupon" }
  "user/coupon-receive.vue" = @{ title = "领取优惠券"; component = "UserCouponReceive" }
  "user/collection.vue" = @{ title = "我的收藏"; component = "UserCollection" }
  "user/sign.vue" = @{ title = "签到"; component = "UserSign" }
  "user/sign-record.vue" = @{ title = "签到记录"; component = "UserSignRecord" }
  "user/account.vue" = @{ title = "我的账户"; component = "UserAccount" }
  "user/bill.vue" = @{ title = "账单明细"; component = "UserBill" }
  "user/integral.vue" = @{ title = "积分详情"; component = "UserIntegral" }
  "user/recharge.vue" = @{ title = "余额充值"; component = "UserRecharge" }
  "user/vip.vue" = @{ title = "会员中心"; component = "UserVip" }
  "user/password.vue" = @{ title = "修改密码"; component = "UserPassword" }
  "user/phone.vue" = @{ title = "修改手机号"; component = "UserPhone" }
  "promoter/index.vue" = @{ title = "推广中心"; component = "PromoterIndex" }
  "promoter/list.vue" = @{ title = "推广人列表"; component = "PromoterList" }
  "promoter/order.vue" = @{ title = "推广订单"; component = "PromoterOrder" }
  "promoter/rank.vue" = @{ title = "推广排行"; component = "PromoterRank" }
  "promoter/commission.vue" = @{ title = "佣金记录"; component = "PromoterCommission" }
  "promoter/poster.vue" = @{ title = "分销海报"; component = "PromoterPoster" }
  "activity/seckill.vue" = @{ title = "限时秒杀"; component = "ActivitySeckill" }
  "activity/seckill-detail.vue" = @{ title = "秒杀详情"; component = "ActivitySeckillDetail" }
  "activity/combination.vue" = @{ title = "拼团活动"; component = "ActivityCombination" }
  "activity/combination-detail.vue" = @{ title = "拼团详情"; component = "ActivityCombinationDetail" }
  "activity/bargain.vue" = @{ title = "砍价活动"; component = "ActivityBargain" }
  "activity/bargain-detail.vue" = @{ title = "砍价详情"; component = "ActivityBargainDetail" }
  "activity/bargain-record.vue" = @{ title = "砍价记录"; component = "ActivityBargainRecord" }
  "news/list.vue" = @{ title = "资讯列表"; component = "NewsList" }
  "news/detail.vue" = @{ title = "资讯详情"; component = "NewsDetail" }
}

$createdCount = 0
$skippedCount = 0

foreach ($page in $pages.GetEnumerator()) {
  $filePath = "src/views/$($page.Key)"
  $fullPath = Join-Path $PSScriptRoot $filePath
  
  if (Test-Path $fullPath) {
    Write-Host "跳过 (已存在): $filePath" -ForegroundColor Yellow
    $skippedCount++
    continue
  }
  
  # 创建目录
  $directory = Split-Path $fullPath -Parent
  if (!(Test-Path $directory)) {
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
  }
  
  # 替换模板中的占位符
  $content = $baseTemplate
  $content = $content.Replace("{{PAGE_TITLE}}", $page.Value.title)
  $content = $content.Replace("{{COMPONENT_NAME}}", $page.Value.component)
  
  # 写入文件
  $content | Out-File -FilePath $fullPath -Encoding UTF8
  Write-Host "创建成功: $filePath" -ForegroundColor Green
  $createdCount++
}

Write-Host "`n========== 创建完成 ==========" -ForegroundColor Cyan
Write-Host "创建: $createdCount 个文件" -ForegroundColor Green
Write-Host "跳过: $skippedCount 个文件" -ForegroundColor Yellow
Write-Host "总计: $($pages.Count) 个文件" -ForegroundColor Cyan
Write-Host "`n所有页面已创建完成！可以启动项目测试访问。" -ForegroundColor Green
