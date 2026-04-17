# TrBlog 欢迎页与后台入口功能更新

## 概述

本次更新为 TrBlog 博客系统添加了完整的新手欢迎页面和多场景后台管理入口功能。

## 功能列表

### 1. 主流博客级全功能欢迎页
- **位置**：首页顶部
- **内容**：
  - 欢迎标语和介绍文字
  - 三个关键按钮：
    1. **立即开始写作** - 跳转到后台文章编辑页（未登录则跳转登录页）
    2. **先去博客首页** - 跳转到博客首页
    3. **进入管理后台** - 跳转到后台仪表盘（未登录则跳转登录页）
- **样式**：现代化设计，配合品牌主色，带微动效

### 2. 全场景后台管理入口

#### 2.1 博客前台导航栏
- **桌面端**：右上角，用户头像/登录按钮旁边
- **移动端**：汉堡菜单展开后
- **权限**：仅管理员和编辑可见
- **样式**：品牌主色文字，hover 时背景变浅主色

#### 2.2 博客前台页脚
- **位置**：版权信息旁边
- **样式**：低调的浅灰色文字，hover 时变品牌主色
- **作用**：方便快速进入后台

#### 2.3 后台自身入口
- **返回前台**：侧边栏底部
- **前台预览**：顶部导航栏右侧，点击打开新标签页

### 3. 权限控制
- 所有后台入口仅对 `ADMIN` 和 `EDITOR` 角色可见
- 普通用户和未登录用户完全隐藏
- 后端权限验证同时支持 EDITOR 角色管理帖子

### 4. 技术实现
- **AdminLink 组件**：统一的后台入口组件，处理权限、样式和交互
- **角色更新**：添加 EDITOR 角色到 Prisma schema 和前端类型
- **后端权限**：更新帖子控制器，支持 EDITOR 角色

## 文件变更列表

### 前端文件
1. `/workspace/client/src/components/AdminLink.tsx` - 新增，通用后台入口组件
2. `/workspace/client/src/components/Navbar.tsx` - 更新，添加导航栏后台入口
3. `/workspace/client/src/components/Footer.tsx` - 更新，添加页脚后台入口
4. `/workspace/client/src/components/AdminLayout.tsx` - 更新，添加前台预览按钮
5. `/workspace/client/src/pages/HomePage.tsx` - 更新，添加欢迎页按钮
6. `/workspace/client/src/types/index.ts` - 更新，添加 EDITOR 角色类型

### 后端文件
1. `/workspace/server/prisma/schema.prisma` - 更新，添加 EDITOR 角色
2. `/workspace/server/src/post/post.controller.ts` - 更新，支持 EDITOR 角色管理帖子

## 使用说明

1. **查看欢迎页**：访问博客首页即可看到
2. **管理后台入口**：登录管理员/编辑账号后，在导航栏、页脚等位置可见
3. **角色说明**：
   - ADMIN：完全管理权限
   - EDITOR：可管理帖子
   - USER：普通用户

## 制作人
- Gascs (https://motut.net.cn)
- TRAE SOLO
