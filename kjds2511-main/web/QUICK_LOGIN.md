# Web端快速登錄指南

## 🎯 問題說明

訪問 Web 端時出現 `{"code":401,"message":"未登录,请登录!"}` 錯誤。

**原因：**
- `App.vue` 初始化時會驗證 token
- 如果沒有 token 或 token 無效，會返回 401
- 現在已修復：token 驗證失敗不會影響頁面正常使用

---

## ✅ 解決方案（3種方式）

### 方式一：使用瀏覽器控制台快速登錄（最簡單）

1. **打開 Web 端**
   - 訪問：`http://localhost:8080`

2. **打開開發者工具**
   - 按 `F12` 或右鍵選擇「檢查」

3. **在控制台執行以下代碼**：

```javascript
// 快速登錄腳本
(async function() {
  try {
    const response = await fetch('http://localhost:8080/api/front/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        account: '18292417675',
        password: 'Test123456'
      })
    });
    
    const data = await response.json();
    
    if (data.code === 200 && data.data) {
      // 保存 Token 到 LocalStorage
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('uid', data.data.uid);
      if (data.data) {
        localStorage.setItem('userInfo', JSON.stringify(data.data));
      }
      
      console.log('✅ 登錄成功！');
      console.log('Token:', data.data.token);
      console.log('用戶信息:', data.data);
      
      // 刷新頁面
      location.reload();
    } else {
      console.error('❌ 登錄失敗:', data.message);
    }
  } catch (error) {
    console.error('❌ 請求失敗:', error);
    console.log('💡 請確認後端服務運行在 http://localhost:8080');
  }
})();
```

4. **刷新頁面**
   - 登錄成功後，頁面會自動刷新
   - 現在可以正常訪問所有頁面了

---

### 方式二：直接訪問登錄頁面

1. **訪問登錄頁**
   - 打開：`http://localhost:8080/login`

2. **輸入登錄信息**
   - 賬號：`18292417675`
   - 密碼：`Test123456`

3. **點擊登錄**
   - 登錄成功後會自動跳轉

---

### 方式三：使用 Postman/Apifox

**請求配置：**
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/front/login`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body (JSON)**:
  ```json
  {
    "account": "18292417675",
    "password": "Test123456"
  }
  ```

**登錄成功後：**
1. 複製返回的 `data.token` 值
2. 在瀏覽器控制台執行：
```javascript
localStorage.setItem('token', '您的token值');
location.reload();
```

---

## 📋 測試賬號

| 賬號 | 密碼 | 加密密碼 |
|------|------|---------|
| 18292417675 | Test123456 | uXSaS8Uro+xbKB9v4zv0TQ== |
| 18868590679 | Test123456 | P+GlJHVnHS2WCQIGSY+LGQ== |

**注意：** 請確保數據庫中這些賬號的密碼已更新為加密後的密碼。

---

## 🔧 已修復的問題

### 1. App.vue 初始化邏輯
- ✅ token 驗證失敗時，不會影響頁面正常使用
- ✅ 只有在明確的 token 過期錯誤（410000, 410001, 410002）時才清除 token
- ✅ 401 錯誤不會導致頁面無法訪問

### 2. 請求攔截器優化
- ✅ token 驗證接口的 401 錯誤不會自動跳轉到登錄頁
- ✅ 其他接口的 401 錯誤才會跳轉（僅在訪問需要認證的頁面時）

---

## 🧪 測試步驟

1. **確認數據庫密碼已更新**
   ```sql
   UPDATE eb_user SET pwd = 'uXSaS8Uro+xbKB9v4zv0TQ==' WHERE phone = '18292417675';
   UPDATE eb_user SET status = 1 WHERE phone = '18292417675';
   ```

2. **訪問 Web 端**
   - 打開：`http://localhost:8080`
   - 現在不會出現 401 錯誤導致頁面無法訪問

3. **使用控制台登錄**
   - 按 `F12` 打開控制台
   - 執行快速登錄腳本

4. **測試需要認證的頁面**
   - 購物車：`http://localhost:8080/cart`
   - 個人中心：`http://localhost:8080/user`
   - 訂單列表：`http://localhost:8080/order/list`

---

## 🐛 常見問題

### Q: 登錄後仍然出現 401？

**A:** 檢查以下幾點：
1. **Token 是否保存**：在控制台執行 `localStorage.getItem('token')` 查看
2. **後端服務**：確認後端運行在 `http://localhost:8080`
3. **數據庫密碼**：確認數據庫中的密碼已更新為加密後的密碼
4. **用戶狀態**：確認用戶 `status = 1`

### Q: 如何清除 Token？

**A:** 在瀏覽器控制台執行：
```javascript
localStorage.removeItem('token');
localStorage.removeItem('userInfo');
localStorage.removeItem('uid');
location.reload();
```

### Q: 如何確認 Token 是否有效？

**A:** 在瀏覽器控制台執行：
```javascript
const token = localStorage.getItem('token');
if (token) {
  console.log('Token 存在:', token.substring(0, 20) + '...');
  
  // 測試 token 是否有效
  fetch('http://localhost:8080/api/front/token', {
    headers: { 'Authori-zation': token }
  })
  .then(res => res.json())
  .then(data => {
    if (data.code === 200) {
      console.log('✅ Token 有效');
    } else {
      console.log('❌ Token 無效:', data.message);
    }
  });
} else {
  console.log('未找到 Token');
}
```

---

## 🚀 快速開始

1. **訪問 Web 端**：`http://localhost:8080`
2. **按 F12 打開控制台**
3. **執行快速登錄腳本**（見方式一）
4. **刷新頁面**，開始測試！

現在您可以正常測試所有接口了！

