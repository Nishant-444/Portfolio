'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Palette, Terminal, FileText, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useTheme, PaletteTheme, AccentColor, ACCENT_MAP } from '@/context/ThemeContext';
import { PROFILE } from '@/data/profile';

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const { palette, accent, setPalette, setAccent } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDrawerOpen, setThemeDrawerOpen] = useState(false);

  const palettes: PaletteTheme[] = ['mocha', 'macchiato', 'frappe', 'latte'];
  const accents: AccentColor[] = ['peach', 'mauve', 'blue', 'sapphire', 'teal', 'green', 'red', 'pink'];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-theme-base/80 border-b border-theme transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Terminal Breadcrumb */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group font-mono text-sm tracking-tight text-theme-main hover:text-theme-accent transition-colors"
        >
          <span className="px-2 py-0.5 rounded bg-theme-surface0 text-theme-accent font-bold group-hover:scale-105 transition-transform">
            ~
          </span>
          <span className="text-theme-sub0">/</span>
          <span className="font-semibold">{PROFILE.handle.toLowerCase()}</span>
          <span className="w-2 h-4 bg-theme-accent animate-pulse inline-block rounded-sm ml-0.5" />
        </Link>

        {/* Desktop Nav Actions */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="#projects" className="text-theme-sub0 hover:text-theme-accent transition-colors">
            Projects
          </a>
          <a href="#experience" className="text-theme-sub0 hover:text-theme-accent transition-colors">
            Experience
          </a>
          <a href="#skills" className="text-theme-sub0 hover:text-theme-accent transition-colors">
            Skills
          </a>
          <a href="#achievements" className="text-theme-sub0 hover:text-theme-accent transition-colors">
            Credentials
          </a>

          <div className="h-4 w-[1px] bg-theme-surface1" />

          {/* Theme Switcher Button */}
          <button
            onClick={() => setThemeDrawerOpen(!themeDrawerOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-theme-surface0 hover:bg-theme-surface1 text-theme-main text-xs font-mono border border-theme transition-all"
            title="Change Catppuccin theme & accent"
          >
            <Palette className="w-3.5 h-3.5 text-theme-accent" />
            <span className="capitalize">{palette}</span>
            <span 
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: ACCENT_MAP[accent] }}
            />
          </button>

          {/* Terminal CLI Modal Trigger */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-theme-surface0 hover:bg-theme-surface1 text-theme-sub1 text-xs font-mono border border-theme transition-all hover:scale-105"
            title="Open Interactive Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-theme-accent" />
            <span>CLI</span>
          </button>

          {/* Prominent Resume Button for Recruiters */}
          <a
            href={PROFILE.contacts.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-theme-accent text-theme-mantle font-semibold text-xs transition-all shadow-depth-sm hover:shadow-depth-md hover:scale-105"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </nav>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setThemeDrawerOpen(!themeDrawerOpen)}
            className="p-2 rounded-lg bg-theme-surface0 text-theme-main border border-theme"
          >
            <Palette className="w-4 h-4 text-theme-accent" />
          </button>
          
          <a
            href={PROFILE.contacts.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-theme-accent text-theme-mantle font-semibold text-xs flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-theme-surface0 text-theme-main border border-theme"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-theme bg-theme-mantle px-4 py-4 space-y-3 font-medium text-sm">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-theme-sub0 hover:text-theme-accent py-1"
          >
            Projects
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-theme-sub0 hover:text-theme-accent py-1"
          >
            Experience
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-theme-sub0 hover:text-theme-accent py-1"
          >
            Skills
          </a>
          <a
            href="#achievements"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-theme-sub0 hover:text-theme-accent py-1"
          >
            Credentials
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTerminal();
            }}
            className="w-full text-left flex items-center gap-2 text-theme-accent py-1 font-mono"
          >
            <Terminal className="w-4 h-4" />
            <span>Open Interactive CLI</span>
          </button>
        </div>
      )}

      {/* Theme Drawer Popover */}
      {themeDrawerOpen && (
        <div className="absolute right-4 top-18 z-50 w-72 p-4 rounded-xl bg-theme-mantle border border-theme shadow-depth-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-theme">
            <span className="text-xs font-bold font-mono text-theme-accent flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Theme Selector
            </span>
            <button
              onClick={() => setThemeDrawerOpen(false)}
              className="text-theme-sub0 hover:text-theme-main text-xs"
            >
              ✕
            </button>
          </div>

          <div>
            <span className="text-xs text-theme-sub0 font-semibold mb-2 block">Flavors</span>
            <div className="grid grid-cols-2 gap-1.5">
              {palettes.map((p) => (
                <button
                  key={p}
                  onClick={() => setPalette(p)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-mono capitalize transition-all border ${
                    palette === p
                      ? 'bg-theme-surface1 text-theme-accent border-theme font-bold'
                      : 'bg-theme-surface0 text-theme-sub0 border-transparent hover:bg-theme-surface1'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs text-theme-sub0 font-semibold mb-2 block">Accents</span>
            <div className="grid grid-cols-4 gap-2">
              {accents.map((acc) => (
                <button
                  key={acc}
                  onClick={() => setAccent(acc)}
                  className={`h-7 rounded-md transition-transform flex items-center justify-center ${
                    accent === acc ? 'scale-110 ring-2 ring-white/50' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: ACCENT_MAP[acc] }}
                  title={acc}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
