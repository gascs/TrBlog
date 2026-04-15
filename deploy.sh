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
    # 自动创建.env文件
    cat > .env << EOF
# 数据库配置
# 可选值: docker, local
DB_TYPE=docker

# Docker 数据库配置
DB_HOST=localhost
DB_PORT=5432
DB_USER=trblog
DB_PASSWORD=trblog123
DB_NAME=trblog

# 本地数据库配置（当 DB_TYPE=local 时使用）
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=your_local_user
# DB_PASSWORD=your_local_password
# DB_NAME=trblog
EOF
    echo_green "已自动创建 .env 文件"
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

echo_purple() {
    echo -e "\033[35m$1\033[0m"
}

# 检查系统依赖
check_system_dependencies() {
    echo ""
    echo_blue "检查系统依赖..."
    
    # 检查Node.js
    if command -v node > /dev/null 2>&1; then
        NODE_VERSION=$(node -v)
        echo_green "Node.js 已安装: $NODE_VERSION"
    else
        echo_red "错误: Node.js 未安装"
        echo "提示: 请先安装 Node.js 14+"
        return 1
    fi
    
    # 检查npm
    if command -v npm > /dev/null 2>&1; then
        NPM_VERSION=$(npm -v)
        echo_green "npm 已安装: $NPM_VERSION"
    else
        echo_red "错误: npm 未安装"
        echo "提示: 请先安装 npm"
        return 1
    fi
    
    # 检查Docker（如果需要）
    if [ "$DB_TYPE" == "docker" ]; then
        if command -v docker > /dev/null 2>&1; then
            DOCKER_VERSION=$(docker -v)
            echo_green "Docker 已安装: $DOCKER_VERSION"
        else
            echo_yellow "警告: Docker 未安装"
            echo "提示: 将使用本地编译运行模式"
            export DB_TYPE=local
        fi
    fi
    
    # 检查curl
    if command -v curl > /dev/null 2>&1; then
        echo_green "curl 已安装"
    else
        echo_yellow "警告: curl 未安装"
        echo "提示: 某些功能可能无法正常工作"
    fi
    
    # 检查ping
    if command -v ping > /dev/null 2>&1; then
        echo_green "ping 已安装"
    else
        echo_yellow "警告: ping 未安装"
        echo "提示: 网络检查功能将被跳过"
    fi
    
    return 0
}

# 检查项目状态
check_project_status() {
    echo ""
    echo_blue "检查项目状态..."
    
    # 检查前端
    if [ -d "client" ]; then
        echo_green "前端目录存在"
        if [ -f "client/package.json" ]; then
            echo_green "前端配置文件存在"
        else
            echo_red "错误: 前端配置文件不存在"
        fi
    else
        echo_red "错误: 前端目录不存在"
    fi
    
    # 检查后端
    if [ -d "server" ]; then
        echo_green "后端目录存在"
        if [ -f "server/package.json" ]; then
            echo_green "后端配置文件存在"
        else
            echo_red "错误: 后端配置文件不存在"
        fi
    else
        echo_red "错误: 后端目录不存在"
    fi
    
    # 检查环境变量
    echo ""
    echo "当前环境变量:"
    echo "  DB_TYPE: $DB_TYPE"
    echo "  DB_HOST: $DB_HOST"
    echo "  DB_PORT: $DB_PORT"
    echo "  DB_USER: $DB_USER"
    echo "  DB_NAME: $DB_NAME"
    
    # 检查Docker状态
    echo ""
    if docker info > /dev/null 2>&1; then
        echo_green "Docker 服务运行正常"
        # 检查Docker Compose
        if command -v docker-compose > /dev/null 2>&1; then
            echo_green "Docker Compose 已安装"
        else
            echo_yellow "警告: Docker Compose 未安装"
        fi
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
    
    # 检查数据库配置
    echo ""
    echo "检查数据库配置..."
    if [ "$DB_TYPE" == "docker" ]; then
        echo_green "使用 Docker 数据库模式"
    else
        echo_green "使用本地数据库模式"
        # 检查本地PostgreSQL
        if command -v psql > /dev/null 2>&1; then
            echo_green "psql 客户端已安装"
        else
            echo_yellow "警告: psql 客户端未安装"
        fi
    fi
}

