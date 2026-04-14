# TrBlog

一个现代化的个人博客系统，使用 React + NestJS + PostgreSQL 构建。

## 技术栈

- **前端**: React 18 + TypeScript + Tailwind CSS + Shadcn UI + React Query
- **后端**: Node.js + NestJS (TypeScript) + PostgreSQL + Prisma ORM
- **认证**: JWT (Access Token)

## 项目结构

```
├── client/          # 前端项目
├── server/          # 后端项目
├── docker-compose.yml        # 开发环境配置
└── docker-compose.prod.yml   # 生产环境配置
```

## 快速开始

### 开发环境

1. 启动 PostgreSQL 数据库

```bash
docker compose up -d
```

2. 安装后端依赖

```bash
cd server
npm install
```

3. 生成 Prisma 客户端

```bash
npx prisma generate
```

4. 运行数据库迁移

```bash
npx prisma migrate dev
```

5. 启动后端服务器

```bash
npm run start:dev
```

6. 安装前端依赖

```bash
cd ../client
npm install
```

7. 启动前端开发服务器

```bash
npm run dev
```

### 生产环境

1. 构建并启动所有服务

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

2. 访问博客

打开浏览器，访问 `http://localhost`

## 环境变量

### 后端环境变量 (server/.env)

```
# Database
DATABASE_URL="postgresql://trblog:trblog123@localhost:5432/trblog?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development"
```

### 前端环境变量 (client/.env)

```
VITE_API_URL=http://localhost:3000/api
```

## 功能特性

- ✅ 用户认证 (登录/注册)
- ✅ 文章管理 (CRUD)
- ✅ 分类管理
- ✅ 标签管理
- ✅ 评论系统 (支持回复)
- ✅ 文章搜索
- ✅ 响应式设计
- ✅ 管理后台
