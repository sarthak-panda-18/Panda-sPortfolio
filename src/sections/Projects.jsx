import React from 'react';
import { projects } from '../data/content';
import { TiltCard } from '../components/TiltCard';
import { Github, CheckCircle2, ArrowUpRight, Globe, Sparkles } from 'lucide-react';

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Selected Projects"
      className="section border-b border-hairline/40 bg-transparent"
    >
      <div className="max-w-content mx-auto px-6 w-full">
        {/* Section Header */}
        <div className="max-w-xl mb-12">
          <span className="label">Selected Works</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-forest mt-3 tracking-tight">
            Featured Projects & Engineering Work
          </h2>
          <p className="text-forest-muted text-base sm:text-lg mt-4">
            Production full-stack platforms, geospatial machine learning models, and interactive web apps with open-source codebases and live deployments.
          </p>
        </div>

        {/* 2x2 Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => {
            const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);
            const liveUrl = project.liveUrl;
            const isLiveDeployment = Boolean(liveUrl && !liveUrl.includes('github.com'));
            const actionText = project.liveActionText || (isLiveDeployment ? 'Visit Live Website' : 'Explore Repository');

            return (
              <TiltCard
                key={project.id}
                className="flex flex-col justify-between h-full hover:border-forest/50 transition-all duration-fast group"
              >
                <div>
                  {/* Project Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="label text-clay block mb-1.5">{project.tag}</span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-forest">
                        <a
                          href={liveUrl || project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-clay transition-colors duration-fast inline-flex items-center gap-2 group-hover:text-clay"
                        >
                          <span>{project.title}</span>
                          <ArrowUpRight size={20} strokeWidth={1.5} className="opacity-0 group-hover:opacity-100 transition-opacity duration-fast shrink-0" />
                        </a>
                      </h3>
                    </div>

                    {/* Top-Right Source Code Link */}
                    {hasGithub && (
                      <div className="flex items-center space-x-2 shrink-0">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Source code for ${project.title} on GitHub`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-sand text-forest hover:text-clay hover:border-forest border border-hairline transition-colors duration-fast text-xs font-medium"
                        >
                          <Github size={15} strokeWidth={1.5} />
                          <span>Source Code</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  <p className="text-forest-muted text-sm sm:text-base leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2.5 mb-8 border-t border-hairline/60 pt-5">
                    <span className="label text-forest block mb-2">Key Engineering Highlights</span>
                    {project.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-forest-muted">
                        <span className="text-clay shrink-0 mt-0.5">
                          <CheckCircle2 size={15} strokeWidth={2} />
                        </span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills & Creative Live Website Action */}
                <div className="border-t border-hairline/60 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-pill bg-sand border border-hairline text-forest"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Deployed Website Action Button */}
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-pill text-xs font-medium shrink-0 transition-all duration-fast ${
                        isLiveDeployment
                          ? 'bg-clay text-clay-contrast hover:bg-forest hover:text-sand border border-clay hover:border-forest'
                          : 'bg-forest text-sand hover:bg-clay hover:text-clay-contrast border border-forest hover:border-clay'
                      }`}
                    >
                      <Globe size={13} strokeWidth={1.5} />
                      <span>{actionText}</span>
                      <ArrowUpRight size={13} strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
