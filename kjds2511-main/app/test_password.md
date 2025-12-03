# 登录问题分析报告

## 问题现象
- **请求**: `POST http://localhost:8080/api/front/login`
- **请求体**: `{"account": "18292417675", "password": "test12345e"}`
- **响应**: `{"code": 401, "message": "未登录，请登录！"}`

---

## 问题根源分析

### ❌ 错误的401响应来源

**重要发现**: 返回的401错误消息 `"未登录，请登录！"` 并非来自拦截器，而是来自 **`CommonResultCode.UNAUTHORIZED`**。

查看代码发现：
- `CommonResultCode.UNAUTHORIZED(401, "未登录，请登录！")` - 定义在 `CommonResultCode.java` 第22行
- 但是登录服务中抛出的异常应该是：
  - `"此账号未注册"` - 账号不存在
  - `"此账号被禁用"` - 账号被禁用
  - `"密码错误"` - 密码不匹配

### 🔍 真实原因推断

**401 "未登录，请登录！" 这个错误不应该出现在登录接口！**

可能的原因：
1. **拦截器实际上拦截了请求** - 虽然配置了排除路径，但可能路径匹配有问题
2. **请求路径不匹配** - 你的请求可能没有正确匹配到排除规则
3. **有其他拦截器或过滤器** - 可能有其他安全配置

---

## 详细代码分析

### 1. 拦截器配置

#### WebConfig.java (第63行)
```java
excludePathPatterns("/api/front/login")
```

#### FrontTokenInterceptor.java (第38-46行)
```java
if (requestUri != null && (
    requestUri.equals("/api/front/login") ||
    requestUri.equals("/api/front/login/mobile") ||
    requestUri.startsWith("/api/front/login/") ||
    requestUri.equals("/api/front/sendCode") ||
    requestUri.equals("/api/front/token/is/exist") ||
    requestUri.equals("/api/front/login/config")
)) {
    return true; // 直接允許訪問
}
```

**问题**: 拦截器在第57行返回401时，使用的是 `CommonResultCode.UNAUTHORIZED`：
```java
response.getWriter().write(JSONObject.toJSONString(CommonResult.failed(CommonResultCode.UNAUTHORIZED)));
```

### 2. 登录服务逻辑

`LoginServiceImpl.java` 第67-80行：
```java
public LoginResponse login(LoginRequest loginRequest) {
    User user = userService.getByPhone(loginRequest.getPhone());
    if (ObjectUtil.isNull(user)) {
        throw new CrmebException("此账号未注册");  // ← 应该返回这个
    }
    if (!user.getStatus()) {
        throw new CrmebException("此账号被禁用");  // ← 或这个
    }
    
    // 校验密码
    String password = CrmebUtil.encryptPassword(loginRequest.getPassword(), loginRequest.getPhone());
    if (!user.getPwd().equals(password)) {
        throw new CrmebException("密码错误");  // ← 或这个
    }
    ...
}
```

### 3. 全局异常处理器

`GlobalExceptionHandler.java` 第119-121行：
```java
if (e instanceof CrmebException) {
    return CommonResult.failed().setMessage(Objects.requireNonNull(e.getMessage()));
}
```

这里会返回 `CommonResult.failed()`，默认是500错误码，不是401！

---

## 结论

**你收到的 401 "未登录，请登录！" 错误，说明请求被拦截器拦截了，根本没有到达登录服务！**

这意味着：
1. 拦截器的排除路径配置没有生效
2. 或者请求路径与配置的路径不完全匹配

---

## 解决方案

### 方案1: 检查请求路径 ⭐ 推荐

确认你的请求URL是否完全匹配：
- ✅ 正确: `http://localhost:8080/api/front/login`
- ❌ 错误: `http://localhost:8080/api/front/login/` (多了斜杠)
- ❌ 错误: `http://localhost:8080/api/front/Login` (大小写)

### 方案2: 检查后端日志

查看后端控制台日志，看是否有以下信息：
- 拦截器日志
- 异常堆栈信息
- 请求路径信息

### 方案3: 临时禁用拦截器测试

临时修改 `WebConfig.java`，注释掉拦截器注册：

```java
@Override
public void addInterceptors(InterceptorRegistry registry) {
    // 临时注释掉，测试是否是拦截器问题
    // registry.addInterceptor(frontTokenInterceptor()).
    //         addPathPatterns("/api/front/**").
    //         excludePathPatterns("/api/front/login");
}
```

### 方案4: 添加调试日志

在 `FrontTokenInterceptor.java` 的 `preHandle` 方法开头添加日志：

```java
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    String requestUri = request.getRequestURI();
    System.out.println("=== 拦截器收到请求: " + requestUri);
    
    // 直接放行登錄相關接口
    if (requestUri != null && (
        requestUri.equals("/api/front/login") ||
        ...
    )) {
        System.out.println("=== 放行登录请求");
        return true;
    }
    
    System.out.println("=== 检查token");
    // ... 其余代码
}
```

---

## 测试步骤

### 步骤1: 验证请求路径
确保你的Postman请求URL完全是：
```
POST http://localhost:8080/api/front/login
```

### 步骤2: 检查请求头
确保Content-Type是：
```
Content-Type: application/json
```

### 步骤3: 查看后端日志
启动后端服务，查看控制台输出，看是否有：
- 拦截器日志
- 异常信息
- SQL查询日志

### 步骤4: 测试密码
如果请求能通过拦截器，但仍然失败，则需要验证密码。

运行以下代码解密数据库密码：
```java
String phone = "18292417675";
String dbPassword = "67Wnx1W8Udwmhab2T1kpIlg==";
String decrypted = CrmebUtil.decryptPassowrd(dbPassword, phone);
System.out.println("数据库中的原始密码: " + decrypted);
```

---

## 快速诊断命令

### 检查数据库用户状态
```sql
SELECT account, phone, pwd, status, real_name 
FROM eb_user 
WHERE account = '18292417675' OR phone = '18292417675';
```

### 重置密码（如果需要）
```sql
-- 密码重置为 Test123456
-- 先用Java代码计算加密值：CrmebUtil.encryptPassword("Test123456", "18292417675")
-- 假设加密后是: xxxxx
UPDATE eb_user 
SET pwd = 'xxxxx' 
WHERE account = '18292417675';
```
---
## 下一步行动
1. **立即检查**: 确认Postman请求URL是否完全正确
2. **查看日志**: 启动后端，查看控制台日志输出
3. **添加调试**: 在拦截器中添加日志，确认请求是否被拦截
4. **验证密码**: 如果通过拦截器，则解密数据库密码进行验证