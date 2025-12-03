// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2025 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  // ========== 首页 ==========
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/index/index.vue'),
    meta: { title: '首页' }
  },
  
  // ========== 商品相关 ==========
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('@/views/goods/list.vue'),
    meta: { title: '商品列表' }
  },
  {
    path: '/goods/:id',
    name: 'GoodsDetail',
    component: () => import('@/views/goods/detail.vue'),
    meta: { title: '商品详情' }
  },
  {
    path: '/goods/search',
    name: 'GoodsSearch',
    component: () => import('@/views/goods/search.vue'),
    meta: { title: '搜索商品' }
  },
  {
    path: '/goods/comment/:id',
    name: 'GoodsComment',
    component: () => import('@/views/goods/comment.vue'),
    meta: { title: '商品评价' }
  },
  {
    path: '/goods/logistics/:orderId',
    name: 'GoodsLogistics',
    component: () => import('@/views/goods/logistics.vue'),
    meta: { title: '物流信息', requiresAuth: true }
  },
  
  // ========== 分类 ==========
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/category/index.vue'),
    meta: { title: '商品分类' }
  },
  
  // ========== 购物车 ==========
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/cart/index.vue'),
    meta: { title: '购物车', requiresAuth: true }
  },
  
  // ========== 订单相关 ==========
  {
    path: '/order/confirm',
    name: 'OrderConfirm',
    component: () => import('@/views/order/confirm.vue'),
    meta: { title: '确认订单', requiresAuth: true }
  },
  {
    path: '/order/list',
    name: 'OrderList',
    component: () => import('@/views/order/list.vue'),
    meta: { title: '我的订单', requiresAuth: true }
  },
  {
    path: '/order/:id',
    name: 'OrderDetail',
    component: () => import('@/views/order/detail.vue'),
    meta: { title: '订单详情', requiresAuth: true }
  },
  {
    path: '/order/payment/:orderId',
    name: 'OrderPayment',
    component: () => import('@/views/order/payment.vue'),
    meta: { title: '订单支付', requiresAuth: true }
  },
  {
    path: '/order/pay-status',
    name: 'OrderPayStatus',
    component: () => import('@/views/order/pay-status.vue'),
    meta: { title: '支付结果', requiresAuth: true }
  },
  {
    path: '/order/refund/:orderId',
    name: 'OrderRefund',
    component: () => import('@/views/order/refund.vue'),
    meta: { title: '申请退款', requiresAuth: true }
  },
  {
    path: '/order/refund-list',
    name: 'OrderRefundList',
    component: () => import('@/views/order/refund-list.vue'),
    meta: { title: '退款列表', requiresAuth: true }
  },
  
  // ========== 用户中心 ==========
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/index.vue'),
    meta: { title: '个人中心', requiresAuth: true }
  },
  {
    path: '/user/info',
    name: 'UserInfo',
    component: () => import('@/views/user/info.vue'),
    meta: { title: '个人资料', requiresAuth: true }
  },
  {
    path: '/user/address',
    name: 'UserAddress',
    component: () => import('@/views/user/address.vue'),
    meta: { title: '地址管理', requiresAuth: true }
  },
  {
    path: '/user/address/edit',
    name: 'UserAddressEdit',
    component: () => import('@/views/user/address-edit.vue'),
    meta: { title: '编辑地址', requiresAuth: true }
  },
  {
    path: '/user/coupon',
    name: 'UserCoupon',
    component: () => import('@/views/user/coupon.vue'),
    meta: { title: '我的优惠券', requiresAuth: true }
  },
  {
    path: '/user/coupon/receive',
    name: 'UserCouponReceive',
    component: () => import('@/views/user/coupon-receive.vue'),
    meta: { title: '领取优惠券' }
  },
  {
    path: '/user/collection',
    name: 'UserCollection',
    component: () => import('@/views/user/collection.vue'),
    meta: { title: '我的收藏', requiresAuth: true }
  },
  {
    path: '/user/sign',
    name: 'UserSign',
    component: () => import('@/views/user/sign.vue'),
    meta: { title: '签到', requiresAuth: true }
  },
  {
    path: '/user/sign/record',
    name: 'UserSignRecord',
    component: () => import('@/views/user/sign-record.vue'),
    meta: { title: '签到记录', requiresAuth: true }
  },
  {
    path: '/user/account',
    name: 'UserAccount',
    component: () => import('@/views/user/account.vue'),
    meta: { title: '我的账户', requiresAuth: true }
  },
  {
    path: '/user/bill',
    name: 'UserBill',
    component: () => import('@/views/user/bill.vue'),
    meta: { title: '账单明细', requiresAuth: true }
  },
  {
    path: '/user/integral',
    name: 'UserIntegral',
    component: () => import('@/views/user/integral.vue'),
    meta: { title: '积分详情', requiresAuth: true }
  },
  {
    path: '/user/recharge',
    name: 'UserRecharge',
    component: () => import('@/views/user/recharge.vue'),
    meta: { title: '余额充值', requiresAuth: true }
  },
  {
    path: '/user/vip',
    name: 'UserVip',
    component: () => import('@/views/user/vip.vue'),
    meta: { title: '会员中心', requiresAuth: true }
  },
  {
    path: '/user/password',
    name: 'UserPassword',
    component: () => import('@/views/user/password.vue'),
    meta: { title: '修改密码', requiresAuth: true }
  },
  {
    path: '/user/phone',
    name: 'UserPhone',
    component: () => import('@/views/user/phone.vue'),
    meta: { title: '修改手机号', requiresAuth: true }
  },
  
  // ========== 推广相关 ==========
  {
    path: '/promoter',
    name: 'Promoter',
    component: () => import('@/views/promoter/index.vue'),
    meta: { title: '推广中心', requiresAuth: true }
  },
  {
    path: '/promoter/list',
    name: 'PromoterList',
    component: () => import('@/views/promoter/list.vue'),
    meta: { title: '推广人列表', requiresAuth: true }
  },
  {
    path: '/promoter/order',
    name: 'PromoterOrder',
    component: () => import('@/views/promoter/order.vue'),
    meta: { title: '推广订单', requiresAuth: true }
  },
  {
    path: '/promoter/rank',
    name: 'PromoterRank',
    component: () => import('@/views/promoter/rank.vue'),
    meta: { title: '推广排行', requiresAuth: true }
  },
  {
    path: '/promoter/commission',
    name: 'PromoterCommission',
    component: () => import('@/views/promoter/commission.vue'),
    meta: { title: '佣金记录', requiresAuth: true }
  },
  {
    path: '/promoter/poster',
    name: 'PromoterPoster',
    component: () => import('@/views/promoter/poster.vue'),
    meta: { title: '分销海报', requiresAuth: true }
  },
  
  // ========== 活动相关 ==========
  {
    path: '/activity/seckill',
    name: 'ActivitySeckill',
    component: () => import('@/views/activity/seckill.vue'),
    meta: { title: '限时秒杀' }
  },
  {
    path: '/activity/seckill/:id',
    name: 'ActivitySeckillDetail',
    component: () => import('@/views/activity/seckill-detail.vue'),
    meta: { title: '秒杀详情' }
  },
  {
    path: '/activity/combination',
    name: 'ActivityCombination',
    component: () => import('@/views/activity/combination.vue'),
    meta: { title: '拼团活动' }
  },
  {
    path: '/activity/combination/:id',
    name: 'ActivityCombinationDetail',
    component: () => import('@/views/activity/combination-detail.vue'),
    meta: { title: '拼团详情' }
  },
  {
    path: '/activity/bargain',
    name: 'ActivityBargain',
    component: () => import('@/views/activity/bargain.vue'),
    meta: { title: '砍价活动' }
  },
  {
    path: '/activity/bargain/:id',
    name: 'ActivityBargainDetail',
    component: () => import('@/views/activity/bargain-detail.vue'),
    meta: { title: '砍价详情' }
  },
  {
    path: '/activity/bargain/record',
    name: 'ActivityBargainRecord',
    component: () => import('@/views/activity/bargain-record.vue'),
    meta: { title: '砍价记录', requiresAuth: true }
  },
  
  // ========== 资讯相关 ==========
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/news/list.vue'),
    meta: { title: '资讯列表' }
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: () => import('@/views/news/detail.vue'),
    meta: { title: '资讯详情' }
  },
  
  // ========== 登录注册 ==========
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/register.vue'),
    meta: { title: '注册' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title + ' - CRMEB商城'
  }
  
  // 检查是否需要登录
  if (to.meta.requiresAuth && !store.state.app.token) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router

