import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

type Theme = 'light' | 'dark' | 'system' | 'colorful';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 初始化主题的工具函数
const initializeTheme = (): Theme => {
  const saved = localStorage.getItem('theme');
  if (saved && ['light', 'dark', 'system', 'colorful'].includes(saved)) {
    return saved as Theme;
  }
  return 'system';
};

// 初始化是否为暗色模式的工具函数
const initializeIsDark = (): boolean => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') return true;
  if (saved === 'light' || saved === 'colorful') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 初始化状态
  const [theme, setThemeState] = useState<Theme>(initializeTheme);
  const [isDark, setIsDark] = useState<boolean>(initializeIsDark);

  // 优化setTheme函数
  const setTheme = useMemo(() => {
    return (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem('theme', newTheme);
      
      if (newTheme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(systemPrefersDark);
      } else {
        setIsDark(newTheme === 'dark');
      }
    };
  }, []);

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  // 更新根元素类名
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'colorful');
    
    if (theme === 'colorful') {
      root.classList.add('colorful');
    } else if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
  }, [theme, isDark]);

  // 优化context value
  const contextValue = useMemo(() => {
    return { theme, setTheme, isDark };
  }, [theme, setTheme, isDark]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};