/**
 * Single source of truth for identity, domain and social presence.
 *
 * Every canonical URL, JSON-LD node, sitemap entry, OG tag and terminal
 * command reads from here. Changing the domain is a one-line edit.
 */

export const SITE = {
	url: 'https://nishants.dev',
	name: 'Nishant Sharma',
	shortName: 'Nishant',
	title: 'Nishant Sharma — Backend Software Engineer',
	tagline:
		'Backend Software Engineer shipping production APIs, RAG/AI pipelines, and cloud infrastructure end-to-end.',
	// Kept under ~160 characters so search results never truncate it.
	description:
		'Backend software engineer in Jaipur, India. I build production REST APIs, RAG pipelines on PostgreSQL + pgvector, and containerised AWS infrastructure.',
	locale: 'en_IN',
	lang: 'en',
	themeColor: '#011627',
	/** Used for the `nishant@portfolio:~$` prompt and PWA identity. */
	host: 'portfolio',
	user: 'nishant',
} as const;

export const PERSON = {
	name: 'Nishant Sharma',
	givenName: 'Nishant',
	familyName: 'Sharma',
	pronouns: 'he/him',
	jobTitle: 'Backend Software Engineer',
	email: 'business.nishant777@gmail.com',
	phone: '+916350435068',
	phoneDisplay: '+91 63504 35068',
	location: {
		city: 'Jaipur',
		region: 'Rajasthan',
		country: 'India',
		countryCode: 'IN',
	},
	/** Zytexa internship completed August 2026; actively interviewing. */
	availability: 'Open to backend and full-stack engineering roles.',
	resume: '/assets/Nishant_Sharma_Resume.pdf',
} as const;

export interface SocialLink {
	label: string;
	handle: string;
	url: string;
	/** Included in the JSON-LD `sameAs` graph. */
	sameAs: boolean;
}

export const SOCIALS: SocialLink[] = [
	{
		label: 'GitHub',
		handle: 'Nishant-444',
		url: 'https://github.com/Nishant-444',
		sameAs: true,
	},
	{
		label: 'LinkedIn',
		handle: 'nishant-developer',
		url: 'https://www.linkedin.com/in/nishant-developer',
		sameAs: true,
	},
	{
		label: 'X / Twitter',
		handle: '@_nishant4712',
		url: 'https://x.com/_nishant4712',
		sameAs: true,
	},
	{
		label: 'LeetCode',
		handle: 'nishant4712',
		url: 'https://leetcode.com/u/nishant4712/',
		sameAs: true,
	},
	{
		label: 'Codeforces',
		handle: 'nishant4712',
		url: 'https://codeforces.com/profile/nishant4712',
		sameAs: true,
	},
	{
		label: 'HackerRank',
		handle: 'business_nishan1',
		url: 'https://www.hackerrank.com/profile/business_nishan1',
		sameAs: true,
	},
	{
		label: 'Telegram',
		handle: 'nishant_mj',
		url: 'https://t.me/nishant_mj',
		sameAs: false,
	},
	{
		label: 'Discord',
		handle: '1369952726707998741',
		url: 'https://discord.com/users/1369952726707998741',
		sameAs: false,
	},
	{
		label: 'Instagram',
		handle: '@_nishant4712',
		url: 'https://instagram.com/_nishant4712/',
		sameAs: false,
	},
];

/** Twitter card attribution. */
export const TWITTER_HANDLE = '@_nishant4712';

/** Absolute URL helper — every emitted link must be absolute for SEO. */
export function absolute(path: string): string {
	return new URL(path, SITE.url).href;
}
