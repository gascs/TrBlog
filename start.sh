#!/bin/bash

# 检查是否需要使用sudo
if [ "$(id -u)" != "0" ]; then
    SUDO="sudo"
else
    SUDO=""
fi

# 加载环境变量
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "警告: .env 文件未找到，使用默认配置"
    export DB_TYPE=docker
    export DB_HOST=localhost
    export DB_PORT=5432
    export DB_USER=trblog
    export DB_PASSWORD=trblog123
    export DB_NAME=trblog
fi

echo "=== TrBlog 启动脚本 ==="
echo "当前数据库模式: $DB_TYPE"

if [ "$DB_TYPE" == "docker" ]; then
    # 检查Docker是否运行
    if ! $SUDO docker info > /dev/null 2>&1; then
        echo "错误: Docker 未运行，请先启动 Docker 服务"
        echo "提示: 可以使用 'sudo systemctl start docker' 启动 Docker"
        exit 1
    fi

    # 检查网络连接
    echo "检查网络连接..."
    if ! ping -c 1 docker.io > /dev/null 2>&1; then
        echo "警告: 网络连接可能存在问题，拉取镜像可能会失败"
        echo "请检查您的网络连接后重试"
        read -p "是否继续？(y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi

    echo "正在启动 PostgreSQL 数据库..."
    $SUDO docker compose up -d

    if [ $? -ne 0 ]; then
        echo "错误: 启动数据库失败"
        echo "提示: 请检查 Docker 权限和网络连接"
        exit 1
    fi

    echo "等待数据库启动完成..."
    # 等待数据库健康检查通过
    for i in {1..30}; do
        if $SUDO docker compose exec postgres pg_isready -U $DB_USER > /dev/null 2>&1; then
            echo "数据库启动成功！"
            break
        fi
        echo "等待数据库启动中... ($i/30)"
        sleep 2
    done

    if [ $i -eq 30 ]; then
        echo "错误: 数据库启动超时"
        echo "提示: 请检查 Docker 日志以了解详情"
        exit 1
    fi
else
    echo "使用本地数据库模式，跳过 Docker 启动"
    echo "请确保本地 PostgreSQL 数据库已启动并配置正确"
    echo "数据库连接信息: $DB_USER@$DB_HOST:$DB_PORT/$DB_NAME"
    
    # 检查本地数据库连接
    if ! psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c 'SELECT 1' > /dev/null 2>&1; then
        echo "警告: 无法连接到本地数据库"
        echo "请检查本地 PostgreSQL 数据库是否已启动，以及连接信息是否正确"
        read -p "是否继续？(y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    else
        echo "本地数据库连接成功！"
    fi
fi

echo "正在运行数据库迁移..."
cd server

# 根据环境变量生成DATABASE_URL
export DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME?schema=public"
echo "使用数据库连接: $DATABASE_URL"

if ! npx prisma migrate dev > /dev/null 2>&1; then
    echo "错误: 数据库迁移失败"
    echo "提示: 请检查数据库连接和 Prisma 配置"
    exit 1
fi

echo "数据库迁移成功！"

echo "正在启动后端服务器..."
npm run start:dev &
BACKEND_PID=$!

echo "等待后端服务器启动完成..."
for i in {1..20}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "后端服务器启动成功！"
        break
    fi
    echo "等待后端服务器启动中... ($i/20)"
    sleep 2
done

echo "正在启动前端开发服务器..."
cd ../client
npm run dev
