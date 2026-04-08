import { describe, expect, it } from 'vitest';
import { featuredPosts, getAllSlugs, getPostBySlug, postMetas, posts } from '$lib/server/posts';

describe('markdown post loader', () => {
	it('loads five published markdown posts', () => {
		expect(posts).toHaveLength(5);
		expect(postMetas).toHaveLength(5);
	});

	it('returns html content for a known slug', () => {
		const post = getPostBySlug('welcome-to-my-markdown-blog');
		expect(post?.html).toContain('<h2');
		expect(post?.title).toContain('Markdown');
	});

	it('builds featured posts and slug entries', () => {
		expect(featuredPosts).toHaveLength(3);
		expect(getAllSlugs()).toContain('github-pages-checklist');
	});
});
