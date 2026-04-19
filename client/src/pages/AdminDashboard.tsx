import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Folder, 
  Tag, 
  Users, 
  ArrowRight, 
  BarChart3, 
  Clock, 
  Calendar,
  TrendingUp,
  Globe,
  Activity,
  Monitor,
  Smartphone,
  Tablet,
  MapPin,
  Eye,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

// 模拟访问记录数据
const mockVisitLogs = [
  { id: 1, ip: '192.168.1.101', browser: 'Chrome 124.0', device: 'Desktop', country: '中国', time: '2分钟前' },
  { id: 2, ip: '10.0.0.55', browser: 'Safari 17.4', device: 'Mobile', country: '中国', time: '15分钟前' },
  { id: 3, ip: '172.16.0.88', browser: 'Firefox 125.0', device: 'Tablet', country: '中国', time: '30分钟前' },
  { id: 4, ip: '192.168.1.12', browser: 'Edge 124.0', device: 'Desktop', country: '中国', time: '1小时前' },
  { id: 5, ip: '10.0.0.77', browser: 'Chrome 123.0', device: 'Mobile', country: '中国', time: '2小时前' },
  { id: 6, ip: '192.168.2.33', browser: 'Safari 17.3', device: 'Desktop', country: '中国', time: '3小时前' },
  { id: 7, ip: '172.16.1.44', browser: 'Firefox 124.0', device: 'Desktop', country: '中国', time: '4小时前' },
  { id: 8, ip: '10.0.1.55', browser: 'Chrome 122.0', device: 'Mobile', country: '中国', time: '5小时前' },
];

// 设备类型统计
const deviceStats = [
  { name: '桌面端', value: 65, icon: Monitor, color: 'from-blue-500 to-blue-600' },
  { name: '移动端', value: 25, icon: Smartphone, color: 'from-green-500 to-green-600' },
  { name: '平板', value: 10, icon: Tablet, color: 'from-purple-500 to-purple-600' },
];

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalViews: 12345,
    todayViews: 89,
    totalPosts: 12,
    totalCategories: 5,
    totalTags: 18,
    totalUsers: 3,
  });

  const features = [
    {
      icon: FileText,
      title: '文章管理',
      description: '创建、编辑和删除文章',
      color: 'from-blue-500 to-blue-600',
      path: '/admin/posts'
    },
    {
      icon: Folder,
      title: '分类管理',
      description: '创建和管理文章分类',
      color: 'from-purple-500 to-purple-600',
      path: '/admin/categories'
    },
    {
      icon: Tag,
      title: '标签管理',
      description: '创建和管理文章标签',
      color: 'from-green-500 to-green-600',
      path: '/admin/tags'
    },
    {
      icon: Users,
      title: '用户管理',
      description: '管理用户账号',
      color: 'from-orange-500 to-orange-600',
      path: '/admin/users'
    }
  ];

  const quickStats = [
    { label: '总访问量', value: stats.totalViews.toLocaleString(), icon: Globe, color: 'text-blue-600', bgColor: 'bg-blue-50', trend: '+12%' },
    { label: '今日访问', value: stats.todayViews, icon: Eye, color: 'text-green-600', bgColor: 'bg-green-50', trend: '+8%' },
    { label: '文章数量', value: stats.totalPosts, icon: FileText, color: 'text-purple-600', bgColor: 'bg-purple-50', trend: '+2' },
    { label: '在线用户', value: stats.totalUsers, icon: Users, color: 'text-orange-600', bgColor: 'bg-orange-50', trend: '' },
  ];

  return (
    <div className="space-y-8">
      {/* 欢迎区域 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">欢迎回来，管理员！</h1>
            <p className="text-blue-100 text-lg mb-4">这是您的博客管理仪表板</p>
            <div className="flex items-center gap-2 text-blue-100">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-blue-200">{stats.totalViews.toLocaleString()}</div>
            <div className="text-blue-100">总访问量</div>
          </div>
        </div>
      </motion.div>

      {/* 快速统计卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                {stat.trend && (
                  <div className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </div>
                )}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 快速操作卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-orange-500" />
          快速操作
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 * index }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <Link to={feature.path} className="block">
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                    开始管理
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 设备统计和访问记录 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 设备类型统计 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">设备统计</h3>
            </div>
            <div className="space-y-4">
              {deviceStats.map((device, index) => (
                <motion.div
                  key={device.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 * index }}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${device.color} rounded-lg flex items-center justify-center`}>
                    <device.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900 dark:text-white">{device.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{device.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${device.color} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${device.value}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 访问记录 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">最近访问记录</h3>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {mockVisitLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.65 * index }}
                  className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {log.device === 'Desktop' ? (
                      <Monitor className="w-5 h-5 text-blue-500" />
                    ) : log.device === 'Mobile' ? (
                      <Smartphone className="w-5 h-5 text-green-500" />
                    ) : (
                      <Tablet className="w-5 h-5 text-purple-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white truncate">{log.browser}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{log.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {log.country}
                      </span>
                      <span className="font-mono">{log.ip}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 最近活动 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">最近活动</h3>
          </div>
          <div className="space-y-4">
            {[
              { action: '创建了新文章《React 最佳实践》', time: '10分钟前', user: '管理员' },
              { action: '更新了分类「技术」', time: '1小时前', user: '管理员' },
              { action: '添加了新标签「前端」', time: '2小时前', user: '管理员' },
              { action: '用户「测试用户」注册', time: '5小时前', user: '系统' },
              { action: '文章《欢迎使用 TrBlog》获得 20 次浏览', time: '6小时前', user: '系统' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.75 * index }}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {activity.user.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">{activity.user} {activity.action}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
