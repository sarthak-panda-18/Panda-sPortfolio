import React from 'react';
import { education, certifications } from '../data/content';
import { GraduationCap, Award, BookOpen, CheckCircle } from 'lucide-react';

export function Education() {
  return (
    <section
      id="education"
      aria-label="Education and Certifications"
      className="section border-b border-hairline/40 bg-transparent"
    >
      <div className="max-w-content mx-auto px-6 w-full">
        {/* Section Header */}
        <div className="max-w-xl mb-12">
          <span className="label">Academic Background</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-forest mt-3 tracking-tight">
            Education & Certifications
          </h2>
          <p className="text-forest-muted text-base sm:text-lg mt-4">
            Rigorous computer science foundation paired with industry credentials in algorithmic problem solving and software fundamentals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Degree Card */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-surface border border-hairline rounded-card p-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2.5 rounded-pill bg-sand text-clay border border-hairline">
                  <GraduationCap size={22} strokeWidth={1.5} />
                </span>
                <div>
                  <span className="label text-clay">Undergraduate Degree</span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-forest mt-0.5">
                    {education[0].degree}
                  </h3>
                </div>
              </div>

              <div className="border-t border-hairline/60 pt-4 mt-2">
                <p className="font-sans font-medium text-base text-forest">
                  {education[0].institution}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-forest-muted">
                    {education[0].period}
                  </span>
                  <span className="text-hairline">•</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-pill bg-clay/10 border border-clay/30 text-xs font-semibold text-clay">
                    {education[0].score}
                  </span>
                </div>

                <p className="text-forest-muted text-sm leading-relaxed mt-4">
                  {education[0].description}
                </p>
              </div>
            </div>
          </div>

          {/* Certifications List */}
          <div className="lg:col-span-5 bg-surface border border-hairline rounded-card p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2.5 rounded-pill bg-sand text-clay border border-hairline">
                  <Award size={22} strokeWidth={1.5} />
                </span>
                <div>
                  <span className="label text-clay">Verified Credentials</span>
                  <h3 className="font-serif text-2xl text-forest">Certifications</h3>
                </div>
              </div>

              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="p-4 rounded-card border border-hairline/60 bg-sand/30 hover:bg-sand/60 transition-colors duration-fast"
                  >
                    <h4 className="font-sans font-medium text-sm text-forest">
                      {cert.title}
                    </h4>
                    <p className="label text-forest-muted text-[10px] mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
