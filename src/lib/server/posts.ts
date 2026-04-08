import matter from 'gray-matter';
import { marked } from 'marked';
import type { Post, PostMeta } from '$lib/types';

const postModules = import.meta.glob('/src/content/posts/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

marked.setOptions({
	gfm: true,
	breaks: false
});

function estimateReadingTime(markdown: string) {
	const plainText = markdown.replace(/[#*_`>\-]/g, ' ').replace(/\s+/g, ' ').trim();
	const words = plainText ? plainText.split(' ').length : 0;
	const minutes = Math.max(1, Math.ceil(words / 220));
	return `${minutes} 分钟`;
}

function normalizeTags(tags: unknown) {
	if (!Array.isArray(tags)) return [];
	return tags.map((tag) => String(tag));
}

function stripMarkdown(markdown: string) {
	return markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/[#>*_~\-]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function createPost(filePath: string, source: string): Post {
	const slug = filePath.split('/').pop()?.replace(/\.md$/, '') ?? 'post';
	const { data, content } = matter(source);

	const title = String(data.title ?? slug);
	const description = String(data.description ?? '');
	const date = String(data.date ?? new Date().toISOString().slice(0, 10));
	const tags = normalizeTags(data.tags);
	const published = data.published !== false;
	const readingTime = String(data.readingTime ?? estimateReadingTime(content));
	const cover = data.cover ? String(data.cover) : undefined;
	const html = marked.parse(content) as string;
	const searchableText = [title, description, tags.join(' '), stripMarkdown(content)].join(' ').toLowerCase();

	return {
		slug,
		title,
		description,
		date,
		tags,
		published,
		readingTime,
		cover,
		html,
		searchableText
	};
}

const allPosts = Object.entries(postModules)
	.map(([filePath, source]) => createPost(filePath, source))
	.filter((post) => post.published)
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const posts: Post[] = allPosts;
export const featuredPosts: PostMeta[] = posts.slice(0, 3).map(({ html: _html, ...meta }) => meta);
export const postMetas: PostMeta[] = posts.map(({ html: _html, ...meta }) => meta);

export function getPostBySlug(slug: string) {
	return posts.find((post) => post.slug === slug);
}

export function getAllSlugs() {
	return posts.map((post) => post.slug);
}

export function searchPosts(query: string) {
	const keyword = query.trim().toLowerCase();
	if (!keyword) return postMetas;

	return posts
		.filter((post) => (post.searchableText ?? '').includes(keyword))
		.map(({ html: _html, ...meta }) => meta);
}
