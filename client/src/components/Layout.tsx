import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import BackToTop from './BackToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  
  // 判断是否是首页
  const isHomePage = location.pathname === '/';
  const sidebarWidth = 260;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-background">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1 relative">
        {/* Sidebar - Desktop */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            {!isSidebarCollapsed && (
              <motion.div
                initial={{ width: 0, opacity: 0, overflow: 'hidden' }}
                animate={{ width: sidebarWidth, opacity: 1, overflow: 'visible' }}
                exit={{ width: 0, opacity: 0, overflow: 'hidden' }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ width: sidebarWidth }}>
                  <Sidebar />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Collapse/Expand Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="fixed top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-8 h-8 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-dark-muted transition-all"
          style={{ 
            left: isSidebarCollapsed ? '16px' : `${sidebarWidth - 16}px`
          }}
        >
          {isSidebarCollapsed ? (
            <ChevronsRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronsLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          )}
        </button>
        
        {/* Sidebar - Mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <div className="md:hidden fixed inset-0 z-40">
              <div 
                className="fixed inset-0 bg-black/50" 
                onClick={() => setIsSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-dark-background shadow-2xl z-50"
              >
                <Sidebar />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300">
          <div className={`mx-auto ${isHomePage ? 'max-w-6xl' : 'max-w-5xl'}`}>
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
