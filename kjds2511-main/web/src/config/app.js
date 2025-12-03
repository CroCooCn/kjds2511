// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2025 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

// Web端商城API
let domain = process.env.VUE_APP_BASE_API || 'http://localhost:8080'

export default {
  // 请求域名
  HTTP_REQUEST_URL: domain,
  // H5商城地址
  HTTP_H5_URL: 'http://java.crmeb.net',
  HEADER: {
    'content-type': 'application/json'
  },
  HEADERPARAMS: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  // 会话密钥名称
  TOKENNAME: 'Authori-zation',
  // 缓存时间 0 永久
  EXPIRE: 0,
  // 分页最多显示条数
  LIMIT: 10
}

