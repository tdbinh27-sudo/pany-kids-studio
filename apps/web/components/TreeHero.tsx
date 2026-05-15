'use client';

/**
 * @file components/TreeHero.tsx
 * @description Dark immersive "Tree of Knowledge" hero section for landing pages.
 *
 * Visual:
 *  - Dark navy radial gradient backdrop (matches D-035 canonical aesthetic)
 *  - Background image with graceful fallback chain:
 *    1. /tree-of-knowledge-hero.jpg (anh's canonical Gemini Imagen pick — when saved)
 *    2. /tree-hero-placeholder.svg (CSS-style placeholder shipped in this commit)
 *    3. Pure CSS gradient (final fallback)
 *  - Cyan/electric-blue glow ambient overlay
 *  - Children rendered on top in a max-width container
 *
 * Usage:
 *   <TreeHero>
 *     <HeroGreeting mode="anonymous" />
 *     <h1>Pany Kids Studio</h1>
 *     ...
 *   </TreeHero>
 */

import { useState } from 'react';

type Props = {
  children: React.ReactNode;
  /** Override default min-height (px) */
  minHeight?: number;
  /** Force a specific backdrop image (skip auto-fallback) */
  imageSrc?: string;
  /** Show subtle vignette darkening at edges */
  vignette?: boolean;
};

const CANONICAL_IMAGE = '/tree-of-knowledge-hero.jpg';
const PLACEHOLDER_IMAGE = '/tree-hero-placeholder.svg';

export default function TreeHero({
  children,
  minHeight = 720,
  imageSrc,
  vignette = true,
}: Props) {
  // Fallback chain — start optimistic with canonical, swap to placeholder on error.
  const [activeImage, setActiveImage] = useState(imageSrc ?? CANONICAL_IMAGE);
  const [errored, setErrored] = useState(false);

  return (
    <section
      style={{
        position: 'relative',
        minHeight,
        background: 'radial-gradient(ellipse at center, #0E2542 0%, #0A1628 50%, #03060D 100%)',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* Hidden image probe — triggers fallback if canonical missing */}
      {!errored && activeImage === CANONICAL_IMAGE && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={CANONICAL_IMAGE}
          alt=""
          aria-hidden="true"
          style={{ display: 'none' }}
          onError={() => {
            setActiveImage(PLACEHOLDER_IMAGE);
            setErrored(true);
          }}
        />
      )}

      {/* Backdrop image layer (canonical OR placeholder OR CSS-only if both fail) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${activeImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.85,
          zIndex: 0,
        }}
      />

      {/* Cyan glow ambient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 40%, rgba(79,179,232,0.18) 0%, rgba(10,22,40,0) 60%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Vignette darkening edges */}
      {vignette && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Volumetric god rays */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(79,179,232,0.10) 0%, rgba(79,179,232,0) 60%)',
          mixBlendMode: 'screen',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* Content layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '80px 24px 96px',
          maxWidth: 1200,
          margin: '0 auto',
          minHeight,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#E8F4FB',
        }}
      >
        {children}
      </div>
    </section>
  );
}
