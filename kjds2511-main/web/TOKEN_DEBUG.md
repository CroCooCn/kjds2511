# Token 驗證問題排查指南

## 🔍 問題分析

您已經添加了 `Authori-zation: o-Vlj7EwVlepoNcjpQPM0u29im`，但仍然返回 401。

**可能原因：**
1. **Token 已過期**：Token 在 Redis 中已失效
2. **Token 格式問題**：需要確認 token 的完整格式
3. **Redis 連接問題**：後端無法訪問 Redis
4. **Token 不存在**：該 token 在 Redis 中不存在

---

## ✅ 解決步驟

### 步驟 1：重新登錄獲取新 Token

**重要：** 請先重新登錄，獲取最新的 token。

```
POST http://localhost:8080/api/front/login
Content-Type: application/json

{
  "account": "18292417675",
  "password": "Test123456"
}
```

**複製完整的 `data.token` 值**（不要截斷）

---

### 步驟 2：驗證 Token 是否有效

使用 token 驗證接口測試：

```
POST http://localhost:8080/api/front/token/is/exist
Headers:
  Authori-zation: 您的新token值
```

**預期結果：**
```json
{
  "code": 200,
  "data": true
}
```

如果返回 `false` 或 401，說明 token 無效。

---

### 步驟 3：檢查 Token 格式

根據後端代碼，token 的處理邏輯：

1. **Token 存儲格式**：`TOKEN_USER:{uuid}`
2. **發送時**：可以直接發送 uuid，也可以發送 `TOKEN_USER:{uuid}`
3. **後端會自動處理**：如果以 `TOKEN_USER:` 開頭，會自動去掉前綴

**所以您可以直接發送：**
- `o-Vlj7EwVlepoNcjpQPM0u29im` ✅
- 或 `TOKEN_USER:o-Vlj7EwVlepoNcjpQPM0u29im` ✅

---

### 步驟 4：檢查 Redis

如果後端可以訪問 Redis，檢查 token 是否存在：

**Redis Key 格式：** `TOKEN_USER:{token值}`

例如：`TOKEN_USER:o-Vlj7EwVlepoNcjpQPM0u29im`

**檢查方法：**
1. 連接到 Redis
2. 執行：`GET TOKEN_USER:o-Vlj7EwVlepoNcjpQPM0u29im`
3. 如果返回 `nil`，說明 token 不存在或已過期

---

## 🐛 常見問題

### Q: Token 為什麼會失效？

**A:** Token 有效期是 **5 小時**（調試模式），過期後需要重新登錄。

### Q: 如何確認 Token 是否在 Redis 中？

**A:** 
1. 連接到 Redis
2. 執行：`KEYS TOKEN_USER:*` 查看所有 token
3. 執行：`GET TOKEN_USER:{您的token}` 查看具體 token

### Q: 為什麼登錄後立即使用 token 還是 401？

**A:** 可能原因：
1. **Redis 未啟動**：檢查 Redis 服務是否運行
2. **Redis 配置錯誤**：檢查後端 Redis 配置
3. **Token 未正確保存**：檢查登錄接口是否成功返回 token

---

## 🔧 完整測試流程

### 1. 確認後端服務運行

```bash
# 檢查後端是否運行
curl http://localhost:8080/api/front/index
```

### 2. 確認 Redis 運行

```bash
# 如果 Redis 在本地
redis-cli ping
# 應該返回 PONG
```

### 3. 登錄獲取 Token

```
POST http://localhost:8080/api/front/login
Content-Type: application/json

{
  "account": "18292417675",
  "password": "Test123456"
}
```

### 4. 立即測試 Token

```
POST http://localhost:8080/api/front/token/is/exist
Headers:
  Authori-zation: 剛才獲取的token
```

### 5. 測試業務接口

```
GET http://localhost:8080/api/front/product/good
Headers:
  Authori-zation: 剛才獲取的token
```

---

## 💡 建議

1. **每次測試前重新登錄**：確保使用最新的 token
2. **使用 token 驗證接口**：先驗證 token 是否有效
3. **檢查 Redis**：確認 token 已正確保存
4. **檢查後端日誌**：查看是否有錯誤信息

---

## 🚀 快速修復

如果問題持續存在，請執行：

1. **重啟後端服務**
2. **確認 Redis 運行**
3. **重新登錄獲取新 token**
4. **立即測試**（不要等待太久）

現在請重新登錄獲取新的 token，然後再測試！

