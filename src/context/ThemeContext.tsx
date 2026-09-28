'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type PaletteTheme = 'mocha' | 'macchiato' | 'frappe' | 'latte';
export type AccentColor = 'peach' | 'mauve' | 'blue' | 'sapphire' | 'teal' | 'green' | 'red' | 'pink';

interface ThemeContextType {
  palette: PaletteTheme;
  accent: AccentColor;
  setPalette: (p: PaletteTheme) => void;
  setAccent: (a: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  palette: 'mocha',
  accent: 'peach',
  setPalette: () => {},
  setAccent: () => {},
});

export const ACCENT_MAP: Record<AccentColor, string> = {
  peach: '#fab387',
  mauve: '#cba6f7',
  blue: '#89b4fa',
  sapphire: '#74c7ec',
  teal: '#94e2d5',
  green: '#a6e3a1',
  red: '#f38ba8',
  pink: '#f5c2e7',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = useState<PaletteTheme>('mocha');
  const [accent, setAccentState] = useState<AccentColor>('peach');

  useEffect(() => {
    try {
      const savedPalette = localStorage.getItem('theme_palette') as PaletteTheme;
      const savedAccent = localStorage.getItem('theme_accent') as AccentColor;
      if (savedPalette) setPaletteState(savedPalette);
      if (savedAccent) setAccentState(savedAccent);
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('mocha', 'macchiato', 'frappe', 'latte');
    root.classList.add(palette);

    const hexColor = ACCENT_MAP[accent] || '#fab387';
    root.style.setProperty('--current-accent', hexColor);

    try {
      localStorage.setItem('theme_palette', palette);
      localStorage.setItem('theme_accent', accent);
    } catch {}
  }, [palette, accent]);

  return (
    <ThemeContext.Provider
      value={{
        palette,
        accent,
        setPalette: setPaletteState,
        setAccent: setAccentState,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
