import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 - 页面未找到</title>
        <meta name="description" content="抱歉，您访问的页面不存在。" />
      </Helmet>
      
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* 404 数字动画 */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="text-[120px] md:text-[160px] font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-none">
                404
              </div>
              {/* 装饰元素 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-8 -right-8 text-blue-400/30"
              >
                <div className="w-16 h-16 border-4 border-current rounded-full" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-4 -left-12 text-purple-400/30"
              >
                <div className="w-12 h-12 border-3 border-current rounded-full" />
              </motion.div>
            </div>
          </motion.div>

          {/* 标题和描述 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              页面未找到
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              抱歉，您访问的页面不存在或已被移除。请检查URL是否正确，或返回首页继续浏览。
            </p>
          </motion.div>

          {/* 操作按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              返回首页
            </Link>
            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-md"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              返回上一页
            </button>
          </motion.div>

          {/* 搜索提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
          >
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              或者尝试搜索您想找的内容：
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <Search className="w-5 h-5" />
              搜索内容
            </Link>
          </motion.div>

          {/* 有趣的装饰元素 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 flex items-center justify-center gap-2 text-gray-400 dark:text-gray-600"
          >
            {['🛸', '✨', '🚀'].map((emoji, index) => (
              <motion.span
                key={index}
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 2, 
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatDelay: index * 0.3
                }}
                className="text-2xl"
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
