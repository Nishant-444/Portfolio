import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Newest first, drafts excluded outside of `astro dev`. */
export async function getPublishedPosts(): Promise<Post[]> {
	const posts = await getCollection('blog', ({ data }) =>
		import.meta.env.PROD ? !data.draft : true,
	);
	return posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

const WORDS_PER_MINUTE = 200;

export function readingTime(body: string | undefined): number {
	if (!body) return 1;
	const words = body.trim().split(/\s+/).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const formatter = new Intl.DateTimeFormat('en-GB', {
	day: 'numeric',
	month: 'short',
	year: 'numeric',
	timeZone: 'UTC',
});

export function formatDate(date: Date): string {
	return formatter.format(date);
}

export function postPath(post: Post): string {
	return `/blog/${post.id}`;
}
