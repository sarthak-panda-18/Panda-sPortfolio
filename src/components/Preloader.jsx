import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE, DURATION, maskLine, fadeUp } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLenis } from '../hooks/useLenis';
import {
  ArrowRight,
  Sparkles,
  Compass,
  Code2,
  GraduationCap,
  FolderGit2,
  Mail,
} from 'lucide-react';

/**
 * Creative Interactive Landing & Preloader Screen.
 * Features:
 * 1. 100% Theme-agnostic explicit contrast palette (always crystal-clear in Light and Dark modes)
 * 2. Fluid clamp() scaling for 100% zoom perfection across Chrome, Brave, Firefox, and Edge
 * 3. Interactive particle constellation canvas with cursor repulsion
 * 4. Interactive Terminal HUD and 4 quick-jump discovery tiles
 */
export function Preloader({ isOpen = true, onClose }) {
  const { prefersReducedMotion } = useReducedMotion();
  const { stop, start, scrollTo } = useLenis();
  const canvasRef = useRef(null);

  const [currentTime, setCurrentTime] = useState('');
  const [activeSpecialtyIndex, setActiveSpecialtyIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const specialties = [
    'Full-Stack Architecture & REST APIs',
    'Interactive React & Node.js Systems',
    'Data Structures & Algorithmic Problem Solving',
    'Scalable Cloud Deployments & Database Design',
  ];

  const openTimeRef = useRef(0);

  // Dynamic live clock (India Standard Time)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Specialty rotation every 2.4s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpecialtyIndex((prev) => (prev + 1) % specialties.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [specialties.length]);

  // Track timestamp when opened to ignore instant accidental click triggers from navbar
  useEffect(() => {
    if (isOpen) {
      openTimeRef.current = Date.now();
    }
  }, [isOpen]);

  const handleDismiss = (targetSection = null, force = false) => {
    // Prevent accidental dismissal if opened in the last 260ms (e.g. from navbar click)
    if (!force && Date.now() - openTimeRef.current < 260) {
      return;
    }

    if (onClose) onClose();
    start();
    if (targetSection) {
      setTimeout(() => {
        scrollTo(targetSection);
      }, 350);
    }
  };

  // Global click / tap listener: Clicking anywhere on screen skips preloader (after cooldown)
  useEffect(() => {
    if (!isOpen) return;

    // Small delay prevents instant trigger from the same click that opened the preloader
    const timer = setTimeout(() => {
      const handleGlobalClick = (e) => {
        if (Date.now() - openTimeRef.current < 260) return;

        // If clicking a specific quick tile, handle dismissal to that section
        const quickTile = e.target.closest('[data-quick-tile]');
        if (quickTile) {
          const target = quickTile.getAttribute('data-quick-tile');
          handleDismiss(target, true);
        } else {
          handleDismiss(null, true);
        }
      };

      window.addEventListener('click', handleGlobalClick);
      window.addEventListener('touchend', handleGlobalClick);

      return () => {
        window.removeEventListener('click', handleGlobalClick);
        window.removeEventListener('touchend', handleGlobalClick);
      };
    }, 200);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Keyboard shortcut listener: Press Space or Enter to enter portfolio
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && (e.code === 'Space' || e.code === 'Enter')) {
        e.preventDefault();
        handleDismiss(null, true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock scroll while preloader is visible
  useEffect(() => {
    if (isOpen) {
      stop();
    } else {
      start();
    }
  }, [isOpen, stop, start]);

  const handleContainerMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Interactive Constellation Canvas effect
  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current || !isOpen) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: width / 2, y: height / 2, active: false };

    const handleCanvasMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    window.addEventListener('mousemove', handleCanvasMouseMove);

    const particleCount = Math.min(width > 768 ? 42 : 20, 48);
    const colors = ['rgba(232, 128, 88, 0.6)', 'rgba(245, 241, 234, 0.45)', 'rgba(140, 160, 148, 0.35)'];

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const force = (130 - dist) / 130;
            p.x -= (dx / dist) * force * 2.2;
            p.y -= (dy / dist) * force * 2.2;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(245, 241, 234, ${0.14 * (1 - dist / 135)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleCanvasMouseMove);
    };
  }, [prefersReducedMotion, isOpen]);

  const quickTiles = [
    {
      id: 'about',
      label: 'About & Story',
      desc: 'Background & Philosophy',
      tag: 'Overview',
      icon: Compass,
      target: '#about',
    },
    {
      id: 'skills',
      label: 'Technical Stack',
      desc: 'React, Node, PostgreSQL, Python',
      tag: '15+ Tools',
      icon: Code2,
      target: '#skills',
    },
    {
      id: 'projects',
      label: 'Work & Projects',
      desc: '4 Full-Stack SaaS & ML apps',
      tag: '500+ Users',
      icon: FolderGit2,
      target: '#projects',
    },
    {
      id: 'education',
      label: 'Education & Journey',
      desc: 'B.Tech CSE (2024–Present)',
      tag: 'PVPSIT',
      icon: GraduationCap,
      target: '#education',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="preloader-curtain"
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1],
          }}
          onClick={(e) => {
            if (Date.now() - openTimeRef.current < 260) return;
            if (e.target.closest('[data-quick-tile]')) return;
            handleDismiss();
          }}
          onMouseMove={handleContainerMouseMove}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#141c17] p-4 sm:p-6 md:p-8 lg:p-10 select-none overflow-y-auto overflow-x-hidden text-[#f5f1ea] cursor-pointer"
        >
          {/* 1. Ambient Background Light Aura & Constellation Canvas */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-45 transition-opacity duration-300"
            style={{
              background: `radial-gradient(650px at ${mousePos.x}px ${mousePos.y}px, rgba(232, 128, 88, 0.16), transparent 75%)`,
            }}
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-90"
          />

          {/* Max-Width Inner Responsive Wrapper */}
          <div className="relative z-10 max-w-6xl mx-auto w-full h-full flex flex-col justify-between py-1">
            {/* 2. Top Header Metadata Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#e88058] animate-ping" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-serif text-base sm:text-lg text-[#f5f1ea] tracking-tight">
                    Sarthak Panda
                  </span>
                  <span className="hidden sm:inline text-white/30">•</span>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-sans font-medium text-[#e88058]">
                    Undergraduate Software Engineer
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[#a8b4ad] text-[11px]">
                  <Compass size={12} className="text-[#e88058]" />
                  Andhra Pradesh, India
                </span>
                <span className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 text-[#f5f1ea] font-medium text-[11px]">
                  {currentTime || 'IST'}
                </span>
              </div>
            </div>

            {/* 3. Main Center Stage: Responsive Dual Column Layout */}
            <div className="my-auto py-4 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column: Bold Typography & Rotating Specialization */}
              <div className="lg:col-span-7 flex flex-col space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/15 text-xs text-[#f4a261] w-fit">
                  <Sparkles size={13} className="text-[#e88058]" />
                  <span className="font-sans font-medium tracking-wide">
                    Welcome to my portfolio space
                  </span>
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  <div className="overflow-hidden">
                    <motion.h1
                      variants={maskLine}
                      initial="hidden"
                      animate="visible"
                      className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[clamp(3.5rem,5vw,5.5rem)] text-[#f5f1ea] tracking-tight leading-[0.92]"
                    >
                      Sarthak
                    </motion.h1>
                  </div>
                  <div className="overflow-hidden">
                    <motion.h1
                      variants={maskLine}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        duration: DURATION.reveal,
                        ease: EASE,
                        delay: 0.1,
                      }}
                      className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[clamp(3.5rem,5vw,5.5rem)] text-[#f5f1ea] tracking-tight leading-[0.92]"
                    >
                      Panda
                    </motion.h1>
                  </div>
                </div>

                {/* Dynamic Specialization Reveal */}
                <div className="pt-1 flex items-center gap-2 text-sm sm:text-base min-h-[1.75rem]">
                  <span className="text-[#e88058] shrink-0">✦</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeSpecialtyIndex}
                      initial={{ y: 6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -6, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="font-serif italic text-[#f4a261] text-base sm:text-lg font-normal"
                    >
                      {specialties[activeSpecialtyIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <p className="text-xs sm:text-sm text-[#a8b4ad] max-w-lg leading-relaxed pt-0.5">
                  Passionate about building reliable full-stack applications with clean
                  architecture, interactive frontend performance, and scalable databases.
                </p>

                {/* Enter CTA and Keyboard Cue */}
                <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDismiss();
                    }}
                    className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-pill bg-[#e88058] text-[#141c17] font-semibold text-xs sm:text-sm shadow-xl hover:bg-[#f5f1ea] hover:text-[#141c17] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Explore Full Portfolio</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </button>

                  <span className="text-[11px] text-[#a8b4ad]/70 tracking-wider">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] text-[#f5f1ea] font-mono">Space</kbd> or click anywhere
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive System Terminal & Quick Discovery Tiles */}
              <div className="lg:col-span-5 flex flex-col space-y-3">
                {/* Terminal HUD Card */}
                <div className="rounded-card border border-white/15 bg-black/45 backdrop-blur-md p-3.5 sm:p-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-xs text-[#a8b4ad]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-mono text-[11px] text-[#f5f1ea]/80">sarthak_sys.sh</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-medium">● ACTIVE</span>
                  </div>

                  <div className="font-mono text-[11px] sm:text-xs text-[#d8cebe] space-y-1.5 pt-2.5 leading-relaxed">
                    <p className="text-[#f4a261]">
                      &gt; init_profile({'{'} status: &quot;Ready&quot;, role: &quot;SDE&quot; {'}'})
                    </p>
                    <p className="text-[#f5f1ea]/85">
                      → Focus: Full-Stack SaaS &amp; Algorithmic Engineering
                    </p>
                    <p className="text-[#f5f1ea]/85">
                      → Impact: 500+ active student users supported
                    </p>
                    <p className="text-[#a8b4ad] text-[10.5px]">
                      → Stack: React • Node.js • PostgreSQL • Three.js • Python
                    </p>
                  </div>
                </div>

                {/* Quick Jump Discovery Tiles Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  {quickTiles.map((tile) => {
                    const Icon = tile.icon;
                    return (
                      <button
                        key={tile.id}
                        type="button"
                        data-quick-tile={tile.target}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDismiss(tile.target);
                        }}
                        className="group p-3 sm:p-3.5 rounded-card border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[#e88058]/60 backdrop-blur-sm transition-all duration-fast text-left flex flex-col justify-between cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="p-1.5 rounded-md bg-white/[0.08] text-[#e88058] group-hover:bg-[#e88058] group-hover:text-[#141c17] transition-colors duration-fast">
                            <Icon size={14} strokeWidth={2} />
                          </span>
                          <span className="text-[9.5px] font-mono text-[#f4a261] px-1.5 py-0.5 rounded-full bg-white/[0.08]">
                            {tile.tag}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-sans font-medium text-xs text-[#f5f1ea] group-hover:text-[#f4a261] transition-colors duration-fast">
                            {tile.label}
                          </h4>
                          <p className="text-[10.5px] text-[#a8b4ad] leading-tight mt-0.5 line-clamp-1">
                            {tile.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 4. Bottom Footer Metadata Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-[#a8b4ad] border-t border-white/10 pt-3 sm:pt-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e88058]" />
                <span className="text-[11px] sm:text-xs">Full-Stack &amp; Software Engineering Portfolio</span>
              </div>

              <div className="flex items-center gap-3 text-[11px] sm:text-xs">
                <span className="inline-flex items-center gap-1.5 text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open for Summer / Fall Internships
                </span>
                <span className="text-white/30 hidden md:inline">•</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss();
                  }}
                  className="hidden md:inline text-white/50 hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-[11px] sm:text-xs"
                >
                  Click anywhere to skip
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
