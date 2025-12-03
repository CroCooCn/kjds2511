# CRMEB Web 商城前端

基于 Vue.js 的 Web 端商城前端项目，参考 app 端功能结构开发。

## 技术栈

- Vue 2.6
- Vue Router 3.x
- Vuex 3.x
- Axios
- Sass

## 项目结构

```
web/
├── public/              # 静态资源
├── src/
│   ├── api/            # API 接口
│   ├── assets/         # 资源文件
│   ├── components/     # 公共组件
│   ├── config/         # 配置文件
│   ├── filters/        # 过滤器
│   ├── router/         # 路由配置
│   ├── store/          # Vuex 状态管理
│   ├── styles/         # 样式文件
│   ├── utils/          # 工具函数
│   ├── views/          # 页面组件
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── .eslintrc.js        # ESLint 配置
├── vue.config.js       # Vue CLI 配置
└── package.json        # 项目配置
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build:prod
```

## 功能模块

- 首页
- 商品列表/详情
- 商品搜索
- 商品分类
- 购物车
- 订单管理
- 用户中心
- 登录/注册

## API 配置

在 `src/config/app.js` 中配置后端 API 地址。

## 参考

本项目参考了 `app` 端的页面结构和功能，适配 Web 端开发。

