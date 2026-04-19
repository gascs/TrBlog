import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import BackToTop from './BackToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // 判断是否是首页
  const isHomePage = location.pathname === '/';
  const sidebarWidth = 260;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1 relative">
        {/* Sidebar - Desktop */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <div className="hidden md:block">
              <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30" 
                onClick={() => setIsSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: -sidebarWidth, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -sidebarWidth, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-2xl z-40 border-r border-gray-200 dark:border-gray-800"
              >
                <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">菜单</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <Sidebar />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        
        {/* Sidebar - Mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <div className="md:hidden fixed inset-0 z-40">
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
                onClick={() => setIsSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-2xl z-50 border-r border-gray-200 dark:border-gray-800"
              >
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">菜单</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <Sidebar />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        
        {/* Main Content */}
        <main className="flex-1 bg-white dark:bg-gray-900 p-4 sm:p-6 lg:p-8 md:p-10 transition-all duration-300">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
