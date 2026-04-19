#!/bin/bash

# TrBlog PHP版本 - Docker快速启动脚本
# 傻瓜式一键启动脚本

echo "========================================="
echo "  TrBlog PHP版本 - Docker快速启动"
echo "========================================="
echo ""

# 检查是否已安装Docker和Docker Compose
echo "[1/5] 检查Docker环境..."
if ! command -v docker &> /dev/null; then
    echo "❌ 错误：Docker未安装"
    echo "请先安装Docker：https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! command -v docker compose &> /dev/null; then
    echo "❌ 错误：Docker Compose未安装"
    echo "请先安装Docker Compose"
    exit 1
fi
echo "✅ Docker环境检查通过"
echo ""

# 检查.env文件是否存在，不存在则从.env.example创建
echo "[2/5] 配置环境..."
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ 已从.env.example创建.env文件"
    else
        echo "⚠️  警告：.env.example文件不存在"
    fi
fi
echo ""

# 启动Docker Compose
echo "[3/5] 启动TrBlog服务..."
if command -v docker-compose &> /dev/null; then
    docker-compose up -d
else
    docker compose up -d
fi

if [ $? -ne 0 ]; then
    echo "❌ 错误：Docker Compose启动失败"
    exit 1
fi
echo "✅ 服务启动成功"
echo ""

# 等待服务启动
echo "[4/5] 等待服务就绪（约30秒）..."
for i in {30..1}; do
    echo -ne "  等待中... $i 秒\r"
    sleep 1
done
echo ""
echo ""

# 尝试访问应用以确认启动成功
echo "[5/5] 检查服务状态..."
max_attempts=10
attempt=0

while [ $attempt -lt $max_attempts ]; do
    if curl -s "http://localhost:8000" > /dev/null 2>&1; then
        echo ""
        echo "🎉 TrBlog启动成功！"
        echo ""
        echo "📱 访问地址：http://localhost:8000"
        echo "⚙️   设置向导：http://localhost:8000/setup"
        echo "📚 后台管理：http://localhost:8000/admin"
        echo ""
        echo "📖 使用说明："
        echo "  - 首次访问请使用设置向导配置数据库"
        echo "  - 支持MySQL、PostgreSQL、SQLite三种数据库"
        echo "  - 详细文档请查看README.md"
        echo ""
        echo "🚀 祝您使用愉快！"
        echo ""
        exit 0
    fi
    attempt=$((attempt + 1))
    sleep 3
    echo -ne "  检查服务状态... 尝试 $attempt/$max_attempts\r"
done

echo ""
echo "⚠️  警告：无法连接到应用"
echo "请检查Docker容器是否正常运行："
echo "  docker-compose ps"
echo ""
