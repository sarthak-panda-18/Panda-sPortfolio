import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { about, stats, profile } from '../data/content';
import { fadeUp, staggerContainer, fade } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Sparkles, Code2, Cpu, Brain, CheckCircle2 } from 'lucide-react';

export function About() {
  const { prefersReducedMotion } = useReducedMotion();
  const [activeTab, setActiveTab] = useState('technical');

  const technicalStrengths = [
    { title: 'Full-Stack Architecture', desc: 'Connecting responsive React clients to robust Node.js/Express REST backends.' },
    { title: 'Database & Schema Design', desc: 'Crafting normalized relational PostgreSQL schemas via Prisma and flexible MongoDB structures.' },
    { title: 'AI & API Integrations', desc: 'Integrating Google Gemini for intelligent analysis, automated feedback, and analytics.' },
    { title: 'Production Deployment', desc: 'Configuring automated CI/CD and production environments on Vercel and Render.' },
  ];

  const engineeringMindset = [
    { title: 'Analytical Problem Solving', desc: 'Deconstructing complex algorithmic problems into modular, maintainable solutions.' },
    { title: 'Curiosity & Deep Dives', desc: 'Understanding how systems work under the hood—from event loops to browser rendering pipelines.' },
    { title: 'Team Collaboration', desc: 'Building software in cross-functional teams to deliver impactful student tools.' },
    { title: 'Continuous Growth', desc: 'Constantly practicing data structures, algorithms, and exploring modern web standards.' },
  ];

  const activeVariant = prefersReducedMotion ? fade : fadeUp;

  return (
    <section
      id="about"
      aria-label="About Sarthak Panda"
      className="section border-b border-hairline/40 bg-transparent"
    >
      <div className="max-w-content mx-auto px-6 w-full">
        {/* Section Header */}
        <div className="max-w-xl mb-12">
          <span className="label">Background & Philosophy</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-forest mt-3 tracking-tight">
            Curious by Nature, Builder by Craft.
          </h2>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Bio & Story */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div className="bg-surface border border-hairline rounded-card p-8">
              <span className="label text-clay block mb-3">About Me</span>
              <p className="text-forest text-base sm:text-lg leading-relaxed mb-4">
                {about.summary}
              </p>
              <p className="text-forest-muted text-sm sm:text-base leading-relaxed">
                Currently pursuing my B.Tech in Computer Science and Engineering at{' '}
                <strong className="text-forest font-medium">Prasad V. Potluri Siddhartha Institute of Technology</strong> (2024–Present, CGPA 7.98). I enjoy the entire lifecycle of software engineering—from whiteboard architecture to responsive UI interactions.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Skills & Mindset Tabs */}
          <div className="lg:col-span-6 bg-surface border border-hairline rounded-card p-6 md:p-8">
            {/* Tab Controls */}
            <div className="flex items-center space-x-2 border-b border-hairline pb-4 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('technical')}
                className={`text-xs uppercase tracking-wider font-medium py-2 px-4 rounded-pill transition-colors duration-fast focus-visible:outline-none ${
                  activeTab === 'technical'
                    ? 'bg-forest text-sand'
                    : 'text-forest-muted hover:text-forest hover:bg-sand/60'
                }`}
              >
                Technical Focus
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('mindset')}
                className={`text-xs uppercase tracking-wider font-medium py-2 px-4 rounded-pill transition-colors duration-fast focus-visible:outline-none ${
                  activeTab === 'mindset'
                    ? 'bg-forest text-sand'
                    : 'text-forest-muted hover:text-forest hover:bg-sand/60'
                }`}
              >
                Engineering Mindset
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {(activeTab === 'technical' ? technicalStrengths : engineeringMindset).map((item, idx) => (
                <div
                  key={item.title}
                  className="p-4 rounded-card border border-hairline/60 bg-sand/30 hover:bg-sand/60 transition-colors duration-fast"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-clay mt-0.5">
                      <CheckCircle2 size={16} strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="font-sans font-medium text-sm text-forest">
                        {item.title}
                      </h3>
                      <p className="text-forest-muted text-xs leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* High-Impact Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface border border-hairline rounded-card p-6 text-left"
            >
              <span className="font-serif text-4xl sm:text-5xl text-clay block tracking-tight">
                {stat.value}
              </span>
              <span className="label text-forest-muted block mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
