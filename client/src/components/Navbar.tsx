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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-6">
            <button
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="打开菜单"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <Link
              to="/"
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white hover:text-blue-600 transition-colors"
            >
              TrBlog
            </Link>
            <nav className="hidden md:flex items-center ml-16 space-x-8">
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
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all relative group px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left" />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <SearchBar />
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-3">
                <AdminLink user={user} to="/admin" variant="nav" icon={<Settings className="w-4 h-4" />}>
                  管理后台
                </AdminLink>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium hidden sm:inline">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">退出</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all hover:shadow-sm"
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all hover:shadow-md"
                  >
                    注册
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
            <div className="relative">
              <button
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="用户菜单"
              >
                <User className="w-6 h-6" />
              </button>
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-50"
                  >
                    <div className="py-2">
                      {user ? (
                        <>
                          <AdminLink 
                            user={user} 
                            to="/admin" 
                            variant="nav" 
                            icon={<Settings className="w-4 h-4" />}
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            管理后台
                          </AdminLink>
                          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-sm font-medium">{user.username}</span>
                            </div>
                          </div>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium py-2 px-4 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                          >
                            <LogOut className="w-4 h-4" />
                            退出登录
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                          >
                            登录
                          </Link>
                          <Link
                            to="/register"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                          >
                            注册
                          </Link>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              <div className="mb-6">
                <SearchBar />
              </div>
              <div className="flex justify-end mb-4">
                <ThemeToggle />
              </div>
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  首页
                </Link>
                <Link
                  to="/categories"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  分类
                </Link>
                <Link
                  to="/tags"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  标签
                </Link>
              </nav>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-3">
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
                    <div className="flex items-center gap-3 py-2 px-4">
                      <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{user.username}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium py-3 px-4 w-full rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
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
                      className="block text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    >
                      登录
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all"
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