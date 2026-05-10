'use client';

import { useEffect, useRef } from 'react';
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
  priority?: boolean; // If true, uses pure CSS animation (bypasses IntersectionObserver)
}

/**
 * Scroll-reveal animation component.
 * Uses direct DOM style mutation (no setState) to avoid forced reflows
 * from React re-renders during IntersectionObserver callbacks.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 40,
  className = '',
  threshold = 0.1,
  once = true,
  priority = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return `translateY(${distance}px)`;
      case 'down': return `translateY(-${distance}px)`;
      case 'left': return `translateX(${distance}px)`;
      case 'right': return `translateX(-${distance}px)`;
      default: return 'none';
    }
  };

  useEffect(() => {
    // If priority is true, the CSS animation handles everything. We skip JS observer.
    if (priority) return;

    const element = ref.current;
    if (!element) return;

    // Set initial hidden state via DOM (avoids SSR mismatch by only running on client)
    const transition = `opacity ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s`;
    element.style.opacity = '0';
    element.style.transform = getInitialTransform();
    element.style.transition = transition;
    element.style.willChange = 'opacity, transform';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reveal: mutate DOM directly — no React re-render needed
          element.style.opacity = '1';
          element.style.transform = 'translate(0)';
          // Clean up willChange after transition completes to free compositor memory
          element.addEventListener('transitionend', () => {
            element.style.willChange = 'auto';
          }, { once: true });
          if (once) observer.disconnect();
        } else if (!once) {
          element.style.opacity = '0';
          element.style.transform = getInitialTransform();
          element.style.willChange = 'opacity, transform';
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, once, priority]);

  const ssrStyle = priority ? {
    '--reveal-start': getInitialTransform(),
    animation: `heroReveal ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s both`
  } as React.CSSProperties : {
    opacity: 0,
    transform: getInitialTransform()
  } as React.CSSProperties;

  return (
    <div ref={ref} className={`${styles.revealWrapper} ${className}`} style={ssrStyle}>
      {children}
    </div>
  );
}
