'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ScrollReveal.module.css';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // Delay in seconds
  duration?: number; // Duration in seconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'; // Initial offset direction
  distance?: number; // Distance in pixels
  className?: string;
  threshold?: number; // 0 to 1
  once?: boolean; // Whether it triggers only once
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 40,
  className = '',
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before it hits the bottom
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  // Kalkulasi gaya awal (sebelum terlihat)
  const getTransform = () => {
    if (direction === 'up') return `translateY(${distance}px)`;
    if (direction === 'down') return `translateY(-${distance}px)`;
    if (direction === 'left') return `translateX(${distance}px)`;
    if (direction === 'right') return `translateX(-${distance}px)`;
    return 'translate(0)';
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate(0)' : getTransform(),
    transition: `opacity ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s`,
    willChange: 'opacity, transform',
  };

  return (
    <div ref={ref} style={style} className={`${styles.revealWrapper} ${className}`}>
      {children}
    </div>
  );
}
