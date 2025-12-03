@echo off
chcp 65001 >nul
echo Creating all missing pages...
echo.

REM Create goods pages
echo Creating goods pages...
if not exist "src\views\goods\logistics.vue" (
    copy "src\views\goods\comment.vue" "src\views\goods\logistics.vue" >nul
    echo Created: goods/logistics.vue
)

REM Create order pages
echo Creating order pages...
if not exist "src\views\order\payment.vue" (
    copy "src\views\goods\comment.vue" "src\views\order\payment.vue" >nul
    echo Created: order/payment.vue
)
if not exist "src\views\order\pay-status.vue" (
    copy "src\views\goods\comment.vue" "src\views\order\pay-status.vue" >nul
    echo Created: order/pay-status.vue
)
if not exist "src\views\order\refund.vue" (
    copy "src\views\goods\comment.vue" "src\views\order\refund.vue" >nul
    echo Created: order/refund.vue
)
if not exist "src\views\order\refund-list.vue" (
    copy "src\views\goods\comment.vue" "src\views\order\refund-list.vue" >nul
    echo Created: order/refund-list.vue
)

REM Create user pages
echo Creating user pages...
for %%f in (info address address-edit coupon coupon-receive collection sign sign-record account bill integral recharge vip password phone) do (
    if not exist "src\views\user\%%f.vue" (
        copy "src\views\goods\comment.vue" "src\views\user\%%f.vue" >nul
        echo Created: user/%%f.vue
    )
)

REM Create promoter pages
echo Creating promoter pages...
for %%f in (index list order rank commission poster) do (
    if not exist "src\views\promoter\%%f.vue" (
        copy "src\views\goods\comment.vue" "src\views\promoter\%%f.vue" >nul
        echo Created: promoter/%%f.vue
    )
)

REM Create activity pages
echo Creating activity pages...
for %%f in (seckill seckill-detail combination combination-detail bargain bargain-detail bargain-record) do (
    if not exist "src\views\activity\%%f.vue" (
        copy "src\views\goods\comment.vue" "src\views\activity\%%f.vue" >nul
        echo Created: activity/%%f.vue
    )
)

REM Create news pages
echo Creating news pages...
for %%f in (list detail) do (
    if not exist "src\views\news\%%f.vue" (
        copy "src\views\goods\comment.vue" "src\views\news\%%f.vue" >nul
        echo Created: news/%%f.vue
    )
)

echo.
echo ========================================
echo All pages created successfully!
echo ========================================
echo.
echo You can now start the development server:
echo   npm run serve
echo.
pause
