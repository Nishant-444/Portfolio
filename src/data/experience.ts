export interface Role {
	company: string;
	companyUrl?: string;
	title: string;
	start: string;
	end: string | 'Present';
	/** ISO dates power the JSON-LD employment graph. */
	startISO: string;
	endISO?: string;
	location: string;
	stack: string[];
	highlights: string[];
}

export const EXPERIENCE: Role[] = [
	{
		company: 'Zytexa Technology LLP',
		companyUrl: 'https://zytexa.com',
		title: 'Full Stack Developer Intern',
		start: 'July 2026',
		end: 'August 2026',
		startISO: '2026-07-01',
		endISO: '2026-08-31',
		location: 'Jaipur, India',
		stack: [
			'TypeScript',
			'Node.js',
			'Express',
			'PostgreSQL',
			'Prisma',
			'React.js',
		],
		highlights: [
			'Built a three-sided property-verification marketplace end-to-end — 18 Prisma/PostgreSQL models and 106 REST endpoints behind role-isolated JWT auth (buyer / seller / admin) that makes cross-role token reuse structurally impossible.',
			'Engineered the marketplace money logic: seller earnings, settlement and refund APIs, with commission splits frozen on the purchase row at transaction time so historical records stay correct even as policy changes.',
		],
	},
	{
		company: 'Pratham Softwares',
		title: 'Software Engineer Intern',
		start: 'March 2026',
		end: 'June 2026',
		startISO: '2026-03-01',
		endISO: '2026-06-30',
		location: 'Jaipur, India',
		stack: ['Java', 'Spring Boot', 'MySQL', 'TypeScript'],
		highlights: [
			'Developed the backend of an employee-appraisal platform, designing a layered Spring Boot service on MySQL with DTO-isolated API contracts and global exception handling.',
			'Implemented Spring Security 6 with JWT-based role access for HR, manager and employee actors, exposing REST endpoints consumed by the team’s React + TypeScript dashboard.',
		],
	},
];
