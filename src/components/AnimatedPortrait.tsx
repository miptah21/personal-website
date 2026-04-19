'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './AnimatedPortrait.module.css';

/**
 * AnimatedPortrait renders a layered portrait composition with a liquid
 * distortion reveal effect:
 *
 * - Back layer: line-art illustration with subtle float animation
 * - Front layer: real photo with SVG displacement filter
 * - On hover: liquid distortion ripples through the photo, revealing
 *   the illustration beneath
 *
 * Technique: SVG feTurbulence + feDisplacementMap
 * - feTurbulence generates animated Perlin noise
 * - feDisplacementMap uses that noise to warp pixels
 * - We animate the turbulence seed + scale on hover via rAF
 * - GPU-accelerated, zero external dependencies
 */
export default function AnimatedPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const rafRef = useRef<number>(0);
  const seedRef = useRef(0);
  const scaleRef = useRef({ current: 0, target: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Liquid distortion animation loop
  const animate = useCallback(() => {
    const turbulence = turbulenceRef.current;
    const displacement = displacementRef.current;
    if (!turbulence || !displacement) return;

    // Interpolate scale towards target (smooth easing)
    const scale = scaleRef.current;
    scale.current += (scale.target - scale.current) * 0.08;

    // Animate seed for liquid motion
    seedRef.current += 1;
    turbulence.setAttribute('seed', String(seedRef.current));

    // Update displacement intensity
    displacement.setAttribute('scale', String(Math.round(scale.current)));

    // Keep animating if there's still motion
    if (Math.abs(scale.target - scale.current) > 0.5 || scale.target > 0) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    scaleRef.current.target = 40;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    scaleRef.current.target = 0;
    // Animation loop continues until scale reaches ~0
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.portraitContainer} ${isHovered ? styles.revealed : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => {
        if (isHovered) {
          handleMouseLeave();
        } else {
          handleMouseEnter();
        }
      }}
      role="img"
      aria-label="Portrait of Miftahudin Akbar — hover to reveal illustrated version"
    >
      {/* Hidden SVG filter definitions */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="liquid-distortion" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.012 0.018"
              numOctaves="3"
              seed="0"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Back layer: Animated line-art illustration */}
      <div className={styles.illustrationLayer}>
        <Image
          src="/portrait-illustration.png"
          alt=""
          fill
          sizes="420px"
          className={styles.illustration}
          aria-hidden="true"
        />
      </div>

      {/* Front layer: Real photo with liquid filter */}
      <div
        className={styles.photoLayer}
        style={{ filter: 'url(#liquid-distortion)' }}
      >
        <Image
          src="/portrait.webp"
          alt="Portrait of Miftahudin Akbar"
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className={styles.photo}
          style={{ objectPosition: 'top center' }}
          priority
        />
      </div>

      {/* Decorative animated orbital rings */}
      <div className={styles.orbitalRing} aria-hidden="true" />
      <div className={styles.orbitalRingSecond} aria-hidden="true" />
      <div className={styles.glowPulse} aria-hidden="true" />
    </div>
  );
}
