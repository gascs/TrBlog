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
    export DEPLOY_MODE=docker
    export DB_TYPE=docker
    export DB_ENGINE=postgresql
    export DB_HOST=localhost
    export DB_PORT=5432
    export DB_USER=trblog
    export DB_PASSWORD=trblog123
    export DB_NAME=trblog
fi

echo "=== TrBlog 启动脚本 ==="
echo "当前部署模式: $DEPLOY_MODE"
echo "当前数据库类型: $DB_ENGINE"
echo "当前数据库模式: $DB_TYPE"

# 交互式选择部署模式
if [ -t 0 ]; then
    echo "\n请选择部署方式:"
    echo "1. Docker 模式 (推荐，包含完整环境)"
    echo "2. PHP 模式 (轻量级，适合共享主机)"
    read -p "请选择 (1-2): " -n 1 -r
    echo
    
    case $REPLY in
        1)
            export DEPLOY_MODE=docker
            ;;
        2)
            export DEPLOY_MODE=php
            ;;
        *)
            echo "无效选择，使用默认值: Docker 模式"
            export DEPLOY_MODE=docker
            ;;
    esac
fi

if [ "$DEPLOY_MODE" == "docker" ]; then
    # Docker 模式
    echo "\n=== Docker 部署模式 ==="
    
    # 交互式选择数据库引擎
    if [ -t 0 ]; then
        echo "请选择数据库引擎:"
        echo "1. PostgreSQL (默认)"
        echo "2. MySQL"
        echo "3. SQLite"
        read -p "请选择 (1-3): " -n 1 -r
        echo
        
        case $REPLY in
            1)
                export DB_ENGINE=postgresql
                export DB_PORT=5432
                ;;
            2)
                export DB_ENGINE=mysql
                export DB_PORT=3306
                ;;
            3)
                export DB_ENGINE=sqlite
                export DB_PORT=0
                ;;
            *)
                echo "无效选择，使用默认值: PostgreSQL"
                export DB_ENGINE=postgresql
                export DB_PORT=5432
                ;;
        esac
    fi
    
    # 交互式选择数据库模式
    if [ -t 0 ]; then
        echo "请选择数据库模式:"
        echo "1. Docker 内置数据库 (推荐)"
        echo "2. 外部数据库"
        read -p "请选择 (1-2): " -n 1 -r
        echo
        
        case $REPLY in
            1)
                export DB_TYPE=docker
                ;;
            2)
                export DB_TYPE=external
                # 输入外部数据库信息
                read -p "请输入数据库主机: " DB_HOST
                read -p "请输入数据库端口: " DB_PORT
                read -p "请输入数据库用户名: " DB_USER
                read -s -p "请输入数据库密码: " DB_PASSWORD
                echo
                read -p "请输入数据库名称: " DB_NAME
                ;;
            *)
                echo "无效选择，使用默认值: Docker 内置数据库"
                export DB_TYPE=docker
                ;;
        esac
    fi
    
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
            echo "2. 切换到 PHP 模式"
            echo "3. 进入模拟模式（使用模拟数据）"
            echo "4. 退出"
            read -p "请选择操作 (1-4): " -n 1 -r
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
                    echo "切换到 PHP 模式..."
                    export DEPLOY_MODE=php
                    ;;
                3)
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
                4)
                    echo "退出脚本"
                    exit 1
                    ;;
                *)
                    echo "无效选择，退出"
                    exit 1
                    ;;
            esac
        else
            # 非交互式环境，切换到PHP模式
            echo "非交互式环境，Docker 未运行，切换到 PHP 模式..."
            export DEPLOY_MODE=php
        fi
    fi
    
    if [ "$DEPLOY_MODE" == "docker" ]; then
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
        
        # 启动Docker容器
        echo "正在启动 $DB_ENGINE 数据库..."
        if [ "$DB_ENGINE" == "sqlite" ]; then
            echo "SQLite 数据库不需要容器，直接使用文件"
        else
            $SUDO docker compose up -d

            if [ $? -ne 0 ]; then
                echo "错误: 启动数据库失败"
                echo "提示: 请检查 Docker 权限和网络连接"
                exit 1
            fi

            echo "等待数据库启动完成..."
            # 等待数据库健康检查通过
            for i in {1..30}; do
                if [ "$DB_ENGINE" == "postgresql" ]; then
                    if $SUDO docker compose exec postgres pg_isready -U $DB_USER > /dev/null 2>&1; then
                        echo "数据库启动成功！"
                        break
                    fi
                elif [ "$DB_ENGINE" == "mysql" ]; then
                    if $SUDO docker compose exec mysql mysqladmin ping -u $DB_USER -p$DB_PASSWORD > /dev/null 2>&1; then
                        echo "数据库启动成功！"
                        break
                    fi
                fi
                echo "等待数据库启动中... ($i/30)"
                sleep 2
            done

            if [ $i -eq 30 ]; then
                echo "错误: 数据库启动超时"
                echo "提示: 请检查 Docker 日志以了解详情"
                exit 1
            fi
        fi
    fi
