import { error } from '@sveltejs/kit';
import { getAllSlugs, getPostBySlug } from '$lib/server/posts';

export function entries() {
	return getAllSlugs().map((slug) => ({ slug }));
}

export function load({ params }) {
	const post = getPostBySlug(params.slug);

	if (!post) {
		throw error(404, '文章不存在');
	}

	return { post };
}
