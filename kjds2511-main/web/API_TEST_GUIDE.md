# API 測試完整指南

## 🎯 問題分析

您測試 `GET http://localhost:8080/api/front/product/good` 時返回 401 錯誤。

**可能原因：**
1. 後端攔截器配置未生效（需要重啟後端服務）
2. 測試工具中沒有正確配置
3. 某些接口雖然被排除，但實際仍需要 token

---

## ✅ 解決方案

### 方案一：先登錄獲取 Token（推薦）

#### 步驟 1：登錄獲取 Token

**請求：**
```
POST http://localhost:8080/api/front/login
Content-Type: application/json

{
  "account": "18292417675",
  "password": "Test123456"
}
```

**成功響應：**
```json
{
  "code": 200,
  "message": "登錄成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "uid": 41,
    "nikeName": "用戶昵稱",
    "phone": "18292417675"
  }
}
```

**複製 `data.token` 的值**

#### 步驟 2：在測試工具中添加 Token

**在 Apifox/Postman 中：**

1. **方法一：使用 Headers**
   - 切換到 "Headers" 標籤
   - 添加 Header：
     - **Key**: `Authori-zation`
     - **Value**: `您的token值`（直接貼上，不需要加前綴）

2. **方法二：使用 Auth**
   - 切換到 "Auth" 標籤
   - 選擇 "Bearer Token" 或 "Custom"
   - 如果選擇 "Custom"：
     - **Header Name**: `Authori-zation`
     - **Token**: `您的token值`

#### 步驟 3：測試接口

現在再次測試 `GET http://localhost:8080/api/front/product/good`，應該可以成功。

---

### 方案二：檢查後端配置

如果 `/api/front/product/good` 應該不需要認證，但還是返回 401，可能是：

1. **後端服務未重啟**
   - 修改 `WebConfig.java` 後需要重啟後端服務
   - 確保配置生效

2. **檢查排除列表**
   - 確認 `WebConfig.java` 中有：
     ```java
     excludePathPatterns("/api/front/product/good")
     ```

3. **重啟後端服務**
   ```bash
   # 停止後端服務
   # 重新啟動後端服務
   ```

---

## 📋 接口分類

### 不需要認證的接口（公開接口）

這些接口在 `WebConfig.java` 中被排除，不需要 token：

| 接口 | 方法 | 說明 |
|------|------|------|
| `/api/front/index` | GET | 首頁數據 |
| `/api/front/login` | POST | 登錄 |
| `/api/front/product/good` | GET | 優選商品推薦 |
| `/api/front/product/hot` | GET | 熱門商品推薦 |
| `/api/front/category` | GET | 商品分類 |
| `/api/front/products/**` | GET | 商品列表 |
| `/api/front/product/detail/**` | GET | 商品詳情 |
| `/api/front/token/is/exist` | POST | 驗證 token |

### 需要認證的接口（需要 Token）

這些接口需要添加 `Authori-zation` Header：

| 接口 | 方法 | 說明 |
|------|------|------|
| `/api/front/user` | GET | 用戶信息 |
| `/api/front/cart/**` | GET/POST | 購物車 |
| `/api/front/order/**` | GET/POST | 訂單 |
| `/api/front/coupon/receive` | POST | 領取優惠券 |
| `/api/front/coupon/list` | GET | 我的優惠券 |

---

## 🧪 完整測試流程

### 1. 測試登錄接口

**請求：**
```
POST http://localhost:8080/api/front/login
Content-Type: application/json

{
  "account": "18292417675",
  "password": "Test123456"
}
```

**預期結果：**
- Status: 200
- Body: `{"code": 200, "data": {"token": "..."}}`

### 2. 保存 Token

複製響應中的 `data.token` 值。

### 3. 設置環境變量（Apifox/Postman）

在 Apifox/Postman 中：
1. 創建環境變量 `token`
2. 將登錄返回的 token 值保存到 `token` 變量
3. 在需要認證的請求中，Header 設置為：
   - Key: `Authori-zation`
   - Value: `{{token}}`

### 4. 測試需要認證的接口

