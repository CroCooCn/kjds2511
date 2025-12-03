package com.zbkj.front.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.zbkj.common.result.CommonResult;
import com.zbkj.common.result.CommonResultCode;
import com.zbkj.common.token.FrontTokenComponent;
import com.zbkj.common.utils.RequestUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *  移动端管理端 token验证拦截器 使用前注意需要一个@Bean手动注解，否则注入无效
 *  +----------------------------------------------------------------------
 *  | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
 *  +----------------------------------------------------------------------
 *  | Copyright (c) 2016~2025 https://www.crmeb.com All rights reserved.
 *  +----------------------------------------------------------------------
 *  | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
 *  +----------------------------------------------------------------------
 *  | Author: CRMEB Team <admin@crmeb.com>
 *  +----------------------------------------------------------------------
 */
public class FrontTokenInterceptor implements HandlerInterceptor {

    @Autowired
    private FrontTokenComponent frontTokenComponent;

    //程序处理之前需要处理的业务
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        response.setCharacterEncoding("UTF-8");
        String requestUri = request.getRequestURI();
        
        // 添加调试日志
        System.out.println("=== FrontTokenInterceptor 拦截器收到请求 ===");
        System.out.println("请求URI: " + requestUri);
        System.out.println("请求方法: " + request.getMethod());
        
        // 直接放行登錄相關接口（最優先檢查）
        if (requestUri != null && (
            requestUri.equals("/api/front/login") ||
            requestUri.equals("/api/front/login/mobile") ||
            requestUri.startsWith("/api/front/login/") ||
            requestUri.equals("/api/front/sendCode") ||
            requestUri.equals("/api/front/token/is/exist") ||
            requestUri.equals("/api/front/login/config")
        )) {
            System.out.println("=== 匹配到登录接口，直接放行 ===");
            return true; // 直接允許訪問，不進行任何檢查
        }
        
        String processedUri = RequestUtil.getUri(request);
        String token = frontTokenComponent.getToken(request);
        System.out.println("Token: " + (token == null ? "null" : token));
        
        if(token == null || token.isEmpty()){
            //判断路由，部分路由不管用户是否登录都可以访问
            boolean result = frontTokenComponent.checkRouter(processedUri);
            System.out.println("检查路由结果: " + result + ", processedUri: " + processedUri);
            if(result){
                System.out.println("=== 路由检查通过，放行 ===");
                return true;
            }
            System.out.println("=== 没有token且路由检查不通过，返回401 UNAUTHORIZED ===");
            response.getWriter().write(JSONObject.toJSONString(CommonResult.failed(CommonResultCode.UNAUTHORIZED)));
            return false;
        }

        Boolean result = frontTokenComponent.check(token, request);
        if(!result){
            System.out.println("=== Token验证失败，返回402 PERMISSION_EXPIRATION ===");
            response.getWriter().write(JSONObject.toJSONString(CommonResult.failed(CommonResultCode.PERMISSION_EXPIRATION)));
            return false;
        }
        System.out.println("=== Token验证通过，放行 ===");
        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
    }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {

    }

}
