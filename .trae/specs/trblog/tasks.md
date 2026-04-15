# TrBlog - The Implementation Plan (Decomposed and Prioritized Task List)

## [x] Task 1: 项目架构与技术栈定义
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 创建项目文件夹目录结构树（client/ 和 server/ 分离）
  - 生成后端的 package.json 和 tsconfig.json
  - 生成前端的 package.json 和 vite.config.ts
  - 生成 docker-compose.yml 用于一键启动 PostgreSQL 数据库
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `programmatic` TR-1.1: 项目目录结构正确创建，包含 client/ 和 server/ 文件夹
  - `programmatic` TR-1.2: 所有配置文件内容正确，符合技术栈要求
  - `programmatic` TR-1.3: docker-compose.yml 可以成功启动 PostgreSQL 数据库
- **Notes**: 使用 Docker Compose 管理开发环境数据库

## [x] Task 2: 数据库设计与 Prisma Schema
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 设计并实现 Prisma Schema，包含 User, Post, Category, Tag, Comment 实体
  - 定义实体之间的关系（User-Post 一对多，Post-Category 多对一，Post-Tag 多对多，Comment 自关联）
  - 生成数据库迁移并执行
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4, AC-5
- **Test Requirements**:
  - `programmatic` TR-2.1: Prisma Schema 包含所有要求的实体和字段
  - `programmatic` TR-2.2: 实体关系定义正确（外键、关联表等）
  - `programmatic` TR-2.3: 数据库迁移可以成功执行
- **Notes**: 使用 Prisma Migrate 管理数据库版本

## [x] Task 3: 后端基础架构与认证模块
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  - 实现 AuthModule, UserModule, PrismaModule
  - 实现 register 和 login 接口
  - 密码使用 bcrypt 加密存储
  - 实现 JwtAuthGuard 来保护需要登录的路由
  - 实现 RolesGuard 来区分管理员权限
- **Acceptance Criteria Addressed**: AC-1, AC-6
- **Test Requirements**:
  - `programmatic` TR-3.1: 用户可以成功注册新账户
  - `programmatic` TR-3.2: 用户可以使用正确凭据登录并获得 JWT token
  - `programmatic` TR-3.3: 密码在数据库中是加密存储的
  - `programmatic` TR-3.4: JwtAuthGuard 可以正确保护需要认证的路由
  - `programmatic` TR-3.5: RolesGuard 可以正确区分管理员和普通用户权限
- **Notes**: 使用 NestJS 的 Passport 和 JWT 模块

## [x] Task 4: 后端文章 CRUD 接口
- **Priority**: P0
- **Depends On**: Task 3
- **Description**:
  - 实现 PostModule，包含文章的增删改查 (CRUD)
  - GET /posts：获取已发布文章列表（支持分页、按分类筛选、按标签筛选、搜索）
  - GET /posts/:id：获取单篇文章详情（增加浏览量计数）
  - POST /posts (Admin)：创建文章
  - PUT /posts/:id (Admin)：更新文章
  - DELETE /posts/:id (Admin)：删除文章
  - 处理文章与分类、标签的关联关系
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4
- **Test Requirements**:
  - `programmatic` TR-4.1: 访客可以获取已发布文章列表
  - `programmatic` TR-4.2: 文章列表支持分页、分类筛选、标签筛选和搜索
  - `programmatic` TR-4.3: 访问文章详情时浏览量正确增加
  - `programmatic` TR-4.4: 管理员可以创建、更新、删除文章
  - `programmatic` TR-4.5: 文章与分类、标签的关联关系正确处理
- **Notes**: 使用 DTO 进行数据验证

## [x] Task 5: 后端分类、标签、评论模块
- **Priority**: P1
- **Depends On**: Task 4
- **Description**:
  - 实现 CategoryModule：分类的 CRUD
  - 实现 TagModule：标签的 CRUD
  - 实现 CommentModule：评论的创建、查询、删除（支持回复）
- **Acceptance Criteria Addressed**: AC-4, AC-5
- **Test Requirements**:
  - `programmatic` TR-5.1: 分类和标签的 CRUD 功能正常
  - `programmatic` TR-5.2: 用户可以创建评论和回复
  - `programmatic` TR-5.3: 评论列表正确显示层级关系
  - `programmatic` TR-5.4: 管理员可以删除评论
