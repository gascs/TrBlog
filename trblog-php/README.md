# TrBlog PHP 版本

基于 PHP + Laravel 10 重构的博客系统

## 技术栈

- **后端**: PHP 8.2 + Laravel 10
- **前端**: Laravel Blade + Tailwind CSS + JavaScript
- **数据库**: 支持 MySQL, PostgreSQL, SQLite
- **缓存**: Redis (可选)
- **认证**: Laravel Sanctum
- **部署**: Docker + Docker Compose

## 目录结构

```
trblog-php/
├── app/
│   ├── Http/
│   │   ├── Controllers/         # 控制器
│   │   ├── Middleware/          # 中间件
│   │   ├── Requests/            # 请求验证
│   │   └── Routes/              # 路由
│   ├── Models/                  # 数据模型
│   ├── Services/                # 业务逻辑服务
│   ├── Providers/               # 服务提供者
│   └── Views/                   # 前端视图
│       ├── components/          # 组件
│       ├── layouts/             # 布局
│       └── pages/               # 页面
├── config/                      # 配置文件
├── database/                    # 数据库相关
│   ├── migrations/              # 数据库迁移
│   └── seeders/                 # 数据种子
├── public/                      # 静态资源
├── resources/                   # 资源文件
│   ├── css/                     # CSS文件
│   ├── js/                      # JavaScript文件
│   └── views/                   # Blade模板
├── routes/                      # 路由配置
├── storage/                     # 存储文件
├── tests/                       # 测试文件
├── docker/                      # Docker相关文件
├── scripts/                     # 脚本文件
├── .env.example                 # 环境变量示例
├── docker-compose.yml           # Docker Compose配置
├── Dockerfile                   # Dockerfile
├── artisan                      # Laravel命令行工具
├── composer.json                # Composer配置
└── README.md                    # 项目说明
```

## 功能特性

1. **用户认证**
   - 注册、登录、注销
   - 密码重置
   - 角色管理 (Admin, Editor, User)

2. **文章管理**
   - 创建、编辑、删除文章
   - 文章分类和标签
   - 文章搜索
   - 文章评论

3. **分类和标签**
   - 分类管理
   - 标签管理

4. **设置向导**
   - 首次部署引导
   - 数据库配置
   - 系统设置

5. **响应式设计**
   - 支持桌面端和移动端
   - 自适应布局

6. **性能优化**
   - 缓存机制
   - 图片优化
   - 代码压缩

7. **部署选项**
   - Docker部署
   - 传统部署
   - 数据库类型选择

## 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/gascs/TrBlog.git trblog-php
cd trblog-php
```

### 2. 环境配置

复制环境变量示例文件并修改：

```bash
cp .env.example .env
```

### 3. Docker部署

```bash
docker-compose up -d
```

### 4. 传统部署

```bash
# 安装依赖
composer install

# 生成应用密钥
php artisan key:generate

# 运行数据库迁移
php artisan migrate

# 启动开发服务器
php artisan serve
```

## 数据库配置

支持以下数据库类型：

- MySQL
- PostgreSQL
- SQLite

在 `.env` 文件中配置数据库连接信息。

## 部署方式

### Docker部署

使用 Docker Compose 快速部署：

```bash
docker-compose up -d
```

### 传统部署

1. 上传代码到服务器
2. 配置 web 服务器（Apache 或 Nginx）
3. 安装依赖并配置环境
4. 运行数据库迁移

## 开发指南

### 代码风格

遵循 PSR-12 代码风格规范。

### 测试

```bash
# 运行测试
php artisan test
```

### 命令行工具

```bash
# 生成控制器
php artisan make:controller ControllerName

# 生成模型
php artisan make:model ModelName

# 生成迁移
php artisan make:migration create_table_name

# 运行迁移
php artisan migrate

# 生成数据种子
php artisan make:seeder SeederName

# 运行数据种子
php artisan db:seed
```

## 许可证

MIT

## 作者

Gascs (https://motut.net.cn) 和 TRAE SOLO