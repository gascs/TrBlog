import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Settings, Menu as MenuIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import AdminLink from './AdminLink';
import { User as UserType } from '../types';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-dark-background/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-dark-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white hover:text-blue-600 colorful:text-gradient transition-colors"
            >
              TrBlog
            </Link>
            <nav className="hidden md:flex items-center ml-12 space-x-8">
              {[
                { name: '首页', path: '/' },
                { name: '分类', path: '/categories' },
                { name: '标签', path: '/tags' }
              ].map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light font-medium transition-all relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary dark:bg-primary-light transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <SearchBar />
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-4">
                <AdminLink user={user} to="/admin" variant="nav" icon={<Settings className="w-4 h-4" />}>
                  管理后台
                </AdminLink>
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-dark-muted rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  退出
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Link
                    to="/login"
                    className="px-6 py-2.5 bg-transparent border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-muted font-medium transition-all hover:shadow-md"
                  >
                    登录
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Link
                    to="/register"
                    className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium transition-all hover:shadow-lg hover:scale-105"
                  >
                    注册
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={() => onToggleSidebar?.()}
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <button
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-dark-background border-t border-gray-100 dark:border-dark-border"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              <div className="mb-6">
                <SearchBar />
              </div>
              <div className="flex justify-end mb-4">
                <ThemeToggle />
              </div>
              <nav className="flex flex-col space-y-3">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2"
                >
                  首页
                </Link>
                <Link
                  to="/categories"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2"
                >
                  分类
                </Link>
                <Link
                  to="/tags"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2"
                >
                  标签
                </Link>
              </nav>

              <div className="border-t border-gray-100 dark:border-dark-border pt-4 space-y-3">
                {user ? (
                  <>
                    <AdminLink 
                      user={user} 
                      to="/admin" 
                      variant="nav" 
                      icon={<Settings className="w-5 h-5" />}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      管理后台
                    </AdminLink>
                    <div className="flex items-center gap-3 py-2">
                      <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{user.username}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium py-2 w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      退出登录
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2"
                    >
                      登录
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 font-medium"
                    >
                      注册
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;