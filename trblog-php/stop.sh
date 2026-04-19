#!/bin/bash

# TrBlog PHP版本 - 停止和清理脚本
# 傻瓜式一键停止脚本

echo "========================================="
echo "  TrBlog PHP版本 - 停止服务"
echo "========================================="
echo ""

# 停止Docker Compose
echo "[1/3] 停止TrBlog服务..."
if command -v docker-compose &> /dev/null; then
    docker-compose down
else
    docker compose down
fi

if [ $? -eq 0 ]; then
    echo "✅ 服务停止成功"
else
    echo "⚠️  警告：服务停止可能有问题"
fi
echo ""

# 询问是否清理数据
echo "[2/3] 清理选项"
echo ""
echo "您想清理哪些数据？"
echo "  1. 只停止服务（保留所有数据）"
echo "  2. 停止服务并清理Docker镜像和卷"
echo "  3. 停止服务并清理所有数据（包括.env、数据库等）"
echo ""
read -p "请输入选项 (1/2/3) [默认: 1]: " choice

choice=${choice:-1}

case $choice in
    2)
        echo ""
        echo "[3/3] 清理Docker镜像和卷..."
        if command -v docker-compose &> /dev/null; then
            docker-compose down --rmi all -v
        else
            docker compose down --rmi all -v
        fi
        echo "✅ Docker资源清理完成"
        ;;
    3)
        echo ""
        echo "[3/3] 清理所有数据..."
        # 停止并清理Docker
        if command -v docker-compose &> /dev/null; then
            docker-compose down --rmi all -v
        else
            docker compose down --rmi all -v
        fi
        # 删除.env文件
        if [ -f .env ]; then
            read -p "是否删除.env文件？ (y/n) [默认: n]: " delete_env
            delete_env=${delete_env:-n}
            if [ "$delete_env" = "y" ]; then
                rm .env
                echo "✅ .env文件已删除"
            fi
        fi
        # 删除setup完成标志
        if [ -f storage/app/setup_complete ]; then
            rm storage/app/setup_complete
            echo "✅ 设置完成标志已删除"
        fi
        echo "✅ 所有数据清理完成"
        ;;
    *)
        echo "[3/3] 已选择保留所有数据"
        ;;
esac

echo ""
echo "🎉 TrBlog已停止"
echo ""
echo "📖 下次启动请运行：./start.sh"
echo ""
