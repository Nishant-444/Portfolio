'use client';

import React, { useState, useEffect } from 'react';
import { Palette, Sparkles, MousePointerClick, Calendar, Copy, Check, Info, Activity } from 'lucide-react';
import { useTheme, PaletteTheme, AccentColor, ACCENT_MAP } from '@/context/ThemeContext';
import { PROFILE } from '@/data/profile';

export const BentoDashboard: React.FC = () => {
  const { palette, accent, setPalette, setAccent } = useTheme();
  const [clickCount, setClickCount] = useState<number>(0);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  useEffect(() => {
    try {
      const count = localStorage.getItem('portfolio_click_count');
      if (count) setClickCount(parseInt(count, 10));
    } catch {}
  }, []);

  const handleIncrementClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    try {
      localStorage.setItem('portfolio_click_count', nextCount.toString());
    } catch {}
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.contacts.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const themes: PaletteTheme[] = ['mocha', 'macchiato', 'frappe', 'latte'];
  const accents: AccentColor[] = ['peach', 'mauve', 'blue', 'sapphire', 'teal', 'green', 'red', 'pink'];

  return (
    <section className="py-16 border-b border-theme bg-theme-mantle/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-theme-surface0 text-theme-accent text-xs font-mono font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE DASHBOARD</span>
          </div>
          <h2 className="text-3xl font-extrabold text-theme-main tracking-tight">
            Design Controls & Live Widgets
          </h2>
          <p className="text-theme-sub0 text-sm mt-1">
            Inspired by tech-craft portfolio aesthetics. Customize theme tokens, interact with real-time counters, and schedule a call.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Theme & Accent Customizer (Span 2) */}
          <div className="p-5 rounded-2xl bg-theme-surface0/70 border border-theme shadow-depth-sm sm:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-theme-main mb-3">
                <Palette className="w-4 h-4 text-theme-accent" />
                <span>Catppuccin Design Tokens</span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-xs text-theme-sub0 font-mono block mb-1.5">Color Scheme</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {themes.map((t) => (
                      <button
                        key={t}
                        onClick={() => setPalette(t)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-mono capitalize transition-all border ${
                          palette === t
                            ? 'bg-theme-accent text-theme-mantle font-bold border-theme shadow-depth-sm'
                            : 'bg-theme-surface1 text-theme-sub0 border-transparent hover:bg-theme-surface2 hover:text-theme-main'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-theme-sub0 font-mono block mb-1.5">Accent Color</span>
                  <div className="grid grid-cols-8 gap-1.5">
                    {accents.map((acc) => (
                      <button
                        key={acc}
                        onClick={() => setAccent(acc)}
                        className={`h-7 rounded-lg transition-transform flex items-center justify-center ${
                          accent === acc ? 'scale-110 ring-2 ring-white/60' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: ACCENT_MAP[acc] }}
                        title={acc}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-theme/40 text-[11px] font-mono text-theme-sub0 flex items-center justify-between">
              <span>Active: {palette} / {accent}</span>
              <span className="text-theme-accent font-semibold">HSL Color Engine</span>
            </div>
          </div>

          {/* Card 2: Interactive Click Counter (Jason Cameron Abacus Vibe) */}
          <div className="p-5 rounded-2xl bg-theme-surface0/70 border border-theme shadow-depth-sm flex flex-col justify-between items-center text-center">
            <div className="w-full flex items-center justify-between text-xs text-theme-sub0 font-mono">
              <span className="flex items-center gap-1 font-semibold text-theme-main">
                <MousePointerClick className="w-3.5 h-3.5 text-theme-accent" />
                <span>Click Engine</span>
              </span>
              <span className="text-theme-accent font-bold">Abacus Logic</span>
            </div>

            <div className="my-4">
              <div className="text-4xl font-extrabold font-mono text-theme-accent animate-pulse">
                {clickCount}
              </div>
              <p className="text-xs text-theme-sub0 mt-1 font-mono">
                {clickCount === 0 ? 'Give it a click!' : `You clicked ${clickCount} times`}
              </p>
            </div>

            <button
              onClick={handleIncrementClick}
              className="w-full py-2.5 rounded-xl bg-theme-accent text-theme-mantle font-extrabold text-sm shadow-depth-sm hover:shadow-depth-md hover:scale-105 active:scale-95 transition-all"
            >
              CLICK ME
            </button>
          </div>

          {/* Card 3: Direct Connect & Email Copy */}
          <div className="p-5 rounded-2xl bg-theme-surface0/70 border border-theme shadow-depth-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-theme-main mb-2">
                <Calendar className="w-4 h-4 text-theme-accent" />
                <span>Let's Connect</span>
              </div>
              <p className="text-xs text-theme-sub0 leading-relaxed mb-4">
                Open for engineering roles, technical conversations, and open source collaboration.
              </p>

              <button
                onClick={handleCopyEmail}
                className="w-full mb-2 py-2 px-3 rounded-lg bg-theme-surface1 hover:bg-theme-surface2 text-theme-main text-xs font-mono border border-theme flex items-center justify-between transition-all"
              >
                <span className="truncate">{PROFILE.contacts.email}</span>
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-theme-accent shrink-0" />
                )}
              </button>
            </div>

            <a
              href={`mailto:${PROFILE.contacts.email}`}
              className="w-full py-2 rounded-xl bg-theme-surface1 hover:bg-theme-accent hover:text-theme-mantle text-theme-accent text-center font-bold text-xs border border-theme transition-all"
            >
              Send Message
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
