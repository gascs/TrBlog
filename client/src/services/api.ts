import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const MOCK_MODE = import.meta.env.REACT_APP_MOCK_MODE === 'true';

// 模拟数据
const mockData = {
  posts: [
    {
      id: '1',
      title: '欢迎使用 TrBlog',
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
        email: 'admin@example.com'
      },
      category: {
        id: '1',
        name: '技术'
      },
      tags: [
        { id: '1', name: 'React' },
        { id: '2', name: 'NestJS' }
      ],
      comments: [],
      createdAt: '2026-04-17T00:00:00Z',
      updatedAt: '2026-04-17T00:00:00Z'
    },
    {
      id: '2',
      title: 'TypeScript 入门指南',
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
        email: 'admin@example.com'
      },
      category: {
        id: '1',
        name: '技术'
      },
      tags: [
        { id: '3', name: 'TypeScript' },
        { id: '4', name: '前端' }
      ],
      comments: [],
      createdAt: '2026-04-16T00:00:00Z',
      updatedAt: '2026-04-16T00:00:00Z'
    }
  ],
  categories: [
    { id: '1', name: '技术' },
    { id: '2', name: '生活' },
    { id: '3', name: '学习' }
  ],
  tags: [
    { id: '1', name: 'React' },
    { id: '2', name: 'NestJS' },
    { id: '3', name: 'TypeScript' },
    { id: '4', name: '前端' }
  ],
  user: {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'ADMIN'
  }
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 10000, // 10秒超时
  withCredentials: false, // 不发送cookies
});

// 模拟模式拦截器
if (MOCK_MODE) {
  console.log('🚀 进入模拟模式，使用模拟数据');
  
  // 拦截所有请求，返回模拟数据
  api.interceptors.request.use((config) => {
    // 模拟延迟
    return new Promise(resolve => {
      setTimeout(() => resolve(config), 300);
    });
  });
  
  api.interceptors.response.use(null, (error) => {
    // 模拟响应
    const url = error.config.url;
    
    // 处理不同的请求
    if (url.includes('/posts') && error.config.method === 'get') {
      if (url.includes('/posts/')) {
        // 获取单个文章
        const id = url.split('/').pop();
        const post = mockData.posts.find(p => p.id === id);
        return Promise.resolve({ data: post });
      } else {
        // 获取文章列表
        return Promise.resolve({ 
          data: {
            posts: mockData.posts,
            pagination: {
              total: mockData.posts.length,
              page: 1,
              limit: 10,
              totalPages: 1
            }
          }
        });
      }
    }
    
    if (url.includes('/categories') && error.config.method === 'get') {
      return Promise.resolve({ data: mockData.categories });
    }
    
    if (url.includes('/tags') && error.config.method === 'get') {
      return Promise.resolve({ data: mockData.tags });
    }
    
    if (url.includes('/auth/login') && error.config.method === 'post') {
      // 模拟登录
      return Promise.resolve({ 
        data: {
          access_token: 'mock-token-123',
          user: mockData.user
        }
      });
    }
    
    // 默认返回错误
    return Promise.reject(error);
  });
} else {
  // 正常模式的拦截器
  // Add interceptor to add token to requests
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // 添加防CSRF令牌（如果需要）
      // const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      // if (csrfToken) {
      //   config.headers['X-CSRF-Token'] = csrfToken;
      // }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Add interceptor to handle 401 errors
  api.interceptors.response.use(
    (response) => {
      // 验证响应数据格式
      if (response.data && typeof response.data === 'object') {
        return response;
      }
      return Promise.reject(new Error('Invalid response format'));
    },
    (error) => {
      if (error.response) {
        // 处理401错误
        if (error.response.status === 401) {
          // 清除本地存储的认证信息
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // 跳转到登录页面
          window.location.href = '/login';
        }
        // 处理其他错误
        return Promise.reject({
          status: error.response.status,
          message: error.response.data?.message || 'Request failed',
          data: error.response.data,
        });
      } else if (error.request) {
        // 请求已发出但没有收到响应
        return Promise.reject(new Error('No response received from server'));
      } else {
        // 请求配置出错
        return Promise.reject(new Error('Request configuration error'));
      }
    }
  );
}

export default api;
