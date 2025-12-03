# 調試指南 - 登錄 401 問題

## 🔍 問題診斷步驟

我已經在攔截器中添加了調試日誌。現在請按照以下步驟操作：

### 步驟 1：重新編譯後端

```bash
cd crmeb
mvn clean compile
```

### 步驟 2：重啟後端服務

1. 停止當前運行的後端服務
2. 重新啟動後端服務
3. **確保服務完全啟動**

### 步驟 3：測試登錄接口

使用 Apifox/Postman 發送請求：

```
POST http://localhost:8080/api/front/login
Content-Type: application/json

{
  "account": "18292417675",
  "password": "Test123456"
}
```

### 步驟 4：查看後端控制台日誌

**在後端控制台中，您應該看到類似這樣的日誌：**

```
攔截器執行 - 原始URI: /api/front/login
攔截器執行 - 處理後URI: api/front/login
攔截器執行 - checkRouter結果: true/false
攔截器執行 - 允許訪問（白名單）/ 拒絕訪問（不在白名單）
```

---

## 📋 根據日誌判斷問題

### 情況 1：處理後 URI 不是 `api/front/login`

**問題：** URI 處理邏輯有問題

**解決：** 檢查 `RequestUtil.getUri` 方法的處理邏輯

### 情況 2：checkRouter 返回 false

**問題：** 白名單中沒有匹配的路由

**解決：** 確認 `checkRouter` 方法中的白名單包含 `api/front/login`

### 情況 3：沒有看到任何日誌

**問題：** 攔截器沒有被調用，可能是 `excludePathPatterns` 生效了

**解決：** 這是好事！說明 `excludePathPatterns` 正常工作，但可能還有其他問題

---

## 🐛 常見問題

### Q: 為什麼還是返回 401？

**A:** 可能原因：
1. **後端沒有重新編譯**：修改的 Java 代碼沒有編譯
2. **後端沒有重啟**：新代碼沒有加載
3. **URI 格式不匹配**：處理後的 URI 格式與白名單不匹配

### Q: 如何確認修改已生效？

**A:** 
1. 查看後端啟動日誌，確認沒有編譯錯誤
2. 查看調試日誌，確認攔截器被調用
3. 檢查日誌中的 URI 格式

### Q: 如果還是沒有日誌？

**A:** 
1. 確認後端服務正在運行
2. 確認請求確實發送到了後端
3. 檢查後端日誌配置

---

## 🔧 臨時解決方案

如果問題持續存在，可以嘗試：

### 方案 1：直接修改攔截器，跳過登錄接口

在 `FrontTokenInterceptor.preHandle` 方法開頭添加：

```java
String requestUri = request.getRequestURI();
if (requestUri.contains("/api/front/login") || 
    requestUri.contains("/api/front/login/mobile") ||
    requestUri.contains("/api/front/sendCode")) {
    return true; // 直接允許訪問
}
```

### 方案 2：檢查 excludePathPatterns 是否生效

確認 `WebConfig.java` 中的配置正確，並且後端已重啟。

---

## 📝 請提供的信息

如果問題仍然存在，請提供：

1. **後端控制台日誌**：特別是攔截器執行的日誌
2. **處理後的 URI**：從日誌中看到的 `處理後URI`
3. **checkRouter 結果**：從日誌中看到的 `checkRouter結果`
4. **後端啟動日誌**：確認沒有錯誤

---

現在請：
1. **重新編譯後端**
2. **重啟後端服務**
3. **測試登錄接口**
4. **查看後端控制台日誌**
5. **將日誌信息發給我**

這樣我就能準確診斷問題了！

