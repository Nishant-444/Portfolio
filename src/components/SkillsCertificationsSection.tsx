'use client';

import React, { useState } from 'react';
import { Cpu, Award, ExternalLink, CheckCircle, ShieldCheck } from 'lucide-react';
import { SKILLS, CERTIFICATIONS } from '@/data/profile';

export const SkillsCertificationsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...SKILLS.map((s) => s.category)];

  return (
    <section id="skills" className="py-16 border-b border-theme">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-theme-surface0 text-theme-accent text-xs font-mono font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-theme-main tracking-tight">
            Skills & Verified Certifications
          </h2>
          <p className="text-theme-sub0 text-sm mt-1 max-w-2xl">
            Comprehensive tech stack spanning modern full-stack development, database architecture, cloud infrastructure, and AI engineering.
          </p>
        </div>

        {/* Skills Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                activeCategory === cat
                  ? 'bg-theme-accent text-theme-mantle font-bold border-theme shadow-depth-sm'
                  : 'bg-theme-surface0 text-theme-sub0 border-theme hover:bg-theme-surface1 hover:text-theme-main'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grouped Skills Cloud */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SKILLS.filter((group) => activeCategory === 'All' || group.category === activeCategory).map(
            (group, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-theme-surface0/70 border border-theme shadow-depth-sm hover:border-theme-accent transition-all"
              >
                <h3 className="text-sm font-bold font-mono text-theme-accent mb-3 uppercase tracking-wider">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg bg-theme-surface1 text-theme-main text-xs font-mono border border-theme/80 hover:border-theme-accent hover:text-theme-accent transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* Certifications Header */}
        <div className="mb-6 pt-4 border-t border-theme/60">
          <h3 className="text-xl font-bold text-theme-main flex items-center gap-2">
            <Award className="w-5 h-5 text-theme-accent" />
            <span>Verified Industry Credentials</span>
          </h3>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-theme-surface0/60 border border-theme hover:border-theme-accent transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-theme-main leading-tight">
                    {cert.name}
                  </h4>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme-accent hover:scale-110 transition-transform p-1"
                      title="Verify Credential"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <div className="text-xs text-theme-accent font-mono">
                  {cert.issuer}
                </div>
                <div className="text-xs text-theme-sub0 mt-2 font-mono">
                  Issued: {cert.issued}
                </div>
              </div>

              {cert.credentialId && (
                <div className="mt-3 pt-2 border-t border-theme/40 text-[11px] font-mono text-theme-sub0 flex items-center justify-between">
                  <span>ID: {cert.credentialId}</span>
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
