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
        echo ""
        
        # 检查是否在非交互式环境中
        if [ -t 0 ]; then
            # 交互式环境
            echo "可选操作:"
            echo "1. 尝试启动 Docker 服务（需要 sudo 权限）"
            echo "2. 进入模拟模式（使用模拟数据）"
            echo "3. 退出"
            read -p "请选择操作 (1-3): " -n 1 -r
            echo

            case $REPLY in
                1)
                    echo "尝试启动 Docker 服务..."
                    if $SUDO systemctl start docker; then
                        echo "Docker 服务启动成功！"
                        sleep 3
                    else
                        echo "错误: 启动 Docker 服务失败"
                        echo "请手动启动 Docker 服务后重试"
                        exit 1
                    fi
                    ;;
                2)
                    echo "进入模拟模式..."
                    echo "提示: 模拟模式下，前端将显示示例数据，无法进行实际的数据库操作"
                    # 设置模拟模式环境变量
                    export NODE_ENV="development"
                    export REACT_APP_MOCK_MODE="true"
                    # 跳过数据库迁移
                    echo "跳过数据库迁移，进入模拟模式"
                    cd server
                    # 生成Prisma客户端（最小化操作）
                    if npx prisma generate > /dev/null 2>&1; then
                        echo "Prisma 客户端生成成功"
                    else
                        echo "警告: Prisma 客户端生成失败，但将继续启动前端"
                    fi
                    cd ..
                    # 直接启动前端
                    echo "正在启动前端开发服务器..."
                    cd client
                    npm run dev
                    exit 0
                    ;;
                3)
                    echo "退出脚本"
                    exit 1
                    ;;
                *)
                    echo "无效选择，退出"
                    exit 1
                    ;;
            esac
        else
            # 非交互式环境，直接进入模拟模式
            echo "非交互式环境，Docker 未运行，进入模拟模式..."
            echo "提示: 模拟模式下，前端将显示示例数据，无法进行实际的数据库操作"
            # 设置模拟模式环境变量
            export NODE_ENV="development"
            export REACT_APP_MOCK_MODE="true"
            export VITE_API_URL="http://localhost:3000/api"
            # 跳过数据库迁移
            echo "跳过数据库迁移，进入模拟模式"
            cd server
            # 生成Prisma客户端（最小化操作）
            echo "正在生成 Prisma 客户端..."
            npx prisma generate
            if [ $? -eq 0 ]; then
                echo "Prisma 客户端生成成功"
            else
                echo "警告: Prisma 客户端生成失败，但将继续启动前端"
            fi
            cd ..
            # 直接启动前端
            echo "正在启动前端开发服务器..."
            cd client
            echo "运行命令: npm run dev"
            npm run dev
            exit 0
        fi
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
        echo ""
        
        # 检查是否在非交互式环境中
        if [ -t 0 ]; then
            # 交互式环境
            echo "可选操作:"
            echo "1. 继续尝试启动（可能会失败）"
            echo "2. 进入模拟模式（使用模拟数据，仅前端界面）"
            echo "3. 退出"
            read -p "请选择操作 (1-3): " -n 1 -r
            echo

            case $REPLY in
                1)
                    echo "继续尝试启动..."
                    ;;
                2)
                    echo "进入模拟模式..."
                    echo "提示: 模拟模式下，前端将显示示例数据，无法进行实际的数据库操作"
                    # 设置模拟模式环境变量
                    export NODE_ENV="development"
                    export REACT_APP_MOCK_MODE="true"
                    # 跳过数据库迁移
                    echo "跳过数据库迁移，进入模拟模式"
                    cd server
                    # 生成Prisma客户端（最小化操作）
                    if npx prisma generate > /dev/null 2>&1; then
                        echo "Prisma 客户端生成成功"
                    else
                        echo "警告: Prisma 客户端生成失败，但将继续启动前端"
                    fi
                    cd ..
                    # 直接启动前端
                    echo "正在启动前端开发服务器..."
                    cd client
                    npm run dev
                    exit 0
                    ;;
                3)
                    echo "退出脚本"
                    exit 1
                    ;;
                *)
                    echo "无效选择，退出"
                    exit 1
                    ;;
            esac
        else
            # 非交互式环境，自动切换到Docker模式
            echo "非交互式环境，自动切换到Docker模式..."
            # 更新 .env 文件
            sed -i 's/DB_TYPE=.*/DB_TYPE=docker/' .env
            echo "已更新 .env 文件，将 DB_TYPE 设置为 docker"
            echo "正在重启启动脚本..."
            exec ./start.sh
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

# 运行迁移
echo "执行数据库迁移..."

# 显示详细错误信息
if npx prisma migrate dev; then
    echo "数据库迁移成功！"
elif npx prisma db push; then
    echo "数据库推送成功！（备选方案）"
elif npx prisma generate; then
    echo "Prisma 客户端生成成功！（最小化方案）"
else
    echo "错误: 数据库操作失败"
    echo "提示: 请检查以下内容："
    echo "1. 数据库是否正常运行"
    echo "2. 数据库连接信息是否正确"
    echo "3. Prisma schema 文件是否正确"
    echo "4. 数据库用户是否有足够权限"
    echo ""
    echo "当前配置："
    echo "  DB_TYPE: $DB_TYPE"
    echo "  DB_HOST: $DB_HOST"
    echo "  DB_PORT: $DB_PORT"
    echo "  DB_USER: $DB_USER"
    echo "  DB_NAME: $DB_NAME"
    echo ""
    echo "可用选项："
    echo "1. 切换到 Docker 模式（推荐）"
    echo "2. 进入模拟模式（使用模拟数据）"
    echo "3. 退出"
    read -p "请选择操作 (1-3): " -n 1 -r
    echo
    
    case $REPLY in
        1)
            echo "切换到 Docker 模式..."
            # 更新 .env 文件
            sed -i 's/DB_TYPE=.*/DB_TYPE=docker/' ../.env
            echo "已更新 .env 文件，将 DB_TYPE 设置为 docker"
            echo "正在重启启动脚本..."
            cd ..
            exec ./start.sh
            ;;
        2)
            echo "进入模拟模式..."
            echo "提示: 模拟模式下，前端将显示示例数据，无法进行实际的数据库操作"
            # 设置模拟模式环境变量
            export NODE_ENV="development"
            export REACT_APP_MOCK_MODE="true"
            # 跳过数据库迁移
            echo "跳过数据库迁移，进入模拟模式"
            # 生成Prisma客户端（最小化操作）
            if npx prisma generate > /dev/null 2>&1; then
                echo "Prisma 客户端生成成功"
            else
                echo "警告: Prisma 客户端生成失败，但将继续启动前端"
            fi
            cd ..
            # 直接启动前端
            echo "正在启动前端开发服务器..."
            cd client
            npm run dev
            exit 0
            ;;
        3)
            echo "退出脚本"
            exit 1
            ;;
        *)
            echo "无效选择，退出"
            exit 1
            ;;
    esac
fi

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
