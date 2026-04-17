import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Monitor, Palette, Sparkles } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'light', icon: Sun, label: '浅色模式' },
    { id: 'system', icon: Monitor, label: '跟随系统' },
    { id: 'dark', icon: Moon, label: '深色模式' },
    { id: 'colorful', icon: Sparkles, label: '彩色模式' },
  ];

  const currentTheme = themes.find(t => t.id === theme);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg transition-all duration-300 
          dark:bg-dark-muted dark:hover:bg-dark-border 
          bg-gray-100 hover:bg-gray-200
          focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="切换主题"
        title={currentTheme?.label}
      >
        <Palette className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card border border-border dark:border-dark-border rounded-lg shadow-lg py-2 z-50">
          {themes.map((t) => {
            const ThemeIcon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id as 'light' | 'dark' | 'system' | 'colorful');
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-md transition-colors ${theme === t.id 
                  ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <ThemeIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{t.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;