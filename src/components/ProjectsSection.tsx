'use client';

import React, { useState } from 'react';
import { ExternalLink, Github, FolderCode, Sparkles, Layers, Cpu } from 'lucide-react';
import { PROJECTS, Project } from '@/data/projects';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'featured' | 'ai' | 'backend'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'featured') return p.featured;
    if (filter === 'ai') return p.stack.some((s) => ['RAG', 'Whisper', 'pgvector', 'Vercel AI SDK', 'Groq', 'AI'].includes(s));
    if (filter === 'backend') return p.stack.some((s) => ['Node.js', 'Express', 'FastAPI', 'Spring Boot', 'PostgreSQL', 'Docker'].includes(s));
    return true;
  });

  return (
    <section id="projects" className="py-16 border-b border-theme bg-theme-mantle/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-theme-surface0 text-theme-accent text-xs font-mono font-semibold mb-2">
              <FolderCode className="w-3.5 h-3.5" />
              <span>PRODUCTION & OPEN SOURCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-theme-main tracking-tight">
              Featured Engineering Projects
            </h2>
            <p className="text-theme-sub0 text-sm mt-1 max-w-2xl">
              High-concurrency APIs, AI-powered RAG search engines, and production backend services built with TypeScript, Node.js, Spring Boot, and PostgreSQL.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-theme-surface0 border border-theme text-xs font-mono">
            {(['all', 'featured', 'ai', 'backend'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  filter === tab
                    ? 'bg-theme-accent text-theme-mantle font-bold shadow-depth-sm'
                    : 'text-theme-sub0 hover:text-theme-main hover:bg-theme-surface1'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project: Project) => (
            <div
              key={project.slug}
              className="rounded-2xl bg-theme-surface0/70 border border-theme p-6 flex flex-col justify-between shadow-depth-sm hover:shadow-depth-md hover:border-theme-accent transition-all duration-300 group"
            >
              <div>
                {/* Header: Title & Links */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-theme-main group-hover:text-theme-accent transition-colors flex items-center gap-2">
                      <span>{project.name}</span>
                      {project.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Featured
                        </span>
                      )}
                    </h3>
                    <span className="text-xs text-theme-sub0 font-mono block mt-0.5">
                      {project.period}
                    </span>
                  </div>

                  {/* Project Links */}
                  <div className="flex items-center gap-2">
                    {project.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-theme-surface1 hover:bg-theme-accent hover:text-theme-mantle text-theme-sub1 transition-all"
                        title={link.label}
                      >
                        {link.label === 'GitHub' ? (
                          <Github className="w-4 h-4" />
                        ) : (
                          <ExternalLink className="w-4 h-4" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Blurb */}
                <p className="text-sm text-theme-sub1 leading-relaxed mb-4">
                  {project.blurb}
                </p>

                {/* Quantifiable Bullet Highlights */}
                <ul className="space-y-2 mb-6">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-xs text-theme-sub0 flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-theme-accent shrink-0 mt-1.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Badges */}
              <div className="pt-4 border-t border-theme/60 flex flex-wrap gap-1.5 text-[11px] font-mono">
                {project.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-theme-surface1 text-theme-sub1 border border-theme"
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
