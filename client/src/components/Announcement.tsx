import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone, Bell } from 'lucide-react';

interface AnnouncementProps {
  content?: string;
  type?: 'info' | 'warning' | 'success' | 'error';
  show?: boolean;
}

const Announcement: React.FC<AnnouncementProps> = ({ 
  content = '🎉 欢迎来到 TrBlog！分享知识，连接思想！', 
  type = 'info',
  show = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const hasDismissed = localStorage.getItem('announcement-dismissed');
    if (!hasDismissed && show) {
      setIsVisible(true);
    }
  }, [show]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('announcement-dismissed', Date.now().toString());
  };

  const typeStyles = {
    info: 'bg-gradient-to-r from-blue-600 to-blue-700',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-500',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600',
    error: 'bg-gradient-to-r from-red-600 to-rose-600'
  };

  const typeIcons = {
    info: Megaphone,
    warning: Bell,
    success: Bell,
    error: Bell
  };

  const Icon = typeIcons[type];

  if (isDismissed || !show) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden"
        >
          <div className={`${typeStyles[type]} text-white shadow-lg`}>
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <p className="text-sm md:text-base font-medium text-center">
                  {content}
                </p>
                <button
                  onClick={handleDismiss}
                  className="ml-2 p-1.5 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  aria-label="关闭公告"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Announcement;
