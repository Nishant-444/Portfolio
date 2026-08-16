export interface SkillGroup {
	category: string;
	items: string[];
}

/** Grouped to match the résumé so the two documents never drift. */
export const SKILLS: SkillGroup[] = [
	{
		category: 'Languages',
		items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Java', 'C++'],
	},
	{
		category: 'Backend',
		items: [
			'Node.js',
			'Express.js',
			'FastAPI',
			'Spring Boot',
			'REST API Design',
			'JWT / OAuth',
		],
	},
	{
		category: 'Databases',
		items: [
			'PostgreSQL',
			'Prisma ORM',
			'pgvector',
			'MySQL',
			'MongoDB',
			'NeonDB',
		],
	},
	{
		category: 'AI / ML',
		items: [
			'RAG Pipelines',
			'Vector Search',
			'Embeddings',
			'LLM Integration',
			'Whisper',
			'Vercel AI SDK',
		],
	},
	{
		category: 'Cloud & DevOps',
		items: [
			'AWS (EC2, RDS, S3)',
			'Docker',
			'GitHub Actions',
			'CI/CD',
			'Nginx',
			'Linux',
			'Cloudflare',
		],
	},
	{
		category: 'Frontend',
		items: ['React.js', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'HTML/CSS'],
	},
	{
		category: 'Practices',
		items: [
			'Git',
			'Agile / Scrum',
			'System Design',
			'Unit Testing',
			'Data Structures & Algorithms',
		],
	},
];

/** Flattened for the JSON-LD `knowsAbout` graph. */
export const ALL_SKILLS = SKILLS.flatMap((group) => group.items);
