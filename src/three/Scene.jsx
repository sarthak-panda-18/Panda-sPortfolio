import React, { Component, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { LIGHTING, CAMERA } from './constants';
import { HeroCluster } from './HeroCluster';
import { SectionAccents } from './SectionAccents';
import { initMouseTracking } from './mouseStore';
import { updateMaterialsTheme } from './materials';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTheme } from '../hooks/useTheme';

/**
 * Robust Error Boundary for 3D WebGL context.
 * If WebGL is unsupported or throws a runtime context loss, renders null gracefully.
 */
class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[3D Scene] WebGL encountered an issue:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

/**
 * Dev-only performance monitor checking for prolonged low frame rate (<40 FPS).
 */
function PerformanceGuard() {
  const lowFpsDurationRef = useRef(0);
  const hasWarnedRef = useRef(false);

  useFrame((_, delta) => {
    if (process.env.NODE_ENV !== 'development' || hasWarnedRef.current) return;

    // delta > 0.025s equates to < 40 FPS
    if (delta > 0.025) {
      lowFpsDurationRef.current += delta;
      if (lowFpsDurationRef.current > 3.0) {
        console.warn('[3D Scene] Notice: Frame rate dropped below 40 FPS for 3 consecutive seconds.');
        hasWarnedRef.current = true;
      }
    } else {
      lowFpsDurationRef.current = Math.max(0, lowFpsDurationRef.current - delta);
    }
  });

  return null;
}

/**
 * Inner Scene graph with studio lighting, Hero cluster, and Section accents.
 */
function SceneContent({ isReady, isMobile, isLowPower, prefersReducedMotion, isDark }) {
  // Sync 3D materials with theme
  useEffect(() => {
    updateMaterialsTheme(isDark);
  }, [isDark]);

  return (
    <>
      {/* Matte Studio Lighting */}
      <ambientLight
        color={isDark ? '#4B5A50' : LIGHTING.ambientColor}
        intensity={isDark ? 0.95 : LIGHTING.ambientIntensity}
      />
      <directionalLight
        color={isDark ? '#FFEEDB' : LIGHTING.directionalColor}
        intensity={isDark ? 1.2 : LIGHTING.directionalIntensity}
        position={LIGHTING.directionalPosition}
      />

      {/* Hero Still Life Arrangement */}
      <HeroCluster
        isReady={isReady}
        isMobile={isMobile}
        isLowPower={isLowPower}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* Section Peripheral Accents */}
      <SectionAccents
        isMobile={isMobile}
        isLowPower={isLowPower}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* Development Performance Diagnostics */}
      <PerformanceGuard />
    </>
  );
}

/**
 * Scene Canvas Wrapper.
 * Clamps DPR, pauses when tab is hidden, respects reduced motion, and attaches mouse tracking.
 */
export default function Scene({ isReady = true }) {
  const { prefersReducedMotion, isMobile, isLowPower } = useReducedMotion();
  const { isDark } = useTheme();
  const [isTabHidden, setIsTabHidden] = useState(false);

  useEffect(() => {
    initMouseTracking();

    const handleVisibilityChange = () => {
      setIsTabHidden(document.visibilityState === 'hidden');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Frameloop strategy:
  // - prefersReducedMotion -> 'demand' (renders single frame)
  // - tab is hidden -> 'never' (pauses GPU completely)
  // - active -> 'always'
  const frameloop = prefersReducedMotion
    ? 'demand'
    : isTabHidden
    ? 'never'
    : 'always';

  return (
    <SceneErrorBoundary>
      <div className="w-full h-full pointer-events-none select-none">
        <Canvas
          camera={{
            fov: CAMERA.fov,
            position: CAMERA.position,
            near: CAMERA.near,
            far: CAMERA.far,
          }}
          dpr={isMobile || isLowPower ? 1 : [1, 1.5]}
          gl={{
            alpha: true,
            antialias: !isMobile && !isLowPower,
            powerPreference: 'high-performance',
          }}
          frameloop={frameloop}
        >
          <SceneContent
            isReady={isReady}
            isMobile={isMobile}
            isLowPower={isLowPower}
            prefersReducedMotion={prefersReducedMotion}
            isDark={isDark}
          />
        </Canvas>
      </div>
    </SceneErrorBoundary>
  );
}
