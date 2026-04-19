

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

console.log('🔧 环境配置:', { API_URL });
console.log('🚀 切换到模拟模式以访问后台');

// 模拟数据
const mockData = {
  settings: {
    id: '1',
    siteName: 'TrBlog',
    siteDescription: '一个现代化的博客系统',
    siteUrl: 'http://localhost:5173',
    logoUrl: '',
    faviconUrl: '',
    adminEmail: 'admin@trblog.com',
    contactEmail: 'contact@trblog.com',
    phone: '',
    address: '浙江省温州市',
    socialLinks: {
      github: 'https://github.com'
    },
    footerText: '© 2026 TrBlog. All rights reserved.',
    analyticsCode: '',
    metaKeywords: '博客,技术,React,NestJS',
    metaDescription: '一个基于 React + NestJS 的现代化博客系统',
    heroTitle: '分享知识，连接思想',
    heroSubtitle: '一个基于 React + NestJS 的现代化博客系统，为您提供优雅的写作和阅读体验。',
    heroBackground: 'gradient-to-br from-blue-50 to-indigo-50',
    heroDecor: true
  },
  posts: [
    {
      id: '1',
      title: '欢迎使用 TrBlog',
      slug: 'welcome-to-trblog',
      content: '# 欢迎使用 TrBlog\n\n这是一个基于 React + NestJS 的博客系统。\n\n## 功能特性\n\n- ✅ 文章管理\n- ✅ 评论系统\n- ✅ 用户认证\n- ✅ 分类和标签\n- ✅ 响应式设计\n\n## 技术栈\n\n- **前端**: React 18 + TypeScript + Tailwind CSS\n- **后端**: NestJS + PostgreSQL + Prisma\n- **部署**: Docker + Docker Compose\n\n感谢使用！',
      excerpt: '这是一个基于 React + NestJS 的博客系统，包含文章管理、评论系统、用户认证等功能。',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20blog%20website%20header%20with%20code%20and%20technology&image_size=landscape_16_9',
      published: true,
      views: 123,
      authorId: '1',
      categoryId: '1',
      author: {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        role: 'ADMIN',
        createdAt: '2026-04-01T00:00:00Z',
        updatedAt: '2026-04-01T00:00:00Z'
      },
      category: {
        id: '1',
        name: '技术',
        slug: 'technology'
      },
      tags: [
        { id: '1', name: 'React', slug: 'react' },
        { id: '2', name: 'NestJS', slug: 'nestjs' }
      ],
      comments: [],
      createdAt: '2026-04-17T00:00:00Z',
      updatedAt: '2026-04-17T00:00:00Z'
    },
    {
      id: '2',
      title: 'TypeScript 入门指南',
      slug: 'typescript-getting-started',
      content: '# TypeScript 入门指南\n\nTypeScript 是 JavaScript 的超集，添加了类型系统。\n\n## 基本类型\n\n- number\n- string\n- boolean\n- array\n- object\n- null\n- undefined\n\n## 接口\n\n```typescript\ninterface User {\n  id: string;\n  name: string;\n  age: number;\n}\n```\n\n## 泛型\n\n```typescript\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n```',
      excerpt: 'TypeScript 是 JavaScript 的超集，添加了类型系统，使代码更加健壮。',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=typescript%20code%20on%20dark%20background&image_size=landscape_16_9',
      published: true,
      views: 456,
      authorId: '1',
      categoryId: '1',
      author: {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        role: 'ADMIN',
        createdAt: '2026-04-01T00:00:00Z',
        updatedAt: '2026-04-01T00:00:00Z'
      },
      category: {
        id: '1',
        name: '技术',
        slug: 'technology'
      },
      tags: [
        { id: '3', name: 'TypeScript', slug: 'typescript' },
        { id: '4', name: '前端', slug: 'frontend' }
      ],
      comments: [],
      createdAt: '2026-04-16T00:00:00Z',
      updatedAt: '2026-04-16T00:00:00Z'
    }
  ],
  categories: [
    { id: '1', name: '技术', slug: 'technology', _count: { posts: 2 } },
    { id: '2', name: '生活', slug: 'life', _count: { posts: 0 } },
    { id: '3', name: '学习', slug: 'study', _count: { posts: 0 } }
  ],
  tags: [
    { id: '1', name: 'React', slug: 'react', _count: { posts: 1 } },
    { id: '2', name: 'NestJS', slug: 'nestjs', _count: { posts: 1 } },
    { id: '3', name: 'TypeScript', slug: 'typescript', _count: { posts: 1 } },
    { id: '4', name: '前端', slug: 'frontend', _count: { posts: 1 } }
  ],
  user: {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'ADMIN',
    createdAt: '2026-04-01T00:00:00Z',
    updatedAt: '2026-04-01T00:00:00Z'
  }
};

