# API 測試數據完整指南

## 📋 登錄相關接口

根據 Controller 代碼分析，以下是所有登錄相關接口的完整信息：

---

## 1. 賬號密碼登錄

### 接口信息

- **請求方法**: `POST`
- **請求路徑**: `http://localhost:8080/api/front/login`
- **Content-Type**: `application/json`
- **是否需要認證**: ❌ 否（已排除在攔截器外）

### 請求參數

**請求體 (JSON):**

```json
{
  "account": "18292417675",
  "password": "Test123456",
  "spread_spid": 0
}
```

**參數說明：**

| 參數名 | 類型 | 必填 | 說明 | 示例 |
|--------|------|------|------|------|
| `account` | String | ✅ | 手機號（注意：JSON 中使用 `account`，但後端字段是 `phone`） | `18292417675` |
| `password` | String | ✅ | 密碼（明文，後端會自動加密） | `Test123456` |
| `spread_spid` | Integer | ❌ | 推廣人 ID（可選，默認為 0） | `0` |

**驗證規則：**
- `account`: 必須是有效的手機號格式（11位數字）
- `password`: 不能為空

### 成功響應

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

### 錯誤響應

**賬號未註冊：**
```json
{
  "code": 400,
  "message": "此账号未注册"
}
```

**賬號被禁用：**
```json
{
  "code": 400,
  "message": "此账号被禁用"
}
```

**密碼錯誤：**
```json
{
  "code": 400,
  "message": "密码错误"
}
```

**手機號格式錯誤：**
```json
{
  "code": 400,
  "message": "手机号码格式错误"
}
```

---

## 2. 手機號驗證碼登錄

### 接口信息

- **請求方法**: `POST`
- **請求路徑**: `http://localhost:8080/api/front/login/mobile`
- **Content-Type**: `application/json`
- **是否需要認證**: ❌ 否

### 請求參數

**請求體 (JSON):**

```json
{
  "phone": "18292417675",
  "captcha": "123456",
  "spread_spid": 0
}
```

**參數說明：**

| 參數名 | 類型 | 必填 | 說明 | 示例 |
|--------|------|------|------|------|
| `phone` | String | ✅ | 手機號 | `18292417675` |
| `captcha` | String | ✅ | 驗證碼（6位數字） | `123456` |
| `spread_spid` | Integer | ❌ | 推廣人 ID（可選） | `0` |

**驗證規則：**
- `phone`: 必須是有效的手機號格式
- `captcha`: 必須是6位數字

### 成功響應

```json
{
  "code": 200,
  "message": "登錄成功",
  "data": {
    "token": "...",
    "uid": 41,
    "nikeName": "用戶昵稱",
    "phone": "18292417675"
  }
}
```

---

## 3. 發送短信驗證碼

### 接口信息

- **請求方法**: `POST`
- **請求路徑**: `http://localhost:8080/api/front/sendCode`
- **Content-Type**: `application/x-www-form-urlencoded` 或 `application/json`
- **是否需要認證**: ❌ 否

### 請求參數

**方式一：URL 參數（推薦）**

```
POST http://localhost:8080/api/front/sendCode?phone=18292417675
```

**方式二：Form Data**

```
phone=18292417675
```

**參數說明：**

| 參數名 | 類型 | 必填 | 說明 | 示例 |
|--------|------|------|------|------|
| `phone` | String | ✅ | 手機號 | `18292417675` |

### 成功響應

```json
{
  "code": 200,
  "message": "发送成功",
  "data": "发送成功"
}
```

### 錯誤響應

```json
{
  "code": 400,
  "message": "发送失败"
}
```

---

## 4. 驗證 Token 是否有效

### 接口信息

- **請求方法**: `POST`
- **請求路徑**: `http://localhost:8080/api/front/token/is/exist`
- **Content-Type**: `application/json`
- **是否需要認證**: ❌ 否（但需要傳遞 token）

### 請求參數

**Headers:**

| Header 名稱 | 值 | 說明 |
|------------|-----|------|
| `Authori-zation` | `您的token值` | Token（注意：中間有連字符） |

**請求體**: 無（空 JSON 或不需要）

### 成功響應

**Token 有效：**
```json
{
  "code": 200,
  "message": "成功",
  "data": true
}
```

**Token 無效：**
```json
{
  "code": 200,
  "message": "成功",
  "data": false
}
```

---

## 5. 獲取登錄配置

### 接口信息

- **請求方法**: `GET`
- **請求路徑**: `http://localhost:8080/api/front/login/config`
- **是否需要認證**: ❌ 否

