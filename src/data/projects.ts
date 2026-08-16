export interface ProjectLink {
	label: string;
	url: string;
}

export interface Project {
	/** URL-safe id, also the terminal `open <id>` argument. */
	slug: string;
	name: string;
	blurb: string;
	period: string;
	/** Ordering key — newest work first. */
	sortKey: string;
	featured: boolean;
	stack: string[];
	highlights: string[];
	links: ProjectLink[];
}

export const PROJECTS: Project[] = [
	{
		slug: 'viztube',
		name: 'VizTube',
		blurb:
			'Video platform backend with an AI-powered RAG engine — Whisper transcription, local embeddings and pgvector semantic search, running on a deliberately tiny 1 GB EC2 box.',
		period: 'August 2025 – Present',
		sortKey: '2025-08',
		featured: true,
		stack: [
			'TypeScript',
			'Node.js',
			'Express',
			'FastAPI',
			'PostgreSQL',
			'pgvector',
			'Prisma',
			'Docker',
			'AWS',
			'Groq',
		],
		highlights: [
			'Engineered a RAG pipeline where a decoupled FastAPI microservice streams audio to Groq whisper-large-v3, embeds chunks locally with all-MiniLM-L6-v2, and answers through pgvector search with cited sources.',
			'Runs live on a 1 GB-RAM EC2 t3.micro by design — pgvector inside Postgres rather than a separate vector database, cloud Whisper instead of local inference.',
			'Three Docker containers shipped via GitHub Actions CI/CD behind Nginx SSL termination and Cloudflare, cutting deploys from 15 minutes to 90 seconds at under $10/month.',
		],
		links: [
			{ label: 'GitHub', url: 'https://github.com/Nishant-444/VizTube' },
			{ label: 'Live API', url: 'https://viztube.me' },
		],
	},
	{
		slug: 'echoinbox',
		name: 'EchoInbox',
		blurb:
			'Anonymous messaging platform with AI-assisted replies — structured Groq output, hardened auth, and a cascade-safe Postgres schema.',
		period: 'June 2026 – July 2026',
		sortKey: '2026-06',
		featured: true,
		stack: [
			'Next.js',
			'TypeScript',
			'PostgreSQL',
			'Prisma',
			'NeonDB',
			'NextAuth',
			'Vercel AI SDK',
			'Groq',
			'Resend',
			'Zod',
		],
		highlights: [
			'Built a custom NextAuth credentials flow — 6-digit expiring email verification via Resend, bcrypt-hashed passwords, and Zod validation on every input.',
			'Designed a cascade-safe Prisma schema with transactional account deletion, relational integrity and indexed retrieval, using UUIDv7 keys to keep index lookups sequential.',
			'Integrated Groq Llama 3.3 through the Vercel AI SDK with Zod-enforced structured suggestions, an 8-second timeout guard, and parallel dashboard loads.',
		],
		links: [
			{ label: 'GitHub', url: 'https://github.com/Nishant-444/echoinbox' },
		],
	},
	{
		slug: 'jobtrack',
		name: 'Job Application Tracker',
		blurb:
			'Full-stack Kanban platform for job hunting — React Server Components, optimistic drag-and-drop, and O(1) float ordering.',
		period: 'January 2026 – February 2026',
		sortKey: '2026-01',
		featured: true,
		stack: [
			'Next.js 16',
			'React 19',
			'TypeScript',
			'PostgreSQL',
			'Prisma 7',
			'dnd-kit',
			'Better Auth',
			'Docker',
			'AWS',
			'Nginx',
		],
		highlights: [
			'Built on Next.js App Router with React Server Components to eliminate client-side loading waterfalls, with end-to-end type safety between Server Actions and the database layer.',
			'Implemented a dnd-kit Kanban board with optimistic UI updates and an O(1) float ordering scheme, so reordering a card writes one row instead of renumbering the column.',
			'Wired Better Auth database hooks to auto-provision a 5-stage pipeline on registration, and shipped a multi-stage Docker build on Next.js standalone output to AWS EC2 behind Nginx with Certbot SSL renewal.',
		],
		links: [
			{
				label: 'GitHub',
				url: 'https://github.com/Nishant-444/job-application-tracker',
			},
			{ label: 'Live App', url: 'https://jobs.nishants.dev' },
		],
	},
	{
		slug: 'appraisehub',
		name: 'AppraiseHub',
		blurb:
			'Employee appraisal platform with multi-role RBAC workflows across a layered Spring Boot backend and a Next.js dashboard.',
		period: 'March 2026 – June 2026',
		sortKey: '2026-03',
		featured: true,
		stack: [
			'Java',
			'Spring Boot',
			'Spring Security 6',
			'MySQL',
			'Next.js',
			'React',
			'JWT',
			'Docker',
		],
		highlights: [
			'Layered Spring Boot service on MySQL with DTO-isolated API contracts and global exception handling.',
			'Spring Security 6 + JWT role-based access separating HR, manager and employee actors at the route level.',
		],
		links: [
			{ label: 'GitHub', url: 'https://github.com/Nishant-444/AppraiseHub' },
			{ label: 'Live App', url: 'https://appraise-hub.vercel.app' },
		],
	},
	{
		slug: 'trend-engine',
		name: 'Trend Engine',
		blurb:
			'Real-time movie discovery app whose trending list is generated from live user search patterns rather than a static feed.',
		period: 'August 2025',
		sortKey: '2025-08a',
		featured: false,
		stack: ['React 18', 'Vite', 'Tailwind CSS v4', 'Appwrite', 'TMDB API'],
		highlights: [
			'Built a trending algorithm that captures and aggregates user search queries in an Appwrite database to rank titles in real time.',
			'Engineered debounced search to cut redundant API calls, on a mobile-first responsive UI deployed to Vercel via automated builds.',
		],
		links: [
			{ label: 'GitHub', url: 'https://github.com/Nishant-444/Trend-Engine' },
			{ label: 'Live Demo', url: 'https://trend-engine.vercel.app/' },
		],
	},
	{
		slug: 'bankease',
		name: 'BankEase',
		blurb:
			'C++ banking simulation engine that replaced text-file persistence with binary serialisation for a 300% throughput gain.',
		period: 'January 2025 – March 2025',
		sortKey: '2025-01',
		featured: false,
		stack: ['C++', 'OOP', 'Binary I/O', 'Systems Programming'],
		highlights: [
			'Rewrote the storage layer from parsed text I/O to raw binary serialisation, achieving 300% faster read/write operations on account transactions.',
			'Structured the engine around SOLID OOP boundaries so accounts, transactions and persistence stay independently testable.',
		],
		links: [{ label: 'GitHub', url: 'https://github.com/Nishant-444/BankEase' }],
	},
	{
		slug: 'modern-web-boilerplate',
		name: 'Modern Web Stack Boilerplate',
		blurb:
			'A 2026 production web-stack guide covering three project shapes with database variants, verified against official docs.',
		period: 'July 2026',
		sortKey: '2026-07',
		featured: false,
		stack: [
			'Next.js 16.2',
			'Express 5',
			'React 19.2',
			'Prisma 7',
			'TypeScript',
			'MongoDB',
		],
		highlights: [
			'Documents App Router with Turbopack defaults and the prisma.config.ts-era Prisma 7 setup, with every version pinned against official documentation.',
		],
		links: [
			{
				label: 'GitHub',
				url: 'https://github.com/Nishant-444/modern-web-boilerplate',
			},
		],
	},
	{
		slug: 'portfolio',
		name: 'Terminal Portfolio',
		blurb:
			'This site — a browser CLI over a fully pre-rendered static document, so it reads well to both humans and crawlers.',
		period: '2025 – Present',
		sortKey: '2025-00',
		featured: false,
		stack: ['Astro', 'TypeScript', 'Vanilla JS', 'PWA', 'SEO'],
		highlights: [
			'Every command output is pre-rendered to semantic HTML at build time, so the terminal is progressive enhancement rather than the only way in.',
		],
		links: [
			{ label: 'GitHub', url: 'https://github.com/Nishant-444/Portfolio' },
			{ label: 'Live', url: 'https://nishants.dev' },
		],
	},
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export interface OpenSourceContribution {
	repo: string;
	repoUrl: string;
	meta: string;
	period: string;
	items: { id: string; url: string; description: string }[];
}

export const OPEN_SOURCE: OpenSourceContribution = {
	repo: 'ed-donner/llm_engineering',
	repoUrl: 'https://github.com/ed-donner/llm_engineering',
	meta: '7k+ stars · 2 PRs merged · 1,400+ lines',
	period: 'June 2026 – Present',
	items: [
		{
			id: '#3631',
			url: 'https://github.com/ed-donner/llm_engineering/pull/3631',
			description:
				'Built an LLM cost meter that patches the OpenAI client in place to track tokens and spend across 8 providers.',
		},
		{
			id: '#3492',
			url: 'https://github.com/ed-donner/llm_engineering/pull/3492',
			description:
				'Shipped a local RAG course navigator with a Gradio UI — offline sentence-transformers embeddings and OpenRouter Q&A.',
		},
	],
};
