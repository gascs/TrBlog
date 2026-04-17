# TrBlog

<div align="center">
  <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20blog%20website%20logo%20with%20code%20and%20technology&image_size=square" alt="TrBlog Logo" width="120" height="120" />
  <h2>现代化个人博客系统</h2>
  <p>使用 React + NestJS + PostgreSQL 构建的完整博客管理平台</p>
  
  <div style="margin: 20px 0;">
    <a href="#技术栈" style="margin: 0 10px; text-decoration: none; color: #3b82f6;">技术栈</a>
    <a href="#项目结构" style="margin: 0 10px; text-decoration: none; color: #3b82f6;">项目结构</a>
    <a href="#快速开始" style="margin: 0 10px; text-decoration: none; color: #3b82f6;">快速开始</a>
    <a href="#功能特性" style="margin: 0 10px; text-decoration: none; color: #3b82f6;">功能特性</a>
    <a href="#部署" style="margin: 0 10px; text-decoration: none; color: #3b82f6;">部署</a>
  </div>
</div>

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| **前端** | React | 18+ |
| | TypeScript | 5+ |
| | Tailwind CSS | 3+ |
| | React Query | 5+ |
| | Framer Motion | 12+ |
| | React Router | 6+ |
| **后端** | NestJS | 10+ |
| | PostgreSQL | 15+ |
| | Prisma ORM | 5+ |
| | Redis | 7+ |
| **认证** | JWT | - |
| **部署** | Docker | - |
| | Docker Compose | - |

## 项目结构

```
├── client/          # 前端项目
│   ├── src/         # 前端源码
│   ├── public/      # 静态资源
│   └── package.json # 前端依赖
├── server/          # 后端项目
│   ├── src/         # 后端源码
│   ├── prisma/      # Prisma 配置
│   └── package.json # 后端依赖
├── docker-compose.yml        # 开发环境配置
└── docker-compose.prod.yml   # 生产环境配置
```

## 快速开始

### 开发环境

#### 方法一：使用启动脚本（推荐）

1. **确保安装了 Docker 和 Docker Compose**
2. **确保安装了 Node.js 18+**
3. **安装依赖**
   ```bash
   cd server && npm install && cd ../client && npm install
   ```
4. **运行启动脚本**
   ```bash
   ./start.sh
   ```

#### 方法二：手动启动

1. **启动 PostgreSQL 数据库**
   ```bash
   docker compose up -d
   ```

2. **安装后端依赖**
   ```bash
   cd server
   npm install
   ```

3. **生成 Prisma 客户端**
   ```bash
   npx prisma generate
   ```

4. **运行数据库迁移**
   ```bash
   npx prisma migrate dev
   ```

5. **启动后端服务器**
   ```bash
   npm run start:dev
   ```

6. **安装前端依赖**
   ```bash
   cd ../client
   npm install
   ```

7. **启动前端开发服务器**
   ```bash
   npm run dev
   ```

### 生产环境

1. **构建并启动所有服务**
   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```

2. **访问博客**
   打开浏览器，访问 `http://localhost`

## 环境变量

### 后端环境变量 (server/.env)

```env
# Database
DATABASE_URL="postgresql://trblog:trblog123@localhost:5432/trblog?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development"

# Frontend URL (for sitemap)
FRONTEND_URL="http://localhost:3000"
```

### 前端环境变量 (client/.env)

```env
# API URL
VITE_API_URL=http://localhost:3000/api

# CDN URL (optional)
VITE_CDN_URL=

# Environment
NODE_ENV=development

# Mock mode (for development)
REACT_APP_MOCK_MODE=false
```

## 功能特性

### 🎯 用户系统
- ✅ 用户注册与登录
- ✅ JWT 身份验证
- ✅ 密码加密存储
- ✅ 管理员权限控制
- ✅ 用户个人中心

### 📝 文章管理
- ✅ 文章的增删改查 (CRUD)
- ✅ 文章分类管理
- ✅ 文章标签管理
- ✅ 文章全文搜索
- ✅ 文章浏览量统计
- ✅ Markdown 内容渲染
- ✅ 文章评论系统

### 💬 评论系统
- ✅ 评论的创建与删除
- ✅ 评论回复功能
- ✅ 评论层级显示

### 🎨 前端界面
- ✅ 响应式设计，支持桌面端和移动端
- ✅ 现代化的 UI 设计
- ✅ 加载状态和错误处理
- ✅ 管理后台界面
- ✅ 深色模式和彩色主题
- ✅ 平滑的动画效果

### 🚀 性能优化
- ✅ 代码分割与懒加载
- ✅ 图片优化 (WebP 格式)
- ✅ Redis 缓存策略
- ✅ 静态资源压缩

### 🔍 SEO 优化
- ✅ 站点地图生成
- ✅ 结构化数据标记
- ✅ 元标签优化
- ✅ 友好的 URL 结构

### 📦 部署
- ✅ Docker 容器化部署
- ✅ 生产环境配置
- ✅ 健康检查端点

## 开发指南

### 代码风格
- **前端**: 使用 ESLint 和 Prettier 保持代码风格一致
- **后端**: 使用 NestJS 的代码风格规范

### 提交规范
- 使用 conventional commits 规范
- 提交信息格式：`type(scope): subject`

### 测试
- **前端**: 使用 Jest 和 React Testing Library
- **后端**: 使用 Jest 和 SuperTest

## 贡献指南

1. **Fork 本仓库**
2. **创建一个新的分支**
3. **提交你的更改**
4. **发起 Pull Request**

## 部署检查清单

在部署到生产环境之前，请参考 [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) 进行全面检查。

## 许可证

MIT License

## 联系

如果有任何问题或建议，欢迎联系我们。

## 制作人

- **Gascs** - [https://motut.net.cn](https://motut.net.cn)
- **TRAE SOLO**

---

<div align="center">
  <p>Made with ❤️ by TrBlog Team</p>
</div>
