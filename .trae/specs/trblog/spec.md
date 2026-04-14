# TrBlog - 现代化个人博客系统 - Product Requirement Document

## Overview
- **Summary**: TrBlog 是一个现代化的前后端分离全栈个人博客系统，使用 React 18 + TypeScript 前端和 NestJS + PostgreSQL 后端，提供完整的博客管理功能。
- **Purpose**: 构建一个功能完整、技术先进的个人博客平台，支持文章发布、分类管理、标签系统、评论功能、用户认证和管理员后台。
- **Target Users**: 博主（管理员）和博客读者。

## Goals
- 实现完整的个人博客核心功能
- 使用现代技术栈构建，确保代码质量和可维护性
- 提供良好的用户体验和响应式设计
- 支持 Docker 一键部署

## Non-Goals (Out of Scope)
- 多人协作博客功能
- 付费订阅系统
- 复杂的数据分析仪表盘
- 国际化多语言支持
- 移动端原生应用

## Background & Context
- 项目采用前后端分离架构，前端使用 React 生态系统，后端使用 NestJS 框架
- 数据库使用 PostgreSQL，通过 Prisma ORM 进行数据访问
- 认证采用 JWT (Access Token + Refresh Token) 方案
- 前端组件库使用 Shadcn UI，样式使用 Tailwind CSS

## Functional Requirements
- **FR-1**: 用户注册与登录
- **FR-2**: 文章的增删改查 (CRUD)
- **FR-3**: 文章分类管理
- **FR-4**: 文章标签管理
- **FR-5**: 文章评论功能（支持回复）
- **FR-6**: 管理员权限控制
- **FR-7**: 文章搜索与筛选
- **FR-8**: Markdown 内容渲染

## Non-Functional Requirements
- **NFR-1**: 前后端交互使用 RESTful API
- **NFR-2**: 响应式设计，支持桌面端和移动端
- **NFR-3**: 代码使用 TypeScript 确保类型安全
- **NFR-4**: 使用 Docker 容器化部署
- **NFR-5**: 密码使用 bcrypt 加密存储

## Constraints
- **Technical**: 前端：React 18 + TypeScript + Tailwind CSS + Shadcn UI + React Query；后端：Node.js + NestJS + PostgreSQL + Prisma ORM
- **Business**: 个人项目，无严格时间限制
- **Dependencies**: Docker, Node.js 18+, PostgreSQL 15+

## Assumptions
- 部署环境支持 Docker 和 Docker Compose
- 用户具备基本的 Docker 操作知识
- 生产环境需要配置有效的域名和 HTTPS

## Acceptance Criteria

### AC-1: 用户可以注册和登录
- **Given**: 用户访问博客网站
- **When**: 用户填写注册信息或登录凭据并提交
- **Then**: 系统创建用户账户或验证身份并返回 JWT token
- **Verification**: `programmatic`

### AC-2: 管理员可以管理文章
- **Given**: 管理员已登录
- **When**: 管理员执行文章的创建、编辑或删除操作
- **Then**: 系统相应更新文章数据并持久化到数据库
- **Verification**: `programmatic`

### AC-3: 访客可以浏览文章列表和详情
- **Given**: 访客访问博客
- **When**: 访客浏览首页或点击文章
- **Then**: 系统显示已发布的文章列表或文章详情
- **Verification**: `programmatic`

### AC-4: 文章支持分类和标签
- **Given**: 文章已关联分类和标签
- **When**: 用户按分类或标签筛选文章
- **Then**: 系统显示符合条件的文章列表
- **Verification**: `programmatic`

### AC-5: 用户可以发表评论和回复
- **Given**: 用户已登录
- **When**: 用户在文章页面发表评论或回复其他评论
- **Then**: 系统保存评论并显示在文章页面
- **Verification**: `programmatic`

### AC-6: 前端界面美观且响应式
- **Given**: 用户访问博客
- **When**: 用户在不同设备和屏幕尺寸上浏览
- **Then**: 界面布局合理，元素清晰可读
- **Verification**: `human-judgment`

### AC-7: 项目可以通过 Docker 一键部署
- **Given**: 服务器已安装 Docker 和 Docker Compose
- **When**: 运行部署命令
- **Then**: 所有服务成功启动并可以正常访问
- **Verification**: `programmatic`

## Open Questions
- 暂无
