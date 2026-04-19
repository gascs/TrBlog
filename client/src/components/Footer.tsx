import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, MessageSquare, Mail, MapPin, Phone, Settings, Shield, Globe } from 'lucide-react';
import AdminLink from './AdminLink';
import { User as UserType } from '../types';
import { siteConfig } from '../config/site';

const Footer: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-950 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="text-2xl font-bold text-white mb-4 inline-block group">
              <span className="flex items-center gap-2">
                <span className="inline-block w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                  {siteConfig.logo}
                </span>
                {siteConfig.title}
              </span>
              <span className="block w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full mt-1" />
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              一个基于 React + NestJS 的现代化博客系统，为您提供优雅的写作和阅读体验。分享知识，连接思想，传递价值。
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Github className="w-5 h-5" />, name: 'GitHub', href: siteConfig.social.github },
                { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', href: siteConfig.social.twitter },
                { icon: <MessageSquare className="w-5 h-5" />, name: 'Discord', href: siteConfig.social.discord }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gradient-to-br from-blue-600 to-purple-600 hover:text-white transition-all group backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              快速链接
            </h3>
            <ul className="space-y-3">
              {[
                { name: '首页', path: '/' },
                { name: '分类', path: '/categories' },
                { name: '标签', path: '/tags' },
                { name: '关于我们', path: '/about' }
              ].map((item, index) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link 
                    to={item.path} 
                    className="hover:text-blue-400 transition-colors group flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-all duration-300 group-hover:scale-150" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              技术栈
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'React 18',
                'TypeScript',
                'NestJS',
                'Prisma',
                'PostgreSQL',
                'Tailwind CSS',
                'Framer Motion'
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-3 py-1 bg-gray-800/50 text-gray-400 text-sm rounded-full hover:bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:text-blue-300 transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              联系我们
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>{siteConfig.contact.phone}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800/50 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <p className="text-gray-500 text-sm">
                {siteConfig.footer.copyright}
              </p>
              <AdminLink user={user} to="/admin" variant="footer" icon={<Settings className="w-3 h-3" />}>
                管理后台
              </AdminLink>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex space-x-6">
                <Link to="/privacy" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
                  隐私政策
                </Link>
                <Link to="/open-source" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
                  开源声明
                </Link>
                <Link to="/disclaimer" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
                  免责声明
                </Link>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6 pt-6 border-t border-gray-800/30"
          >
            <a 
              href={siteConfig.footer.icpLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-blue-400 text-sm transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{siteConfig.footer.icp}</span>
            </a>
            <a 
              href={siteConfig.footer.policeLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-blue-400 text-sm transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span>{siteConfig.footer.police}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;