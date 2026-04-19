# TRBlog 部署与使用说明

## 系统简介

TRBlog 是一个现代化的个人博客系统，支持两种部署方式：
- **Docker 部署**：基于 React + TypeScript + NestJS + PostgreSQL 的全栈解决方案
- **PHP 部署**：基于 Laravel 框架的传统 PHP 解决方案

系统支持多种数据库引擎，包括 PostgreSQL、MySQL 和 SQLite，可根据实际需求选择本地或外部数据库。

## 部署方式

### 1. 环境准备

#### 基本要求
- **Docker 部署**：Docker 和 Docker Compose
- **PHP 部署**：PHP 8.0+、Composer、MySQL 或 SQLite

### 2. 快速部署

项目根目录提供了 `start.sh` 脚本，可通过交互式菜单选择部署方式和配置选项。

```bash
# 运行部署脚本
chmod +x start.sh
./start.sh
```

#### 部署选项说明

1. **选择部署方式**
   - `1`：Docker 部署（推荐，环境隔离，一键启动）
   - `2`：PHP 部署（传统方式，适合已有 PHP 环境的服务器）

2. **选择数据库模式**
   - `1`：本地数据库（容器内或本地服务器）
   - `2`：外部数据库（远程服务器）

3. **选择数据库引擎**
   - `1`：PostgreSQL（默认，功能完整）
   - `2`：MySQL（广泛使用）
   - `3`：SQLite（轻量级，适合个人博客）

4. **配置数据库连接**
   - 本地数据库：自动配置，无需手动输入
   - 外部数据库：需要输入主机、端口、用户名、密码和数据库名

### 3. Docker 部署详解

#### 目录结构
```
├── client/          # 前端代码（React + TypeScript）
├── server/          # 后端代码（NestJS）
├── docker-compose.yml  # Docker 配置文件
├── .env.example     # 环境变量示例
└── start.sh         # 部署脚本
```

#### 部署步骤
1. 运行 `start.sh` 脚本，选择 Docker 部署
2. 选择数据库配置
3. 等待容器构建和启动完成
4. 访问 `http://localhost:3000` 进入前端
5. 访问 `http://localhost:3001` 进入后端 API 文档

#### 环境变量配置
Docker 部署会自动创建 `.env` 文件，主要配置项包括：
- `DATABASE_URL`：数据库连接字符串
- `JWT_SECRET`：JWT 密钥
- `PORT`：后端服务端口

### 4. PHP 部署详解

#### 目录结构
```
├── trblog-php/      # PHP 版本代码（Laravel）
│   ├── app/         # 应用代码
│   ├── config/      # 配置文件
│   ├── resources/   # 视图和资源
│   └── public/      # 公共目录
└── start.sh         # 部署脚本
```

#### 部署步骤
1. 运行 `start.sh` 脚本，选择 PHP 部署
2. 选择数据库配置
3. 脚本会自动执行以下操作：
   - 安装依赖：`composer install`
   - 生成密钥：`php artisan key:generate`
   - 运行迁移：`php artisan migrate`
   - 启动服务：`php artisan serve`
4. 访问 `http://localhost:8000` 进入博客系统

#### 环境变量配置
PHP 部署会自动创建 `.env` 文件，主要配置项包括：
- `DB_CONNECTION`：数据库类型（mysql/sqlite/pgsql）
- `DB_HOST`：数据库主机
- `DB_PORT`：数据库端口
- `DB_DATABASE`：数据库名
- `DB_USERNAME`：数据库用户名
- `DB_PASSWORD`：数据库密码

## 系统功能

### 1. 核心功能
- **文章管理**：创建、编辑、删除文章，支持 Markdown 格式
- **分类与标签**：文章分类和标签管理
- **评论系统**：支持文章评论
- **用户管理**：注册、登录、权限控制
- **管理后台**：文章、分类、标签、用户管理

### 2. 法律合规页面
系统包含三个法律合规页面：

#### 隐私政策
- 介绍系统如何收集、使用和保护用户数据
- 说明数据存储和安全措施
- 提供用户权利和联系方式

#### 开源声明
- 列出系统使用的开源技术和框架
- 说明各开源组件的许可证
- 提供 MIT 许可证文本

#### 免责声明
- 说明系统服务使用条款
- 限制系统责任范围
- 提供法律适用和争议解决方式

### 3. 前端美化功能
- 响应式设计，适配不同设备
- 现代化 UI 界面，使用 Tailwind CSS
- 平滑的页面过渡效果
- 优化的用户体验和交互设计

## 数据库配置

### 1. 本地数据库
- **PostgreSQL**：Docker 部署默认使用，功能完整
- **MySQL**：广泛使用的关系型数据库
- **SQLite**：轻量级文件数据库，适合个人博客

### 2. 外部数据库
- 支持连接远程 PostgreSQL、MySQL 数据库
- 需要确保网络连接畅通，防火墙已开放相应端口
- 建议使用强密码和加密连接

## 常见问题

### 1. Docker 部署失败
- 检查 Docker 和 Docker Compose 是否正确安装
- 确保端口 3000、3001 和数据库端口未被占用
- 查看容器日志：`docker logs trblog-server`

### 2. PHP 部署失败
- 检查 PHP 版本是否满足要求（8.0+）
- 确保数据库服务已启动
- 查看错误日志：`storage/logs/laravel.log`

### 3. 数据库连接问题
- 检查数据库配置是否正确
- 确保数据库服务正在运行
- 验证数据库用户权限

## 技术栈

### Docker 版本
- **前端**：React 18、TypeScript、Tailwind CSS、Vite
- **后端**：NestJS、Prisma、PostgreSQL
- **容器化**：Docker、Docker Compose

### PHP 版本
- **框架**：Laravel 10
- **数据库**：MySQL、SQLite、PostgreSQL
- **前端**：Blade 模板、Tailwind CSS

## 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

## 联系方式

如有问题或建议，请通过以下方式联系：
- 项目地址：https://github.com/yourusername/trblog
- 电子邮件：your.email@example.com
