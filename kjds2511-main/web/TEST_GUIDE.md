# 測試指南

## 問題分析

您遇到的 401 錯誤是因為 API 請求需要登錄認證，但當前沒有有效的 token。

## 解決步驟

### 1. 確保後端服務正在運行

確保您的 Java 後端服務已經啟動並運行在 `http://localhost:8080`

### 2. 登錄獲取 Token

#### 方法一：通過 Web 界面登錄

1. 啟動前端項目：
   ```bash
   cd web
   npm install
   npm run dev
   ```

2. 訪問 `http://localhost:8081`（或配置的端口）

3. 點擊「登錄」按鈕，輸入賬號和密碼

4. 登錄成功後，token 會自動保存到瀏覽器的 Cookie 中

#### 方法二：通過 API 工具測試登錄

使用 Postman 或 Apifox 等工具：

**請求配置：**
- **URL**: `http://localhost:8080/api/front/login`
- **Method**: `POST`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (JSON):
  ```json
  {
    "account": "您的賬號",
    "password": "您的密碼"
  }
  ```

**成功響應示例：**
```json
{
  "code": 200,
  "message": "登錄成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "uid": 1,
    ...
  }
}
```

### 3. 使用 Token 測試其他 API

獲取 token 後，在後續請求中添加 Header：

```
Authori-zation: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**測試商品列表 API：**
- **URL**: `http://localhost:8080/api/front/product/good`
- **Method**: `GET`
- **Headers**: 
  ```
  Authori-zation: 您的token
  Content-Type: application/json
  ```

### 4. 檢查常見問題

#### 問題 1: Token 未正確設置
- 檢查瀏覽器 Cookie 中是否有 `token`
- 檢查請求 Headers 中是否包含 `Authori-zation`

#### 問題 2: Token 已過期
- 重新登錄獲取新的 token
- 檢查後端 token 過期時間配置

#### 問題 3: API 路徑錯誤
- 確認 API 路徑為 `/api/front/xxx`（前端接口）
- 不是 `/api/admin/xxx`（後台管理接口）

#### 問題 4: 後端服務未啟動
- 確認後端服務運行在 `http://localhost:8080`
- 檢查後端日誌是否有錯誤

### 5. 調試技巧

#### 在瀏覽器中檢查

1. 打開瀏覽器開發者工具（F12）
2. 切換到「Network」標籤
3. 發起請求
4. 查看請求 Headers，確認是否包含 `Authori-zation`
5. 查看響應內容，確認錯誤信息

#### 在代碼中調試

在 `src/utils/request.js` 中添加 console.log：

```javascript
service.interceptors.request.use(
  requestConfig => {
    const token = store.state.app.token
    console.log('當前 token:', token)
    console.log('請求 URL:', requestConfig.url)
    console.log('請求 Headers:', requestConfig.headers)
    // ...
  }
)
```

## 測試流程總結

1. ✅ 啟動後端服務（端口 8080）
2. ✅ 啟動前端服務（`npm run dev`）
3. ✅ 訪問登錄頁面
4. ✅ 輸入賬號密碼登錄
5. ✅ 登錄成功後，token 自動保存
6. ✅ 訪問需要認證的頁面（如商品列表）
7. ✅ 檢查 Network 請求，確認 token 已包含在 Headers 中

## 注意事項

- Token 名稱是 `Authori-zation`（注意拼寫，中間有連字符）
- 某些 API 可能不需要登錄（如首頁數據、商品列表等），這些 API 使用 `noAuth: true`
- 登錄後，token 會保存在 Cookie 中，刷新頁面不會丟失
- 如果 token 過期，會自動跳轉到登錄頁

