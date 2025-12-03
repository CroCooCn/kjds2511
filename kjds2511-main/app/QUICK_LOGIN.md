# 快速登錄指南

## ✅ 您已經準備好的信息

根據您運行的密碼加密工具，您現在有：

- **賬號**: `18292417675`
- **密碼**: `Test123456`
- **加密密碼**: `uXSaS8Uro+xbKB9v4zv0TQ==`

---

## 🚀 立即登錄（3 步完成）

### 步驟 1：更新數據庫（如果還沒執行）

在數據庫中執行：

```sql
UPDATE eb_user SET pwd = 'uXSaS8Uro+xbKB9v4zv0TQ==' WHERE phone = '18292417675' OR account = '18292417675';
UPDATE eb_user SET status = 1 WHERE phone = '18292417675';
```

### 步驟 2：打開測試工具

在瀏覽器中打開：`app/test-login.html`

**或者使用 Postman/Apifox：**
```
POST http://localhost:8080/api/front/login
Content-Type: application/json

{
  "account": "18292417675",
  "password": "Test123456"
}
```

### 步驟 3：登錄

- 賬號已預填：`18292417675`
- 密碼已預填：`Test123456`
- 點擊「登錄」按鈕

---

## 📋 其他可用賬號

| 賬號 | 密碼 | SQL 更新語句 |
|------|------|-------------|
| 18292417675 | Test123456 | `UPDATE eb_user SET pwd = 'uXSaS8Uro+xbKB9v4zv0TQ==' WHERE phone = '18292417675';` |
| 18868590679 | Test123456 | `UPDATE eb_user SET pwd = 'P+GlJHVnHS2WCQIGSY+LGQ==' WHERE phone = '18868590679';` |

---

## 🎯 登錄成功後

登錄成功後，您會收到 Token，然後可以：

1. **測試用戶信息接口**
   ```
   GET http://localhost:8080/api/front/user
   Headers: Authori-zation: 您的token
   ```

2. **測試其他需要認證的接口**
   - 購物車：`GET /api/front/cart/list`
   - 訂單：`GET /api/front/order/list`
   - 等等...

---

## ⚠️ 如果登錄失敗

1. 確認 SQL 已執行：檢查數據庫中的 `pwd` 值
2. 確認用戶狀態：`SELECT status FROM eb_user WHERE phone = '18292417675';` 應該是 `1`
3. 確認後端服務運行在 `http://localhost:8080`

現在就可以開始登錄了！


