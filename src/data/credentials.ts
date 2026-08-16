export interface Certification {
	name: string;
	issuer: string;
	issued: string;
	issuedISO: string;
	expires?: string;
	expiresISO?: string;
	credentialId?: string;
	url?: string;
}

export const CERTIFICATIONS: Certification[] = [
	{
		name: 'GitHub Foundations',
		issuer: 'Microsoft',
		issued: 'October 2025',
		issuedISO: '2025-10-01',
		expires: 'October 2027',
		expiresISO: '2027-10-01',
		credentialId: 'AEFB5214CE0AB643',
		url: 'https://learn.microsoft.com/en-gb/users/nishantsharma-2380/credentials/aefb5214ce0ab643',
	},
	{
		name: 'Back End Development and APIs',
		issuer: 'freeCodeCamp',
		issued: 'October 2025',
		issuedISO: '2025-10-01',
		credentialId: 'lousynishant-bedaa',
		url: 'https://drive.google.com/file/d/1obbSvmpeBubq7X_yRFtkk741NJMX8yI2/view?usp=sharing',
	},
	{
		name: 'Problem Solving (Intermediate)',
		issuer: 'HackerRank',
		issued: 'July 2025',
		issuedISO: '2025-07-01',
		url: 'https://www.hackerrank.com/certificates/17f976a57553',
	},
	// TODO(nishant): add the verify URLs for these two. They come from your
	// LinkedIn export, which gave credential IDs but not links — rather than
	// guess at freeCodeCamp's URL shape and risk shipping a 404, they render
	// with the ID alone until you paste the real ones in.
	{
		name: 'JavaScript Algorithms and Data Structures',
		issuer: 'freeCodeCamp',
		issued: 'June 2025',
		issuedISO: '2025-06-01',
		credentialId: 'lousynishant-jaads',
	},
	{
		name: 'Responsive Web Design',
		issuer: 'freeCodeCamp',
		issued: 'June 2025',
		issuedISO: '2025-06-01',
		credentialId: 'lousynishant-rwd',
	},
	{
		name: 'SQL (Basic)',
		issuer: 'HackerRank',
		issued: 'March 2025',
		issuedISO: '2025-03-01',
		url: 'https://www.hackerrank.com/certificates/c3e4298b5e2e',
	},
];

export interface Achievement {
	title: string;
	detail: string;
}

export const ACHIEVEMENTS: Achievement[] = [
	{
		title: 'Twice recommended by the Indian Air Force',
		detail:
			'Cleared the 5-day SSB twice — a multi-stage assessment of leadership, psychology and decision-making under pressure.',
	},
	{
		title: '150+ algorithmic problems solved',
		detail:
			'Across LeetCode, Codeforces and HackerRank, with a focus on time and space complexity.',
	},
	{
		title: 'Open-source contributor',
		detail:
			'Two PRs merged into ed-donner/llm_engineering (7k+ stars) totalling 1,400+ lines.',
	},
];