// 模拟 API 实现（完全模拟 axios 接口）
const mockApi = {
  get: (url: string, config?: any) => {
    console.log('📡 模拟请求 GET:', url, config);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (url.includes('/posts')) {
          if (url.includes('/posts/')) {
            const id = url.split('/').pop();
            const post = mockData.posts.find(p => p.id === id);
            resolve({ data: post, status: 200, statusText: 'OK' });
          } else {
            resolve({ 
              data: {
                posts: mockData.posts,
                pagination: {
                  total: mockData.posts.length,
                  page: 1,
                  limit: 10,
                  totalPages: 1
                }
              },
              status: 200,
              statusText: 'OK'
            });
          }
        } else if (url.includes('/categories')) {
          resolve({ data: mockData.categories, status: 200, statusText: 'OK' });
        } else if (url.includes('/tags')) {
          resolve({ data: mockData.tags, status: 200, statusText: 'OK' });
        } else if (url.includes('/users')) {
          resolve({ data: [mockData.user], status: 200, statusText: 'OK' });
        } else if (url.includes('/settings')) {
          resolve({ data: mockData.settings, status: 200, statusText: 'OK' });
        } else {
          resolve({ data: null, status: 200, statusText: 'OK' });
        }
      }, 300);
    });
  },
  post: (url: string, data?: any, config?: any) => {
    console.log('📡 模拟请求 POST:', url, data, config);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (url.includes('/auth/login')) {
          console.log('🔑 模拟登录成功，使用管理员账号');
          resolve({ 
            data: {
              access_token: 'mock-token-123',
              user: mockData.user
            },
            status: 200,
            statusText: 'OK'
          });
        } else if (url.includes('/posts')) {
          console.log('📝 模拟创建文章');
          const newPost = {
            id: Date.now().toString(),
            ...data,
            authorId: '1',
            author: mockData.user,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            views: 0,
            comments: []
          };
          mockData.posts.unshift(newPost);
          resolve({ data: newPost, status: 200, statusText: 'OK' });
        } else if (url.includes('/migration/import')) {
          console.log('🚚 模拟博客迁移');
          resolve({ 
            data: {
              posts: 10,
              categories: 3,
              tags: 5,
              users: 1
            },
            status: 200,
            statusText: 'OK'
          });
        } else {
          resolve({ data: null, status: 200, statusText: 'OK' });
        }
      }, 300);
    });
  },
  put: (url: string, data?: any, config?: any) => {
    console.log('📡 模拟请求 PUT:', url, data, config);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (url.includes('/posts/')) {
          console.log('📝 模拟更新文章');
          const id = url.split('/').pop();
          const index = mockData.posts.findIndex(post => post.id === id);
          if (index !== -1) {
            mockData.posts[index] = {
              ...mockData.posts[index],
              ...data,
              updatedAt: new Date().toISOString()
            };
            resolve({ data: mockData.posts[index], status: 200, statusText: 'OK' });
          } else {
            resolve({ data: null, status: 404, statusText: 'Not Found' });
          }
        } else if (url.includes('/settings')) {
          console.log('⚙️ 模拟更新网站设置');
          mockData.settings = {
            ...mockData.settings,
            ...data
          };
          resolve({ data: mockData.settings, status: 200, statusText: 'OK' });
        } else {
          resolve({ data: null, status: 200, statusText: 'OK' });
        }
      }, 300);
    });
  },
  delete: (url: string, config?: any) => {
    console.log('📡 模拟请求 DELETE:', url, config);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (url.includes('/posts/')) {
          console.log('🗑️ 模拟删除文章');
          const id = url.split('/').pop();
          const index = mockData.posts.findIndex(post => post.id === id);
          if (index !== -1) {
            mockData.posts.splice(index, 1);
          }
        }
        resolve({ data: null, status: 200, statusText: 'OK' });
      }, 300);
    });
  },
  patch: () => Promise.resolve({ data: null, status: 200, statusText: 'OK' }),
  // 拦截器占位符（不需要实际功能）
  interceptors: {
    request: { use: () => {}, eject: () => {} },
    response: { use: () => {}, eject: () => {} }
  }
};

// 直接导出模拟 API
export default mockApi;