import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Folder, Tag, Users, ArrowRight, BarChart3, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">后台管理</h1>
            <p className="text-gray-600 dark:text-gray-400">管理您的博客内容和用户</p>
          </div>

          {/* 快速操作卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                    <div className="flex items-center gap-2 text-primary dark:text-primary-light font-medium group-hover:translate-x-1 transition-transform">
                      开始管理
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* 统计概览 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary dark:text-primary-light" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">统计概览</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: '文章数量', value: '0', icon: FileText },
                  { label: '分类数量', value: '0', icon: Folder },
                  { label: '标签数量', value: '0', icon: Tag },
                  { label: '用户数量', value: '0', icon: Users }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary dark:text-primary-light" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 最近活动 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary dark:text-primary-light" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">最近活动</h3>
              </div>
              <div className="space-y-4">
                {[
                  { action: '创建了新文章', time: '10分钟前', user: '管理员' },
                  { action: '更新了分类', time: '1小时前', user: '管理员' },
                  { action: '添加了新标签', time: '2小时前', user: '管理员' },
                  { action: '用户注册', time: '5小时前', user: '新用户' }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
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
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;