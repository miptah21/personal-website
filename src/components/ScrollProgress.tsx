'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (progressRef.current) {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = document.documentElement.clientHeight;
            
            const scrollableHeight = docHeight - winHeight;
            let scrollPercent = 0;
            
            if (scrollableHeight > 0) {
                scrollPercent = scrollTop / scrollableHeight;
            }
            
            // Limit to [0, 1] range to avoid overscrolling bugs (e.g. bouncy scroll on macOS/iOS)
            const clampedPercentage = Math.min(Math.max(scrollPercent, 0), 1);
            progressRef.current.style.transform = `scaleX(${clampedPercentage})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Attach passive listener for best scrolling frame rate
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger on resize just in case document height changes
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial trigger
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        backgroundColor: 'var(--secondary)', // Matches Vanguard Editorial's gold flavor
        transformOrigin: '0% 50%',
        transform: 'scaleX(0)',
        willChange: 'transform',
        zIndex: 1000, 
      }} 
      ref={progressRef}
      aria-hidden="true"
    />
  );
}