# 安装依赖
install_dependencies() {
    echo ""
    echo_blue "安装项目依赖..."
    
    # 安装前端依赖
    echo "安装前端依赖..."
    cd client
    if npm install --silent; then
        echo_green "前端依赖安装成功"
    else
        echo_red "前端依赖安装失败"
        # 尝试清理并重新安装
        echo "尝试清理并重新安装..."
        rm -rf node_modules package-lock.json
        if npm install --silent; then
            echo_green "前端依赖重新安装成功"
        else
            echo_red "前端依赖重新安装失败"
            return 1
        fi
    fi
    cd ..
    
    # 安装后端依赖
    echo "安装后端依赖..."
    cd server
    if npm install --silent; then
        echo_green "后端依赖安装成功"
    else
        echo_red "后端依赖安装失败"
        # 尝试清理并重新安装
        echo "尝试清理并重新安装..."
        rm -rf node_modules package-lock.json
        if npm install --silent; then
            echo_green "后端依赖重新安装成功"
        else
            echo_red "后端依赖重新安装失败"
            return 1
        fi
    fi
    cd ..
    
    return 0
}

# 本地编译运行
local_run() {
    echo ""
    echo_blue "本地编译运行模式"
    
    # 检查系统依赖
    if ! check_system_dependencies; then
        echo_red "系统依赖检查失败，退出"
        return 1
    fi
    
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
    if npm run build --silent; then
        echo_green "前端编译成功"
    else
        echo_red "前端编译失败"
        # 尝试修复TypeScript错误
        echo "尝试修复TypeScript错误..."
        if npm run lint --fix > /dev/null 2>&1; then
            echo_green "TypeScript错误已修复，重新编译..."
            if npm run build --silent; then
                echo_green "前端编译成功"
            else
                echo_red "前端编译仍然失败"
                return 1
            fi
        else
            echo_red "前端编译失败"
            return 1
        fi
    fi
    cd ..
    
    # 编译后端
    echo "编译后端..."
    cd server
    if npm run build --silent; then
        echo_green "后端编译成功"
    else
        echo_red "后端编译失败"
        # 尝试修复TypeScript错误
        echo "尝试修复TypeScript错误..."
        if npm run lint --fix > /dev/null 2>&1; then
            echo_green "TypeScript错误已修复，重新编译..."
            if npm run build --silent; then
                echo_green "后端编译成功"
            else
                echo_red "后端编译仍然失败"
                return 1
            fi
        else
            echo_red "后端编译失败"
            return 1
        fi
    fi
    cd ..
    
    # 启动后端服务器
    echo "启动后端服务器..."
    cd server
    npm run start:dev > server.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    
    # 等待后端启动
    echo "等待后端服务器启动..."
    for i in {1..30}; do
        if curl -s http://localhost:3000 > /dev/null 2>&1; then
            echo_green "后端服务器启动成功！"
            break
        fi
        echo "等待中... ($i/30)"
        sleep 1
    done
    
    if [ $i -eq 30 ]; then
        echo_red "错误: 后端服务器启动超时"
        echo "查看日志: cat server/server.log"
        kill $BACKEND_PID 2>/dev/null
        return 1
    fi
    
    # 启动前端开发服务器
    echo ""
    echo_purple "========================================"
    echo_purple "        服务已启动！"
    echo_purple "========================================"
    echo "前端访问地址: http://localhost:5173"
    echo "后端API地址: http://localhost:3000"
    echo ""
    echo "按 Ctrl+C 停止服务"
    echo ""
    
    cd client
    npm run dev
    
    # 清理进程
    kill $BACKEND_PID 2>/dev/null
    rm -f server/server.log
}

