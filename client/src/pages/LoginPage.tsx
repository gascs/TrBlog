import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { LoginForm, LoginResponse } from '../types';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from: { pathname: string } })?.from || { pathname: '/' };

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await api.post<LoginResponse>('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate(from.pathname);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md card">
        <h2 className="text-2xl font-bold mb-6 text-center">登录</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              邮箱
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              密码
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary py-2"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? '登录中...' : '登录'}
          </button>
          {loginMutation.isError && (
            <p className="text-red-500 text-sm">
              登录失败: {loginMutation.error instanceof Error ? loginMutation.error.message : '未知错误'}
            </p>
          )}
        </form>
        <p className="mt-4 text-center text-sm">
          还没有账号？ <Link to="/register" className="text-primary">注册</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
