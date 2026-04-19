#!/bin/bash

# TrBlog PHP版本 - 传统部署启动脚本
# 傻瓜式一键启动脚本

echo "========================================="
echo "  TrBlog PHP版本 - 传统部署启动"
echo "========================================="
echo ""

# 检查是否已安装PHP和Composer
echo "[1/6] 检查环境..."
if ! command -v php &> /dev/null; then
    echo "❌ 错误：PHP未安装"
    echo "请先安装PHP 8.0或更高版本"
    exit 1
fi
echo "✅ PHP检查通过"

php_version=$(php -v | head -n 1 | cut -d " " -f 2)
echo "   PHP版本：$php_version"

if ! command -v composer &> /dev/null; then
    echo "❌ 错误：Composer未安装"
    echo "请先安装Composer：https://getcomposer.org/"
    exit 1
fi
echo "✅ Composer检查通过"
echo ""

# 检查.env文件是否存在，不存在则从.env.example创建
echo "[2/6] 配置环境..."
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ 已从.env.example创建.env文件"
    else
        echo "⚠️  警告：.env.example文件不存在"
    fi
fi
echo ""

# 检查vendor目录是否存在，不存在则安装依赖
echo "[3/6] 安装依赖..."
if [ ! -d "vendor" ]; then
    echo "   正在安装Composer依赖..."
    composer install --no-dev --optimize-autoloader
    if [ $? -ne 0 ]; then
        echo "❌ 错误：依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
else
    echo "✅ 依赖已存在，跳过安装"
fi
echo ""

# 生成应用密钥
echo "[4/6] 生成应用密钥..."
if ! grep -q "APP_KEY=" .env || grep -q "APP_KEY=$" .env; then
    php artisan key:generate --force
    if [ $? -eq 0 ]; then
        echo "✅ 应用密钥生成成功"
    else
        echo "⚠️  警告：应用密钥生成失败"
    fi
else
    echo "✅ 应用密钥已存在，跳过"
fi
echo ""

# 创建必要的目录和设置权限
echo "[5/6] 设置目录权限..."
mkdir -p storage/framework/{sessions,views,cache}
mkdir -p storage/logs
mkdir -p storage/app/public
chmod -R 777 storage bootstrap/cache 2>/dev/null || echo "⚠️  警告：权限设置失败，请手动设置"
echo "✅ 目录权限设置完成"
echo ""

# 启动开发服务器
echo "[6/6] 启动开发服务器..."
echo "📱 访问地址：http://localhost:8000"
echo "⚙️   设置向导：http://localhost:8000/setup"
echo "📚 后台管理：http://localhost:8000/admin"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

php artisan serve --host=0.0.0.0 --port=8000
