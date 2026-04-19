'use client';

import { useRef, useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import styles from './NameTagHero.module.css';

/**
 * NameTagHero renders a conference-badge / name-tag style composition:
 *
 * - Background: real photo with subtle float animation, radial fade vignette
 * - Foreground: frosted-glass badge card with holographic shimmer
 * - 3D tilt: mouse-tracking perspective rotation via rAF
 * - Decorative: orbital rings, glow pulse, lanyard hole
 *
 * Technique: CSS perspective + JS mouse-tracking for 3D tilt,
 * backdrop-filter for glassmorphism, CSS @keyframes for ambient motion.
 * GPU-accelerated, zero external dependencies.
 */

const BARCODE_HEIGHTS = [14, 20, 10, 18, 8, 22, 12, 16, 24, 10, 18, 14, 20, 8, 16, 22, 12];

export default function NameTagHero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, entered: false });
  const currentRotation = useRef({ x: 0, y: 0, z: 0 });
  const isFlippedRef = useRef(false);

  const barcodeElements = useMemo(
    () =>
      BARCODE_HEIGHTS.map((h, i) => (
        <span
          key={i}
          className={styles.barcodeLine}
          style={{ height: `${h}px` }}
          aria-hidden="true"
        />
      )),
    [],
  );

  // 3D tilt and flip animation loop
  const animateTilt = useCallback(function tick() {
    const card = cardRef.current;
    if (!card) return;

    const { x, y, entered } = mouseRef.current;
    const baseRotateY = isFlippedRef.current ? 180 : 0;
    
    // Simulate organic wind/hanging sway using performance.now()
    const time = performance.now() / 1000;
    
    // Complex overlapping sine waves for a natural, non-mechanical breeze effect
    const windX = entered ? Math.sin(time * 1.2) * 2.5 + Math.sin(time * 0.7) * 1.5 : 0;
    const windY = entered ? Math.cos(time * 0.9) * 3.0 + Math.sin(time * 1.5) * 1.5 : 0;
    const windZ = entered ? Math.sin(time * 0.5) * 2.0 + Math.cos(time * 1.1) * 1.0 : 0;

    // If entered, apply mouse tilt + wind sway + pendulum tilt (z).
    // If not, settle smoothly back to 0 (or 180 if flipped).
    const target = entered 
      ? { 
          x: (y * 12) + windX, 
          y: (x * -12) + baseRotateY + windY,
          z: (x * -5) + windZ // Z-axis adds a natural pendulum twist when moving mouse left/right
        } 
      : { x: 0, y: baseRotateY, z: 0 };

    // Smooth interpolation (lerp)
    currentRotation.current.x += (target.x - currentRotation.current.x) * 0.08;
    currentRotation.current.y += (target.y - currentRotation.current.y) * 0.08;
    currentRotation.current.z += (target.z - currentRotation.current.z) * 0.08;

    const rx = currentRotation.current.x;
    const ry = currentRotation.current.y;
    const rz = currentRotation.current.z;

    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;

    // Keep loop running if hovered (for wind) OR if it hasn't settled yet
    if (
      entered ||
      Math.abs(target.x - rx) > 0.01 ||
      Math.abs(target.y - ry) > 0.01 ||
      Math.abs(target.z - rz) > 0.01
    ) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const scene = sceneRef.current;
      if (!scene) return;

      const rect = scene.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize to -1 … 1
      mouseRef.current.x = (e.clientX - centerX) / (rect.width / 2);
      mouseRef.current.y = (e.clientY - centerY) / (rect.height / 2);
      mouseRef.current.entered = true;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animateTilt);
    },
    [animateTilt],
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.entered = false;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animateTilt);
  }, [animateTilt]);

  const handleFlipClick = useCallback(() => {
    isFlippedRef.current = !isFlippedRef.current;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animateTilt);
  }, [animateTilt]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={sceneRef}
      className={styles.nameTagScene}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleFlipClick}
      title="Click to flip ID card"
    >
      {/* Decorative orbital rings */}
      <div className={styles.orbitalRing} aria-hidden="true" />
      <div className={styles.orbitalRingSecond} aria-hidden="true" />
      <div className={styles.glowPulse} aria-hidden="true" />

      {/* 3D Wrapper */}
      <div className={styles.idCardWrapper} role="button" tabIndex={0} aria-label="Digital ID Badge of Miftahudin Akbar. Click to flip.">
        {/* The rotating inner container */}
        <div ref={cardRef} className={styles.idCardInner}>
          
          {/* ================= FRONT FACE ================= */}
          <div className={styles.cardFront}>
            <Image
              src="/portrait.webp"
              alt="Portrait"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className={styles.idPhoto}
              priority
            />
            <div className={styles.idCardOverlay} aria-hidden="true" />
            <div className={styles.holographicShimmer} aria-hidden="true" />

            <div className={styles.lanyardString} aria-hidden="true">
              <div className={styles.lanyardClip} />
            </div>
            <div className={styles.lanyardHole} aria-hidden="true">
              <div className={styles.lanyardHoleInner} />
            </div>

            <div className={styles.idBottomBar}>
              <span className={styles.statusPulse} title="Active" />
              <div className={styles.barcodeContainer} aria-hidden="true">
                {barcodeElements}
              </div>
              <span className={styles.idNumber}>MFA-2026</span>
            </div>
          </div>

          {/* ================= BACK FACE ================= */}
          <div className={styles.cardBack}>
            <Image
              src="/portrait-illustration.webp"
              alt="Portrait Illustration"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className={styles.idPhoto}
              priority
            />
            <div className={styles.idCardOverlay} aria-hidden="true" />
            <div className={styles.holographicShimmer} aria-hidden="true" />

            {/* Back needs its own lanyard hole rendered so it lines up */}
            <div className={styles.lanyardString} aria-hidden="true">
              <div className={styles.lanyardClip} />
            </div>
            <div className={styles.lanyardHole} aria-hidden="true">
              <div className={styles.lanyardHoleInner} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
