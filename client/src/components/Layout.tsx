import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import BackToTop from './BackToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-background">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
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
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
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