else
    # PHP 模式
    echo "\n=== PHP 部署模式 ==="
    
    # 交互式选择数据库引擎
    if [ -t 0 ]; then
        echo "请选择数据库引擎:"
        echo "1. MySQL (默认)"
        echo "2. SQLite"
        read -p "请选择 (1-2): " -n 1 -r
        echo
        
        case $REPLY in
            1)
                export DB_ENGINE=mysql
                export DB_PORT=3306
                ;;
            2)
                export DB_ENGINE=sqlite
                export DB_PORT=0
                ;;
            *)
                echo "无效选择，使用默认值: MySQL"
                export DB_ENGINE=mysql
                export DB_PORT=3306
                ;;
        esac
    fi
    
    # 交互式选择数据库模式
    if [ -t 0 ]; then
        echo "请选择数据库模式:"
        echo "1. 本地数据库"
        echo "2. 外部数据库"
        read -p "请选择 (1-2): " -n 1 -r
        echo
        
        case $REPLY in
            1)
                export DB_TYPE=local
                ;;
            2)
                export DB_TYPE=external
                # 输入外部数据库信息
                read -p "请输入数据库主机: " DB_HOST
                read -p "请输入数据库端口: " DB_PORT
                read -p "请输入数据库用户名: " DB_USER
                read -s -p "请输入数据库密码: " DB_PASSWORD
                echo

                read -p "请输入数据库名称: " DB_NAME
                ;;
            *)
                echo "无效选择，使用默认值: 本地数据库"
                export DB_TYPE=local
                ;;
        esac
    fi
    
    echo "使用 $DB_TYPE $DB_ENGINE 数据库模式"
    if [ "$DB_ENGINE" == "mysql" ]; then
        if [ "$DB_TYPE" == "local" ]; then
            # 检查MySQL是否安装
            if ! command -v mysql > /dev/null 2>&1; then
                echo "警告: MySQL 未安装"
                echo ""
                
                if [ -t 0 ]; then
                    echo "可选操作:"
                    echo "1. 尝试安装 MySQL（需要 sudo 权限）"
                    echo "2. 切换到 Docker 模式"
                    echo "3. 切换到 SQLite 数据库"
                    echo "4. 退出"
                    read -p "请选择操作 (1-4): " -n 1 -r
                    echo

                    case $REPLY in
                        1)
                            echo "尝试安装 MySQL..."
                            if [ -f /etc/debian_version ]; then
                                # Debian/Ubuntu
                                $SUDO apt update
                                $SUDO apt install -y mysql-server
                                
                                # 启动MySQL服务
                                $SUDO systemctl start mysql
                                $SUDO systemctl enable mysql
                                
                                # 设置默认密码
                                echo "正在设置 MySQL 密码..."
                                $SUDO mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';"
                                
                                # 创建数据库和用户
                                echo "正在创建数据库和用户..."
                                $SUDO mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
                                $SUDO mysql -u root -proot -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"
                                $SUDO mysql -u root -proot -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
                                $SUDO mysql -u root -proot -e "FLUSH PRIVILEGES;"
                                
                                echo "MySQL 安装和配置成功！"
                            elif [ -f /etc/redhat-release ]; then
                                # RHEL/CentOS
                                $SUDO yum install -y mysql-server
                                
                                # 启动MySQL服务
                                $SUDO systemctl start mysqld
                                $SUDO systemctl enable mysqld
                                
                                # 获取临时密码
                                TEMP_PASS=$(grep 'temporary password' /var/log/mysqld.log | awk '{print $NF}')
                                
                                # 设置密码
                                echo "正在设置 MySQL 密码..."
                                $SUDO mysql_secure_installation <<EOF
