import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Settings, Menu as MenuIcon, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import AdminLink from './AdminLink';
import { User as UserType } from '../types';
import { siteConfig } from '../config/site';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  onCloseSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen, onCloseSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-800/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="group text-2xl md:text-3xl font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-all flex items-center gap-2"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm font-semibold shadow-lg"
              >
                {siteConfig.logo}
              </motion.div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {siteConfig.title}
              </span>
            </Link>
            <nav className="hidden md:flex items-center ml-16 space-x-2">
              {[
                { name: '首页', path: '/' },
                { name: '分类', path: '/categories' },
                { name: '标签', path: '/tags' }
              ].map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={item.path}
                    className={`relative px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                      isActive(item.path)
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive(item.path) && (
                      <motion.span
                        layoutId="active-nav"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <SearchBar />
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-2 ml-2">
                <AdminLink 
                  user={user} 
                  to="/admin" 
                  variant="nav" 
                  icon={<Settings className="w-4 h-4" />}
                  className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:shadow-md"
                >
                  管理后台
                </AdminLink>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:shadow-md transition-all cursor-pointer border border-gray-200/50 dark:border-gray-700/50">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium hidden sm:inline">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 hover:shadow-md"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">退出</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link
                    to="/login"
                    className="px-5 py-2.5 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all duration-300 hover:shadow-md"
                  >
                    登录
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link
                    to="/register"
                    className="px-5 py-2.5 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
                  >
                    注册
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="p-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              <div className="mb-4">
                <SearchBar />
              </div>
              <nav className="flex flex-col space-y-2">
                {[
                  { name: '首页', path: '/' },
                  { name: '分类', path: '/categories' },
                  { name: '标签', path: '/tags' }
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 py-3 px-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{user.username}</span>
                    </div>
                    <AdminLink 
                      user={user} 
                      to="/admin" 
                      variant="nav" 
                      icon={<Settings className="w-5 h-5" />}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      管理后台
                    </AdminLink>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium py-3 px-4 w-full rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
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
                      className="block text-lg text-center px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all duration-300"
                    >
                      登录
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-center px-6 py-3 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-300 hover:shadow-lg"
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