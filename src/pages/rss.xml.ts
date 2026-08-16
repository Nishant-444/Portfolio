import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

import { getPublishedPosts, postPath } from '../lib/blog';
import { SITE, PERSON } from '../config/site';

export const GET: APIRoute = async (context) => {
	const posts = await getPublishedPosts();

	return rss({
		title: `${PERSON.name} — Writing`,
		description:
			'Notes on backend engineering, databases, AI infrastructure and running things in production.',
		site: context.site ?? SITE.url,
		trailingSlash: false,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: postPath(post),
			categories: post.data.tags,
			author: PERSON.email,
		})),
		customData: `<language>en</language><copyright>© ${new Date().getFullYear()} ${PERSON.name}</copyright>`,
	});
};
