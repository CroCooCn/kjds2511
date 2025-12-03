package com.zbkj.common.utils;

/**
 * 密碼解密工具
 * 用於解密數據庫中存儲的加密密碼
 * 
 * 使用方法：
 * 1. 直接運行此類的 main 方法
 * 2. 查看控制台輸出的解密結果
 */
public class PasswordDecryptTool {
    
    public static void main(String[] args) {
        System.out.println("==========================================");
        System.out.println("密碼解密工具");
        System.out.println("==========================================\n");
        
        // 從數據庫中獲取的加密密碼和對應的手機號/賬號
        String[][] encryptedPasswords = {
            // {加密密碼, 手機號/賬號, 用戶ID}
            {"c7Nwx1WsDdewbab2TlkpUg==", "18292417675", "41"},
            {"33K/AXL8IVEVrI8UZUY6SQ==", "18868590679", "42"},
            // 如果 testuser001 和 test001 的 account 是手機號，可以添加：
            // {"加密值", "testuser001", "45"},
            // {"加密值", "test001", "46"}
        };
        
        System.out.println("=== 解密結果 ===\n");
        
        for (String[] item : encryptedPasswords) {
            String encryptedPwd = item[0];
            String phone = item[1];
            String uid = item[2];
            
            try {
                String decryptedPwd = CrmebUtil.decryptPassowrd(encryptedPwd, phone);
                
                System.out.println(String.format(
                    "用戶ID: %s | 手機號/賬號: %s",
                    uid, phone
                ));
                System.out.println(String.format(
                    "加密密碼: %s",
                    encryptedPwd
                ));
                System.out.println(String.format(
                    "原始密碼: %s",
                    decryptedPwd
                ));
                
                // 驗證：重新加密看是否匹配
                String reEncrypted = CrmebUtil.encryptPassword(decryptedPwd, phone);
                boolean match = encryptedPwd.equals(reEncrypted);
                System.out.println(String.format(
                    "驗證結果: %s (重新加密後是否匹配)",
                    match ? "✓ 匹配" : "✗ 不匹配"
                ));
                
                System.out.println("---");
                
            } catch (Exception e) {
                System.out.println(String.format(
                    "用戶ID: %s | 手機號/賬號: %s | 解密失敗: %s",
                    uid, phone, e.getMessage()
                ));
                System.out.println("---");
            }
        }
        
        System.out.println("\n==========================================");
        System.out.println("解密完成！");
        System.out.println("==========================================");
        
        // 額外測試：嘗試解密已知的測試密碼
        System.out.println("\n=== 測試：驗證已知密碼 ===");
        testKnownPassword("Crmeb_123456", "18292417675");
        testKnownPassword("Test123456", "18292417675");
    }
    
    /**
     * 測試已知密碼的加密結果
     */
    private static void testKnownPassword(String password, String phone) {
        try {
            String encrypted = CrmebUtil.encryptPassword(password, phone);
            String decrypted = CrmebUtil.decryptPassowrd(encrypted, phone);
            
            System.out.println(String.format(
                "測試密碼: %s | 手機號: %s",
                password, phone
            ));
            System.out.println(String.format(
                "加密後: %s",
                encrypted
            ));
            System.out.println(String.format(
                "解密後: %s | 匹配: %s",
                decrypted, password.equals(decrypted) ? "✓" : "✗"
            ));
            System.out.println("---");
        } catch (Exception e) {
            System.out.println("測試失敗: " + e.getMessage());
        }
    }
}

