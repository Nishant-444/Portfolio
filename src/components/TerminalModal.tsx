'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { PROFILE, PROJECTS, EXPERIENCE, SKILLS, ACHIEVEMENTS } from '@/data/profile';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LogEntry {
  command?: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-theme-accent font-bold">
            Welcome to Nishant Sharma's Interactive CLI v3.0.0
          </p>
          <p className="text-theme-sub0">
            Type <span className="text-emerald-400 font-bold">help</span> or click any command button below to inspect profile details.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleRunCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        outputNode = (
          <div className="text-xs space-y-1 text-theme-sub0">
            <p className="text-theme-main font-bold">Available Commands:</p>
            <p><span className="text-theme-accent font-mono w-28 inline-block">bio</span> Show developer biography</p>
            <p><span className="text-theme-accent font-mono w-28 inline-block font-bold">projects</span> List featured engineering projects</p>
            <p><span className="text-theme-accent font-mono w-28 inline-block font-bold">experience</span> Show work experience & internships</p>
            <p><span className="text-theme-accent font-mono w-28 inline-block font-bold">skills</span> Display categorized technical skills</p>
            <p><span className="text-theme-accent font-mono w-28 inline-block font-bold">achievements</span> Show 2x SSB & Open Source details</p>
            <p><span className="text-theme-accent font-mono w-28 inline-block font-bold">contact</span> Get email and social profile links</p>
            <p><span className="text-theme-accent font-mono w-28 inline-block font-bold">resume</span> Open PDF resume link</p>
            <p><span className="text-theme-accent font-mono w-28 inline-block font-bold">clear</span> Clear terminal buffer</p>
          </div>
        );
        break;

      case 'bio':
        outputNode = (
          <div className="text-xs text-theme-sub0 leading-relaxed">
            <p className="text-theme-main font-bold mb-1">{PROFILE.name} — {PROFILE.role}</p>
            <p>{PROFILE.bio}</p>
            <p className="text-theme-accent font-mono mt-1">Location: {PROFILE.location}</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="text-xs space-y-2">
            <p className="text-theme-main font-bold">Featured Projects:</p>
            {PROJECTS.slice(0, 4).map((p, i) => (
              <div key={i} className="pl-2 border-l-2 border-theme-accent">
                <span className="text-theme-accent font-bold">{p.name}</span> — <span className="text-theme-sub0">{p.blurb}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        outputNode = (
          <div className="text-xs space-y-2">
            <p className="text-theme-main font-bold">Work History:</p>
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="pl-2 border-l-2 border-emerald-400">
                <p className="text-theme-main font-bold">{exp.title} @ {exp.company}</p>
                <p className="text-theme-sub0">{exp.start} – {exp.end} | {exp.location}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="text-xs space-y-1">
            <p className="text-theme-main font-bold">Technical Stack:</p>
            {SKILLS.map((s, i) => (
              <p key={i}>
                <span className="text-theme-accent font-mono">{s.category}:</span>{' '}
                <span className="text-theme-sub0">{s.items.join(', ')}</span>
              </p>
            ))}
          </div>
        );
        break;

      case 'achievements':
        outputNode = (
          <div className="text-xs space-y-1 text-theme-sub0">
            <p className="text-theme-main font-bold">Milestones:</p>
            {ACHIEVEMENTS.map((a, i) => (
              <p key={i}>• <span className="text-theme-accent font-bold">{a.title}</span> — {a.detail}</p>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-xs space-y-1 text-theme-sub0 font-mono">
            <p>Email: <span className="text-theme-accent">{PROFILE.contacts.email}</span></p>
            <p>GitHub: <span className="text-theme-accent">{PROFILE.contacts.github}</span></p>
            <p>LinkedIn: <span className="text-theme-accent">{PROFILE.contacts.linkedin}</span></p>
          </div>
        );
        break;

      case 'resume':
        window.open(PROFILE.contacts.resumeUrl, '_blank');
        outputNode = (
          <p className="text-xs text-emerald-400 font-mono">Opening resume in new tab...</p>
        );
        break;

      case 'clear':
        setLogs([]);
        setInput('');
        return;

      default:
        outputNode = (
          <p className="text-xs text-rose-400 font-mono">
            Command not recognized: '{trimmed}'. Type 'help' for options.
          </p>
        );
    }

    setLogs((prev) => [...prev, { command: trimmed, output: outputNode }]);
    setInput('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRunCommand(input);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className={`w-full bg-theme-mantle border border-theme rounded-2xl shadow-depth-lg flex flex-col overflow-hidden transition-all duration-300 ${
          isExpanded ? 'h-[90vh] max-w-5xl' : 'h-[500px] max-w-3xl'
        }`}
      >
        {/* Terminal Titlebar */}
        <div className="h-10 bg-theme-crust border-b border-theme px-4 flex items-center justify-between font-mono text-xs text-theme-sub0 select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="ml-2 font-bold text-theme-main flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-theme-accent" />
              <span>nishant@dev:~</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="hover:text-theme-main transition-colors p-1"
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button onClick={onClose} className="hover:text-theme-main transition-colors p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Command Quick Buttons */}
        <div className="p-2 bg-theme-surface0/60 border-b border-theme flex flex-wrap gap-1.5 text-xs font-mono">
          {['help', 'bio', 'projects', 'experience', 'skills', 'achievements', 'contact', 'resume', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleRunCommand(cmd)}
              className="px-2.5 py-1 rounded bg-theme-surface1 hover:bg-theme-accent hover:text-theme-mantle text-theme-sub1 transition-all"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Output Console Buffer */}
        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-4">
          {logs.map((log, idx) => (
            <div key={idx} className="space-y-1">
              {log.command && (
                <div className="flex items-center gap-2 text-theme-sub0">
                  <span className="text-theme-accent font-bold">nishant@dev:~$</span>
                  <span className="text-theme-main">{log.command}</span>
                </div>
              )}
              <div className="pl-3">{log.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Prompt */}
        <form onSubmit={handleFormSubmit} className="p-3 bg-theme-crust border-t border-theme flex items-center gap-2 font-mono text-xs">
          <span className="text-theme-accent font-bold">nishant@dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type command ('help', 'projects', 'skills')..."
            className="flex-1 bg-transparent text-theme-main outline-none placeholder:text-theme-sub0/50"
          />
          <button type="submit" className="text-theme-accent hover:scale-110 transition-transform">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
