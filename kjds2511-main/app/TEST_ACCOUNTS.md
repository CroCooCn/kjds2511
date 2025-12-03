# 測試賬號信息

根據您的代碼和數據庫配置，以下是可用的測試賬號：

## 前端 H5 測試賬號

### 賬號密碼登錄

**API 地址：** `POST http://localhost:8080/api/front/login`

**請求參數：**
```json
{
  "account": "18292417675",
  "password": "Crmeb_123456",
  "spread_spid": 0
}
```

**測試賬號信息：**
- **賬號（手機號）**: `18292417675`
- **密碼**: `Crmeb_123456`
- **用戶ID**: `41`
- **用戶昵稱**: `夏至已至`

### 手機號驗證碼登錄

**API 地址：** `POST http://localhost:8080/api/front/login/mobile`

**請求參數：**
```json
{
  "phone": "18292417675",
  "captcha": "驗證碼",
  "spread_spid": 0
}
```

**注意：** 需要先調用發送驗證碼接口獲取驗證碼

---

## 後台管理端測試賬號

**API 地址：** `POST http://localhost:8080/api/admin/login`

**請求參數：**
```json
{
  "account": "admin",
  "password": "123456"
}
```

**測試賬號信息：**
- **賬號**: `admin`
- **密碼**: `123456`

---

## 快速測試示例

### 使用 Postman/Apifox 測試

1. **設置請求：**
   - Method: `POST`
   - URL: `http://localhost:8080/api/front/login`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "account": "18292417675",
       "password": "Crmeb_123456"
     }
     ```

2. **發送請求後，您會收到：**
   ```json
   {
     "code": 200,
     "message": "登錄成功",
     "data": {
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
       "uid": 41,
       "nikeName": "夏至已至",
       "phone": "18292417675"
     }
   }
   ```

3. **使用 Token 測試其他 API：**
   - 複製 `data.token` 的值
   - 在後續請求的 Headers 中添加：
     ```
     Authori-zation: 您的token值
     ```

### 使用瀏覽器測試工具

1. 打開 `app/test-login.html` 文件
2. 測試賬號已預填：
   - 賬號：`18292417675`
   - 密碼：`Crmeb_123456`
3. 點擊「登錄」按鈕
4. 登錄成功後，token 會自動保存到 LocalStorage

### 使用瀏覽器控制台

在瀏覽器控制台執行：

```javascript
(async function() {
  const response = await fetch('http://localhost:8080/api/front/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      account: '18292417675',
      password: 'Crmeb_123456'
    })
  });
  
  const result = await response.json();
  
  if (result.code === 200) {
    localStorage.setItem('LOGIN_STATUS', result.data.token);
    localStorage.setItem('UID', result.data.uid);
    localStorage.setItem('USER_INFO', JSON.stringify({
      nickname: result.data.nikeName,
      phone: result.data.phone
    }));
    console.log('✅ 登錄成功！Token:', result.data.token);
    location.reload();
  } else {
    console.error('❌ 登錄失敗:', result.message);
  }
})();
```

---

## 測試 API 列表

登錄後，可以使用以下 API 進行測試：

### 1. 獲取用戶信息
- **URL**: `GET http://localhost:8080/api/front/user`
- **Headers**: `Authori-zation: 您的token`

### 2. 商品列表
- **URL**: `GET http://localhost:8080/api/front/product/good?page=1&limit=10`
- **Headers**: `Authori-zation: 您的token`（可選，此接口不需要登錄）

### 3. 購物車列表
- **URL**: `GET http://localhost:8080/api/front/cart/list`
- **Headers**: `Authori-zation: 您的token`

### 4. 訂單列表
- **URL**: `GET http://localhost:8080/api/front/order/list?page=1&limit=10`
- **Headers**: `Authori-zation: 您的token`

---

## 注意事項

1. **API 地址配置**：確保 `app/config/app.js` 中的 `domain` 設置正確
   ```javascript
   let domain = 'http://localhost:8080'  // 或您的實際後端地址
   ```

2. **Token 名稱**：注意是 `Authori-zation`（中間有連字符），不是 `Authorization`

3. **參數名稱**：
   - 登錄接口使用 `account`（實際對應手機號）
   - 不是 `phone` 或 `username`

4. **密碼加密**：後端會自動使用 DES 加密，使用手機號作為 key，前端無需手動加密

---

## 數據庫中的測試用戶

根據 SQL 文件，數據庫中已有以下測試用戶：

| 用戶ID | 賬號/手機號 | 密碼 | 昵稱 | 狀態 |
|--------|------------|------|------|------|
| 41 | 18292417675 | Crmeb_123456 | 夏至已至 | 正常 |

---

## 如果登錄失敗

1. **檢查後端服務**：確保後端運行在 `http://localhost:8080`
2. **檢查數據庫**：確認已執行 SQL 文件導入測試數據
3. **檢查賬號狀態**：確認用戶狀態為正常（status = 1）
4. **查看後端日誌**：檢查是否有錯誤信息

