import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'light', icon: Sun, label: '浅色模式' },
    { id: 'system', icon: Monitor, label: '跟随系统' },
    { id: 'dark', icon: Moon, label: '深色模式' },
  ];

  const cycleTheme = () => {
    const currentIndex = themes.findIndex(t => t.id === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].id as 'light' | 'dark' | 'system');
  };

  const currentTheme = themes.find(t => t.id === theme);
  const Icon = currentTheme?.icon || Sun;

  return (
    <button
      onClick={cycleTheme}
      className={`p-2 rounded-lg transition-all duration-300 
        dark:bg-dark-muted dark:hover:bg-dark-border 
        bg-gray-100 hover:bg-gray-200
        focus:outline-none focus:ring-2 focus:ring-primary/50
        ${className}`}
      aria-label="切换主题"
      title={currentTheme?.label}
    >
      <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
    </button>
  );
};

export default ThemeToggle;