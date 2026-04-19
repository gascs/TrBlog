# TrBlog 部署指南

<div align="center">
  <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=server%20deployment%20illustration%20with%20modern%20design&image_size=landscape_16_9" alt="TrBlog 部署指南" width="600" />
  <p>本指南将帮助您在各种环境中部署 TrBlog 博客系统</p>
</div>

## 📋 目录
- [前置条件](#前置条件)
- [快速部署](#快速部署)
- [Docker 部署](#docker-部署)
- [PHP 部署](#php-部署)
- [数据库配置](#数据库配置)
- [环境变量](#环境变量)
- [常见问题](#常见问题)
- [下一步](#下一步)

---

## 前置条件

根据您选择的部署方式，请确保已安装相应的依赖：

### 🐳 Docker 部署要求
- **Docker 20.10+** - 容器化平台
- **Docker Compose 2.0+** - 容器编排工具
- **至少 2GB 可用内存** - 确保服务正常运行
- **5GB 可用磁盘空间** - 存储镜像和数据

### 🐘 PHP 部署要求
- **PHP 8.0+** - 后端语言
- **Composer 2.0+** - PHP 依赖管理
- **数据库** - MySQL 5.7+ / PostgreSQL 12+ / SQLite
- **Web 服务器** - Apache/Nginx（生产环境推荐）

---

## 🚀 快速部署

我们提供了简单易用的 `start.sh` 脚本来帮助您快速部署：

```bash
# 1. 克隆仓库
git clone https://github.com/gascs/TrBlog.git
cd TrBlog

# 2. 确保脚本可执行
chmod +x start.sh

# 3. 运行部署脚本
./start.sh
```

脚本会引导您完成以下选择：
1. **部署方式** - Docker 或 PHP
2. **数据库类型** - PostgreSQL、MySQL、SQLite
3. **数据库模式** - 本地或外部

### 📁 部署流程

```mermaid
flowchart TD
    A[运行 start.sh] --> B{选择部署方式}
    B -->|Docker| C{选择数据库}
    B -->|PHP| D{选择数据库}
    C --> E{选择数据库位置}
    D --> F{选择数据库位置}
    E -->|本地| G[启动 Docker 容器]
    E -->|外部| H[配置外部数据库]
    F -->|本地| I[配置本地数据库]
    F -->|外部| J[配置外部数据库]
    G --> K[运行数据库迁移]
    H --> K
    I --> L[启动 PHP 服务器]
    J --> L
    K --> M[启动前后端服务]
    L --> N[访问应用]
    M --> N
```

---

## 🐳 Docker 部署

### 配置步骤

1. **选择部署方式**
   - 运行 `./start.sh` 并选择 `1. Docker 模式`

2. **选择数据库**
   - 选项 1：PostgreSQL（推荐，功能最完整）
   - 选项 2：MySQL（广泛使用）
   - 选项 3：SQLite（轻量，无需额外服务）

3. **配置数据库位置**
   - 选项 1：Docker 内置数据库（最简单）
   - 选项 2：外部数据库（已有数据库服务）

4. **等待部署完成**
   
   脚本会自动完成以下操作：
   - ✅ 拉取/构建 Docker 镜像
   - ✅ 启动数据库容器（如果选择本地）
   - ✅ 运行数据库迁移
   - ✅ 启动后端服务
   - ✅ 启动前端开发服务器

### 手动 Docker 部署

如果您想手动控制部署过程：

```bash
# 1. 复制环境变量文件
cp server/.env.example server/.env
cp client/.env.example client/.env

# 2. 编辑配置文件
# 根据需要修改 server/.env 中的配置

# 3. 启动服务
docker-compose up -d

# 4. 等待数据库启动
# 取决于您的硬件，这可能需要 30-60 秒

# 5. 安装后端依赖
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev &

# 6. 安装前端依赖
cd ../client
npm install
npm run dev
```

### 访问应用

部署完成后，您可以通过以下地址访问：
- 🌐 前端：http://localhost:3000
- 🔧 后端 API：http://localhost:3001
- 🛠️ 管理后台：http://localhost:3000/admin

---

## 🐘 PHP 部署

### 快速部署

```bash
# 1. 运行脚本并选择 PHP 部署
./start.sh

# 2. 选择数据库类型
# 选项 1：MySQL（推荐）
# 选项 2：SQLite（最简单）

# 3. 配置数据库连接
# 选择本地数据库或输入外部数据库信息
```

### 手动 PHP 部署

```bash
# 1. 进入 PHP 目录
cd trblog-php

# 2. 复制配置文件
cp .env.example .env

# 3. 安装依赖
composer install

# 4. 生成应用密钥
php artisan key:generate

# 5. 配置数据库
# 编辑 .env 文件中的数据库配置：
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=trblog
# DB_USERNAME=root
# DB_PASSWORD=

# 6. 运行数据库迁移
php artisan migrate

# 7. 启动开发服务器
php artisan serve
```

### 生产环境部署（推荐）

对于生产环境，建议使用 Apache 或 Nginx：

#### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/trblog-php/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

#### Apache 配置示例

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/trblog-php/public
    <Directory /path/to/trblog-php/public>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

---

## 🗄️ 数据库配置

### 支持的数据库

| 数据库 | Docker 版本 | PHP 版本 | 推荐场景 |
|--------|-------------|----------|----------|
| PostgreSQL | ✅ | ✅ | 功能最完整，推荐 |
| MySQL | ✅ | ✅ | 广泛使用，兼容性好 |
| SQLite | ✅ | ✅ | 轻量，个人博客 |

### 本地数据库配置

#### PostgreSQL（Docker）

```env
DATABASE_URL="postgresql://trblog:trblog123@localhost:5432/trblog?schema=public"
```

#### MySQL（Docker/PHP）

```env
# Docker 版本
DATABASE_URL="mysql://trblog:trblog123@localhost:3306/trblog"

# PHP 版本
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=trblog
DB_USERNAME=root
DB_PASSWORD=
```

#### SQLite

```env
# Docker 版本
DATABASE_URL="file:./trblog.db"

# PHP 版本
DB_CONNECTION=sqlite
DB_DATABASE=/path/to/database.sqlite
```

### 外部数据库配置

对于外部数据库，您需要：
1. ✅ 确保数据库服务已启动
2. ✅ 创建应用数据库
3. ✅ 配置正确的连接信息
4. ✅ 确保网络连接正常（开放相应端口）
5. ✅ 检查用户权限

---

## ⚙️ 环境变量

### Docker 版本

#### 后端环境变量（server/.env）

```env
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/trblog?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# 认证
JWT_SECRET="your-super-secret-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# 服务器
PORT=3001
NODE_ENV="development"

# 前端
FRONTEND_URL="http://localhost:3000"
```

#### 前端环境变量（client/.env）

```env
VITE_API_URL="http://localhost:3001/api"
NODE_ENV="development"
```

### PHP 版本

```env
APP_NAME="TrBlog"
APP_ENV="local"
APP_KEY="your-app-key"
APP_DEBUG=true
APP_URL="http://localhost:8000"

LOG_CHANNEL="stack"

DB_CONNECTION="mysql"
DB_HOST="127.0.0.1"
DB_PORT=3306
DB_DATABASE="trblog"
DB_USERNAME="root"
DB_PASSWORD=""

BROADCAST_DRIVER="log"
CACHE_DRIVER="file"
FILESYSTEM_DISK="local"
QUEUE_CONNECTION="sync"
SESSION_DRIVER="file"
SESSION_LIFETIME=120
```

---

## ❓ 常见问题

### Docker 相关

**Q: Docker 容器无法启动**

A: 检查以下几点：
- Docker 服务是否正在运行：`sudo systemctl status docker`
- 端口是否被占用：`sudo netstat -tulpn`
- 查看容器日志：`docker-compose logs`

**Q: 数据库迁移失败**

A: 尝试以下方法：
- 确保数据库容器已完全启动
- 检查数据库连接信息是否正确
- 尝试重置数据库：`npx prisma migrate reset`

### PHP 相关

**Q: Composer 安装依赖失败**

A: 尝试以下解决方案：
- 检查 PHP 版本是否满足要求
- 清除 Composer 缓存：`composer clear-cache`
- 更换国内镜像源（如果在中国）

**Q: 权限错误**

A: 设置正确的文件权限：
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data .
```

### 数据库相关

**Q: 无法连接到外部数据库**

A: 检查以下项目：
- 网络连接是否正常
- 数据库服务是否正在运行
- 防火墙是否开放相应端口
- 用户名和密码是否正确
- 用户是否有足够的权限

**Q: SQLite 文件权限问题**

A: 确保数据库文件目录有写权限：
```bash
chmod 666 database.sqlite
chmod 777 .
```

### 性能优化

**生产环境建议：**
1. ✅ 启用 OPcache
2. ✅ 配置 Redis 缓存
3. ✅ 使用 CDN 加速静态资源
4. ✅ 配置 HTTPS
5. ✅ 设置合适的日志级别
6. ✅ 启用 Gzip 压缩
7. ✅ 配置适当的服务器资源限制

---

## 📚 下一步

部署成功后，请查看：
- [开发文档](DEVELOPMENT.md) - 了解如何开发和扩展功能
- [部署检查清单](DEPLOYMENT_CHECKLIST.md) - 确保生产环境配置正确
- [主题与插件开发指南](docs/THEME_PLUGIN_GUIDE.md) - 开发自定义主题和插件
- [README](README.md) - 项目总览

### 🎯 部署成功后的操作

1. **创建管理员账户** - 访问 `/register` 页面注册第一个账户
2. **配置基本设置** - 进入后台管理页面设置博客信息
3. **发布第一篇文章** - 开始创建您的内容
4. **设置主题** - 选择或自定义博客主题
5. **安装插件** - 根据需要扩展功能

如有问题，请通过 [GitHub Issues](https://github.com/gascs/TrBlog/issues) 联系我们。

---

<div align="center">
  <p>🎉 祝您部署成功！</p>
  <p>Made with ❤️ by TrBlog Team</p>
  <p>Last updated: 2026-04-19</p>
</div>
