import React from 'react';
import { codingProfiles } from '../data/content';
import { Code2, Terminal, ArrowUpRight } from 'lucide-react';

const profileIcons = {
  LeetCode: Code2,
  CodeChef: Terminal,
};

export function CodingProfiles() {
  return (
    <section
      id="profiles"
      aria-label="Competitive Programming & Coding Profiles"
      className="section border-b border-hairline/40 bg-transparent"
    >
      <div className="max-w-content mx-auto px-6 w-full">
        {/* Section Header */}
        <div className="max-w-xl mb-12">
          <span className="label">Problem Solving</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-forest mt-3 tracking-tight">
            Coding Profiles & Practice
          </h2>
          <p className="text-forest-muted text-base sm:text-lg mt-4">
            Continuous algorithmic challenge solving across prominent coding platforms focusing on data structures, complexity optimization, and problem decomposition.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          {codingProfiles.map((item) => {
            const Icon = profileIcons[item.platform] || Code2;
            const hasUrl = item.url && item.url.trim().length > 0;

            const cardContent = (
              <div className="bg-surface border border-hairline rounded-card p-6 flex flex-col justify-between h-full hover:border-forest/50 transition-colors duration-fast group">
                <div className="flex items-start justify-between">
                  <span className="p-3 rounded-pill bg-sand text-clay border border-hairline">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  {hasUrl && (
                    <span className="text-forest-muted group-hover:text-forest transition-colors duration-fast">
                      <ArrowUpRight size={18} strokeWidth={1.5} />
                    </span>
                  )}
                </div>

                <div className="mt-8">
                  <h3 className="font-serif text-xl sm:text-2xl text-forest">
                    {item.platform}
                  </h3>
                  <p className="text-xs text-forest-muted mt-1 font-mono">
                    @{item.handle}
                  </p>
                </div>
              </div>
            );

            if (hasUrl) {
              return (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.platform} Profile (${item.handle})`}
                  className="block focus-visible:outline-none"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div key={item.platform} className="block">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
