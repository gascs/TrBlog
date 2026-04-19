# TRBlog 开发文档

## 项目结构

TRBlog 是一个现代化的个人博客系统，包含两个版本：
- **Docker 版本**：基于 React + TypeScript + NestJS + PostgreSQL 的全栈解决方案
- **PHP 版本**：基于 Laravel 框架的传统 PHP 解决方案

### 目录结构

```
├── client/          # 前端代码（React + TypeScript）
│   ├── src/
│   │   ├── components/    # 可复用组件
│   │   ├── contexts/      # React 上下文
│   │   ├── pages/         # 页面组件
│   │   ├── services/      # API 服务
│   │   ├── types/         # TypeScript 类型定义
│   │   └── utils/         # 工具函数
│   ├── public/            # 静态资源
│   └── vite.config.ts     # Vite 配置
├── server/          # 后端代码（NestJS）
│   ├── src/
│   │   ├── controllers/   # 控制器
│   │   ├── models/        # 数据模型
│   │   ├── services/      # 业务逻辑
│   │   └── main.ts        # 入口文件
│   ├── prisma/            # Prisma 配置
│   └── nest-cli.json      # NestJS 配置
├── trblog-php/      # PHP 版本代码（Laravel）
│   ├── app/               # 应用代码
│   ├── config/            # 配置文件
│   ├── resources/         # 视图和资源
│   └── public/            # 公共目录
├── docker-compose.yml     # Docker 配置文件
├── start.sh               # 部署脚本
├── DEPLOYMENT.md          # 部署说明
└── DEVELOPMENT.md         # 开发文档
```

## 技术栈

### 前端技术栈
- **框架**：React 18
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **构建工具**：Vite
- **状态管理**：React Context API
- **HTTP 客户端**：Axios
- **动画**：Framer Motion
- **路由**：React Router
- **数据请求**：React Query
- **Markdown 渲染**：React Markdown

### 后端技术栈（Docker 版本）
- **框架**：NestJS
- **语言**：TypeScript
- **ORM**：Prisma
- **数据库**：PostgreSQL (支持 MySQL 和 SQLite)
- **认证**：JWT

### 后端技术栈（PHP 版本）
- **框架**：Laravel 10
- **语言**：PHP 8.0+
- **ORM**：Eloquent
- **数据库**：MySQL (支持 SQLite 和 PostgreSQL)
- **认证**：Laravel 内置认证

## 开发环境设置

### 前端开发

1. 进入 client 目录
   ```bash
   cd client
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 启动开发服务器
   ```bash
   npm run dev
   ```

4. 构建生产版本
   ```bash
   npm run build
   ```

### 后端开发（Docker 版本）

1. 进入 server 目录
   ```bash
   cd server
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 启动开发服务器
   ```bash
   npm run start:dev
   ```

4. 构建生产版本
   ```bash
   npm run build
   ```

### PHP 版本开发

1. 进入 trblog-php 目录
   ```bash
   cd trblog-php
   ```

2. 安装依赖
   ```bash
   composer install
   ```

3. 生成密钥
   ```bash
   php artisan key:generate
   ```

4. 启动开发服务器
   ```bash
   php artisan serve
   ```

## 核心功能模块

### 1. 主题系统

TRBlog 实现了一个灵活的主题系统，支持四种主题模式：
- **浅色模式**：适合白天使用
- **深色模式**：适合夜间使用
- **跟随系统**：根据操作系统的颜色偏好自动切换
- **彩色模式**：带有渐变色效果的主题

主题系统的核心实现位于 `client/src/contexts/ThemeContext.tsx`，使用 React Context API 管理全局主题状态。

### 2. 文章管理

#### Docker 版本
- **API 端点**：`/api/posts`
- **控制器**：`server/src/controllers/post.controller.ts`
- **服务**：`server/src/services/post.service.ts`

#### PHP 版本
- **控制器**：`trblog-php/app/Http/Controllers/PostController.php`
- **模型**：`trblog-php/app/Models/Post.php`

### 3. 评论系统

#### Docker 版本
- **API 端点**：`/api/comments`
- **控制器**：`server/src/controllers/comment.controller.ts`
- **服务**：`server/src/services/comment.service.ts`

#### PHP 版本
- **控制器**：`trblog-php/app/Http/Controllers/CommentController.php`
- **模型**：`trblog-php/app/Models/Comment.php`

### 4. 用户认证

#### Docker 版本
- **API 端点**：`/api/auth`
- **控制器**：`server/src/controllers/auth.controller.ts`
- **服务**：`server/src/services/auth.service.ts`

#### PHP 版本
- **控制器**：`trblog-php/app/Http/Controllers/AuthController.php`
- **模型**：`trblog-php/app/Models/User.php`

### 5. 分类与标签

