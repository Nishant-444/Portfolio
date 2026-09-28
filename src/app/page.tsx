'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { OpenSourceSection } from '@/components/OpenSourceSection';
import { SkillsCertificationsSection } from '@/components/SkillsCertificationsSection';
import { BentoDashboard } from '@/components/BentoDashboard';
import { Footer } from '@/components/Footer';
import { TerminalModal } from '@/components/TerminalModal';

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-theme-base text-theme-main selection:bg-amber-400/20">
      {/* Sticky Header */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Recruiter-Optimized Hero Banner */}
        <HeroSection onOpenTerminal={() => setTerminalOpen(true)} />

        {/* Featured Projects Showcase */}
        <ProjectsSection />

        {/* Work Experience Timeline */}
        <ExperienceSection />

        {/* Open Source & SSB Achievements */}
        <OpenSourceSection />

        {/* Technical Skills & Verified Credentials */}
        <SkillsCertificationsSection />

        {/* Interactive Bento Dashboard (Theme Switcher + Click Counter) */}
        <BentoDashboard />
      </main>

      {/* Footer & JSON-LD Structured Data */}
      <Footer />

      {/* Interactive CLI Drawer Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
}
