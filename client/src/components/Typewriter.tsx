import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
  typeVariations?: boolean;
  backspaceEffect?: boolean;
  wordDelay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 40, // 调整速度，使其更流畅
  delay = 0,
  className = '',
  cursorClassName = 'inline-block w-2 h-6 bg-current ml-1 animate-pulse',
  showCursor = true,
  typeVariations = true,
  backspaceEffect = false,
  wordDelay = 150
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBackspacing, setIsBackspacing] = useState(false);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const backspaceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 随机速度变化，增加打字机的真实感
  const getRandomSpeed = useCallback(() => {
    if (!typeVariations) return speed;
    // 更自然的速度变化，不同字符类型有不同速度
    const char = text[currentIndex];
    if (char === ' ' || char === '.' || char === ',' || char === '!' || char === '?') {
      return speed * 1.5; // 标点符号和空格稍慢
    } else if (char === '\n' || char === '\n') {
      return speed * 2; // 换行更慢
    } else {
      return speed + Math.random() * 15 - 7.5; // 普通字符随机速度，范围更小
    }
  }, [typeVariations, speed, text, currentIndex]);

  // 检查是否是单词结尾
  const isWordEnd = useCallback((index: number) => {
    if (index >= text.length - 1) return false;
    const nextChar = text[index + 1];
    return nextChar === ' ' || nextChar === '.' || nextChar === ',' || nextChar === '!' || nextChar === '?';
  }, [text]);

  useEffect(() => {
    // 开始延迟
    if (!hasStarted && delay > 0) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    if (!hasStarted) return;

    if (isBackspacing) {
      if (backspaceCount > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
          setBackspaceCount(prev => prev - 1);
        }, speed * 0.4); // 退格速度更快
        backspaceTimeoutRef.current = timeout;
        return () => {
          if (backspaceTimeoutRef.current) {
            clearTimeout(backspaceTimeoutRef.current);
          }
        };
      } else {
        setIsBackspacing(false);
      }
    } else if (currentIndex < text.length && !isPaused) {
      const randomSpeed = getRandomSpeed();
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        
        // 单词结束时的短暂暂停
        if (isWordEnd(currentIndex)) {
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), wordDelay);
        }
        
        // 随机暂停，增加真实感但减少频率
        else if (typeVariations && Math.random() > 0.98) {
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), 80 + Math.random() * 100); // 更短的暂停
        }
        
        // 随机退格效果，减少频率以避免卡顿
        else if (backspaceEffect && typeVariations && Math.random() > 0.99 && currentIndex > 10) {
          setIsBackspacing(true);
          setBackspaceCount(Math.floor(Math.random() * 2) + 1); // 退格1-2个字符，减少退格次数
        }
      }, randomSpeed);

      timeoutRef.current = timeout;
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else if (currentIndex >= text.length) {
      setIsDone(true);
    }
  }, [currentIndex, text, speed, delay, isPaused, isBackspacing, backspaceCount, hasStarted, typeVariations, backspaceEffect, wordDelay, getRandomSpeed, isWordEnd]);

  // 清理函数
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (backspaceTimeoutRef.current) {
        clearTimeout(backspaceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isDone && (
        <span className={cursorClassName}>|</span>
      )}
    </span>
  );
};

export default Typewriter;
