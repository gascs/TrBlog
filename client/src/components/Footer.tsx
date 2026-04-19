import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLink from './AdminLink';
import { User as UserType } from '../types';
import { siteConfig } from '../config/site';
import { Mail, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <span className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-semibold shadow-xl">
                {siteConfig.logo}
              </span>
              <span className="text-2xl font-bold text-white">
                {siteConfig.title}
              </span>
            </Link>
            <p className="text-gray-500 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full bg-gray-900 text-gray-400 hover:bg-indigo-900/50 hover:text-indigo-400 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-900 text-gray-400 hover:bg-indigo-900/50 hover:text-indigo-400 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-900 text-gray-400 hover:bg-indigo-900/50 hover:text-indigo-400 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">快速链接</h3>
            <ul className="space-y-4">
              {[
                { name: '首页', path: '/' },
                { name: '分类', path: '/categories' },
                { name: '标签', path: '/tags' }
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">资源</h3>
            <ul className="space-y-4">
              {[
                { name: '隐私政策', path: '/privacy' },
                { name: '开源声明', path: '/open-source' },
                { name: '免责声明', path: '/disclaimer' }
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">联系我们</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-400" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-400 mt-0.5" />
                <span className="text-gray-400">
                  {siteConfig.contact.address}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <p className="text-gray-600 text-sm">
                {siteConfig.footer.copyright}
              </p>
              <AdminLink
                user={user}
                to="/admin"
                variant="footer"
                className="text-gray-600 hover:text-indigo-400 text-sm transition-colors duration-300"
              >
                管理后台
              </AdminLink>
            </div>
            <div className="flex items-center gap-6">
              <a
                href={siteConfig.footer.icpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-400 text-sm transition-colors duration-300"
              >
                {siteConfig.footer.icp}
              </a>
              <a
                href={siteConfig.footer.policeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-400 text-sm transition-colors duration-300"
              >
                {siteConfig.footer.police}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
