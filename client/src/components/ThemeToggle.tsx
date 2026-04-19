import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Monitor, Palette, Sparkles, Waves, Trees, Sunset, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themes = [
    { id: 'light', icon: Sun, label: '浅色模式', color: 'bg-yellow-500' },
    { id: 'system', icon: Monitor, label: '跟随系统', color: 'bg-gray-500' },
    { id: 'dark', icon: Moon, label: '深色模式', color: 'bg-slate-700' },
    { id: 'colorful', icon: Sparkles, label: '彩虹模式', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'ocean', icon: Waves, label: '海洋模式', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'forest', icon: Trees, label: '森林模式', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { id: 'sunset', icon: Sunset, label: '日落模式', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
  ];

  const currentTheme = themes.find(t => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl transition-all duration-300 
          bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-105 shadow-sm hover:shadow-md"
        aria-label="切换主题"
        title={currentTheme?.label}
      >
        <Palette className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl py-2 z-50 overflow-hidden"
          >
            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-1">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                选择主题
              </p>
            </div>
            <div className="px-2">
              {themes.map((t) => {
                const ThemeIcon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id as any);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-all duration-200 group ${
                      theme === t.id 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.color} text-white shadow-sm`}>
                      <ThemeIcon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium flex-1">{t.label}</span>
                    {theme === t.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-blue-500 dark:text-blue-400"
                      >
                        <Check className="w-4 h-4" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;