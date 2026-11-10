import React from 'react';
import { internships } from '../data/content';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export function Internships() {
  return (
    <section
      id="internships"
      aria-label="Internships and Practical Experience"
      className="section border-b border-hairline/40 bg-transparent"
    >
      <div className="max-w-content mx-auto px-6 w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="label">Experience</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-forest mt-3 tracking-tight">
            Internships
          </h2>
          <p className="text-forest-muted text-base sm:text-lg mt-4">
            Unpaid virtual internships spanning healthcare &amp; non-profit web applications, live site UX &amp; security auditing, WCAG accessibility, and React 3D architecture.
          </p>
        </div>

        {/* Internships List */}
        <div className="space-y-8">
          {internships.map((item) => {
            const hasMultipleDeliverables = item.deliverables.length > 1;

            return (
              <article
                key={item.id}
                className="bg-surface border border-hairline rounded-card p-6 sm:p-8 hover:border-forest/40 transition-colors duration-fast"
              >
                {/* Header Row: Role, Organization & Timeline Badges */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-hairline/60">
                  <div className="flex items-start gap-3.5">
                    <span className="p-2.5 rounded-xl bg-sand text-clay border border-hairline shrink-0 mt-0.5">
                      <Briefcase size={20} strokeWidth={1.5} />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <h3 className="font-serif text-2xl sm:text-3xl text-forest">
                          {item.organization}
                        </h3>
                        {item.subtitle && (
                          <span className="text-xs font-medium text-forest-muted">
                            ({item.subtitle})
                          </span>
                        )}
                      </div>
                      <p className="text-sm sm:text-base font-medium text-clay mt-1">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Period & Unpaid Virtual Metadata */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 md:justify-end shrink-0 text-xs">
                    <span className="font-medium text-clay">{item.type}</span>
                    <span className="text-hairline">•</span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-forest">
                      <Calendar size={13} strokeWidth={1.5} className="text-clay" />
                      <span>{item.period}</span>
                    </span>
                  </div>
                </div>

                {/* Role Summary */}
                <p className="text-forest-muted text-sm sm:text-base leading-relaxed mt-5 mb-6">
                  {item.summary}
                </p>

                {/* Deliverables / Work Done */}
                <div
                  className={`grid grid-cols-1 ${
                    hasMultipleDeliverables ? 'lg:grid-cols-2' : ''
                  } gap-5`}
                >
                  {item.deliverables.map((work) => (
                    <div
                      key={work.title}
                      className="rounded-card border border-hairline/70 bg-sand/40 p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="font-sans font-medium text-base text-forest">
                            {work.liveUrl ? (
                              <a
                                href={work.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 hover:text-clay transition-colors duration-fast"
                              >
                                <span>{work.title}</span>
                                <ArrowUpRight size={15} strokeWidth={1.75} className="text-clay shrink-0" />
                              </a>
                            ) : (
                              work.title
                            )}
                          </h4>
                        </div>

                        <p className="text-xs sm:text-sm text-forest-muted leading-relaxed mb-4">
                          {work.description}
                        </p>

                        <ul className="space-y-2">
                          {work.highlights.map((point, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-forest-muted leading-relaxed"
                            >
                              <span className="text-clay shrink-0 mt-0.5">
                                <CheckCircle2 size={14} strokeWidth={2} />
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Challenges Solved / Learning Outcomes (if detailed in report) */}
                {item.outcomes && item.outcomes.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-hairline/60">
                    <span className="label text-forest block mb-3">
                      Key Outcomes & Problem Solving
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {item.outcomes.map((outcome) => (
                        <div
                          key={outcome.label}
                          className="p-3.5 rounded-card border border-hairline/60 bg-sand/30"
                        >
                          <p className="text-xs font-medium text-forest">{outcome.label}</p>
                          <p className="text-xs text-forest-muted mt-1 leading-relaxed">
                            {outcome.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack & Certificate Attribution Footer */}
                <div className="mt-6 pt-5 border-t border-hairline/60 flex flex-col gap-2.5">
                  <p className="text-xs text-forest-muted leading-relaxed">
                    <span className="font-medium text-forest">Stack: </span>
                    {item.stack.join(' · ')}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-forest-muted pt-1">
                    <span className="inline-flex items-center gap-1.5 text-forest font-medium">
                      <ShieldCheck size={14} strokeWidth={1.75} className="text-clay shrink-0" />
                      <span>{item.credential}</span>
                    </span>
                    {item.mentor && (
                      <>
                        <span className="text-hairline hidden sm:inline">•</span>
                        <span>Mentor: {item.mentor}</span>
                      </>
                    )}
                    {item.verifier && (
                      <>
                        <span className="text-hairline hidden sm:inline">•</span>
                        <span>{item.verifier}</span>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
