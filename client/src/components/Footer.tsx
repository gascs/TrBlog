import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Link to="/" className="text-2xl font-bold text-white mb-4 inline-block">
              TrBlog
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              一个基于 React + NestJS 的现代化博客系统，为您提供优雅的写作和阅读体验。分享知识，连接思想。
            </p>
            <div className="flex space-x-4">
              {['GitHub', 'Twitter', 'Discord'].map((social, index) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
                >
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors">
                  分类
                </Link>
              </li>
              <li>
                <Link to="/tags" className="hover:text-white transition-colors">
                  标签
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4">技术栈</h3>
            <ul className="space-y-3 text-gray-400">
              <li>React 18</li>
              <li>NestJS</li>
              <li>PostgreSQL</li>
              <li>Prisma</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TrBlog. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              使用条款
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;