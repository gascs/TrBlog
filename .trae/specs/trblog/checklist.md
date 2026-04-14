# TrBlog - Verification Checklist

## 项目架构与配置
- [ ] 项目目录结构正确，包含 client/ 和 server/ 分离的文件夹
- [ ] 后端 package.json 包含所有必要的依赖（NestJS, Prisma, bcrypt, JWT 等）
- [ ] 后端 tsconfig.json 配置正确
- [ ] 前端 package.json 包含所有必要的依赖（React 18, TypeScript, Tailwind, Shadcn UI, React Query 等）
- [ ] 前端 vite.config.ts 配置正确
- [ ] docker-compose.yml 可以成功启动 PostgreSQL 数据库

## 数据库设计
- [ ] Prisma Schema 包含 User, Post, Category, Tag, Comment 所有实体
- [ ] 所有实体字段符合需求（User: id, username, email, password, avatar, role, createdAt, updatedAt 等）
- [ ] 实体关系定义正确（User-Post 一对多，Post-Category 多对一，Post-Tag 多对多，Comment 自关联）
- [ ] 数据库迁移可以成功执行

## 后端认证模块
- [ ] AuthModule, UserModule, PrismaModule 已正确实现
- [ ] register 接口可以成功创建新用户
- [ ] login 接口可以验证凭据并返回 JWT token
- [ ] 密码在数据库中使用 bcrypt 加密存储
- [ ] JwtAuthGuard 可以正确保护需要认证的路由
- [ ] RolesGuard 可以正确区分 ADMIN 和 USER 权限

## 后端文章模块
- [ ] GET /posts 接口返回已发布文章列表
- [ ] 文章列表支持分页、按分类筛选、按标签筛选、搜索功能
- [ ] GET /posts/:id 接口返回文章详情并增加浏览量
- [ ] POST /posts (Admin) 接口可以创建新文章
- [ ] PUT /posts/:id (Admin) 接口可以更新文章
- [ ] DELETE /posts/:id (Admin) 接口可以删除文章
- [ ] 文章与分类、标签的关联关系正确处理

## 后端分类、标签、评论模块
- [ ] 分类 CRUD 功能正常
- [ ] 标签 CRUD 功能正常
- [ ] 用户可以创建评论和回复评论
- [ ] 评论列表正确显示层级关系
- [ ] 管理员可以删除评论

## 前端基础布局
- [ ] 主布局组件包含顶部导航栏、侧边栏、底部 Footer
- [ ] 配色方案符合简约科技风（主色调 #3b82f6，背景 #f8fafc）
- [ ] React Query Provider 配置正确
- [ ] Axios 实例配置正确，baseURL 指向后端
- [ ] Shadcn UI 组件库初始化完成

## 前端页面功能
- [ ] 首页正确显示文章列表，包含文章卡片
- [ ] 首页支持分页功能
- [ ] 文章详情页正确显示文章内容、评论列表、评论表单
- [ ] Markdown 内容使用 react-markdown 安全渲染
- [ ] 所有页面包含 Loading 状态和 Error 状态处理
- [ ] 登录页和注册页功能正常
- [ ] 管理员后台只对已登录的管理员可见
- [ ] 管理员可以在后台管理文章、分类、标签

## 联调与优化
- [ ] 后端配置了正确的 CORS 策略，允许前端域名访问
- [ ] .env 文件包含所有必要的环境变量（数据库链接、JWT Secret 等）
- [ ] 前后端交互的 TypeScript 接口定义一致
- [ ] 主要功能流程测试通过，无明显 bug

## Docker 部署
- [ ] 前端 Dockerfile 可以成功构建镜像（多阶段构建，Nginx 托管）
- [ ] 后端 Dockerfile 可以成功构建镜像
- [ ] docker-compose.prod.yml 可以成功启动所有服务（Frontend, Backend, Postgres, Nginx Proxy）
- [ ] README.md 包含清晰完整的部署说明文档
