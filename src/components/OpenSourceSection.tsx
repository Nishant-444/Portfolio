'use client';

import React from 'react';
import { GitPullRequest, Star, Award, ShieldCheck, ExternalLink, Code2, Sparkles } from 'lucide-react';
import { OPEN_SOURCE, ACHIEVEMENTS } from '@/data/profile';

export const OpenSourceSection: React.FC = () => {
  return (
    <section id="achievements" className="py-16 border-b border-theme bg-theme-mantle/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Open Source Highlight */}
          <div className="rounded-2xl bg-theme-surface0/70 border border-theme p-6 sm:p-8 flex flex-col justify-between shadow-depth-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-theme-surface1 text-theme-accent text-xs font-mono font-semibold mb-4">
                <GitPullRequest className="w-3.5 h-3.5" />
                <span>OPEN SOURCE CONTRIBUTIONS</span>
              </div>

              <h3 className="text-2xl font-extrabold text-theme-main mb-1 flex items-center justify-between">
                <span>{OPEN_SOURCE.repo}</span>
                <a
                  href={OPEN_SOURCE.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-theme-sub0 hover:text-theme-accent text-xs font-mono flex items-center gap-1"
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>7k+ Stars</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </h3>

              <div className="text-xs text-theme-accent font-mono mb-6">
                {OPEN_SOURCE.meta} · {OPEN_SOURCE.period}
              </div>

              <div className="space-y-4">
                {OPEN_SOURCE.items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-theme-surface1/60 border border-theme/80 space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-theme-accent hover:underline font-bold flex items-center gap-1"
                      >
                        <span>PR {item.id}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-emerald-400 font-semibold">Merged</span>
                    </div>
                    <p className="text-sm text-theme-sub1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-theme/60 text-xs text-theme-sub0">
              Actively contributing to open-source AI infrastructure and LLM toolchain repositories.
            </div>
          </div>

          {/* Key Achievements & Leadership */}
          <div className="rounded-2xl bg-theme-surface0/70 border border-theme p-6 sm:p-8 flex flex-col justify-between shadow-depth-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-theme-surface1 text-theme-accent text-xs font-mono font-semibold mb-4">
                <Award className="w-3.5 h-3.5" />
                <span>LEADERSHIP & MILESTONES</span>
              </div>

              <h3 className="text-2xl font-extrabold text-theme-main mb-6">
                Proven Track Record
              </h3>

              <div className="space-y-4">
                {ACHIEVEMENTS.map((ach, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-theme-surface1/60 border border-theme/80 flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-theme-accent/10 text-theme-accent shrink-0 mt-0.5">
                      {idx === 0 ? (
                        <ShieldCheck className="w-5 h-5" />
                      ) : idx === 1 ? (
                        <Code2 className="w-5 h-5" />
                      ) : (
                        <Sparkles className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-theme-main">
                        {ach.title}
                      </h4>
                      <p className="text-xs text-theme-sub0 leading-relaxed mt-1">
                        {ach.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-theme/60 text-xs text-theme-sub0 font-mono">
              2x SSB Recommendation demonstrates high emotional intelligence, adaptability, and decision-making under intense pressure.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
