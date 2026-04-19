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
    const { name, value, type, checked } = e.target;
    
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">网站管理</h1>
          <p className="text-gray-600">修改站点的各种信息和设置</p>
        </div>
        <button
          type="submit"
          form="settings-form"
          disabled={saveMutation.isPending}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          {saveMutation.isPending ? '保存中...' : '保存设置'}
        </button>
      </div>

      <form id="settings-form" onSubmit={handleSubmit} className="space-y-8">
        {/* 基本设置 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            基本设置
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">网站名称 <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入网站名称"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">网站描述</label>
              <input
                type="text"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入网站描述"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">网站URL</label>
              <input
                type="url"
                name="siteUrl"
                value={settings.siteUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入网站URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
              <input
                type="url"
                name="logoUrl"
                value={settings.logoUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入Logo图片URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Favicon URL</label>
              <input
                type="url"
                name="faviconUrl"
                value={settings.faviconUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入Favicon图片URL"
              />
            </div>
          </div>
        </div>

        {/* 联系信息 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            联系信息
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">管理员邮箱 <span className="text-red-500">*</span></label>
              <input
                type="email"
                required
                name="adminEmail"
                value={settings.adminEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入管理员邮箱"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">联系邮箱</label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入联系邮箱"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">联系电话</label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入联系电话"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">地址</label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入地址"
              />
            </div>
          </div>
        </div>

        {/* 社交媒体 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            社交媒体
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">微博</label>
              <input
                type="url"
                name="socialLinks.weibo"
                value={settings.socialLinks.weibo || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入微博链接"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">微信</label>
              <input
                type="text"
                name="socialLinks.wechat"
                value={settings.socialLinks.wechat || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入微信公众号"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
              <input
                type="url"
                name="socialLinks.github"
                value={settings.socialLinks.github || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入GitHub链接"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
              <input
                type="url"
                name="socialLinks.twitter"
                value={settings.socialLinks.twitter || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入Twitter链接"
              />
            </div>
          </div>
        </div>

        {/* 首页个性化设置 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-blue-600" />
            首页个性化
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">首页主标题</label>
              <input
                type="text"
                name="heroTitle"
                value={settings.heroTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入首页主标题"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">首页副标题</label>
              <textarea
                name="heroSubtitle"
                value={settings.heroSubtitle}
                onChange={handleChange}
                className="w-full px-4 py-2 h-20 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                placeholder="输入首页副标题"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">背景样式</label>
              <select
                name="heroBackground"
                value={settings.heroBackground}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="gradient-to-br from-blue-50 to-indigo-50">蓝紫渐变</option>
                <option value="gradient-to-br from-green-50 to-emerald-50">绿青渐变</option>
                <option value="gradient-to-br from-pink-50 to-rose-50">粉红渐变</option>
                <option value="gradient-to-br from-yellow-50 to-amber-50">金黄渐变</option>
                <option value="gradient-to-br from-purple-50 to-violet-50">紫罗渐变</option>
                <option value="gradient-to-br from-gray-50 to-slate-50">灰色渐变</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="heroDecor"
                name="heroDecor"
                checked={settings.heroDecor}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="heroDecor" className="text-sm font-medium text-gray-700">
                显示装饰性背景元素
              </label>
            </div>
          </div>
        </div>

        {/* 其他设置 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            其他设置
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">页脚文本</label>
              <input
                type="text"
                name="footerText"
                value={settings.footerText}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入页脚文本"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">分析代码</label>
              <textarea
                name="analyticsCode"
                value={settings.analyticsCode}
                onChange={handleChange}
                className="w-full px-4 py-2 h-32 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                placeholder="输入网站分析代码（如Google Analytics）"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta关键词</label>
              <input
                type="text"
                name="metaKeywords"
                value={settings.metaKeywords}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入网站关键词，用逗号分隔"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta描述</label>
              <input
                type="text"
                name="metaDescription"
                value={settings.metaDescription}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="输入网站Meta描述"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SiteSettingsPage;