- **Notes**: 评论支持自关联实现回复功能

## [x] Task 6: 前端基础布局与配置
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 生成主布局组件 (Layout.tsx)：包含顶部导航栏、侧边栏（分类/标签云）、底部 Footer
  - 配置配色方案：简约科技风（主色调 #3b82f6，背景 #f8fafc）
  - 配置 React Query Provider 和 Axios 实例（baseURL 指向后端）
  - 初始化 Shadcn UI 组件库
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `programmatic` TR-6.1: 主布局组件正确渲染，包含导航栏、侧边栏和页脚
  - `programmatic` TR-6.2: React Query 和 Axios 配置正确
  - `human-judgement` TR-6.3: 配色方案符合要求，界面美观
- **Notes**: 使用 Tailwind CSS 进行样式开发

## [x] Task 7: 前端页面实现 - 首页、文章详情页
- **Priority**: P0
- **Depends On**: Task 6
- **Description**:
  - 实现博客首页 (HomePage.tsx)：调用 /posts 接口获取文章列表，展示文章卡片列表，实现分页
  - 实现文章详情页 (PostDetailPage.tsx)：展示文章内容、评论列表、评论表单
  - 使用 react-markdown 安全渲染 Markdown 内容
- **Acceptance Criteria Addressed**: AC-3, AC-5, AC-8
- **Test Requirements**:
  - `programmatic` TR-7.1: 首页正确显示文章列表，支持分页
  - `programmatic` TR-7.2: 文章详情页正确显示文章内容和评论
  - `programmatic` TR-7.3: Markdown 内容安全渲染
  - `programmatic` TR-7.4: 包含 Loading 状态和 Error 状态处理
- **Notes**: 使用 React Query 的 useQuery 和 useMutation 管理数据状态

## [x] Task 8: 前端页面实现 - 登录页、管理后台
- **Priority**: P1
- **Depends On**: Task 7
- **Description**:
  - 实现登录页 (LoginPage.tsx) 和注册页 (RegisterPage.tsx)
  - 实现管理员后台仪表盘 (AdminDashboard.tsx)
  - 实现文章管理页面（文章列表、创建/编辑文章表单）
  - 实现分类和标签管理页面
- **Acceptance Criteria Addressed**: AC-1, AC-2
- **Test Requirements**:
  - `programmatic` TR-8.1: 用户可以成功登录和注册
  - `programmatic` TR-8.2: 管理员后台只对已登录的管理员可见
  - `programmatic` TR-8.3: 管理员可以在后台管理文章、分类、标签
- **Notes**: 使用路由守卫保护管理员路由

## [x] Task 9: AI 辅助优化与联调
- **Priority**: P1
- **Depends On**: Task 8, Task 5
- **Description**:
  - 配置后端 CORS 策略，允许前端域名访问
  - 列出并配置 .env 文件需要的所有变量（数据库链接、JWT Secret 等）
  - 确保前后端交互的 TypeScript 接口定义一致
  - 修复发现的 bug 和问题
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3
- **Test Requirements**:
  - `programmatic` TR-9.1: 前后端可以正常通信，无 CORS 错误
  - `programmatic` TR-9.2: 环境变量配置完整正确
  - `programmatic` TR-9.3: 前后端 TypeScript 类型定义一致
  - `programmatic` TR-9.4: 主要功能流程测试通过
- **Notes**: 进行完整的端到端测试

## [x] Task 10: Docker 部署方案
- **Priority**: P2
- **Depends On**: Task 9
- **Description**:
  - 生成前端 Dockerfile (多阶段构建，Nginx 托管静态资源)
  - 生成后端 Dockerfile (Node.js 环境)
  - 生成生产环境用的 docker-compose.prod.yml (包含 Frontend, Backend, Postgres, Nginx Proxy)
  - 编写 README.md 部署说明文档
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `programmatic` TR-10.1: 前端和后端 Dockerfile 可以成功构建镜像
  - `programmatic` TR-10.2: docker-compose.prod.yml 可以成功启动所有服务
  - `human-judgement` TR-10.3: README.md 部署说明清晰完整
- **Notes**: 使用多阶段构建优化前端镜像大小
