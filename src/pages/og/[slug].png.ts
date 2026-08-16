import type { APIRoute, GetStaticPaths } from 'astro';

import { renderOgImage, type OgOptions } from '../../lib/og';
import { getPublishedPosts, formatDate } from '../../lib/blog';
import { SITE, PERSON } from '../../config/site';

/**
 * One card per page, generated at build time. `command` is the terminal
 * command that would show the same content, which keeps the social preview
 * on-brand with the site itself.
 */
const STATIC_CARDS: Record<string, OgOptions> = {
	index: {
		command: 'whoami',
		title: PERSON.name,
		subtitle: SITE.tagline,
		// The title already carries the name, so the byline says something new.
		footerText: `${PERSON.location.city}, ${PERSON.location.country} · ${PERSON.availability}`,
	},
	about: {
		command: 'about',
		title: 'About',
		subtitle:
			'Backend APIs, RAG pipelines and the cloud infrastructure underneath them.',
	},
	experience: {
		command: 'experience',
		title: 'Experience',
		subtitle:
			'Full Stack Developer Intern at Zytexa Technology · Software Engineer Intern at Pratham Softwares.',
	},
	projects: {
		command: 'projects',
		title: 'Projects',
		subtitle:
			'VizTube · EchoInbox · Job Application Tracker · AppraiseHub · BankEase',
	},
	skills: {
		command: 'skills',
		title: 'Technical Skills',
		subtitle:
			'TypeScript · Node.js · FastAPI · Spring Boot · PostgreSQL · pgvector · AWS · Docker',
	},
	credentials: {
		command: 'certs',
		title: 'Certifications & Achievements',
		subtitle:
			'Microsoft GitHub Foundations · freeCodeCamp · HackerRank · twice SSB-recommended',
	},
	contact: {
		command: 'contact',
		title: 'Contact',
		subtitle: PERSON.availability,
	},
	blog: {
		command: 'blogs',
		title: 'Writing',
		subtitle: 'Notes from building and running things in production.',
	},
	'404': {
		command: 'cd /dev/null',
		title: '404 — not found',
		subtitle: 'No such file or directory.',
	},
};

export const getStaticPaths = (async () => {
	const posts = await getPublishedPosts();

	return [
		...Object.entries(STATIC_CARDS).map(([slug, card]) => ({
			params: { slug },
			props: { card },
		})),
		...posts.map((post) => ({
			params: { slug: `post-${post.id}` },
			props: {
				card: {
					command: `cat blog/${post.id}.md`,
					title: post.data.title,
					subtitle: post.data.description,
					badge: formatDate(post.data.pubDate),
				} satisfies OgOptions,
			},
		})),
	];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
	const png = await renderOgImage((props as { card: OgOptions }).card);
	return new Response(new Uint8Array(png), {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
};
