#!/bin/bash

# TrBlog PHP版本 - 传统部署启动脚本
# 不使用Docker，直接在本地环境运行

echo "========================================="
echo "  TrBlog PHP版本 - 传统部署启动"
echo "========================================="
echo ""

# 检查PHP是否安装
echo "[1/5] 检查PHP环境..."
if ! command -v php &> /dev/null; then
    echo "❌ 错误：PHP未安装"
    echo "请先安装PHP 8.0+版本"
    exit 1
fi

PHP_VERSION=$(php -v | head -n 1 | grep -oP 'PHP \K[0-9]+\.[0-9]+')
if (( $(echo "$PHP_VERSION < 8.0" | bc -l) )); then
    echo "❌ 错误：PHP版本过低"
    echo "需要PHP 8.0+版本，当前版本：$PHP_VERSION"
    exit 1
fi
echo "✅ PHP环境检查通过 (版本: $PHP_VERSION)"
echo ""

# 检查Composer是否安装
echo "[2/5] 检查Composer环境..."
if ! command -v composer &> /dev/null; then
    echo "❌ 错误：Composer未安装"
    echo "请先安装Composer：https://getcomposer.org/"
    exit 1
fi
echo "✅ Composer环境检查通过"
echo ""

# 检查.env文件是否存在，不存在则从.env.example创建
echo "[3/5] 配置环境..."
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ 已从.env.example创建.env文件"
    else
        echo "⚠️  警告：.env.example文件不存在"
    fi
fi

# 安装依赖
echo "[4/5] 安装依赖..."
composer install --no-interaction
if [ $? -ne 0 ]; then
    echo "❌ 错误：依赖安装失败"
    exit 1
fi
echo "✅ 依赖安装成功"
echo ""

# 生成应用密钥
echo "[5/5] 配置应用..."
if [ ! -f .env ] || ! grep -q "APP_KEY" .env; then
    php artisan key:generate
    echo "✅ 应用密钥生成成功"
fi

# 清除缓存
echo "清除缓存..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
echo "✅ 缓存清除成功"

# 生成配置缓存
echo "生成配置缓存..."
php artisan config:cache
echo "✅ 配置缓存生成成功"

# 设置目录权限
chmod -R 755 storage
chmod -R 755 bootstrap/cache

echo "✅ 目录权限设置成功"
echo ""

# 启动PHP内置服务器
echo "🚀 启动TrBlog服务..."
echo ""
echo "📱 访问地址：http://localhost:8000"
echo "⚙️   设置向导：http://localhost:8000/setup"
echo "📚 后台管理：http://localhost:8000/admin"
echo ""
echo "按 Ctrl+C 停止服务"
echo ""

# 使用PHP内置服务器直接指向public目录
php -S 0.0.0.0:8000 -t public