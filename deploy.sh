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
    export NODE_ENV=development
fi

# 彩色输出函数
echo_green() {
    echo -e "\033[32m$1\033[0m"
}

echo_yellow() {
    echo -e "\033[33m$1\033[0m"
}

echo_red() {
    echo -e "\033[31m$1\033[0m"
}

echo_blue() {
    echo -e "\033[34m$1\033[0m"
}

# 检查项目状态
check_project_status() {
    echo ""
    echo_blue "检查项目状态..."
    
    # 检查前端
    echo "前端目录: $(ls -la client/ | head -5)"
    
    # 检查后端
    echo "后端目录: $(ls -la server/ | head -5)"
    
    # 检查环境变量
    echo "当前环境变量:"
    echo "  DB_TYPE: $DB_TYPE"
    echo "  DB_HOST: $DB_HOST"
    echo "  DB_PORT: $DB_PORT"
    echo "  DB_USER: $DB_USER"
    echo "  DB_NAME: $DB_NAME"
    
    # 检查Docker状态
    if docker info > /dev/null 2>&1; then
        echo_green "Docker 服务运行正常"
    else
        echo_yellow "Docker 服务未运行"
    fi
    
    # 检查依赖
    echo ""
    echo "检查依赖状态..."
    if [ -d "client/node_modules" ]; then
        echo_green "前端依赖已安装"
    else
        echo_yellow "前端依赖未安装"
    fi
    
    if [ -d "server/node_modules" ]; then
        echo_green "后端依赖已安装"
    else
        echo_yellow "后端依赖未安装"
    fi
    
    # 检查编译状态
    echo ""
    echo "检查编译状态..."
    if [ -d "client/dist" ]; then
        echo_green "前端已编译"
    else
        echo_yellow "前端未编译"
    fi
    
    if [ -d "server/dist" ]; then
        echo_green "后端已编译"
    else
        echo_yellow "后端未编译"
    fi
}

# 安装依赖
install_dependencies() {
    echo ""
    echo_blue "安装项目依赖..."
    
    # 安装前端依赖
    echo "安装前端依赖..."
    cd client
    if npm install; then
        echo_green "前端依赖安装成功"
    else
        echo_red "前端依赖安装失败"
        return 1
    fi
    cd ..
    
    # 安装后端依赖
    echo "安装后端依赖..."
    cd server
    if npm install; then
        echo_green "后端依赖安装成功"
    else
        echo_red "后端依赖安装失败"
        return 1
    fi
    cd ..
    
    return 0
}

# 本地编译运行
local_run() {
    echo ""
    echo_blue "本地编译运行模式"
    
    # 检查依赖
    if [ ! -d "client/node_modules" ] || [ ! -d "server/node_modules" ]; then
        echo_yellow "依赖未安装，正在安装..."
        if ! install_dependencies; then
            echo_red "依赖安装失败，退出"
            return 1
        fi
    fi
    
    # 编译前端
    echo "编译前端..."
    cd client
    if npm run build; then
        echo_green "前端编译成功"
    else
        echo_red "前端编译失败"
        return 1
    fi
    cd ..
    
    # 编译后端
    echo "编译后端..."
    cd server
    if npm run build; then
        echo_green "后端编译成功"
    else
        echo_red "后端编译失败"
        return 1
    fi
    cd ..
    
    # 启动后端服务器
    echo "启动后端服务器..."
    cd server
    npm run start:dev &
    BACKEND_PID=$!
    cd ..
    
    # 等待后端启动
    echo "等待后端服务器启动..."
    for i in {1..20}; do
        if curl -s http://localhost:3000 > /dev/null 2>&1; then
            echo_green "后端服务器启动成功！"
            break
        fi
        echo "等待中... ($i/20)"
        sleep 2
    done
    
    # 启动前端开发服务器
    echo "启动前端开发服务器..."
    echo "前端访问地址: http://localhost:5173"
    echo "后端API地址: http://localhost:3000"
    echo ""
    echo "按 Ctrl+C 停止服务"
    
    cd client
    npm run dev
    
    # 清理进程
    kill $BACKEND_PID 2>/dev/null
}

# Docker容器运行
docker_run() {
    echo ""
    echo_blue "Docker 容器运行模式"
    
    # 检查Docker
    if ! $SUDO docker info > /dev/null 2>&1; then
        echo_red "错误: Docker 未运行"
        echo "提示: 可以使用 'sudo systemctl start docker' 启动 Docker"
        return 1
    fi
    
    # 检查网络连接
    echo "检查网络连接..."
    if ! ping -c 1 docker.io > /dev/null 2>&1; then
        echo_yellow "警告: 网络连接可能存在问题"
        echo "将继续执行，但拉取镜像可能会失败"
    fi
    
    # 启动Docker容器
    echo "启动 Docker 容器..."
    $SUDO docker compose up -d
    
    if [ $? -ne 0 ]; then
        echo_red "错误: 启动容器失败"
        return 1
    fi
    
    # 等待数据库启动
    echo "等待数据库启动..."
    for i in {1..30}; do
        if $SUDO docker compose exec postgres pg_isready -U $DB_USER > /dev/null 2>&1; then
            echo_green "数据库启动成功！"
            break
        fi
        echo "等待中... ($i/30)"
        sleep 2
    done
    
    if [ $i -eq 30 ]; then
        echo_red "错误: 数据库启动超时"
        return 1
    fi
    
    # 运行数据库迁移
    echo "运行数据库迁移..."
    $SUDO docker compose exec server npx prisma migrate dev
    
    # 查看容器状态
    echo ""
    echo_blue "容器状态:"
    $SUDO docker compose ps
    
    # 显示访问地址
    echo ""
    echo_green "服务已启动！"
    echo "前端访问地址: http://localhost:80"
    echo "后端API地址: http://localhost:3000"
    echo ""
    echo "使用 'docker compose down' 停止服务"
    
    # 查看日志
    $SUDO docker compose logs
}

# 构建生产环境镜像
build_production() {
    echo ""
    echo_blue "构建生产环境镜像"
    
    # 检查Docker
    if ! $SUDO docker info > /dev/null 2>&1; then
        echo_red "错误: Docker 未运行"
        return 1
    fi
    
    # 构建镜像
    echo "构建生产环境镜像..."
    $SUDO docker compose -f docker-compose.prod.yml build
    
    if [ $? -eq 0 ]; then
        echo_green "生产环境镜像构建成功！"
        echo "可以使用 'docker compose -f docker-compose.prod.yml up -d' 启动生产环境"
    else
        echo_red "构建失败"
    fi
}

# 主函数
main() {
    echo ""
    echo_blue "========================================"
    echo_blue "        TrBlog 部署脚本"
    echo_blue "========================================"
    echo "1. 本地编译运行"
    echo "2. Docker 容器运行"
    echo "3. 构建生产环境镜像"
    echo "4. 检查项目状态"
    echo "5. 退出"
    echo ""
    
    # 非交互模式检查
    if [ $# -eq 0 ]; then
        # 交互模式
        read -p "请选择操作 (1-5): " choice
    else
        # 非交互模式
        choice=$1
    fi
    
    case $choice in
        1)
            local_run
            ;;
        2)
            docker_run
            ;;
        3)
            build_production
            ;;
        4)
            check_project_status
            ;;
        5)
            echo "退出脚本"
            exit 0
            ;;
        *)
            echo_red "无效选择，请重新输入"
            if [ $# -eq 0 ]; then
                main
            else
                exit 1
            fi
            ;;
    esac
}

# 运行主函数
main $@
