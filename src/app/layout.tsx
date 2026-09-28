import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'Nishant Sharma | Full Stack & Systems Engineer',
  description:
    'Portfolio of Nishant Sharma — Full Stack Developer specializing in Node.js, Spring Boot, PostgreSQL, RAG & AI systems. 2x SSB Recommended. Built for maximum recruiter hirability.',
  keywords: [
    'Nishant Sharma',
    'Full Stack Engineer',
    'Backend Engineer',
    'TypeScript Developer',
    'Node.js',
    'Spring Boot',
    'PostgreSQL',
    'pgvector',
    'RAG Engineer',
    'AI Systems',
    'Jaipur Software Engineer',
    'India',
  ],
  authors: [{ name: 'Nishant Sharma' }],
  openGraph: {
    title: 'Nishant Sharma | Full Stack & Systems Engineer',
    description:
      'Full Stack Developer specializing in high-concurrency backends, RAG search engines, and production APIs. 2x SSB Recommended.',
    type: 'website',
    url: 'https://nishantsharma.vercel.app',
    siteName: 'Nishant Sharma Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nishant Sharma | Full Stack & Systems Engineer',
    description:
      'Full Stack Developer specializing in high-concurrency backends, RAG search engines, and production APIs.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mocha scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="theme-color" content="#1e1e2e" />
      </head>
      <body className="antialiased selection:bg-amber-400/20 selection:text-amber-200 min-h-screen flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
