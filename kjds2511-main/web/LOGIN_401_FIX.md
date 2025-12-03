# 登錄接口 401 錯誤修復指南

## 🎯 問題診斷

登錄接口 `/api/front/login` 返回 401 錯誤，但該接口應該被排除在攔截器外。

**可能原因：**
1. **後端服務未重啟**：攔截器配置修改後需要重啟
2. **ResponseFilter 問題**：可能有其他過濾器攔截
3. **請求參數問題**：參數格式或名稱不正確

---

## ✅ 立即解決方案

### 方案一：重啟後端服務（推薦）

**如果後端服務正在運行，請重啟：**

1. 停止後端服務
2. 重新啟動後端服務
3. 等待服務完全啟動
4. 再次測試登錄接口

---

### 方案二：檢查請求格式

**正確的請求格式：**

```bash
curl -X POST "http://localhost:8080/api/front/login" ^
  -H "Content-Type: application/json" ^
  -d "{\"account\":\"18292417675\",\"password\":\"Test123456\"}"
```

**注意：**
- 使用 `account` 而不是 `phone`（雖然後端字段是 phone，但 JSON 使用 account）
- 確保 JSON 格式正確（Windows 命令行需要轉義引號）

---

### 方案三：使用 PowerShell（Windows）

**在 PowerShell 中執行：**

```powershell
$body = @{
    account = "18292417675"
    password = "Test123456"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/front/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

---

### 方案四：使用 Apifox/Postman

**請求配置：**
```
POST http://localhost:8080/api/front/login
Content-Type: application/json

{
  "account": "18292417675",
  "password": "Test123456"
}
```

---

## 🔍 深度排查

### 檢查 1：確認後端服務運行

```bash
# 測試首頁接口（不需要認證）
curl http://localhost:8080/api/front/index
```

如果這個也返回 401，說明攔截器配置有問題。

### 檢查 2：查看後端日誌

查看後端啟動日誌，確認：
- 攔截器是否正確註冊
- `/api/front/login` 是否在排除列表中
- 是否有錯誤信息

### 檢查 3：檢查 Redis 連接

如果 Redis 未連接，可能導致問題：

```bash
# 如果 Redis 在本地
redis-cli ping
# 應該返回 PONG
```

---

## 🐛 常見問題

### Q1: 為什麼登錄接口會返回 401？

**A:** 可能原因：
1. **攔截器配置未生效**：需要重啟後端服務
2. **路徑匹配問題**：確認路徑完全匹配 `/api/front/login`
3. **其他過濾器**：可能有其他過濾器攔截

### Q2: 重啟後還是 401？

**A:** 檢查：
1. **後端日誌**：查看是否有錯誤
2. **攔截器註冊**：確認 `WebConfig` 是否被加載
3. **路徑匹配**：確認請求路徑是否正確

### Q3: 如何確認攔截器配置生效？

**A:** 
1. 查看後端啟動日誌
2. 測試其他被排除的接口（如 `/api/front/index`）
3. 如果這些接口也返回 401，說明攔截器配置有問題

---

## 🚀 完整測試流程

### 1. 確認後端服務運行

```bash
curl http://localhost:8080/api/front/index
```

### 2. 測試登錄接口

**使用 Apifox/Postman：**
```
POST http://localhost:8080/api/front/login
Content-Type: application/json

{
  "account": "18292417675",
  "password": "Test123456"
}
```

**或使用 PowerShell：**
```powershell
$body = @{
    account = "18292417675"
    password = "Test123456"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/front/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

### 3. 預期結果

**成功響應：**
```json
{
  "code": 200,
  "message": "登錄成功",
  "data": {
    "token": "o-Vlj7EwVlepoNcjpQPM0u29im",
    "uid": 41,
    "nikeName": "用戶昵稱",
    "phone": "18292417675"
  }
}
```

---

## 💡 建議

1. **使用 Apifox/Postman**：比命令行更可靠
2. **檢查後端日誌**：查看詳細錯誤信息
3. **重啟後端服務**：確保配置生效
4. **確認數據庫密碼**：確保密碼已更新為加密後的密碼

---

## 📝 測試賬號

| 賬號 | 密碼 | 加密密碼 |
|------|------|---------|
| 18292417675 | Test123456 | uXSaS8Uro+xbKB9v4zv0TQ== |

**確保數據庫中密碼已更新！**

---

## 🔧 如果問題持續存在

請提供以下信息：
1. **後端啟動日誌**：特別是攔截器註冊相關的日誌
2. **完整錯誤響應**：包括 HTTP 狀態碼和響應體
3. **後端配置**：確認 `WebConfig.java` 中的排除列表
4. **Redis 狀態**：確認 Redis 是否運行

現在請：
1. **重啟後端服務**
2. **使用 Apifox/Postman 測試**（比命令行更可靠）
3. **檢查後端日誌**

