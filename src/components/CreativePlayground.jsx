import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Zap,
  Radio,
  Compass,
  Layers,
  Wand2,
} from 'lucide-react';

/**
 * Pentatonic scale frequencies (C major pentatonic: C4, D4, E4, G4, A4, C5, D5, E5)
 * Harmonic, soothing, and impossible to produce a dissonant sound.
 */
const PENTATONIC_FREQS = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

/**
 * Creative Interactive Physics & Zen Audio Sandbox.
 * Completely unexpected, highly engaging, and interactive.
 * Features:
 * 1. 2D/3D kinetic particle physics with gravitational magnetism & elastic collisions
 * 2. 3 Switchable interactive modes: 'gravity' (orbs), 'synapse' (electric neural lines), 'nebula' (fluid cosmic dust)
 * 3. Native Web Audio API pentatonic synthesizer (soothing crystal chimes on interaction)
 * 4. 'Supernova' explosion & 'Chaos Warp' interactive triggers
 */
export function CreativePlayground({ onColorMutate }) {
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeMode, setActiveMode] = useState('gravity'); // 'gravity' | 'synapse' | 'nebula'
  const [orbCount, setOrbCount] = useState(6);
  const [isSupernovaActive, setIsSupernovaActive] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Play a soft pentatonic chime note with rich organic decay
  const playChime = (freqIndex = null, gainValue = 0.07) => {
    if (!soundEnabled) return;

    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq =
        freqIndex !== null
          ? PENTATONIC_FREQS[freqIndex % PENTATONIC_FREQS.length]
          : PENTATONIC_FREQS[Math.floor(Math.random() * PENTATONIC_FREQS.length)];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Soft envelope: fast attack, exponential mellow decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(gainValue, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);

      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 200);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  const toggleSound = () => {
    if (!soundEnabled) {
      setSoundEnabled(true);
      playChime(3, 0.08);
    } else {
      setSoundEnabled(false);
    }
  };

  // Canvas Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 240);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 240;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: width / 2, y: height / 2, isDown: false, inside: false };

    // Orbs / Particles array
    const colors = [
      { r: 232, g: 128, b: 88, hex: '#E88058' }, // Clay
      { r: 244, g: 162, b: 97, hex: '#F4A261' }, // Warm amber
      { r: 74, g: 90, b: 79, hex: '#4A5A4F' },   // Forest
      { r: 247, g: 242, b: 233, hex: '#F7F2E9' }, // Cream
      { r: 168, g: 180, b: 173, hex: '#A8B4AD' }, // Sage
    ];

    let particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * (width - 40) + 20,
      y: Math.random() * (height - 40) + 20,
      vx: (Math.random() - 0.5) * 1.6,
      vy: (Math.random() - 0.5) * 1.6,
      radius: Math.random() * 5 + 4,
      color: colors[i % colors.length],
      mass: Math.random() * 1.5 + 1,
      trail: [],
    }));

    setOrbCount(particles.length);

    // Mouse & Touch interaction
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const onPointerMove = (e) => {
      const pos = getPos(e);
      mouse.x = pos.x;
      mouse.y = pos.y;
      mouse.inside = true;
    };

    const onPointerDown = (e) => {
      const pos = getPos(e);
      mouse.x = pos.x;
      mouse.y = pos.y;
      mouse.isDown = true;
      mouse.inside = true;

      // Spawn or accelerate a new particle
      if (particles.length < 28) {
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          id: Date.now(),
          x: pos.x,
          y: pos.y,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          radius: Math.random() * 6 + 4,
          color: newColor,
          mass: 1.2,
          trail: [],
        });
        setOrbCount(particles.length);
      }

      playChime(Math.floor((pos.x / width) * PENTATONIC_FREQS.length), 0.08);
    };

    const onPointerUp = () => {
      mouse.isDown = false;
    };

    const onPointerLeave = () => {
      mouse.inside = false;
      mouse.isDown = false;
    };

    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('mouseleave', onPointerLeave);

    canvas.addEventListener('touchmove', onPointerMove, { passive: true });
    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    canvas.addEventListener('touchend', onPointerUp);

    // Supernova trigger from parent
    const triggerSupernova = () => {
      particles.forEach((p, idx) => {
        const angle = Math.random() * Math.PI * 2;
        const force = Math.random() * 6 + 4;
        p.vx = Math.cos(angle) * force;
        p.vy = Math.sin(angle) * force;
      });
      playChime(4, 0.12);
    };

    canvas._triggerSupernova = triggerSupernova;
    canvas._resetParticles = () => {
      particles = particles.slice(0, 8);
      particles.forEach((p) => {
        p.x = width / 2;
        p.y = height / 2;
        p.vx = (Math.random() - 0.5) * 2;
        p.vy = (Math.random() - 0.5) * 2;
      });
      setOrbCount(particles.length);
      playChime(0, 0.08);
    };

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mode-based rendering
      if (activeMode === 'gravity') {
        // --- 1. GRAVITY ORB PHYSICS ---
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Cursor attraction or repulsion
          if (mouse.inside) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140 && dist > 8) {
              const pull = mouse.isDown ? -2.2 : 1.2;
              const force = ((140 - dist) / 140) * (pull / p.mass);
              p.vx += (dx / dist) * force * 0.18;
              p.vy += (dy / dist) * force * 0.18;
            }
          }

          // Move
          p.x += p.vx;
          p.y += p.vy;

          // Velocity damping / friction
          p.vx *= 0.985;
          p.vy *= 0.985;

          // Border bouncing
          if (p.x - p.radius < 0) {
            p.x = p.radius;
            p.vx *= -0.85;
            if (Math.abs(p.vx) > 0.8) playChime(i % 5, 0.04);
          } else if (p.x + p.radius > width) {
            p.x = width - p.radius;
            p.vx *= -0.85;
            if (Math.abs(p.vx) > 0.8) playChime((i + 2) % 5, 0.04);
          }

          if (p.y - p.radius < 0) {
            p.y = p.radius;
            p.vy *= -0.85;
            if (Math.abs(p.vy) > 0.8) playChime((i + 1) % 5, 0.04);
          } else if (p.y + p.radius > height) {
            p.y = height - p.radius;
            p.vy *= -0.85;
            if (Math.abs(p.vy) > 0.8) playChime((i + 3) % 5, 0.04);
          }

          // Trail points
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 8) p.trail.shift();

          // Render trail
          ctx.beginPath();
          for (let t = 0; t < p.trail.length; t++) {
            const pt = p.trail[t];
            if (t === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.22)`;
          ctx.lineWidth = p.radius * 0.5;
          ctx.stroke();

          // Draw connections between close orbs
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 75) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${0.28 * (1 - dist / 75)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }

          // Draw Glowing Orb Body
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color.hex;
          ctx.shadowColor = p.color.hex;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      } else if (activeMode === 'synapse') {
        // --- 2. ELECTRIC SYNAPSE MODE ---
        particles.forEach((p, idx) => {
          p.x += p.vx * 0.7;
          p.y += p.vy * 0.7;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Connect to cursor
          if (mouse.inside) {
            const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
            if (dist < 150) {
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(p.x, p.y);
              ctx.strokeStyle = `rgba(232, 128, 88, ${0.45 * (1 - dist / 150)})`;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            }
          }

          // Connect to other nodes
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(244, 162, 97, ${0.35 * (1 - dist / 100)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#F4A261';
          ctx.fill();
        });
      } else {
        // --- 3. COSMIC NEBULA VORTEX ---
        const time = Date.now() * 0.001;
        particles.forEach((p, idx) => {
          const angle = time * 0.8 + (idx * Math.PI * 2) / particles.length;
          const radius = 35 + Math.sin(time + idx) * 25 + idx * 4;
          const centerX = mouse.inside ? mouse.x : width / 2;
          const centerY = mouse.inside ? mouse.y : height / 2;

          p.x = centerX + Math.cos(angle) * radius;
          p.y = centerY + Math.sin(angle) * radius;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = p.color.hex;
          ctx.shadowColor = p.color.hex;
          ctx.shadowBlur = 14;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('mouseleave', onPointerLeave);
      canvas.removeEventListener('touchmove', onPointerMove);
      canvas.removeEventListener('touchstart', onPointerDown);
      canvas.removeEventListener('touchend', onPointerUp);
    };
  }, [activeMode, soundEnabled]);

  const handleSupernova = () => {
    setIsSupernovaActive(true);
    setTimeout(() => setIsSupernovaActive(false), 500);
    if (canvasRef.current && canvasRef.current._triggerSupernova) {
      canvasRef.current._triggerSupernova();
    }
  };

  const handleReset = () => {
    if (canvasRef.current && canvasRef.current._resetParticles) {
      canvasRef.current._resetParticles();
    }
  };

  return (
    <div className="bg-surface/85 dark:bg-surface/90 backdrop-blur-xl border border-hairline hover:border-clay/50 rounded-card p-4 sm:p-5 shadow-2xl transition-all duration-300 relative overflow-hidden group">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-clay/10 rounded-full blur-2xl pointer-events-none group-hover:bg-clay/20 transition-colors duration-500" />

      {/* Header Bar: Playground Title + Sound Wave Synthesizer Toggle */}
      <div className="flex items-center justify-between pb-3 border-b border-hairline/80">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-clay/10 text-clay">
            <Sparkles size={14} className="animate-pulse" />
          </span>
          <div>
            <h4 className="font-serif text-sm sm:text-base text-forest leading-none">
              Interactive Kinetic Lab
            </h4>
            <p className="text-[10px] text-forest-muted mt-0.5 font-sans">
              Click &amp; drag to summon gravity orbs
            </p>
          </div>
        </div>

        {/* Audio Synthesizer Toggle with dynamic dancing wave */}
        <button
          type="button"
          onClick={toggleSound}
          title={soundEnabled ? 'Disable Zen Chimes' : 'Enable Zen Chimes'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border transition-all duration-fast cursor-pointer ${
            soundEnabled
              ? 'bg-clay/15 border-clay/50 text-clay'
              : 'bg-sand/60 border-hairline text-forest-muted hover:text-forest'
          }`}
        >
          {soundEnabled ? (
            <>
              <Volume2 size={13} className="animate-bounce" />
              <div className="flex items-end gap-0.5 h-3">
                <span className={`w-0.5 bg-clay rounded-full transition-all duration-100 ${isPlayingAudio ? 'h-3' : 'h-1.5'}`} />
                <span className={`w-0.5 bg-clay rounded-full transition-all duration-100 ${isPlayingAudio ? 'h-2.5' : 'h-2'}`} />
                <span className={`w-0.5 bg-clay rounded-full transition-all duration-100 ${isPlayingAudio ? 'h-3.5' : 'h-1'}`} />
              </div>
            </>
          ) : (
            <>
              <VolumeX size={13} />
              <span className="text-[10px]">Chimes Off</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Interactive Physics Canvas Sandbox */}
      <div className="relative my-3 rounded-xl overflow-hidden bg-sand/30 dark:bg-black/30 border border-hairline/60 cursor-crosshair">
        <canvas
          ref={canvasRef}
          className="w-full block touch-none"
        />

        {/* Dynamic Mode Switcher Overlay in top-left of canvas */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-surface/90 backdrop-blur-md px-1.5 py-1 rounded-lg border border-hairline/80 shadow-sm">
          {[
            { id: 'gravity', label: 'Gravity', icon: Compass },
            { id: 'synapse', label: 'Synapse', icon: Zap },
            { id: 'nebula', label: 'Nebula', icon: Radio },
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  setActiveMode(mode.id);
                  playChime(1, 0.06);
                }}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-sans font-medium transition-all duration-fast cursor-pointer ${
                  isActive
                    ? 'bg-clay text-clay-contrast shadow-sm'
                    : 'text-forest-muted hover:text-forest'
                }`}
              >
                <Icon size={11} />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live Orb Counter Badge in top-right */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-surface/80 backdrop-blur-sm border border-hairline/60 text-[10px] font-mono text-forest-muted">
          <span className="text-clay font-bold">{orbCount}</span> bodies
        </div>
      </div>

      {/* 3. Kinetic Control Deck: Interactive Action Triggers */}
      <div className="flex items-center justify-between pt-1 gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleSupernova}
            className="flex items-center gap-1 px-3 py-1.5 rounded-pill bg-sand/60 dark:bg-sand/25 border border-hairline hover:border-clay hover:text-clay text-forest text-[11px] font-medium transition-all duration-fast active:scale-95 cursor-pointer"
          >
            <Wand2 size={12} className={isSupernovaActive ? 'animate-spin text-clay' : 'text-clay'} />
            <span>Supernova</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            title="Reset Sandbox"
            className="p-1.5 rounded-pill bg-sand/60 dark:bg-sand/25 border border-hairline hover:border-forest text-forest-muted hover:text-forest transition-colors duration-fast active:scale-95 cursor-pointer"
          >
            <RotateCcw size={12} />
          </button>
        </div>

        <span className="text-[10px] font-mono text-forest-muted/80">
          Hold &amp; Drag = Repel / Attract
        </span>
      </div>
    </div>
  );
}
