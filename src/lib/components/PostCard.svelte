<script lang="ts">
	import { base } from '$app/paths';
	import type { PostMeta } from '$lib/types';

	let { post, featured = false } = $props<{ post: PostMeta; featured?: boolean }>();
</script>

<a class:featured class="post-card" href={`${base}/blog/${post.slug}/`}>
	<div class="card-top">
		<div class="meta">
			<span>{post.date}</span>
			<span>·</span>
			<span>{post.readingTime}</span>
		</div>
		<div class="arrow" aria-hidden="true">↗</div>
	</div>

	<div class="card-body">
		<h3>{post.title}</h3>
		<p>{post.description}</p>
	</div>

	<div class="tags">
		{#each post.tags as tag}
			<span>{tag}</span>
		{/each}
	</div>
</a>

<style>
	.post-card {
		display: grid;
		gap: 1.25rem;
		padding: 1.4rem;
		border-radius: 1.5rem;
		border: 1px solid var(--border-color);
		background: linear-gradient(180deg, var(--card-bg), var(--card-bg-elevated));
		box-shadow: var(--shadow-soft);
		transition:
			transform 0.22s ease,
			border-color 0.22s ease,
			box-shadow 0.22s ease,
			background 0.22s ease;
		position: relative;
		overflow: hidden;
	}

	.post-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at top right, var(--accent-glow), transparent 35%);
		opacity: 0;
		transition: opacity 0.22s ease;
		pointer-events: none;
	}

	.post-card:hover,
	.post-card:focus-visible {
		transform: translateY(-6px);
		border-color: var(--border-accent);
		box-shadow: var(--shadow-strong);
		outline: none;
	}

	.post-card:hover::before,
	.post-card:focus-visible::before {
		opacity: 1;
	}

	.featured {
		padding: 1.6rem;
	}

	.card-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.meta,
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		color: var(--text-muted);
		font-size: 0.9rem;
	}

	.arrow {
		width: 2rem;
		height: 2rem;
		display: grid;
		place-items: center;
		border-radius: 999px;
		background: var(--surface-soft);
		color: var(--text-soft);
	}

	.card-body {
		display: grid;
		gap: 0.8rem;
	}

	h3 {
		margin: 0;
		font-size: 1.35rem;
		line-height: 1.35;
		color: var(--heading-color);
	}

	p {
		margin: 0;
		color: var(--text-soft);
		line-height: 1.8;
	}

	.tags span {
		padding: 0.35rem 0.75rem;
		border-radius: 999px;
		background: var(--tag-bg);
		color: var(--tag-text);
		border: 1px solid var(--tag-border);
	}
</style>
