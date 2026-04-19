# TrBlog

<div align="center">
  <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20blog%20website%20logo%20with%20code%20and%20technology&image_size=square" alt="TrBlog Logo" width="120" height="120" />
  <h2>现代化个人博客系统</h2>
  <p>使用 React + NestJS + PostgreSQL 构建的完整博客管理平台</p>
  
  <div style="margin: 20px 0;">
    <a href="https://github.com/gascs/TrBlog/stargazers" style="margin: 0 5px; text-decoration: none;">
      <img src="https://img.shields.io/github/stars/gascs/TrBlog?style=flat-square" alt="GitHub stars" />
    </a>
    <a href="https://github.com/gascs/TrBlog/network/members" style="margin: 0 5px; text-decoration: none;">
      <img src="https://img.shields.io/github/forks/gascs/TrBlog?style=flat-square" alt="GitHub forks" />
    </a>
    <a href="https://github.com/gascs/TrBlog/blob/main/LICENSE" style="margin: 0 5px; text-decoration: none;">
      <img src="https://img.shields.io/github/license/gascs/TrBlog?style=flat-square" alt="License" />
    </a>
    <a href="https://github.com/gascs/TrBlog/issues" style="margin: 0 5px; text-decoration: none;">
      <img src="https://img.shields.io/github/issues/gascs/TrBlog?style=flat-square" alt="GitHub issues" />
    </a>
    <a href="https://github.com/gascs/TrBlog/commits/main" style="margin: 0 5px; text-decoration: none;">
      <img src="https://img.shields.io/github/last-commit/gascs/TrBlog?style=flat-square" alt="GitHub last commit" />
    </a>
  </div>

  <div style="margin: 20px 0;">
    <a href="#🚀-快速开始" style="margin: 0 10px; text-decoration: none; color: #3b82f6;">快速开始</a>
    <a href="#✨-功能特性" style="margin: 0 10px; text-decoration: none; color: #3b82f6;">功能特性</a>
    <a href="#🛠️-技术栈" style="margin: 0 10px; text-decoration: none; color: #3b82f6;">技术栈</a>
    <a href="#📖-文档" style="margin: 0 10px; text-decoration: none; color: #3b82f6;">文档</a>
    <a href="#🤝-贡献" style="margin: 0 10px; text-decoration: none; color: #3b82f6;">贡献</a>
  </div>
</div>

---

## 🚀 快速开始

### 使用部署脚本（推荐）

```bash
# 克隆仓库
git clone https://github.com/gascs/TrBlog.git
cd TrBlog

# 运行部署脚本
chmod +x start.sh
./start.sh
```

脚本会引导您选择：
- 部署方式（Docker 或 PHP）
- 数据库类型（PostgreSQL, MySQL, SQLite）
- 数据库配置（本地或外部）

详细说明请查看 [部署指南](DEPLOYMENT.md)。

## ✨ 功能特性

### 🎯 核心功能
- **文章管理** - 创建、编辑、删除文章，支持 Markdown
- **分类系统** - 文章分类管理
- **标签功能** - 文章标签管理
- **用户系统** - 注册、登录、权限控制
- **评论系统** - 文章评论功能
- **搜索功能** - 全文搜索

### 🎨 界面与体验
- **响应式设计** - 完美适配桌面端和移动端
- **深色/浅色模式** - 支持主题切换和跟随系统
- **现代化 UI** - 使用 Tailwind CSS 构建
- **平滑动画** - 使用 Framer Motion 实现
- **阅读进度** - 文章阅读进度条

### 🔧 部署与配置
- **双部署方式** - Docker 容器化 或 PHP 传统部署
- **多种数据库** - PostgreSQL, MySQL, SQLite
- **灵活配置** - 本地数据库或外部数据库
- **一键部署** - 使用 start.sh 脚本快速部署

### 📜 合规与法律
- **隐私政策** - 完整的隐私声明
- **开源声明** - 使用的开源技术说明
- **免责声明** - 使用条款和责任限制

## 🛠️ 技术栈

### 前端技术
| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18+ | UI 框架 |
| TypeScript | 5+ | 类型安全 |
| Tailwind CSS | 3+ | 样式框架 |
| Vite | 5+ | 构建工具 |
| React Query | 5+ | 数据管理 |
| React Router | 6+ | 路由管理 |
| Framer Motion | 12+ | 动画库 |
| React Markdown | - | Markdown 渲染 |

### 后端技术（Docker 版本）
| 技术 | 版本 | 用途 |
|------|------|------|
| NestJS | 10+ | 后端框架 |
| TypeScript | 5+ | 类型安全 |
| Prisma | 5+ | ORM 工具 |
| PostgreSQL | 15+ | 数据库（默认） |
| MySQL | 8+ | 可选数据库 |
| SQLite | - | 轻量数据库 |
| Redis | 7+ | 缓存 |

### PHP 版本技术
| 技术 | 版本 | 用途 |
|------|------|------|
| Laravel | 10+ | PHP 框架 |
| PHP | 8.0+ | 后端语言 |
| MySQL | 8+ | 数据库（默认） |
| SQLite | - | 轻量数据库 |
| PostgreSQL | 15+ | 可选数据库 |

## 📁 项目结构

```
TrBlog/
├── client/              # 前端应用（React + TypeScript）
│   ├── src/
│   │   ├── components/  # 可复用组件
│   │   ├── contexts/    # React 上下文
│   │   ├── pages/       # 页面组件
│   │   ├── services/    # API 服务
│   │   └── types/       # TypeScript 类型
│   └── package.json
├── server/              # 后端应用（NestJS）
│   ├── src/
│   │   ├── controllers/ # 控制器
│   │   ├── services/    # 业务逻辑
│   │   └── models/      # 数据模型
│   ├── prisma/          # Prisma 配置
│   └── package.json
├── trblog-php/          # PHP 版本（Laravel）
│   ├── app/             # 应用代码
│   ├── resources/       # 视图和资源
│   └── routes/          # 路由配置
├── docs/                # 文档目录
│   └── README.md        # 文档索引
├── docker-compose.yml   # Docker 配置
├── start.sh             # 一键部署脚本
├── README.md            # 项目说明（本文件）
├── DEPLOYMENT.md        # 部署指南
├── DEVELOPMENT.md       # 开发文档
└── CONTRIBUTING.md      # 贡献指南
```

## 📖 文档

- [部署指南](DEPLOYMENT.md) - 详细的部署说明
- [开发文档](DEVELOPMENT.md) - 开发者指南和架构说明
- [贡献指南](CONTRIBUTING.md) - 如何贡献代码
- [部署检查清单](DEPLOYMENT_CHECKLIST.md) - 部署前检查
- [文档索引](docs/README.md) - 完整的文档目录

## 🤝 贡献

我们欢迎任何形式的贡献！请查看 [贡献指南](CONTRIBUTING.md) 了解详情。

### 提交贡献的流程：
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📜 许可证

本项目采用 MIT 许可证。查看 [LICENSE](LICENSE) 文件了解详情。

## 👥 开发者

- **Trae**
- **Gascs**

## 💬 联系我们

如有问题或建议，欢迎通过以下方式联系：
- 📧 Email: 项目 Issues
- 🔗 GitHub: https://github.com/gascs/TrBlog

---

<div align="center">
  <p>如果这个项目对您有帮助，请考虑给我们一个 ⭐️</p>
  <p>Made with ❤️ by TrBlog Team</p>
</div>
