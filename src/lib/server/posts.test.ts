import { describe, expect, it } from 'vitest';
import { featuredPosts, getAllSlugs, getPostBySlug, postMetas, posts, searchPosts } from '$lib/server/posts';

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

	it('supports full-text search by title, tag and content', () => {
		expect(searchPosts('Svelte 5').length).toBeGreaterThan(0);
		expect(searchPosts('GitHub Pages').some((post) => post.slug === 'github-pages-checklist')).toBe(true);
		expect(searchPosts('知识结构').some((post) => post.slug === 'welcome-to-my-markdown-blog')).toBe(true);
	});

	it('returns all posts for empty search', () => {
		expect(searchPosts('')).toHaveLength(postMetas.length);
	});
});
