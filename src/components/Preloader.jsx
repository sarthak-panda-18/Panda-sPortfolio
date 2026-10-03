import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE, DURATION, maskLine, fadeUp, fade } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLenis } from '../hooks/useLenis';
import {
  ArrowRight,
  Sparkles,
  Terminal,
  Compass,
  Code2,
  Cpu,
  GraduationCap,
  FolderGit2,
  Mail,
  Layers,
  CheckCircle2,
} from 'lucide-react';

/**
 * Creative Interactive Landing & Preloader Experience.
 * Features:
 * 1. Interactive ambient particle constellation responding to cursor physics
 * 2. Live IST dynamic clock & location indicator
 * 3. Interactive Terminal HUD with live system status
 * 4. 4 Interactive Quick-Jump Discovery Tiles (direct section shortcuts)
 * 5. Keyboard triggers [Space / Enter] and magnetic Enter CTA
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

  const handleDismiss = (targetSection = null) => {
    if (onClose) onClose();
    start();
    if (targetSection) {
      setTimeout(() => {
        scrollTo(targetSection);
      }, 400);
    }
  };

  // Keyboard shortcut listener: Press Space or Enter to enter portfolio
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && (e.code === 'Space' || e.code === 'Enter')) {
        e.preventDefault();
        handleDismiss();
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

  // Track mouse for ambient light aura & particle interaction
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

    // Particle nodes in warm earth palette
    const particleCount = Math.min(width > 768 ? 48 : 24, 55);
    const colors = ['rgba(194, 106, 74, 0.55)', 'rgba(237, 230, 218, 0.4)', 'rgba(120, 144, 128, 0.35)'];

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and connect particles
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
          if (dist < 140) {
            const force = (140 - dist) / 140;
            p.x -= (dx / dist) * force * 2.5;
            p.y -= (dy / dist) * force * 2.5;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(237, 230, 218, ${0.14 * (1 - dist / 150)})`;
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
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
          onMouseMove={handleContainerMouseMove}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#1b251f] p-6 sm:p-10 md:p-14 select-none overflow-y-auto overflow-x-hidden text-sand"
        >
          {/* 1. Ambient Background Light Aura & Constellation Canvas */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(700px at ${mousePos.x}px ${mousePos.y}px, rgba(194, 106, 74, 0.18), transparent 75%)`,
            }}
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-90"
          />

          {/* 2. Top Navigation & System Status HUD */}
          <div className="relative z-10 flex items-center justify-between border-b border-sand/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c26a4a] animate-ping" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-serif text-lg sm:text-xl text-[#ede6da] tracking-tight">
                  Sarthak Panda
                </span>
                <span className="hidden sm:inline text-sand/30">•</span>
                <span className="label text-[#c26a4a] text-[10px] tracking-widest font-sans">
                  Undergraduate Software Engineer
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/5 border border-sand/10 text-sand/70 text-[11px]">
                <Compass size={12} className="text-[#c26a4a]" />
                Andhra Pradesh, India
              </span>
              <span className="px-3 py-1 rounded-full bg-sand/10 border border-sand/20 text-[#ede6da] font-medium text-[11px]">
                {currentTime || 'IST'}
              </span>
            </div>
          </div>

          {/* 3. Main Center Stage: Typography & Interactive Discovery Deck */}
          <div className="relative z-10 my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Bold Typography & Rotating Specialization */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/5 border border-sand/15 text-xs text-[#f4a261] w-fit">
                <Sparkles size={13} className="text-[#c26a4a]" />
                <span className="font-sans font-medium tracking-wide">
                  Welcome to my portfolio space
                </span>
              </div>

              <div className="space-y-1">
                <div className="overflow-hidden">
                  <motion.h1
                    variants={maskLine}
                    initial="hidden"
                    animate="visible"
                    className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] text-[#ede6da] tracking-tight leading-[0.92]"
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
                    className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] text-[#ede6da] tracking-tight leading-[0.92]"
                  >
                    Panda
                  </motion.h1>
                </div>
              </div>

              {/* Dynamic Specialization Reveal */}
              <div className="pt-2 flex items-center gap-2 text-sm sm:text-base">
                <span className="text-[#c26a4a] shrink-0">✦</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeSpecialtyIndex}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-serif italic text-[#f4a261] text-lg sm:text-xl font-normal"
                  >
                    {specialties[activeSpecialtyIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <p className="text-sm sm:text-base text-sand/70 max-w-lg leading-relaxed pt-1">
                Passionate about building reliable full-stack applications with clean
                architecture, interactive frontend performance, and scalable databases.
              </p>

              {/* Enter CTA and Keyboard Cue */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleDismiss()}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-pill bg-[#c26a4a] text-[#fbf5ea] font-medium text-sm sm:text-base shadow-xl hover:bg-[#ede6da] hover:text-[#1f2a23] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Explore Full Portfolio</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1.5 transition-transform duration-300"
                  />
                </button>

                <span className="text-xs text-sand/50 tracking-wider">
                  Press <kbd className="px-2 py-0.5 rounded bg-sand/10 border border-sand/20 text-[10px] text-sand font-mono">Space</kbd> or click anywhere
                </span>
              </div>
            </div>

            {/* Right Column: Interactive System Terminal & Quick Discovery Tiles */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              {/* Terminal HUD Card */}
              <div className="rounded-card border border-sand/15 bg-black/35 backdrop-blur-md p-5 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-sand/10 text-xs text-sand/60">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[11px] text-sand/70">sarthak_sys.sh</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400/90">● ACTIVE</span>
                </div>

                <div className="font-mono text-xs text-sand/80 space-y-1.5 pt-3 leading-relaxed">
                  <p className="text-[#f4a261]">
                    &gt; init_profile({'{'} status: &quot;Ready&quot;, role: &quot;SDE&quot; {'}'})
                  </p>
                  <p className="text-sand/70">
                    → Focus: Full-Stack SaaS &amp; Algorithmic Engineering
                  </p>
                  <p className="text-sand/70">
                    → Impact: 500+ active student users supported
                  </p>
                  <p className="text-sand/50 text-[11px]">
                    → Stack: React • Node.js • PostgreSQL • Three.js • Python
                  </p>
                </div>
              </div>

              {/* Quick Jump Discovery Tiles Grid */}
              <div className="grid grid-cols-2 gap-3">
                {quickTiles.map((tile) => {
                  const Icon = tile.icon;
                  return (
                    <button
                      key={tile.id}
                      type="button"
                      onClick={() => handleDismiss(tile.target)}
                      className="group p-4 rounded-card border border-sand/15 bg-sand/5 hover:bg-sand/15 hover:border-[#c26a4a]/60 backdrop-blur-sm transition-all duration-fast text-left flex flex-col justify-between cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="p-2 rounded-lg bg-sand/10 text-[#c26a4a] group-hover:bg-[#c26a4a] group-hover:text-sand transition-colors duration-fast">
                          <Icon size={16} strokeWidth={1.75} />
                        </span>
                        <span className="text-[10px] font-mono text-[#f4a261] px-2 py-0.5 rounded-full bg-sand/10">
                          {tile.tag}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-sans font-medium text-xs text-[#ede6da] group-hover:text-[#f4a261] transition-colors duration-fast">
                          {tile.label}
                        </h4>
                        <p className="text-[11px] text-sand/60 leading-tight mt-0.5 line-clamp-1">
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
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-sand/60 border-t border-sand/10 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c26a4a]" />
              <span>Full-Stack &amp; Software Engineering Portfolio</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open for Summer / Fall Internships
              </span>
              <span className="text-sand/40 hidden md:inline">•</span>
              <span className="hidden md:inline text-sand/50">Click anywhere to skip</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
