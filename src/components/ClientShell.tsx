'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import IntroAnimation from '@/components/IntroAnimation';

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });

export default function ClientShell() {
  return (
    <>
      <IntroAnimation />
      <ScrollProgress />
    </>
  );
}