**示例：獲取用戶信息**
```
GET http://localhost:8080/api/front/user
Headers:
  Authori-zation: {{token}}
```

**示例：獲取購物車列表**
```
GET http://localhost:8080/api/front/cart/list
Headers:
  Authori-zation: {{token}}
```

### 5. 測試不需要認證的接口

**示例：優選商品推薦**
```
GET http://localhost:8080/api/front/product/good
（不需要 Headers）
```

---

## 🔧 在 Apifox 中配置 Token

### 方法一：手動添加 Header

1. 打開請求
2. 切換到 "Headers" 標籤
3. 添加：
   - **參數名**: `Authori-zation`
   - **參數值**: `您的token值`

### 方法二：使用環境變量

1. **創建環境變量**
   - 點擊右上角環境切換
   - 創建新環境或編輯現有環境
   - 添加變量：
     - **變量名**: `token`
     - **變量值**: `您的token值`

2. **在請求中使用**
   - Headers 中設置：
     - **參數名**: `Authori-zation`
     - **參數值**: `{{token}}`

### 方法三：使用後置操作自動保存 Token

1. 在登錄接口的 "後置操作" 中添加：
   - **操作類型**: 提取變量
   - **變量名**: `token`
   - **提取表達式**: `$.data.token`（JSONPath）

2. 後續請求自動使用 `{{token}}`

---

## 🐛 常見問題

### Q: 為什麼 `/api/front/product/good` 還是返回 401？

**A:** 可能原因：
1. **後端服務未重啟**：修改配置後需要重啟
2. **攔截器配置問題**：檢查 `WebConfig.java` 中的排除列表
3. **路徑匹配問題**：確認路徑完全匹配

**解決方法：**
- 重啟後端服務
- 或者直接添加 token（即使理論上不需要）

### Q: 如何確認 Token 是否有效？

**A:** 測試 token 驗證接口：
```
POST http://localhost:8080/api/front/token/is/exist
Headers:
  Authori-zation: 您的token值
```

**成功響應：**
```json
{
  "code": 200,
  "data": true
}
```

### Q: Token 過期了怎麼辦？

**A:** 重新登錄獲取新的 token。

### Q: 如何在瀏覽器中測試？

**A:** 在瀏覽器控制台執行：
```javascript
// 先登錄
const loginRes = await fetch('http://localhost:8080/api/front/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    account: '18292417675',
    password: 'Test123456'
  })
});
const loginData = await loginRes.json();
const token = loginData.data.token;

// 使用 token 測試接口
const res = await fetch('http://localhost:8080/api/front/product/good', {
  headers: { 'Authori-zation': token }
});
const data = await res.json();
console.log(data);
```

---

## 📝 測試賬號

| 賬號 | 密碼 | 狀態 |
|------|------|------|
| 18292417675 | Test123456 | ✅ 可用 |
| 18868590679 | Test123456 | ✅ 可用 |

**注意：** 確保數據庫中這些賬號的密碼已更新為加密後的密碼。

---

## 🚀 快速測試腳本

### 使用 cURL

```bash
# 1. 登錄獲取 token
TOKEN=$(curl -X POST "http://localhost:8080/api/front/login" \
  -H "Content-Type: application/json" \
  -d '{"account":"18292417675","password":"Test123456"}' \
  | jq -r '.data.token')

# 2. 使用 token 測試接口
curl -X GET "http://localhost:8080/api/front/product/good" \
  -H "Authori-zation: $TOKEN"
```

### 使用 JavaScript (Node.js)

```javascript
const axios = require('axios');

async function test() {
  // 1. 登錄
  const loginRes = await axios.post('http://localhost:8080/api/front/login', {
    account: '18292417675',
    password: 'Test123456'
  });
  
  const token = loginRes.data.data.token;
  console.log('Token:', token);
  
  // 2. 測試接口
  const res = await axios.get('http://localhost:8080/api/front/product/good', {
    headers: { 'Authori-zation': token }
  });
  
  console.log('結果:', res.data);
}

test();
```

---

現在您可以正確測試所有接口了！

