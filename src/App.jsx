import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LenisProvider } from './hooks/useLenis';
import { ThemeProvider } from './hooks/useTheme';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Education } from './sections/Education';
import { CodingProfiles } from './sections/CodingProfiles';
import { Contact } from './sections/Contact';

// Lazy-load the 3D Scene so text and UI paint first without blocking the main bundle
const Scene = lazy(() => import('./three/Scene'));

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [shouldMount3D, setShouldMount3D] = useState(false);

  // Mount 3D Canvas only after initial DOM paint via requestIdleCallback or short timer
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(
        () => setShouldMount3D(true),
        { timeout: 200 }
      );
      return () => window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(() => setShouldMount3D(true), 50);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <ThemeProvider>
      <LenisProvider>
        {/* 1. Creative Landing / Preloader Curtain */}
        <Preloader
          isOpen={showPreloader}
          onClose={() => setShowPreloader(false)}
        />

        {/* 2. Persistent 3D Canvas Background Layer (Transparent, Pointer-events-none) */}
        <div
          id="canvas-root-container"
          className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          {shouldMount3D && (
            <Suspense fallback={null}>
              <Scene isReady={!showPreloader} />
            </Suspense>
          )}
        </div>

        {/* 3. Main Foreground Content Layer */}
        <div className="relative z-10 flex flex-col min-h-screen bg-transparent text-forest">
          <Navbar
            isReady={!showPreloader}
            onOpenPreloader={() => setShowPreloader(true)}
          />

          <main className="flex-grow">
            <Hero isReady={!showPreloader} />
            <About />
            <Skills />
            <Projects />
            <Education />
            <CodingProfiles />
            <Contact />
          </main>
        </div>
      </LenisProvider>
    </ThemeProvider>
  );
}
