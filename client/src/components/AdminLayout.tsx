import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Folder, 
  Tag, 
  Users, 
  Menu, 
  X,
  LogOut,
  User,
  Eye,
  Settings,
  Database,
  Palette,
  ArrowRight
} from 'lucide-react';
import BackToTop from './BackToTop';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: '仪表板', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { path: '/admin/posts', icon: FileText, label: '文章管理', color: 'text-green-600', bgColor: 'bg-green-50' },
    { path: '/admin/categories', icon: Folder, label: '分类管理', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { path: '/admin/tags', icon: Tag, label: '标签管理', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { path: '/admin/users', icon: Users, label: '用户管理', color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
    { path: '/admin/settings', icon: Settings, label: '网站管理', color: 'text-pink-600', bgColor: 'bg-pink-50' },
    { path: '/admin/migration', icon: Database, label: '博客迁移', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex">
      {/* 侧边栏 - 大屏幕版本 */}
      <aside className="hidden lg:flex flex-col w-72 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <div className="h-20 flex items-center justify-between px-8 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <Link to="/admin" className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TrBlog Admin
              </Link>
              <p className="text-xs text-slate-500 dark:text-slate-400">内容管理系统</p>
            </div>
          </div>
        </div>

        <nav className="p-6 space-y-2 overflow-y-auto flex-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ x: 4 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? `${item.bgColor} ${item.color} font-semibold shadow-md shadow-blue-100/50 dark:shadow-blue-900/10` 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-white dark:bg-slate-700 shadow-sm' : 'group-hover:bg-white/50 dark:group-hover:bg-slate-600/50'}`}>
                    <item.icon className={`w-5 h-5 ${isActive ? item.color : ''}`} />
                  </div>
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 space-y-2 shrink-0">
          <Link
            to="/"
            className="flex items-center gap-4 px-5 py-3.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg group-hover:bg-white/50 dark:group-hover:bg-slate-600/50 transition-colors">
              <ArrowRight className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
            </div>
            <span className="font-medium">返回前台</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-5 py-3.5 w-full text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg group-hover:bg-white/50 dark:group-hover:bg-slate-600/50 transition-colors">
              <LogOut className="w-5 h-5 group-hover:text-red-500 transition-colors" />
            </div>
            <span className="font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      {/* 侧边栏 - 小屏幕版本 */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 shadow-2xl flex flex-col"
            >
              <div className="h-20 flex items-center justify-between px-8 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <Link to="/admin" className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      TrBlog Admin
                    </Link>
                    <p className="text-xs text-slate-500 dark:text-slate-400">内容管理系统</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="p-6 space-y-2 overflow-y-auto flex-1">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      whileHover={{ x: 4 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group ${
                          isActive 
                            ? `${item.bgColor} ${item.color} font-semibold shadow-md shadow-blue-100/50 dark:shadow-blue-900/10` 
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-white dark:bg-slate-700 shadow-sm' : 'group-hover:bg-white/50 dark:group-hover:bg-slate-600/50'}`}>
                          <item.icon className={`w-5 h-5 ${isActive ? item.color : ''}`} />
                        </div>
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="p-6 border-t border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 space-y-2 shrink-0">
                <Link
                  to="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-4 px-5 py-3.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg group-hover:bg-white/50 dark:group-hover:bg-slate-600/50 transition-colors">
                    <ArrowRight className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <span className="font-medium">返回前台</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setSidebarOpen(false);
                  }}
                  className="flex items-center gap-4 px-5 py-3.5 w-full text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg group-hover:bg-white/50 dark:group-hover:bg-slate-600/50 transition-colors">
                    <LogOut className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                  </div>
                  <span className="font-medium">退出登录</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航 */}
        <header className="h-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden lg:block">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">内容管理系统</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">高效管理您的博客内容</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.open('/', '_blank')}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-300 group"
              title="前台预览"
            >
              <Eye className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
              <span className="hidden sm:inline font-medium">前台预览</span>
            </button>
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-700">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
                <User className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">管理员</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">超级管理员</p>
              </div>
            </div>
          </div>
        </header>

        {/* 主要内容 */}
        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </main>
        <BackToTop />
      </div>
    </div>
  );
};

export default AdminLayout;