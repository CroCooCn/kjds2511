# 快速測試指南

## 🚀 3 步完成測試

### 步驟 1：登錄獲取 Token

在 Apifox/Postman 中：

```
POST http://localhost:8080/api/front/login
Content-Type: application/json

{
  "account": "18292417675",
  "password": "Test123456"
}
```

**複製返回的 `data.token` 值**

---

### 步驟 2：添加 Token 到請求

在您的測試請求中：

1. 切換到 **"Headers"** 標籤
2. 添加：
   - **Key**: `Authori-zation`
   - **Value**: `貼上剛才複製的token值`

---

### 步驟 3：重新發送請求

現在測試 `GET http://localhost:8080/api/front/product/good`，應該可以成功了！

---

## 💡 提示

- **Token Header 名稱**：`Authori-zation`（注意中間有連字符）
- **Token 格式**：直接貼上，不需要加前綴（如 "Bearer "）
- **Token 有效期**：登錄後一段時間內有效，過期後需要重新登錄

---

## 🔄 如果還是 401

1. **確認後端服務運行**：`http://localhost:8080`
2. **確認數據庫密碼已更新**：執行 SQL 更新密碼
3. **重啟後端服務**：修改配置後需要重啟

---

## 📋 測試賬號

- 賬號：`18292417675`
- 密碼：`Test123456`

現在開始測試吧！