#### Docker 版本
- **API 端点**：`/api/categories` 和 `/api/tags`
- **控制器**：`server/src/controllers/category.controller.ts` 和 `server/src/controllers/tag.controller.ts`

#### PHP 版本
- **控制器**：`trblog-php/app/Http/Controllers/CategoryController.php` 和 `trblog-php/app/Http/Controllers/TagController.php`
- **模型**：`trblog-php/app/Models/Category.php` 和 `trblog-php/app/Models/Tag.php`

## 扩展与定制

### 1. 添加新页面

#### 前端页面
1. 在 `client/src/pages/` 目录下创建新的页面组件
2. 在 `client/src/App.tsx` 中添加路由配置
3. 如果需要，在 `client/src/components/Navbar.tsx` 中添加导航链接

#### PHP 页面
1. 在 `trblog-php/resources/views/` 目录下创建新的 Blade 模板
2. 在 `trblog-php/app/Http/Controllers/HomeController.php` 中添加控制器方法
3. 在 `trblog-php/routes/web.php` 中添加路由配置

### 2. 添加新功能

#### 前端功能
1. 在 `client/src/components/` 目录下创建新的组件
2. 在 `client/src/services/api.ts` 中添加 API 调用
3. 在需要的页面中使用新组件

#### 后端功能（Docker 版本）
1. 在 `server/src/models/` 目录下创建新的数据模型
2. 在 `server/src/services/` 目录下创建新的服务
3. 在 `server/src/controllers/` 目录下创建新的控制器
4. 在 `server/src/main.ts` 中注册新的控制器

#### 后端功能（PHP 版本）
1. 在 `trblog-php/app/Models/` 目录下创建新的模型
2. 在 `trblog-php/app/Http/Controllers/` 目录下创建新的控制器
3. 在 `trblog-php/routes/web.php` 中添加路由配置
4. 运行迁移命令创建数据库表：`php artisan migrate`

### 3. 定制主题

1. 修改 `client/src/styles/tailwind.css` 文件，添加自定义样式
2. 在 `client/src/contexts/ThemeContext.tsx` 中添加新的主题模式
3. 在 `client/src/components/ThemeToggle.tsx` 中添加新的主题选项

### 4. 数据库配置

#### Docker 版本
- 修改 `server/.env` 文件中的数据库连接配置
- 运行 `npx prisma migrate dev` 应用数据库迁移

#### PHP 版本
- 修改 `trblog-php/.env` 文件中的数据库连接配置
- 运行 `php artisan migrate` 应用数据库迁移

## 最佳实践

### 1. 代码风格

- **前端**：使用 Prettier 和 ESLint 保持代码风格一致
- **后端（Docker 版本）**：使用 Prettier 和 ESLint 保持代码风格一致
- **PHP 版本**：使用 Laravel Pint 保持代码风格一致

### 2. 性能优化

- **前端**：
  - 使用 React.lazy() 和 Suspense 实现组件懒加载
  - 使用 React.memo() 避免不必要的重渲染
  - 使用 useQuery 的 staleTime 和 cacheTime 优化数据请求

- **后端**：
  - 使用数据库索引优化查询性能
  - 使用缓存减少数据库查询
  - 优化 API 响应时间

### 3. 安全性

- **前端**：
  - 避免在客户端存储敏感信息
  - 使用 HTTPS 保护数据传输

- **后端**：
  - 使用参数化查询防止 SQL 注入
  - 使用 JWT 进行安全认证
  - 实现适当的访问控制

### 4. 测试

- **前端**：使用 Jest 和 React Testing Library 进行单元测试
- **后端（Docker 版本）**：使用 Jest 进行单元测试
- **PHP 版本**：使用 PHPUnit 进行单元测试

## 部署流程

详细的部署流程请参考 [DEPLOYMENT.md](DEPLOYMENT.md) 文件。

## 常见问题

### 1. 前端开发常见问题

- **问题**：Vite 开发服务器无法启动
  **解决方案**：检查端口是否被占用，尝试使用其他端口

- **问题**：API 请求失败
  **解决方案**：检查后端服务器是否运行，API 地址是否正确

### 2. 后端开发常见问题

- **问题**：数据库连接失败
  **解决方案**：检查数据库服务是否运行，连接配置是否正确

- **问题**：迁移失败
  **解决方案**：检查数据库权限，确保迁移文件格式正确

### 3. PHP 版本常见问题

- **问题**：Composer 安装失败
  **解决方案**：检查网络连接，尝试使用国内镜像

- **问题**：Artisan 命令失败
  **解决方案**：检查 PHP 版本，确保满足 Laravel 10 的要求

## 联系方式

如果您有任何问题或建议，请通过以下方式联系：

- 项目地址：https://github.com/Trae/trblog
- 开发者：Trae & gascs
- 电子邮件：contact@trae.dev

## 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。
