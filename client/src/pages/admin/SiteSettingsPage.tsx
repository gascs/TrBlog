import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Save, Settings, Globe, Mail, Phone, MapPin, Info, AlertCircle, Check, Palette } from 'lucide-react';
import api from '../../services/api';

interface SiteSettings {
  id: string;
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logoUrl: string;
  faviconUrl: string;
  adminEmail: string;
  contactEmail: string;
  phone: string;
  address: string;
  socialLinks: {
    weibo?: string;
    wechat?: string;
    github?: string;
    twitter?: string;
  };
  footerText: string;
  analyticsCode: string;
  metaKeywords: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBackground: string;
  heroDecor: boolean;
}

const SiteSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    id: '1',
    siteName: 'TrBlog',
    siteDescription: '一个现代化的博客系统',
    siteUrl: 'http://localhost:5173',
    logoUrl: '',
    faviconUrl: '',
    adminEmail: 'admin@trblog.com',
    contactEmail: 'contact@trblog.com',
    phone: '',
    address: '',
    socialLinks: {},
    footerText: '© 2026 TrBlog. All rights reserved.',
    analyticsCode: '',
    metaKeywords: '',
    metaDescription: '',
    heroTitle: '分享知识，连接思想',
    heroSubtitle: '一个基于 React + NestJS 的现代化博客系统，为您提供优雅的写作和阅读体验。',
    heroBackground: 'gradient-to-br from-blue-50 to-indigo-50',
    heroDecor: true
  });

  // 获取网站设置
  const { data, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const response = await api.get('/settings');
      return response.data;
    }
  });

  // 保存网站设置
  const saveMutation = useMutation({
    mutationFn: async (data: SiteSettings) => {
      const response = await api.put('/settings', data);
      return response.data;
    },
    onSuccess: () => {
      alert('设置保存成功！');
    }
  });

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(settings);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as any;
    const { name, value, type } = target;
    const checked = target.checked;
    
    // 处理嵌套字段
    if (name.startsWith('socialLinks.')) {
      const socialKey = name.replace('socialLinks.', '');
      setSettings(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else if (type === 'checkbox') {
      setSettings(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200 dark:shadow-blue-900/20">
            <Settings className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              网站管理
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">修改站点的各种信息和设置</p>
          </div>
        </div>
        <button
          type="submit"
          form="settings-form"
          disabled={saveMutation.isPending}
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-blue-200 dark:shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-300 dark:hover:shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Save className="w-5 h-5" />
          {saveMutation.isPending ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              保存中...
            </>
          ) : (
            '保存设置'
          )}
        </button>
      </div>

      <form id="settings-form" onSubmit={handleSubmit} className="space-y-6">
        {/* 基本设置 */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-7 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            基本设置
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'siteName', label: '网站名称', placeholder: '输入网站名称', required: true },
              { name: 'siteDescription', label: '网站描述', placeholder: '输入网站描述' },
              { name: 'siteUrl', label: '网站URL', placeholder: '输入网站URL', type: 'url' },
              { name: 'logoUrl', label: 'Logo URL', placeholder: '输入Logo图片URL', type: 'url' },
              { name: 'faviconUrl', label: 'Favicon URL', placeholder: '输入Favicon图片URL', type: 'url' },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={field.type || 'text'}
                  required={field.required}
                  name={field.name}
                  value={settings[field.name as keyof typeof settings] as string}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-500"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 联系信息 */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-7 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            联系信息
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'adminEmail', label: '管理员邮箱', placeholder: '输入管理员邮箱', type: 'email', required: true },
              { name: 'contactEmail', label: '联系邮箱', placeholder: '输入联系邮箱', type: 'email' },
              { name: 'phone', label: '联系电话', placeholder: '输入联系电话', type: 'tel' },
              { name: 'address', label: '地址', placeholder: '输入地址' },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={field.type || 'text'}
                  required={field.required}
                  name={field.name}
                  value={settings[field.name as keyof typeof settings] as string}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 focus:border-green-500 dark:focus:border-green-400 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-500"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 社交媒体 */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-7 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            社交媒体
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'socialLinks.weibo', label: '微博', placeholder: '输入微博链接', type: 'url' },
              { name: 'socialLinks.wechat', label: '微信', placeholder: '输入微信公众号' },
              { name: 'socialLinks.github', label: 'GitHub', placeholder: '输入GitHub链接', type: 'url' },
              { name: 'socialLinks.twitter', label: 'Twitter', placeholder: '输入Twitter链接', type: 'url' },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={(field.name.includes('.') 
                    ? (settings.socialLinks as any)[field.name.split('.')[1]] || ''
                    : settings[field.name as keyof typeof settings] as string) || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-500"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 首页个性化设置 */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-7 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
            <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
              <Palette className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            </div>
            首页个性化
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">首页主标题</label>
              <input
                type="text"
                name="heroTitle"
                value={settings.heroTitle}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:focus:ring-pink-400/20 focus:border-pink-500 dark:focus:border-pink-400 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-500"
                placeholder="输入首页主标题"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">首页副标题</label>
              <textarea
                name="heroSubtitle"
                value={settings.heroSubtitle}
                onChange={handleChange}
                className="w-full px-4 py-3 h-24 border border-slate-200 dark:border-slate-600 rounded-xl bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:focus:ring-pink-400/20 focus:border-pink-500 dark:focus:border-pink-400 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-500 resize-none"
                placeholder="输入首页副标题"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">背景样式</label>
              <select
                name="heroBackground"
                value={settings.heroBackground}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:focus:ring-pink-400/20 focus:border-pink-500 dark:focus:border-pink-400 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-500"
              >
                <option value="gradient-to-br from-blue-50 to-indigo-50">🎨 蓝紫渐变</option>
                <option value="gradient-to-br from-green-50 to-emerald-50">🌿 绿青渐变</option>
                <option value="gradient-to-br from-pink-50 to-rose-50">🌸 粉红渐变</option>
                <option value="gradient-to-br from-yellow-50 to-amber-50">🌟 金黄渐变</option>
                <option value="gradient-to-br from-purple-50 to-violet-50">💜 紫罗渐变</option>
                <option value="gradient-to-br from-gray-50 to-slate-50">⚪ 灰色渐变</option>
              </select>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-200/50 dark:border-slate-600/50">
              <input
                type="checkbox"
                id="heroDecor"
                name="heroDecor"
                checked={settings.heroDecor}
                onChange={handleChange}
                className="w-5 h-5 text-pink-600 border-slate-300 dark:border-slate-500 rounded-lg focus:ring-pink-500 cursor-pointer"
              />
              <label htmlFor="heroDecor" className="text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                显示装饰性背景元素
              </label>
            </div>
          </div>
        </div>

        {/* 其他设置 */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-7 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
              <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            其他设置
          </h3>
          <div className="space-y-6">
            {[
              { name: 'footerText', label: '页脚文本', placeholder: '输入页脚文本' },
              { name: 'metaKeywords', label: 'Meta关键词', placeholder: '输入网站关键词，用逗号分隔' },
              { name: 'metaDescription', label: 'Meta描述', placeholder: '输入网站Meta描述' },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={settings[field.name as keyof typeof settings] as string}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-500"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">分析代码</label>
              <textarea
                name="analyticsCode"
                value={settings.analyticsCode}
                onChange={handleChange}
                className="w-full px-4 py-3 h-32 border border-slate-200 dark:border-slate-600 rounded-xl bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-500 font-mono text-sm resize-none"
                placeholder="输入网站分析代码（如Google Analytics）"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SiteSettingsPage;