### 請求參數

無

### 成功響應

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "publicLoginType": "...",
    "routinePhoneVerification": "...",
    "mobileLoginLogo": "...",
    "siteName": "..."
  }
}
```

---

## 6. 退出登錄

### 接口信息

- **請求方法**: `GET`
- **請求路徑**: `http://localhost:8080/api/front/logout`
- **是否需要認證**: ✅ 是（需要 token）

### 請求參數

**Headers:**

| Header 名稱 | 值 | 說明 |
|------------|-----|------|
| `Authori-zation` | `您的token值` | Token |

### 成功響應

```json
{
  "code": 200,
  "message": "成功",
  "data": "成功"
}
```

---

## 🧪 完整測試示例

### 測試 1：賬號密碼登錄

**Apifox/Postman 配置：**

```
POST http://localhost:8080/api/front/login
Content-Type: application/json

{
  "account": "18292417675",
  "password": "Test123456"
}
```

**cURL 命令：**

```bash
curl -X POST "http://localhost:8080/api/front/login" \
  -H "Content-Type: application/json" \
  -d '{
    "account": "18292417675",
    "password": "Test123456"
  }'
```

**PowerShell 命令：**

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

### 測試 2：發送驗證碼

**Apifox/Postman 配置：**

```
POST http://localhost:8080/api/front/sendCode?phone=18292417675
```

**cURL 命令：**

```bash
curl -X POST "http://localhost:8080/api/front/sendCode?phone=18292417675"
```

---

### 測試 3：手機號驗證碼登錄

**Apifox/Postman 配置：**

```
POST http://localhost:8080/api/front/login/mobile
Content-Type: application/json

{
  "phone": "18292417675",
  "captcha": "123456"
}
```

---

### 測試 4：驗證 Token

**Apifox/Postman 配置：**

```
POST http://localhost:8080/api/front/token/is/exist
Headers:
  Authori-zation: 您的token值
```

---

## 📝 測試賬號

根據您運行的密碼加密工具，以下賬號可用：

| 賬號 | 密碼 | 加密密碼 | 狀態 |
|------|------|---------|------|
| 18292417675 | Test123456 | uXSaS8Uro+xbKB9v4zv0TQ== | ✅ 可用 |
| 18868590679 | Test123456 | P+GlJHVnHS2WCQIGSY+LGQ== | ✅ 可用 |

**注意：** 確保數據庫中這些賬號的密碼已更新為加密後的密碼。

---

## ⚠️ 重要提示

### 1. 參數名稱

- **JSON 中使用 `account`**：雖然後端字段是 `phone`，但因為使用了 `@JsonProperty(value = "account")`，所以 JSON 中必須使用 `account`
- **不要使用 `phone`**：如果使用 `phone`，後端無法正確接收參數

### 2. 手機號格式

- 必須是 11 位數字
- 符合中國手機號格式

### 3. 密碼處理

- 前端發送**明文密碼**
- 後端會自動加密並與數據庫中的加密密碼比較
- 數據庫中存儲的是加密後的密碼

### 4. Token 格式

- Header 名稱：`Authori-zation`（注意中間有連字符）
- Token 值：直接使用，不需要加前綴（如 "Bearer "）

---

## 🔍 常見錯誤

### 錯誤 1：參數驗證失敗

**原因：** 手機號格式不正確或參數名稱錯誤

**解決：** 
- 確認使用 `account` 而不是 `phone`
- 確認手機號是 11 位數字

### 錯誤 2：此賬號未註冊

**原因：** 數據庫中沒有該手機號的記錄

**解決：** 確認數據庫中存在該用戶

### 錯誤 3：密碼錯誤

**原因：** 數據庫中的密碼與輸入的密碼不匹配

**解決：** 
- 確認數據庫中的密碼已更新為加密後的密碼
- 確認輸入的密碼正確

### 錯誤 4：此賬號被禁用

**原因：** 用戶的 `status` 字段為 `0`

**解決：** 執行 SQL 更新用戶狀態：
```sql
UPDATE eb_user SET status = 1 WHERE phone = '18292417675';
```

---

## 🚀 快速測試清單

- [ ] 確認後端服務運行在 `http://localhost:8080`
- [ ] 確認數據庫密碼已更新
- [ ] 確認用戶狀態為正常（`status = 1`）
- [ ] 使用正確的參數名稱（`account` 而不是 `phone`）
- [ ] 使用正確的請求格式（JSON）

現在您可以開始測試所有接口了！

