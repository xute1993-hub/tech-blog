<script lang="ts">
	import { base } from '$app/paths';
	import Seo from '$lib/components/Seo.svelte';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
</script>

<Seo title={`${data.post.title} | 徐特的技术博客`} description={data.post.description} />

<article class="post-detail">
	<div class="post-header">
		<a class="back-link" href={`${base}/blog/`}>← 返回文章列表</a>
		<div class="post-intro">
			<p class="meta">{data.post.date} · {data.post.readingTime}</p>
			<h1>{data.post.title}</h1>
			<p class="description">{data.post.description}</p>
			<div class="tags">
				{#each data.post.tags as tag}
					<span>{tag}</span>
				{/each}
			</div>
		</div>
	</div>

	<div class="content prose">{@html data.post.html}</div>
</article>

<style>
	.post-detail {
		max-width: 920px;
		margin: 0 auto;
		display: grid;
		gap: 1.5rem;
	}

	.post-header,
	.content {
		padding: 2rem;
		border-radius: 1.75rem;
		background: linear-gradient(180deg, var(--card-bg), var(--card-bg-elevated));
		border: 1px solid var(--border-color);
		box-shadow: var(--shadow-soft);
	}

	.back-link {
		display: inline-flex;
		margin-bottom: 1.3rem;
		color: var(--accent);
		font-weight: 600;
	}

	.meta {
		margin: 0;
		color: var(--text-muted);
	}

	h1 {
		margin: 1rem 0;
		font-size: clamp(2.2rem, 5vw, 3.6rem);
		line-height: 1.1;
		letter-spacing: -0.03em;
		color: var(--heading-color);
	}

	.description {
		margin: 0;
		color: var(--text-soft);
		line-height: 1.9;
		max-width: 60ch;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}

	.tags span {
		padding: 0.45rem 0.85rem;
		border-radius: 999px;
		background: var(--tag-bg);
		color: var(--tag-text);
		border: 1px solid var(--tag-border);
	}

	.prose :global(h2),
	.prose :global(h3) {
		color: var(--heading-color);
		line-height: 1.25;
		margin: 2rem 0 1rem;
	}

	.prose :global(h2) {
		font-size: 1.8rem;
	}

	.prose :global(h3) {
		font-size: 1.35rem;
	}

	.prose :global(p),
	.prose :global(li) {
		color: var(--text-soft);
		line-height: 1.95;
		font-size: 1.04rem;
	}

	.prose :global(ul),
	.prose :global(ol) {
		padding-left: 1.4rem;
	}

	.prose :global(code) {
		padding: 0.15rem 0.45rem;
		border-radius: 0.5rem;
		background: var(--surface-soft);
		font-family: 'Cascadia Code', 'Fira Code', monospace;
		font-size: 0.92em;
	}

	.prose :global(pre) {
		padding: 1rem 1.2rem;
		border-radius: 1rem;
		background: rgba(15, 23, 42, 0.94);
		overflow-x: auto;
	}

	:global(html[data-theme='light']) .prose :global(pre) {
		background: #edf3ff;
	}

	.prose :global(blockquote) {
		margin: 1.5rem 0;
		padding: 0.2rem 0 0.2rem 1rem;
		border-left: 3px solid var(--accent);
		color: var(--text-muted);
	}
</style>
