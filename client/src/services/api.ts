import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 10000, // 10秒超时
  withCredentials: false, // 不发送cookies
});

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

export default api;
