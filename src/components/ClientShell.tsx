'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });
const IntroAnimation = dynamic(() => import('@/components/IntroAnimation'), { ssr: false });

export default function ClientShell() {
  // Load Material Symbols font asynchronously (non-render-blocking)
  // for CMS-driven icon names not in the inline SVG map
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <IntroAnimation />
      <ScrollProgress />
    </>
  );
}
