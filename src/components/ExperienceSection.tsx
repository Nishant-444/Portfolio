'use client';

import React from 'react';
import { Briefcase, Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE } from '@/data/experience';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-16 border-b border-theme">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-theme-surface0 text-theme-accent text-xs font-mono font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>INDUSTRY EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-theme-main tracking-tight">
            Work Experience & Internships
          </h2>
          <p className="text-theme-sub0 text-sm mt-1">
            Proven track record of engineering full-stack production platforms, role-isolated authentication systems, and financial ledger APIs.
          </p>
        </div>

        {/* Experience Cards Stack */}
        <div className="space-y-6">
          {EXPERIENCE.map((role, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-theme-surface0/70 border border-theme p-6 sm:p-8 shadow-depth-sm hover:border-theme-accent transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-theme-main">
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-theme-accent mt-0.5">
                    <Building2 className="w-4 h-4" />
                    {role.companyUrl ? (
                      <a
                        href={role.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {role.company}
                      </a>
                    ) : (
                      <span>{role.company}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-theme-sub0">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-theme-surface1 border border-theme">
                    <Calendar className="w-3.5 h-3.5 text-theme-accent" />
                    <span>{role.start} – {role.end}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-theme-surface1 border border-theme">
                    <MapPin className="w-3.5 h-3.5 text-theme-accent" />
                    <span>{role.location}</span>
                  </div>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-3 mb-6">
                {role.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="text-sm text-theme-sub1 flex items-start gap-3 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-theme-accent shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-theme/60 text-xs font-mono">
                {role.stack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-md bg-theme-surface1 text-theme-main border border-theme font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
