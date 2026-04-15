# TrBlog

一个现代化的个人博客系统，使用 React + NestJS + PostgreSQL 构建，提供完整的博客管理功能。

## 技术栈

- **前端**: React 18 + TypeScript + Tailwind CSS + Shadcn UI + React Query
- **后端**: Node.js + NestJS (TypeScript) + PostgreSQL + Prisma ORM
- **认证**: JWT (Access Token)
- **部署**: Docker + Docker Compose

## 项目结构

```
├── client/          # 前端项目
├── server/          # 后端项目
├── docker-compose.yml        # 开发环境配置
└── docker-compose.prod.yml   # 生产环境配置
```

## 快速开始

### 开发环境

#### 方法一：使用启动脚本（推荐）

1. 确保安装了 Docker 和 Docker Compose

2. 确保安装了 Node.js 18+

3. 安装依赖

```bash
cd server && npm install && cd ../client && npm install
```

4. 运行启动脚本

```bash
./start.sh
```

#### 方法二：手动启动

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

### 用户系统
- ✅ 用户注册与登录
- ✅ JWT 身份验证
- ✅ 密码加密存储
- ✅ 管理员权限控制

### 文章管理
- ✅ 文章的增删改查 (CRUD)
- ✅ 文章分类管理
- ✅ 文章标签管理
- ✅ 文章搜索与筛选
- ✅ 文章浏览量统计
- ✅ Markdown 内容渲染

### 评论系统
- ✅ 评论的创建与删除
- ✅ 评论回复功能
- ✅ 评论层级显示

### 前端界面
- ✅ 响应式设计，支持桌面端和移动端
- ✅ 现代化的 UI 设计
- ✅ 加载状态和错误处理
- ✅ 管理后台界面

### 部署
- ✅ Docker 容器化部署
- ✅ 生产环境配置

## 开发指南

### 代码风格
- 前端：使用 ESLint 和 Prettier 保持代码风格一致
- 后端：使用 NestJS 的代码风格规范

### 提交规范
- 使用 conventional commits 规范
- 提交信息格式：`type(scope): subject`

### 测试
- 前端：使用 Jest 和 React Testing Library
- 后端：使用 Jest 和 SuperTest

## 贡献指南

1. Fork 本仓库
2. 创建一个新的分支
3. 提交你的更改
4. 发起 Pull Request

## 许可证

MIT License

## 联系

如果有任何问题或建议，欢迎联系我们。
