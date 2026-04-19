@echo off
chcp 65001 >nul
echo =========================================
echo   TrBlog PHP版本 - Windows停止脚本
echo =========================================
echo.

REM 停止Docker Compose
echo [1/3] 停止TrBlog服务...
where docker-compose >nul 2>nul
if %errorlevel% equ 0 (
    docker-compose down
) else (
    docker compose down
)

if %errorlevel% equ 0 (
    echo ✅ 服务停止成功
) else (
    echo ⚠️  警告：服务停止可能有问题
)
echo.

REM 询问是否清理数据
echo [2/3] 清理选项
echo.
echo 您想清理哪些数据？
echo   1. 只停止服务（保留所有数据）
echo   2. 停止服务并清理Docker镜像和卷
echo   3. 停止服务并清理所有数据（包括.env、数据库等）
echo.
set /p choice=请输入选项 (1/2/3) [默认: 1]: 

if "%choice%"=="" set choice=1

if "%choice%"=="2" goto cleanup_docker
if "%choice%"=="3" goto cleanup_all
goto keep_data

:cleanup_docker
echo.
echo [3/3] 清理Docker镜像和卷...
where docker-compose >nul 2>nul
if %errorlevel% equ 0 (
    docker-compose down --rmi all -v
) else (
    docker compose down --rmi all -v
)
echo ✅ Docker资源清理完成
goto end

:cleanup_all
echo.
echo [3/3] 清理所有数据...
REM 停止并清理Docker
where docker-compose >nul 2>nul
if %errorlevel% equ 0 (
    docker-compose down --rmi all -v
) else (
    docker compose down --rmi all -v
)
REM 删除.env文件
if exist .env (
    set /p delete_env=是否删除.env文件？ (y/n) [默认: n]: 
    if "%delete_env%"=="" set delete_env=n
    if /i "%delete_env%"=="y" (
        del .env
        echo ✅ .env文件已删除
    )
)
REM 删除setup完成标志
if exist storage\app\setup_complete (
    del storage\app\setup_complete
    echo ✅ 设置完成标志已删除
)
echo ✅ 所有数据清理完成
goto end

:keep_data
echo [3/3] 已选择保留所有数据

:end
echo.
echo 🎉 TrBlog已停止
echo.
echo 📖 下次启动请运行：start.bat
echo.
pause
