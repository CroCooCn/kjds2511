package com.zbkj.admin.util;

import com.zbkj.common.utils.CrmebUtil;

/**
 * 密碼加密工具
 * 用於生成測試用戶的加密密碼
 * 
 * 使用方法：
 * 1. 將此文件放到 crmeb/crmeb-common/src/test/java/com/zbkj/test/ 目錄
 * 2. 運行此類的 main 方法
 * 3. 複製輸出的 SQL 語句到數據庫執行
 */
public class PasswordEncryptTool {
    
    public static void main(String[] args) {
        // 測試用戶列表：[手機號/賬號, 新密碼]
        String[][] users = {
            {"18292417675", "Test123456"},
            {"18868590679", "Test123456"},
            {"testuser001", "Test123456"},
            {"test001", "Test123456"}
        };
        
        System.out.println("==========================================");
        System.out.println("密碼加密工具");
        System.out.println("==========================================\n");
        
        System.out.println("=== 密碼加密結果 ===");
        for (String[] user : users) {
            String phone = user[0];
            String password = user[1];
            String encrypted = CrmebUtil.encryptPassword(password, phone);
            
            System.out.println(String.format(
                "手機號/賬號: %-15s | 密碼: %-15s | 加密後: %s",
                phone, password, encrypted
            ));
        }
        
        System.out.println("\n=== SQL 更新語句（可直接執行） ===");
        for (String[] user : users) {
            String phone = user[0];
            String password = user[1];
            String encrypted = CrmebUtil.encryptPassword(password, phone);
            
            System.out.println(String.format(
                "UPDATE eb_user SET pwd = '%s' WHERE phone = '%s' OR account = '%s';",
                encrypted, phone, phone
            ));
        }
        
        System.out.println("\n=== 驗證解密（確認加密正確） ===");
        for (String[] user : users) {
            String phone = user[0];
            String password = user[1];
            String encrypted = CrmebUtil.encryptPassword(password, phone);
            String decrypted = CrmebUtil.decryptPassowrd(encrypted, phone);
            
            boolean match = password.equals(decrypted);
            System.out.println(String.format(
                "手機號: %-15s | 原始: %-15s | 解密: %-15s | 匹配: %s",
                phone, password, decrypted, match ? "✓" : "✗"
            ));
        }
        
        System.out.println("\n==========================================");
        System.out.println("完成！請複製上面的 SQL 語句到數據庫執行");
        System.out.println("==========================================");
    }
}

