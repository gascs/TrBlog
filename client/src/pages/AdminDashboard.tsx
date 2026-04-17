import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Folder, Tag, Users, Layout, ArrowRight } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const features = [
    {
      icon: FileText,
      title: '文章管理',
      description: '创建、编辑和删除文章',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Folder,
      title: '分类管理',
      description: '创建和管理文章分类',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Tag,
      title: '标签管理',
      description: '创建和管理文章标签',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: '用户管理',
      description: '管理用户账号',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">后台管理</h1>
            <p className="text-gray-600 text-lg">管理您的博客内容和用户</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-gray-300 hover:shadow-xl transition-all duration-300">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h2>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <button className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    开始管理
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 text-white"
          >
            <div className="flex items-center gap-4 mb-6">
              <Layout className="w-10 h-10" />
              <h3 className="text-3xl font-bold">统计概览</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { label: '文章数量', value: '0' },
                { label: '分类数量', value: '0' },
                { label: '标签数量', value: '0' },
                { label: '用户数量', value: '0' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;