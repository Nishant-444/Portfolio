'use client';

import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Code2, Heart } from 'lucide-react';
import { PROFILE } from '@/data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    jobTitle: PROFILE.role,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'India',
    },
    url: PROFILE.contacts.website,
    sameAs: [
      PROFILE.contacts.github,
      PROFILE.contacts.linkedin,
      PROFILE.contacts.twitter,
    ],
    knowsAbout: [
      'Full Stack Development',
      'System Architecture',
      'TypeScript',
      'Node.js',
      'Spring Boot',
      'PostgreSQL',
      'pgvector',
      'RAG Pipelines',
      'AI Systems',
      'Docker',
    ],
  };

  return (
    <footer className="py-12 border-t border-theme bg-theme-crust text-theme-sub0 text-sm">
      {/* JSON-LD Structured Data for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left info */}
          <div className="space-y-1 text-center md:text-left">
            <p className="font-bold text-theme-main font-mono">
              {PROFILE.name} — {PROFILE.role}
            </p>
            <p className="text-xs text-theme-sub0">
              Designed with Catppuccin design tokens & depth hierarchy for maximum recruiter scanability.
            </p>
          </div>

          {/* Social Links & Back to top */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href={PROFILE.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-theme-accent transition-colors flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={PROFILE.contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-theme-accent transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${PROFILE.contacts.email}`}
              className="hover:text-theme-accent transition-colors flex items-center gap-1"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-theme-surface0 hover:bg-theme-accent hover:text-theme-mantle text-theme-main transition-all ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-theme/40 text-center text-xs text-theme-sub0/70 font-mono">
          © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js 15, TypeScript & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
};
