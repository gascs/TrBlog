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
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {siteConfig.footer.copyright}
            </p>
            <AdminLink
              user={user}
              to="/admin"
              variant="footer"
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
            >
              管理后台
            </AdminLink>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={siteConfig.footer.icpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
            >
              {siteConfig.footer.icp}
            </a>
            <a
              href={siteConfig.footer.policeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
            >
              {siteConfig.footer.police}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;