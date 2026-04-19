import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 50, // 加快速度
  delay = 0,
  className = '',
  cursorClassName = 'inline-block w-2 h-6 bg-current ml-1 animate-pulse'
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 随机速度变化，增加打字机的真实感
  const getRandomSpeed = () => {
    return speed + Math.random() * 30 - 15; // 在speed周围±15ms范围内随机
  };

  useEffect(() => {
    if (currentIndex < text.length && !isPaused) {
      const randomSpeed = getRandomSpeed();
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        
        // 随机暂停，增加真实感
        if (Math.random() > 0.95) {
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), 100 + Math.random() * 200);
        }
      }, delay > 0 ? delay : randomSpeed);

      timeoutRef.current = timeout;
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else if (currentIndex >= text.length) {
      setIsDone(true);
    }
  }, [currentIndex, text, speed, delay, isPaused]);

  // 清理函数
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <span className={className}>
      {displayedText}
      {!isDone && (
        <span className={cursorClassName}>|</span>
      )}
    </span>
  );
};

export default Typewriter;
