# TrBlog 开发文档

本文档为开发者提供 TrBlog 项目的架构说明、开发指南和扩展方法。

## 📋 目录
- [项目结构](#项目结构)
- [技术架构](#技术架构)
- [开发环境设置](#开发环境设置)
- [前端开发](#前端开发)
- [后端开发（Docker 版本）](#后端开发docker-版本)
- [后端开发（PHP 版本）](#后端开发php-版本)
- [数据库设计](#数据库设计)
- [扩展与定制](#扩展与定制)
- [测试指南](#测试指南)

---

## 项目结构

### 总览

TrBlog 是一个双版本的个人博客系统：
1. **Docker 版本** - 现代化全栈方案（React + NestJS）
2. **PHP 版本** - 传统 PHP 方案（Laravel）

### 目录结构

```
TrBlog/
├── client/                    # 前端应用（React + TypeScript）
│   ├── src/
│   │   ├── components/        # 可复用组件
│   │   ├── contexts/          # React 上下文（主题等）
│   │   ├── pages/             # 页面组件
│   │   ├── services/          # API 服务
│   │   ├── types/             # TypeScript 类型定义
│   │   └── utils/             # 工具函数
│   ├── public/                # 静态资源
│   ├── package.json
│   └── vite.config.ts
├── server/                    # 后端应用（NestJS）
│   ├── src/
│   │   ├── controllers/       # 控制器
│   │   ├── services/          # 业务逻辑
│   │   ├── models/            # 数据模型
│   │   ├── modules/           # NestJS 模块
│   │   ├── guards/            # 路由守卫
│   │   └── main.ts            # 入口文件
│   ├── prisma/
│   │   └── schema.prisma      # Prisma 数据库模型
│   ├── package.json
│   └── tsconfig.json
├── trblog-php/                # PHP 版本（Laravel）
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/   # 控制器
│   │   │   └── Middleware/    # 中间件
│   │   └── Models/            # Eloquent 模型
│   ├── config/                # 配置文件
│   ├── resources/
│   │   └── views/             # Blade 模板
│   ├── routes/                # 路由定义
│   └── public/                # 公共目录
├── docs/                      # 文档目录
│   ├── README.md              # 文档索引
│   └── archive/               # 归档文档
├── docker-compose.yml         # Docker 配置
├── start.sh                   # 部署脚本
└── README.md                  # 项目说明
```

---

## 技术架构

### 前端架构

```
┌─────────────────────────────────────┐
│        React Application            │
├─────────────────────────────────────┤
│  ┌──────────────┐ ┌──────────────┐  │
│  │   Pages      │ │  Components   │  │
│  │  (路由组件)  │ │  (可复用组件) │  │
│  └──────────────┘ └──────────────┘  │
│  ┌───────────────────────────────┐  │
│  │      React Router             │  │
│  │         (路由)                 │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │      React Query              │  │
│  │       (数据管理)               │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │      Context API              │  │
│  │     (主题、用户状态)          │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│          Axios (HTTP)               │
└─────────────────────────────────────┘
```

### 后端架构（Docker 版本）

```
┌─────────────────────────────────────┐
│         NestJS Application          │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐  │
│  │      Controllers              │  │
│  │    (路由处理)                  │  │
│  └───────────────────────────────┘  │
│           │                          │
│  ┌───────────┴───────────────┐       │
│  │      Services             │       │
│  │    (业务逻辑)              │       │
│  └───────────────────────────┘       │
│           │                          │
│  ┌───────────┴───────────────┐       │
│  │      Prisma ORM          │       │
│  └───────────────────────────┘       │
└─────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│      PostgreSQL / MySQL / SQLite    │
└─────────────────────────────────────┘
```

### PHP 版本架构

```
┌─────────────────────────────────────┐
│         Laravel Application         │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐  │
│  │         Routes               │  │
│  └───────────────────────────────┘  │
│           │                          │
│  ┌───────────┴───────────────┐       │
│  │      Controllers          │       │
│  └───────────────────────────┘       │
│           │                          │
│  ┌───────────┴───────────────┐       │
│  │         Models            │       │
│  │     (Eloquent ORM)        │       │
│  └───────────────────────────┘       │
└─────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│      MySQL / PostgreSQL / SQLite    │
└─────────────────────────────────────┘
```

---

## 开发环境设置

### 前置要求

- Node.js 18+
- npm 9+
- Docker & Docker Compose (可选，用于 Docker 版本)
- PHP 8.0+ & Composer (可选，用于 PHP 版本)

### 克隆仓库

```bash
git clone https://github.com/gascs/TrBlog.git
cd TrBlog
```

### 安装依赖

#### Docker 版本

```bash
# 后端依赖
cd server
npm install

# 前端依赖
cd ../client
npm install
```

#### PHP 版本

```bash
cd trblog-php
composer install
```

### 配置环境变量

```bash
# Docker 版本
cp server/.env.example server/.env
cp client/.env.example client/.env

# PHP 版本
cp trblog-php/.env.example trblog-php/.env
```

根据需要编辑相应的 `.env` 文件。

---

## 前端开发

### 项目结构详解

```
client/src/
├── components/
│   ├── Layout.tsx           # 主布局组件
│   ├── Navbar.tsx           # 导航栏组件
│   ├── Sidebar.tsx          # 侧边栏组件
│   ├── Footer.tsx           # 页脚组件
│   ├── ThemeToggle.tsx      # 主题切换组件
│   └── ...                  # 其他组件
├── contexts/
│   └── ThemeContext.tsx     # 主题上下文
├── pages/
│   ├── HomePage.tsx         # 首页
│   ├── PostDetailPage.tsx   # 文章详情页
│   ├── PrivacyPolicyPage.tsx # 隐私政策
│   └── ...                  # 其他页面
├── services/
│   └── api.ts               # API 服务
├── types/
│   └── index.ts             # TypeScript 类型
└── App.tsx                  # 应用入口
```

### 添加新页面

1. 创建页面组件
2. 在 `App.tsx` 中添加路由
3. 在导航中添加链接（可选）

```tsx
// client/src/pages/NewPage.tsx
import React from 'react';

const NewPage: React.FC = () => {
  return <div>新页面内容</div>;
};

export default NewPage;
```

### 主题开发

主题系统位于 `client/src/contexts/ThemeContext.tsx`，支持：
- light - 浅色模式
- dark - 深色模式
- system - 跟随系统
- colorful - 彩色模式

添加新主题：

1. 在 `ThemeContext.tsx` 中添加新主题类型
2. 在 `ThemeToggle.tsx` 中添加新主题选项
3. 在样式中添加对应主题的 CSS 类

### 样式指南

- 使用 Tailwind CSS 进行样式开发
- 遵循移动优先的设计理念
- 支持响应式布局

---

## 后端开发（Docker 版本）

### 项目结构详解

```
server/src/
├── controllers/
│   ├── PostController.ts      # 文章控制器
│   ├── UserController.ts      # 用户控制器
│   └── ...
├── services/
│   ├── PostService.ts         # 文章服务
│   ├── AuthService.ts         # 认证服务
│   └── ...
├── models/
│   └── types.ts               # 数据类型
├── prisma/
│   └── schema.prisma          # Prisma 模型
├── main.ts                    # 入口文件
└── app.module.ts              # 应用模块
```

### 添加新 API 端点

1. 创建服务（如果需要）
2. 创建控制器
3. 在模块中注册
4. 添加路由

### 数据库模型变更

修改 `server/prisma/schema.prisma` 后运行：

```bash
cd server
npx prisma migrate dev
```

### 生成 Prisma 客户端

```bash
npx prisma generate
```

---

## 后端开发（PHP 版本）

### 项目结构详解

```
trblog-php/app/
├── Http/
│   ├── Controllers/
│   │   ├── PostController.php     # 文章控制器
│   │   ├── HomeController.php     # 主页控制器
│   │   └── ...
│   ├── Middleware/                # 中间件
│   └── Requests/                  # 表单请求验证
├── Models/
│   ├── Post.php                   # 文章模型
│   ├── User.php                   # 用户模型
│   └── ...
└── Providers/                      # 服务提供者
```

### 创建新模型和迁移

```bash
# 创建模型和迁移
php artisan make:model ModelName -m

# 运行迁移
php artisan migrate
```

### 添加新控制器

```bash
php artisan make:controller NewController
```

---

## 数据库设计

### 主要数据表

#### posts（文章表）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | int | 主键 |
| title | string | 文章标题 |
| content | text | 文章内容 |
| excerpt | string | 文章摘要 |
| cover_image | string | 封面图片 |
| user_id | int | 作者 ID |
| category_id | int | 分类 ID |
| status | string | 发布状态 |
| views | int | 阅读量 |
| created_at | timestamp | 创建时间 |
| updated_at | timestamp | 更新时间 |

#### users（用户表）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | int | 主键 |
| username | string | 用户名 |
| email | string | 邮箱 |
| password | string | 密码（加密） |
| role | string | 角色 |
| created_at | timestamp | 创建时间 |

#### categories（分类表）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | int | 主键 |
| name | string | 分类名称 |
| slug | string | URL 别名 |
| description | text | 描述 |

#### tags（标签表）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | int | 主键 |
| name | string | 标签名称 |
| slug | string | URL 别名 |

#### comments（评论表）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | int | 主键 |
| content | text | 评论内容 |
| user_id | int | 用户 ID |
| post_id | int | 文章 ID |
| created_at | timestamp | 创建时间 |

#### post_tag（文章标签关联表）
| 字段 | 类型 | 说明 |
|------|------|------|
| post_id | int | 文章 ID |
| tag_id | int | 标签 ID |

---

## 扩展与定制

### 添加新功能

1. 确定功能位置（前端/后端）
2. 创建相应组件/服务
3. 更新路由配置
4. 测试功能

### 集成第三方服务

1. 添加相应依赖
2. 创建服务包装类
3. 在环境变量中配置 API 密钥
4. 集成到现有功能中

### 性能优化建议

1. 前端
   - 使用 React.memo 避免不必要的重渲染
   - 使用 useMemo 和 useCallback 优化性能
   - 图片懒加载
   - 代码分割

2. 后端
   - 使用数据库索引
   - 配置 Redis 缓存
   - 优化 API 查询
   - 使用分页

---

## 测试指南

### 前端测试

```bash
cd client
npm test
```

### 后端测试（Docker 版本）

```bash
cd server
npm test
```

### PHP 版本测试

```bash
cd trblog-php
php artisan test
```

---

## 部署到生产环境

部署前请查看：
- [部署指南](DEPLOYMENT.md)
- [部署检查清单](DEPLOYMENT_CHECKLIST.md)

## 相关文档

- [项目 README](README.md)
- [贡献指南](CONTRIBUTING.md)

## 寻求帮助

如果您有问题或需要帮助：
1. 查看文档
2. 搜索现有 Issues
3. 创建新的 Issue