# Docker容器运行
docker_run() {
    echo ""
    echo_blue "Docker 容器运行模式"
    
    # 检查系统依赖
    if ! check_system_dependencies; then
        echo_red "系统依赖检查失败，退出"
        return 1
    fi
    
    # 检查Docker
    if ! $SUDO docker info > /dev/null 2>&1; then
        echo_red "错误: Docker 未运行"
        echo "提示: 正在尝试启动 Docker 服务..."
        if $SUDO systemctl start docker > /dev/null 2>&1; then
            echo_green "Docker 服务启动成功"
            # 等待Docker服务完全启动
            sleep 5
        else
            echo_red "无法启动 Docker 服务"
            echo "提示: 请手动启动 Docker 服务"
            return 1
        fi
    fi
    
    # 检查网络连接
    echo "检查网络连接..."
    if ping -c 1 docker.io > /dev/null 2>&1; then
        echo_green "网络连接正常"
    else
        echo_yellow "警告: 网络连接可能存在问题"
        echo "将继续执行，但拉取镜像可能会失败"
    fi
    
    # 检查Docker Compose文件
    if [ ! -f "docker-compose.yml" ]; then
        echo_red "错误: docker-compose.yml 文件不存在"
        # 自动创建docker-compose.yml文件
        cat > docker-compose.yml << EOF
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: trblog-postgres
    environment:
      POSTGRES_USER: trblog
      POSTGRES_PASSWORD: trblog123
      POSTGRES_DB: trblog
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U trblog"]
      interval: 10s
      timeout: 5s
      retries: 5

  server:
    build: ./server
    container_name: trblog-server
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      DATABASE_URL: "postgresql://trblog:trblog123@postgres:5432/trblog?schema=public"
      JWT_SECRET: "your-super-secret-jwt-key-change-this-in-production"
      JWT_EXPIRES_IN: "7d"
      PORT: 3000
      NODE_ENV: "development"

  client:
    build: ./client
    container_name: trblog-client
    ports:
      - "80:80"
    depends_on:
      - server

volumes:
  postgres_data:
    name: trblog-postgres-data
EOF
        echo_green "已自动创建 docker-compose.yml 文件"
    fi
    
    # 启动Docker容器
    echo "启动 Docker 容器..."
    $SUDO docker compose up -d
    
    if [ $? -ne 0 ]; then
        echo_red "错误: 启动容器失败"
        echo "提示: 检查Docker日志以了解详情"
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
        echo "提示: 检查Docker日志以了解详情"
        $SUDO docker compose down
        return 1
    fi
    
    # 运行数据库迁移
    echo "运行数据库迁移..."
    if $SUDO docker compose exec server npx prisma migrate dev > /dev/null 2>&1; then
        echo_green "数据库迁移成功！"
    else
        echo_yellow "警告: 数据库迁移可能失败"
        echo "尝试运行数据库推送..."
        if $SUDO docker compose exec server npx prisma db push > /dev/null 2>&1; then
            echo_green "数据库推送成功！"
        else
            echo_red "数据库操作失败"
        fi
    fi
    
    # 查看容器状态
    echo ""
    echo_blue "容器状态:"
    $SUDO docker compose ps
    
    # 检查服务是否正常运行
    echo ""
    echo "检查服务状态..."
    for i in {1..10}; do
        if curl -s http://localhost:3000 > /dev/null 2>&1; then
            echo_green "后端服务运行正常！"
            break
        fi
        echo "等待后端服务... ($i/10)"
        sleep 2
    done
    
    for i in {1..10}; do
        if curl -s http://localhost:80 > /dev/null 2>&1; then
            echo_green "前端服务运行正常！"
            break
        fi
        echo "等待前端服务... ($i/10)"
        sleep 2
    done
    
    # 显示访问地址
    echo ""
    echo_purple "========================================"
    echo_purple "        服务已启动！"
    echo_purple "========================================"
    echo "前端访问地址: http://localhost:80"
    echo "后端API地址: http://localhost:3000"
    echo ""
    echo "使用 'docker compose down' 停止服务"
    echo "查看日志: docker compose logs -f"
    echo ""
    
    # 查看日志
    $SUDO docker compose logs
}

