@echo off
chcp 65001 >nul
echo =========================================
echo   TrBlog PHP版本 - Windows启动脚本
echo =========================================
echo.

REM 检查是否已安装Docker
echo [1/5] 检查Docker环境...
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 错误：Docker未安装
    echo 请先安装Docker Desktop：https://www.docker.com/get-started
    pause
    exit /b 1
)

where docker-compose >nul 2>nul
if %errorlevel% neq 0 (
    where docker >nul 2>nul
    docker compose >nul 2>nul
    if %errorlevel% neq 0 (
        echo ❌ 错误：Docker Compose未安装
        pause
        exit /b 1
    )
)
echo ✅ Docker环境检查通过
echo.

REM 检查.env文件是否存在，不存在则从.env.example创建
echo [2/5] 配置环境...
if not exist .env (
    if exist .env.example (
        copy .env.example .env >nul
        echo ✅ 已从.env.example创建.env文件
    ) else (
        echo ⚠️  警告：.env.example文件不存在
    )
)
echo.

REM 启动Docker Compose
echo [3/5] 启动TrBlog服务...
where docker-compose >nul 2>nul
if %errorlevel% equ 0 (
    docker-compose up -d
) else (
    docker compose up -d
)

if %errorlevel% neq 0 (
    echo ❌ 错误：Docker Compose启动失败
    pause
    exit /b 1
)
echo ✅ 服务启动成功
echo.

REM 等待服务启动
echo [4/5] 等待服务就绪（约30秒）...
for /l %%i in (30,-1,1) do (
    set /p "=  等待中... %%i 秒"<nul
    timeout /t 1 >nul
)
echo.
echo.

REM 尝试访问应用以确认启动成功
echo [5/5] 检查服务状态...
set max_attempts=10
set attempt=0

:check_loop
if %attempt% geq %max_attempts% goto check_failed

curl -s "http://localhost:8000" >nul 2>nul
if %errorlevel% equ 0 (
    goto check_success
)

set /a attempt+=1
set /p "=  检查服务状态... 尝试 %attempt%/%max_attempts%"<nul
timeout /t 3 >nul
echo.
goto check_loop

:check_success
echo.
echo.
echo 🎉 TrBlog启动成功！
echo.
echo 📱 访问地址：http://localhost:8000
echo ⚙️   设置向导：http://localhost:8000/setup
echo 📚 后台管理：http://localhost:8000/admin
echo.
echo 📖 使用说明：
echo   - 首次访问请使用设置向导配置数据库
echo   - 支持MySQL、PostgreSQL、SQLite三种数据库
echo   - 详细文档请查看README.md
echo.
echo 🚀 祝您使用愉快！
echo.
pause
exit /b 0

:check_failed
echo.
echo ⚠️  警告：无法连接到应用
echo 请检查Docker容器是否正常运行：
echo   docker-compose ps
echo.
pause
exit /b 1
