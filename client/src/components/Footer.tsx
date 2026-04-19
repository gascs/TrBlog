import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <Link to="/" className="text-xl font-bold text-white mb-4 inline-block">
              <span className="flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                  {siteConfig.logo}
                </span>
                {siteConfig.title}
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">快速链接</h3>
            <ul className="space-y-2">
              {[
                { name: '首页', path: '/' },
                { name: '分类', path: '/categories' },
                { name: '标签', path: '/tags' }
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">资源</h3>
            <ul className="space-y-2">
              {[
                { name: '隐私政策', path: '/privacy' },
                { name: '开源声明', path: '/open-source' },
                { name: '免责声明', path: '/disclaimer' }
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">联系我们</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="text-gray-400 text-sm">
                {siteConfig.contact.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <p className="text-gray-500 text-sm">
                {siteConfig.footer.copyright}
              </p>
              <AdminLink
                user={user}
                to="/admin"
                variant="footer"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                管理后台
              </AdminLink>
            </div>
            <div className="flex items-center gap-6">
              <a
                href={siteConfig.footer.icpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {siteConfig.footer.icp}
              </a>
              <a
                href={siteConfig.footer.policeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white text-sm transition-colors"
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
