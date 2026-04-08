<script lang="ts">
	import { base } from '$app/paths';
	import Seo from '$lib/components/Seo.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import type { PageData } from './$types';
	import type { PostMeta } from '$lib/types';

	type IndexedPost = PostMeta & { searchable: string };

	let { data } = $props<{ data: PageData }>();
	let search = $state('');

	const indexedPosts = $derived(
		data.posts.map(
			(post: PostMeta): IndexedPost => ({
				...post,
				searchable: [post.title, post.description, post.tags.join(' '), post.searchableText ?? '']
					.join(' ')
					.toLowerCase()
			})
		)
	);

	const filteredPosts = $derived.by((): PostMeta[] => {
		const keyword = search.trim().toLowerCase();
		if (!keyword) return data.posts;
		return indexedPosts
			.filter((post: IndexedPost) => post.searchable.includes(keyword))
			.map(({ searchable: _searchable, ...post }: IndexedPost) => post);
	});

	const allTags = $derived([...new Set(data.posts.flatMap((post: PostMeta) => post.tags))]);
</script>

<Seo title="文章归档 | 徐特的技术博客" description="浏览全部 Markdown 技术文章与实践总结。" />

<section class="page-header">
	<div>
		<p class="eyebrow">Markdown Archive</p>
		<h1>技术文章库</h1>
		<p class="description">
			所有文章均通过 Markdown 驱动生成，覆盖 Svelte 5、工程化、测试与部署实践。
		</p>
	</div>
	<div class="summary-card">
		<strong>{filteredPosts.length}</strong>
		<span>{search.trim() ? '篇搜索结果' : '篇已发布文章'}</span>
	</div>
</section>

<section class="search-form">
	<label class="search-box" for="blog-search">
		<span>🔎</span>
		<input
			id="blog-search"
			name="q"
			type="search"
			placeholder="搜索标题、描述、标签或正文关键字"
			bind:value={search}
		/>
	</label>
	<div class="search-actions">
		<button type="button" onclick={() => (search = '')}>清空</button>
	</div>
</section>

{#if !search.trim()}
	<section class="tag-cloud">
		{#each allTags as tag}
			<span>{tag}</span>
		{/each}
	</section>
{/if}

{#if search.trim()}
	<section class="search-summary">
		<p>
			搜索词：<strong>{search}</strong>
		</p>
		{#if filteredPosts.length === 0}
			<p>没有找到相关文章，请尝试更换关键词。</p>
		{/if}
	</section>
{/if}

<section class="post-grid">
	{#each filteredPosts as post}
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

	.summary-card,
	.search-form,
	.search-summary {
		padding: 1.4rem;
		border-radius: 1.5rem;
		border: 1px solid var(--border-color);
		background: linear-gradient(180deg, var(--card-bg), var(--card-bg-elevated));
		box-shadow: var(--shadow-soft);
	}

	.summary-card {
		display: grid;
		align-content: center;
		gap: 0.35rem;
	}

	.summary-card strong {
		font-size: 2.2rem;
		color: var(--heading-color);
	}

	.summary-card span,
	.search-summary p {
		color: var(--text-muted);
		margin: 0;
		line-height: 1.8;
	}

	.search-form {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.search-box {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.9rem 1rem;
		border-radius: 1rem;
		background: var(--surface-soft);
		border: 1px solid var(--border-color);
	}

	.search-box span {
		font-size: 1rem;
	}

	.search-box input {
		width: 100%;
		border: none;
		outline: none;
		background: transparent;
		color: var(--text-main);
		font: inherit;
	}

	.search-box input::placeholder {
		color: var(--text-muted);
	}

	.search-actions {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		justify-content: flex-end;
		flex-wrap: wrap;
	}

	.search-actions button {
		padding: 0.85rem 1.1rem;
		border-radius: 999px;
		font-weight: 700;
		border: 1px solid var(--border-color);
		background: var(--surface-soft);
		color: var(--text-main);
		cursor: pointer;
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

	.search-summary {
		margin-bottom: 1.5rem;
	}

	.search-summary strong {
		color: var(--heading-color);
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
		.post-grid,
		.search-form {
			grid-template-columns: 1fr;
		}

		.search-actions {
			justify-content: flex-start;
		}
	}
</style>
