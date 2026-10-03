import React from 'react';
import { skills } from '../data/content';
import { Code, Layout, Server, Database, ShieldCheck, Wrench, Layers } from 'lucide-react';

const categoryIcons = {
  Languages: Code,
  Frontend: Layout,
  Backend: Server,
  Databases: Database,
  Authentication: ShieldCheck,
  'Tools and Deployment': Wrench,
  'Core CS': Layers,
};

export function Skills() {
  return (
    <section
      id="skills"
      aria-label="Technical Skills and Capabilities"
      className="section border-b border-hairline/40 bg-transparent"
    >
      <div className="max-w-content mx-auto px-6 w-full">
        {/* Section Header */}
        <div className="max-w-xl mb-12">
          <span className="label">Capabilities</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-forest mt-3 tracking-tight">
            Technical Skills & Architecture
          </h2>
          <p className="text-forest-muted text-base sm:text-lg mt-4">
            Curated toolkit covering frontend craftsmanship, distributed backend APIs, relational & document databases, and core computer science principles.
          </p>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items]) => {
            const Icon = categoryIcons[category] || Code;
            return (
              <div
                key={category}
                className="bg-surface border border-hairline rounded-card p-6 flex flex-col justify-between hover:border-forest/40 transition-colors duration-fast"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="p-2 rounded-pill bg-sand text-clay border border-hairline">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                    <h3 className="font-sans font-medium text-base text-forest">
                      {category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1.5 rounded-pill text-xs font-medium bg-sand/70 border border-hairline text-forest"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
