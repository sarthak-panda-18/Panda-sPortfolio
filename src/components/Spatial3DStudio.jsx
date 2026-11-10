import React, { useState, useEffect, useRef } from 'react';
import {
  Layers,
  Orbit,
  Zap,
  Box,
  Aperture,
  Moon,
} from 'lucide-react';
import { interactive3DStore } from '../three/interactiveStore';

/**
 * Spatial3DStudio - Sleek, unexpected interactive controller that allows
 * visitors to directly manipulate 3D shaders, materials, and Zero-G physics in real time.
 */
export function Spatial3DStudio() {
  const [activeMaterial, setActiveMaterial] = useState(interactive3DStore.materialMode);
  const [activeMotion, setActiveMotion] = useState(interactive3DStore.motionMode);
  const [isExploding, setIsExploding] = useState(interactive3DStore.motionMode === 'exploded');
  const explodeTimerRef = useRef(null);

  useEffect(() => {
    const unsub = interactive3DStore.subscribe(() => {
      setActiveMaterial(interactive3DStore.materialMode);
      setActiveMotion(interactive3DStore.motionMode);
      setIsExploding(interactive3DStore.motionMode === 'exploded');
    });
    return () => {
      unsub();
      if (explodeTimerRef.current) clearTimeout(explodeTimerRef.current);
    };
  }, []);

  const handleMaterialChange = (mode) => {
    setActiveMaterial(mode);
    interactive3DStore.setMaterialMode(mode);
  };

  const handleToggleOrbit = () => {
    const nextMotion = activeMotion === 'orbit' ? 'float' : 'orbit';
    setActiveMotion(nextMotion);
    interactive3DStore.setMotionMode(nextMotion);
  };

  const handleExplode = () => {
    if (explodeTimerRef.current) clearTimeout(explodeTimerRef.current);
    setIsExploding(true);
    interactive3DStore.triggerExplode();
    explodeTimerRef.current = setTimeout(() => setIsExploding(false), 2400);
  };

  const materialOptions = [
    { id: 'ceramic', label: 'Ceramic', icon: Box, desc: 'Warm Earth Matte' },
    { id: 'chrome', label: 'Liquid Chrome', icon: Zap, desc: 'Mirror Metal' },
    { id: 'hologram', label: 'Hologram', icon: Aperture, desc: 'Cyber Prism' },
    { id: 'obsidian', label: 'Obsidian', icon: Moon, desc: 'Velvet Glass' },
  ];

  return (
    <div className="bg-surface/85 dark:bg-surface/90 backdrop-blur-xl border border-hairline hover:border-clay/50 rounded-card p-5 sm:p-6 shadow-2xl transition-all duration-300 relative overflow-hidden group">
      {/* Dynamic ambient background glow */}
      <div
        className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none transition-colors duration-700 ${
          activeMaterial === 'chrome'
            ? 'bg-blue-400/15'
            : activeMaterial === 'hologram'
            ? 'bg-purple-500/20'
            : activeMaterial === 'obsidian'
            ? 'bg-emerald-500/10'
            : 'bg-clay/15'
        }`}
      />

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3.5 border-b border-hairline/80">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-clay/10 text-clay flex items-center justify-center">
            <Layers size={15} className="animate-pulse" />
          </span>
          <div>
            <h4 className="font-serif text-base text-forest leading-tight font-medium">
              Spatial 3D Studio
            </h4>
            <p className="text-[10.5px] text-forest-muted font-sans mt-0.5">
              Real-time WebGL Shader &amp; Physics Controller
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-clay font-medium">
          3D Active
        </span>
      </div>

      {/* 1. Shader / Material Switcher */}
      <div className="my-4 space-y-2">
        <span className="text-[10px] uppercase font-sans font-medium tracking-wider text-forest-muted block">
          Select 3D Material Shader
        </span>

        <div className="grid grid-cols-2 gap-2">
          {materialOptions.map((mat) => {
            const isSelected = activeMaterial === mat.id;
            const MatIcon = mat.icon;
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => handleMaterialChange(mat.id)}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-clay text-clay-contrast border-clay shadow-md transform scale-[1.02]'
                    : 'bg-sand/40 dark:bg-sand/15 border-hairline/70 text-forest hover:border-clay/50 hover:bg-sand/70'
                }`}
              >
                <MatIcon size={15} strokeWidth={1.75} className="shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-xs font-medium leading-none line-clamp-1">
                    {mat.label}
                  </div>
                  <div
                    className={`text-[9.5px] leading-tight mt-1 line-clamp-1 ${
                      isSelected ? 'text-clay-contrast/80' : 'text-forest-muted'
                    }`}
                  >
                    {mat.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Physics & Kinematics Control Deck */}
      <div className="pt-3 border-t border-hairline/80 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {/* Zero-G Orbit Toggle */}
          <button
            type="button"
            onClick={handleToggleOrbit}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-medium border transition-all duration-fast cursor-pointer ${
              activeMotion === 'orbit'
                ? 'bg-clay text-clay-contrast border-clay shadow-sm'
                : 'bg-sand/50 dark:bg-sand/20 border-hairline text-forest hover:border-clay'
            }`}
          >
            <Orbit size={13} className={activeMotion === 'orbit' ? 'animate-spin' : ''} />
            <span>{activeMotion === 'orbit' ? 'Orbiting' : 'Zero-G Orbit'}</span>
          </button>

          {/* Explode & Assemble Trigger */}
          <button
            type="button"
            onClick={handleExplode}
            disabled={isExploding}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-sand/50 dark:bg-sand/20 border border-hairline text-forest hover:border-clay hover:text-clay text-xs font-medium transition-all duration-fast active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Zap size={13} className={isExploding ? 'animate-bounce text-clay' : 'text-clay'} />
            <span>{isExploding ? 'Exploding...' : 'Explode 3D'}</span>
          </button>
        </div>

        <span className="text-[10px] font-mono text-forest-muted">
          Click shapes to launch
        </span>
      </div>
    </div>
  );
}