$TEMP_PASS
Y
$DB_PASSWORD
$DB_PASSWORD
Y
Y
Y
Y
EOF
                                
                                # 创建数据库和用户
                                echo "正在创建数据库和用户..."
                                $SUDO mysql -u root -p$DB_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
                                $SUDO mysql -u root -p$DB_PASSWORD -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"
                                $SUDO mysql -u root -p$DB_PASSWORD -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
                                $SUDO mysql -u root -p$DB_PASSWORD -e "FLUSH PRIVILEGES;"
                                
                                echo "MySQL 安装和配置成功！"
                            else
                                echo "错误: 不支持的操作系统，无法自动安装 MySQL"
                                exit 1
                            fi
                            ;;
                        2)
                            echo "切换到 Docker 模式..."
                            export DEPLOY_MODE=docker
                            exec ./start.sh
                            ;;
                        3)
                            echo "切换到 SQLite 数据库..."
                            export DB_ENGINE=sqlite
                            export DB_PORT=0
                            ;;
                        4)
                            echo "退出脚本"
                            exit 1
                            ;;
                        *)
                            echo "无效选择，退出"
                            exit 1
                            ;;
                    esac
                else
                    echo "非交互式环境，MySQL 未安装，退出"
                    exit 1
                fi
            else
                echo "MySQL 已安装"
            fi
            
            # 检查MySQL服务是否运行
            if ! systemctl is-active --quiet mysql && ! systemctl is-active --quiet mysqld; then
                echo "警告: MySQL 服务未运行"
                echo "正在启动 MySQL 服务..."
                if $SUDO systemctl start mysql || $SUDO systemctl start mysqld; then
                    echo "MySQL 服务启动成功！"
                else
                    echo "错误: 无法启动 MySQL 服务"
                    exit 1
                fi
            fi
        fi
        
        echo "数据库连接信息: $DB_USER@$DB_HOST:$DB_PORT/$DB_NAME"
        
        # 检查数据库连接
        if ! mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD -e 'SELECT 1' $DB_NAME > /dev/null 2>&1; then
            echo "警告: 无法连接到数据库"
            echo "请检查数据库是否已启动，以及连接信息是否正确"
            echo ""
            
            if [ -t 0 ]; then
                echo "可选操作:"
                echo "1. 继续尝试启动（可能会失败）"
                echo "2. 切换到 Docker 模式"
                echo "3. 退出"
                read -p "请选择操作 (1-3): " -n 1 -r
                echo

                case $REPLY in
                    1)
                        echo "继续尝试启动..."
                        ;;
                    2)
                        echo "切换到 Docker 模式..."
                        export DEPLOY_MODE=docker
                        exec ./start.sh
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
                echo "非交互式环境，数据库连接失败，退出"
                exit 1
            fi
        else
            echo "数据库连接成功！"
        fi
    else
        echo "SQLite 数据库将使用本地文件"
    fi
    
    # 启动PHP服务器
    echo "正在启动 PHP 服务器..."
    cd trblog-php
    if [ -f start.sh ]; then
        ./start.sh
    else
        echo "错误: PHP 启动脚本未找到"
        exit 1
    fi
    exit 0
fi

if [ "$DEPLOY_MODE" == "docker" ]; then
    # 运行数据库迁移
    echo "正在运行数据库迁移..."
    cd server

    # 根据环境变量生成DATABASE_URL
    if [ "$DB_ENGINE" == "postgresql" ]; then
        export DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME?schema=public"
    elif [ "$DB_ENGINE" == "mysql" ]; then
        export DATABASE_URL="mysql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
    elif [ "$DB_ENGINE" == "sqlite" ]; then
        export DATABASE_URL="file:./trblog.db"
    fi
    
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
        echo "  DB_ENGINE: $DB_ENGINE"
        echo "  DB_TYPE: $DB_TYPE"
        echo "  DB_HOST: $DB_HOST"
        echo "  DB_PORT: $DB_PORT"
        echo "  DB_USER: $DB_USER"
        echo "  DB_NAME: $DB_NAME"
        echo ""
        echo "可用选项："
        echo "1. 切换到 PHP 模式"
        echo "2. 进入模拟模式（使用模拟数据）"
        echo "3. 退出"
        read -p "请选择操作 (1-3): " -n 1 -r
        echo
        
        case $REPLY in
            1)
                echo "切换到 PHP 模式..."
                export DEPLOY_MODE=php
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
fi