# 构建生产环境镜像
build_production() {
    echo ""
    echo_blue "构建生产环境镜像"
    
    # 检查系统依赖
    if ! check_system_dependencies; then
        echo_red "系统依赖检查失败，退出"
        return 1
    fi
    
    # 检查Docker
    if ! $SUDO docker info > /dev/null 2>&1; then
        echo_red "错误: Docker 未运行"
        echo "提示: 正在尝试启动 Docker 服务..."
        if $SUDO systemctl start docker > /dev/null 2>&1; then
            echo_green "Docker 服务启动成功"
            # 等待Docker服务完全启动
            sleep 5
        else
            echo_red "无法启动 Docker 服务"
            return 1
        fi
    fi
    
    # 检查生产环境配置文件
    if [ ! -f "docker-compose.prod.yml" ]; then
        echo_red "错误: docker-compose.prod.yml 文件不存在"
        # 自动创建docker-compose.prod.yml文件
        cat > docker-compose.prod.yml << EOF
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: trblog-postgres-prod
    environment:
      POSTGRES_USER: trblog
      POSTGRES_PASSWORD: trblog123
      POSTGRES_DB: trblog
    ports:
      - "5432:5432"
    volumes:
      - postgres_data_prod:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U trblog"]
      interval: 10s
      timeout: 5s
      retries: 5

  server:
    build: ./server
    container_name: trblog-server-prod
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      DATABASE_URL: "postgresql://trblog:trblog123@postgres:5432/trblog?schema=public"
      JWT_SECRET: "your-super-secret-jwt-key-change-this-in-production"
      JWT_EXPIRES_IN: "7d"
      PORT: 3000
      NODE_ENV: "production"

  client:
    build: ./client
    container_name: trblog-client-prod
    ports:
      - "80:80"
    depends_on:
      - server

volumes:
  postgres_data_prod:
    name: trblog-postgres-data-prod
EOF
        echo_green "已自动创建 docker-compose.prod.yml 文件"
    fi
    
    # 构建镜像
    echo "构建生产环境镜像..."
    $SUDO docker compose -f docker-compose.prod.yml build
    
    if [ $? -eq 0 ]; then
        echo ""
        echo_purple "========================================"
        echo_purple "        构建成功！"
        echo_purple "========================================"
        echo_green "生产环境镜像构建成功！"
        echo "启动生产环境: docker compose -f docker-compose.prod.yml up -d"
        echo "停止生产环境: docker compose -f docker-compose.prod.yml down"
    else
        echo_red "构建失败"
        echo "提示: 检查Docker日志以了解详情"
    fi
}

# 智能模式（自动检测并选择最佳运行方式）
smart_mode() {
    echo ""
    echo_blue "智能模式 - 自动检测最佳运行方式"
    
    # 检查系统依赖
    if ! check_system_dependencies; then
        echo_red "系统依赖检查失败，退出"
        return 1
    fi
    
    # 检测Docker是否可用
    if docker info > /dev/null 2>&1; then
        echo_green "检测到 Docker 可用，使用 Docker 容器运行模式"
        docker_run
    else
        echo_yellow "未检测到 Docker，使用本地编译运行模式"
        local_run
    fi
}

# 主函数
main() {
    # 显示欢迎信息
    echo ""
    echo_purple "========================================"
    echo_purple "        TrBlog 智能部署脚本"
    echo_purple "========================================"
    echo "1. 本地编译运行"
    echo "2. Docker 容器运行"
    echo "3. 构建生产环境镜像"
    echo "4. 检查项目状态"
    echo "5. 智能模式（自动选择）"
    echo "6. 退出"
    echo ""
    
    # 非交互模式检查
    if [ $# -eq 0 ]; then
        # 交互模式
        read -p "请选择操作 (1-6): " choice
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
            smart_mode
            ;;
        6)
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
