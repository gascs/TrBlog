# TrBlog 主题与插件开发指南

本指南将帮助您了解如何为 TrBlog 创建自定义主题和插件，扩展系统功能。

## 目录

- [主题系统](#主题系统)
  - [主题系统原理](#主题系统原理)
  - [创建自定义主题](#创建自定义主题)
  - [主题配置](#主题配置)
  - [主题示例](#主题示例)
- [插件系统](#插件系统)
  - [插件系统原理](#插件系统原理)
  - [创建自定义插件](#创建自定义插件)
  - [插件配置](#插件配置)
  - [插件示例](#插件示例)
- [最佳实践](#最佳实践)

## 主题系统

### 主题系统原理

TrBlog 的主题系统基于以下核心组件：

1. **ThemeContext** - 主题状态管理
2. **ThemeToggle** - 主题切换组件
3. **CSS 类名** - 基于主题的样式控制

主题系统支持四种预设主题：
- `light` - 浅色模式
- `dark` - 深色模式
- `system` - 跟随系统设置
- `colorful` - 彩色模式

主题设置存储在 localStorage 中，确保刷新后保持用户偏好。

### 创建自定义主题

要创建自定义主题，请按照以下步骤操作：

#### 1. 定义主题类型

在 `client/src/contexts/ThemeContext.tsx` 中添加新的主题类型：

```typescript
// 在 Theme 类型中添加新主题
type Theme = 'light' | 'dark' | 'system' | 'colorful' | 'your-theme';
```

#### 2. 添加主题切换选项

在 `client/src/components/ThemeToggle.tsx` 中添加新主题选项：

```typescript
const themes = [
  { id: 'light', icon: Sun, label: '浅色模式' },
  { id: 'system', icon: Monitor, label: '跟随系统' },
  { id: 'dark', icon: Moon, label: '深色模式' },
  { id: 'colorful', icon: Sparkles, label: '彩色模式' },
  { id: 'your-theme', icon: YourThemeIcon, label: '你的主题' }, // 新增
];
```

#### 3. 添加主题样式

在 `client/src/index.css` 中添加新主题的 CSS 类：

```css
/* 你的主题样式 */
.your-theme {
  /* 主题变量 */
  --background: #f0f4f8;
  --foreground: #1a202c;
  --card: #ffffff;
  --card-foreground: #1a202c;
  --primary: #3182ce;
  --primary-foreground: #ffffff;
  --secondary: #e2e8f0;
  --secondary-foreground: #1a202c;
  --muted: #f7fafc;
  --muted-foreground: #718096;
  --accent: #ebf8ff;
  --accent-foreground: #1a202c;
  --destructive: #e53e3e;
  --destructive-foreground: #ffffff;
  --border: #e2e8f0;
  --input: #edf2f7;
  --ring: #3182ce;
  
  /* 其他样式 */
  background-color: var(--background);
  color: var(--foreground);
}

/* 为你的主题添加特定样式 */
.your-theme .navbar {
  background-color: var(--card);
  border-bottom: 1px solid var(--border);
}

.your-theme .btn-primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
}
```

#### 4. 更新主题逻辑

在 `ThemeContext.tsx` 中更新主题设置逻辑：

```typescript
const setTheme = (newTheme: Theme) => {
  setThemeState(newTheme);
  localStorage.setItem('theme', newTheme);
  
  if (newTheme === 'system') {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(systemPrefersDark);
  } else {
    setIsDark(newTheme === 'dark');
  }
};
```

### 主题配置

主题配置可以通过以下方式进行：

1. **颜色变量** - 在 CSS 中定义主题颜色变量
2. **字体配置** - 定义主题字体和字重
3. **布局设置** - 调整主题布局和间距
4. **动画效果** - 添加主题特定的动画效果

### 主题示例

#### 示例：创建一个紫色主题

```typescript
// ThemeContext.tsx
type Theme = 'light' | 'dark' | 'system' | 'colorful' | 'purple';

// ThemeToggle.tsx
const themes = [
  // ... 现有主题
  { id: 'purple', icon: Palette, label: '紫色模式' },
];

// index.css
.purple {
  --background: #f8f5ff;
  --foreground: #2d1d69;
  --card: #ffffff;
  --card-foreground: #2d1d69;
  --primary: #7c3aed;
  --primary-foreground: #ffffff;
  --secondary: #e9d5ff;
  --secondary-foreground: #2d1d69;
  --muted: #f3e8ff;
  --muted-foreground: #6b7280;
  --accent: #f3e8ff;
  --accent-foreground: #2d1d69;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #e9d5ff;
  --input: #f3e8ff;
  --ring: #7c3aed;
  
  background-color: var(--background);
  color: var(--foreground);
}
```

## 插件系统

### 插件系统原理

TrBlog 的插件系统允许您扩展系统功能，而无需修改核心代码。插件系统基于以下原则：

1. **模块化** - 插件作为独立模块开发
2. ** hooks** - 通过钩子系统与核心功能交互
3. **配置化** - 插件可通过配置文件自定义

### 创建自定义插件

要创建自定义插件，请按照以下步骤操作：

#### 1. 创建插件目录结构

```
plugins/
  your-plugin/
    index.ts          # 插件入口
    manifest.json     # 插件配置
    src/              # 插件源码
      components/     # 插件组件
      hooks/          # 插件钩子
      utils/          # 插件工具
    package.json      # 插件依赖
```

#### 2. 编写插件入口

在 `plugins/your-plugin/index.ts` 中：

```typescript
import { Plugin } from '@trblog/core';

export class YourPlugin implements Plugin {
  name = 'your-plugin';
  version = '1.0.0';
  description = '你的插件描述';

  // 插件初始化
  async initialize() {
    console.log('Your plugin initialized');
    // 初始化逻辑
  }

  // 插件激活
  async activate() {
    console.log('Your plugin activated');
    // 激活逻辑
  }

  // 插件停用
  async deactivate() {
    console.log('Your plugin deactivated');
    // 停用逻辑
  }

  // 插件钩子
  hooks = {
    // 文章渲染前钩子
    'post:beforeRender': (post) => {
      // 处理文章渲染
      return post;
    },
    
    // 评论提交前钩子
    'comment:beforeSubmit': (comment) => {
      // 处理评论提交
      return comment;
    },
  };
}

export default new YourPlugin();
```

#### 3. 创建插件配置

在 `plugins/your-plugin/manifest.json` 中：

```json
{
  "name": "your-plugin",
  "version": "1.0.0",
  "description": "你的插件描述",
  "author": "Your Name",
  "dependencies": [],
  "config": {
    "enabled": true,
    "settings": {
      "option1": "value1",
      "option2": "value2"
    }
  }
}
```

#### 4. 注册插件

在 `client/src/App.tsx` 中注册插件：

```typescript
import yourPlugin from './plugins/your-plugin';

// 注册插件
const plugins = [yourPlugin];

// 初始化插件
plugins.forEach(plugin => {
  plugin.initialize();
  plugin.activate();
});
```

### 插件配置

插件配置可以通过以下方式进行：

1. **manifest.json** - 插件基本配置
2. **环境变量** - 通过环境变量配置插件
3. **管理界面** - 在管理后台配置插件

### 插件示例

#### 示例：创建一个语法高亮插件

```typescript
// plugins/syntax-highlight/index.ts
import { Plugin } from '@trblog/core';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export class SyntaxHighlightPlugin implements Plugin {
  name = 'syntax-highlight';
  version = '1.0.0';
  description = '代码语法高亮插件';

  async initialize() {
    console.log('Syntax highlight plugin initialized');
  }

  async activate() {
    console.log('Syntax highlight plugin activated');
  }

  async deactivate() {
    console.log('Syntax highlight plugin deactivated');
  }

  hooks = {
    'post:afterRender': (content) => {
      // 高亮代码块
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
      return content;
    },
  };
}

export default new SyntaxHighlightPlugin();
```

## 最佳实践

### 主题开发最佳实践

1. **使用 CSS 变量** - 利用 CSS 变量实现主题切换
2. **响应式设计** - 确保主题在不同设备上都有良好表现
3. **性能优化** - 避免过度使用复杂样式和动画
4. **可访问性** - 确保主题符合 WCAG 可访问性标准
5. **兼容性** - 确保主题在主流浏览器中正常工作

### 插件开发最佳实践

1. **模块化设计** - 将插件功能分解为独立模块
2. **钩子使用** - 合理使用系统钩子，避免直接修改核心代码
3. **错误处理** - 实现完善的错误处理，确保插件故障不影响系统运行
4. **性能考虑** - 优化插件性能，避免资源浪费
5. **文档完善** - 为插件提供详细的使用文档

### 发布与分享

1. **版本控制** - 使用语义化版本控制
2. **文档** - 提供详细的安装和使用说明
3. **测试** - 在发布前进行充分测试
4. **社区贡献** - 考虑将插件贡献给社区

## 总结

TrBlog 的主题和插件系统为您提供了灵活的扩展能力，使您可以根据自己的需求定制博客系统。通过本指南，您应该能够创建自己的主题和插件，为 TrBlog 添加新功能和个性化外观。

如果您有任何问题或建议，欢迎在项目仓库中提交 Issue 或 Pull Request。