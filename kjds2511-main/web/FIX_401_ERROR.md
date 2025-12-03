# 修復 401 錯誤完整指南

## 🎯 問題診斷

您已經添加了 `Authori-zation: o-Vlj7EwVlepoNcjpQPM0u29im`，但仍然返回 401。

**根本原因：**
1. **Token 已過期**：Token 有效期是 5 小時，可能已經過期
2. **Token 不存在**：該 token 在 Redis 中不存在
3. **需要重新登錄**：必須重新登錄獲取新的有效 token

---

## ✅ 立即解決方案（3步）

### 步驟 1：重新登錄獲取新 Token

**在 Apifox/Postman 中執行：**

```
POST http://localhost:8080/api/front/login
Content-Type: application/json

{
  "account": "18292417675",
  "password": "Test123456"
}
```

**重要：**
- 複製**完整的** `data.token` 值
- 不要截斷或修改
- Token 格式類似：`o-Vlj7EwVlepoNcjpQPM0u29im`（32位字符）

---

### 步驟 2：立即驗證 Token

**在獲取 token 後，立即測試：**

```
POST http://localhost:8080/api/front/token/is/exist
Headers:
  Authori-zation: 剛才獲取的新token
```

**預期結果：**
```json
{
  "code": 200,
  "data": true
}
```

**如果返回 `false` 或 401：**
- 檢查後端 Redis 是否運行
- 檢查後端日誌是否有錯誤
- 確認數據庫密碼已更新

---

### 步驟 3：使用新 Token 測試接口

**現在使用新 token 測試：**

```
GET http://localhost:8080/api/front/product/good
Headers:
  Authori-zation: 剛才獲取的新token
```

**應該可以成功了！**

---

## 🔍 深度診斷

### 檢查 1：確認 Token 格式

根據後端代碼：
- **Token 格式**：32位 UUID（去掉連字符），例如：`o-Vlj7EwVlepoNcjpQPM0u29im`
- **Redis Key**：`TOKEN_USER:{token}`，例如：`TOKEN_USER:o-Vlj7EwVlepoNcjpQPM0u29im`
- **Header 名稱**：`Authori-zation`（注意中間有連字符）

### 檢查 2：確認 Redis 運行

如果 Redis 未運行，token 無法保存，會導致所有請求返回 401。

**檢查方法：**
1. 查看後端日誌，是否有 Redis 連接錯誤
2. 如果 Redis 在本地，執行：`redis-cli ping`，應該返回 `PONG`

### 檢查 3：確認 Token 有效期

- **Token 有效期**：5 小時（調試模式）
- **過期後**：需要重新登錄

---

## 🐛 常見問題排查

### Q1: 為什麼登錄後立即使用還是 401？

**可能原因：**
1. **Redis 未啟動**：檢查 Redis 服務
2. **Redis 配置錯誤**：檢查後端 `application.yml` 中的 Redis 配置
3. **Token 未正確保存**：檢查後端日誌

**解決方法：**
```bash
# 1. 檢查 Redis 是否運行
redis-cli ping

# 2. 檢查後端日誌
# 查看是否有 Redis 連接錯誤

# 3. 重啟後端服務
```

### Q2: Token 格式正確，為什麼還是 401？

**檢查清單：**
- [ ] Token 是否完整（32位字符）
- [ ] Header 名稱是否正確（`Authori-zation`）
- [ ] Token 是否剛獲取（未過期）
- [ ] Redis 是否運行
- [ ] 後端服務是否正常

### Q3: 如何確認 Token 在 Redis 中？

**方法 1：使用 Redis CLI**
```bash
redis-cli
> KEYS TOKEN_USER:*
> GET TOKEN_USER:o-Vlj7EwVlepoNcjpQPM0u29im
```

**方法 2：使用 token 驗證接口**
```
POST http://localhost:8080/api/front/token/is/exist
Headers:
  Authori-zation: 您的token
```

---

## 🚀 完整測試流程

### 1. 準備工作

```bash
# 確認後端運行
curl http://localhost:8080/api/front/index

# 確認 Redis 運行（如果本地）
redis-cli ping
```

### 2. 登錄獲取 Token

```
POST http://localhost:8080/api/front/login
Content-Type: application/json

{
  "account": "18292417675",
  "password": "Test123456"
}
```

**保存返回的 `data.token`**

### 3. 驗證 Token

```
POST http://localhost:8080/api/front/token/is/exist
Headers:
  Authori-zation: {剛才的token}
```

**確認返回 `{"code": 200, "data": true}`**

### 4. 測試業務接口

```
GET http://localhost:8080/api/front/product/good
Headers:
  Authori-zation: {剛才的token}
```

---

## 💡 最佳實踐

### 在 Apifox 中設置環境變量

1. **創建環境變量 `token`**
2. **在登錄接口的後置操作中：**
   - 提取變量：`$.data.token` → `token`
3. **在所有請求的 Headers 中：**
   - `Authori-zation: {{token}}`

這樣所有請求都會自動使用最新的 token。

---

## 🔧 如果問題持續存在

### 檢查清單

- [ ] **後端服務運行**：`http://localhost:8080`
- [ ] **Redis 運行**：`redis-cli ping` 返回 `PONG`
- [ ] **數據庫密碼已更新**：執行 SQL 更新密碼
- [ ] **用戶狀態正常**：`status = 1`
- [ ] **重新登錄獲取新 token**：不要使用舊 token
- [ ] **立即測試**：獲取 token 後立即使用，不要等待

### 如果還是不行

1. **查看後端日誌**：檢查是否有錯誤信息
2. **檢查 Redis 連接**：確認 Redis 配置正確
3. **重啟後端服務**：確保所有配置生效

---

## 📝 測試賬號

| 賬號 | 密碼 | 加密密碼 |
|------|------|---------|
| 18292417675 | Test123456 | uXSaS8Uro+xbKB9v4zv0TQ== |

**確保數據庫中密碼已更新！**

---

## 🎯 快速修復命令

```bash
# 1. 檢查 Redis
redis-cli ping

# 2. 重啟後端服務（如果需要）

# 3. 重新登錄獲取新 token
curl -X POST "http://localhost:8080/api/front/login" \
  -H "Content-Type: application/json" \
  -d '{"account":"18292417675","password":"Test123456"}'
```

---

**現在請重新登錄獲取新的 token，然後立即測試！**

如果問題仍然存在，請提供：
1. 後端日誌錯誤信息
2. Redis 連接狀態
3. 登錄接口的完整響應

