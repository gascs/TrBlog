import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

type Theme = 'light' | 'dark' | 'system' | 'colorful' | 'ocean' | 'forest' | 'sunset';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors = {
  light: {},
  dark: {},
  system: {},
  colorful: {
    primary: '#8B5CF6',
    secondary: '#EC4899'
  },
  ocean: {
    primary: '#0EA5E9',
    secondary: '#06B6D4'
  },
  forest: {
    primary: '#10B981',
    secondary: '#34D399'
  },
  sunset: {
    primary: '#F59E0B',
    secondary: '#EF4444'
  }
};

// 初始化主题的工具函数
const initializeTheme = (): Theme => {
  const saved = localStorage.getItem('theme');
  if (saved && ['light', 'dark', 'system', 'colorful', 'ocean', 'forest', 'sunset'].includes(saved)) {
    return saved as Theme;
  }
  return 'system';
};

// 初始化是否为暗色模式的工具函数
const initializeIsDark = (): boolean => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') return true;
  if (saved === 'light' || saved === 'colorful' || saved === 'ocean' || saved === 'forest' || saved === 'sunset') return false;
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

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'colorful', 'ocean', 'forest', 'sunset');
    
    if (theme === 'colorful') {
      root.classList.add('colorful');
    } else if (theme === 'ocean') {
      root.classList.add('ocean');
    } else if (theme === 'forest') {
      root.classList.add('forest');
    } else if (theme === 'sunset') {
      root.classList.add('sunset');
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