<script lang="ts">
	import { base } from '$app/paths';
	import Seo from '$lib/components/Seo.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import type { PageData } from './$types';
	import type { PostMeta } from '$lib/types';

	let { data } = $props<{ data: PageData }>();
	const allTags = $derived([...new Set(data.posts.flatMap((post: PostMeta) => post.tags))]);
</script>

<Seo title="文章归档 | 许特的技术博客" description="浏览全部 Markdown 技术文章与实践总结。" />

<section class="page-header">
	<div>
		<p class="eyebrow">Markdown Archive</p>
		<h1>技术文章库</h1>
		<p class="description">
			所有文章均通过 Markdown 驱动生成，覆盖 Svelte 5、工程化、测试与部署实践。
		</p>
	</div>
	<div class="summary-card">
		<strong>{data.posts.length}</strong>
		<span>篇已发布文章</span>
	</div>
</section>

<section class="tag-cloud">
	{#each allTags as tag}
		<span>{tag}</span>
	{/each}
</section>

<section class="post-grid">
	{#each data.posts as post}
		<PostCard {post} />
	{/each}
</section>

<div class="back-home">
	<a href={`${base}/`}>← 返回首页</a>
</div>

<style>
	.page-header {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 220px;
		gap: 1rem;
		align-items: stretch;
		margin-bottom: 1.5rem;
	}

	.eyebrow {
		margin: 0 0 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 0.8rem;
		color: var(--accent);
	}

	h1 {
		margin: 0;
		font-size: clamp(2.2rem, 5vw, 3.8rem);
		line-height: 1.1;
		color: var(--heading-color);
	}

	.description {
		margin: 1rem 0 0;
		color: var(--text-soft);
		line-height: 1.9;
		max-width: 60ch;
	}

	.summary-card {
		padding: 1.4rem;
		border-radius: 1.5rem;
		border: 1px solid var(--border-color);
		background: linear-gradient(180deg, var(--card-bg), var(--card-bg-elevated));
		box-shadow: var(--shadow-soft);
		display: grid;
		align-content: center;
		gap: 0.35rem;
	}

	.summary-card strong {
		font-size: 2.2rem;
		color: var(--heading-color);
	}

	.summary-card span {
		color: var(--text-muted);
	}

	.tag-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.tag-cloud span {
		padding: 0.55rem 0.9rem;
		border-radius: 999px;
		background: var(--tag-bg);
		color: var(--tag-text);
		border: 1px solid var(--tag-border);
	}

	.post-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.25rem;
	}

	.back-home {
		margin-top: 2rem;
	}

	.back-home a {
		color: var(--accent);
		font-weight: 600;
	}

	@media (max-width: 860px) {
		.page-header,
		.post-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
