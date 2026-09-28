'use client';

import React from 'react';
import { FileText, Github, Linkedin, Mail, MapPin, Award, Terminal, ArrowRight, ShieldCheck, Sparkles, Code2 } from 'lucide-react';
import { PROFILE } from '@/data/profile';

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTerminal }) => {
  return (
    <section className="pt-10 pb-12 md:pt-16 md:pb-20 border-b border-theme relative overflow-hidden">
      {/* Background ambient glow effect */}
      <div 
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: 'var(--current-accent)' }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Availability Badge & Location */}
        <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-mono">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{PROFILE.status}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-surface0 text-theme-sub0 border border-theme">
            <MapPin className="w-3.5 h-3.5 text-theme-accent" />
            <span>{PROFILE.location}</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-theme-main leading-tight">
            Hi, I'm <span className="text-theme-accent">{PROFILE.name}</span>
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-theme-sub1 leading-snug">
            {PROFILE.role} — <span className="text-theme-sub0">{PROFILE.subRole}</span>
          </p>

          <p className="text-base sm:text-lg text-theme-sub0 leading-relaxed max-w-3xl pt-2">
            {PROFILE.bio}
          </p>
        </div>

        {/* Prominent Action Buttons for Recruiters */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={PROFILE.contacts.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-theme-accent text-theme-mantle font-bold text-sm shadow-depth-md hover:shadow-depth-lg hover:scale-105 transition-all duration-200"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume (PDF)</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PROFILE.contacts.email}`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-theme-surface0 hover:bg-theme-surface1 text-theme-main font-semibold text-sm border border-theme hover:border-theme-accent transition-all duration-200"
          >
            <Mail className="w-4 h-4 text-theme-accent" />
            <span>Contact Me</span>
          </a>

          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-theme-mantle hover:bg-theme-surface0 text-theme-sub1 font-mono text-sm border border-theme hover:border-theme-accent transition-all duration-200"
          >
            <Terminal className="w-4 h-4 text-theme-accent" />
            <span>Interactive CLI</span>
          </button>
        </div>

        {/* Quick Social Links */}
        <div className="mt-6 flex items-center gap-4 text-theme-sub0 text-sm font-mono pt-2">
          <a
            href={PROFILE.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-theme-accent transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <span>·</span>

          <a
            href={PROFILE.contacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-theme-accent transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <span>·</span>

          <a
            href={PROFILE.contacts.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-theme-accent transition-colors"
          >
            <Code2 className="w-4 h-4" />
            <span>X / Twitter</span>
          </a>
        </div>

        {/* High Impact Recruiter Stats Grid */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PROFILE.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-theme-surface0/60 border border-theme shadow-depth-sm hover:border-theme-accent hover:shadow-depth-md transition-all group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-theme-accent group-hover:scale-105 transition-transform origin-left font-mono">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-theme-main mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-theme-sub0 mt-0.5">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
