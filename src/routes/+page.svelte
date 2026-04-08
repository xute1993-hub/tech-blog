<script lang="ts">
	import { base } from '$app/paths';
	import Seo from '$lib/components/Seo.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
</script>

<Seo />

<section class="hero">
	<div class="hero-copy">
		<div class="eyebrow-pill">
			<span class="status-dot"></span>
			<span>Personal Knowledge OS</span>
		</div>
		<h1>用 <span>Svelte 5</span> 构建我的前端技术写作与知识沉淀空间</h1>
		<p class="lead">
			围绕前端工程化、Svelte、性能优化、测试体系和个人项目实践，持续发布可复用、可沉淀、可检索的技术内容。
		</p>
		<div class="actions">
			<a class="primary" href={`${base}/blog/`}>阅读最新文章</a>
			<a class="secondary" href={`${base}/about/`}>了解作者与站点</a>
		</div>
		<div class="hero-meta">
			<div>
				<strong>{data.featuredPosts.length}+</strong>
				<span>精选文章</span>
			</div>
			<div>
				<strong>Markdown</strong>
				<span>内容驱动</span>
			</div>
			<div>
				<strong>GitHub Pages</strong>
				<span>自动部署</span>
			</div>
		</div>
	</div>

	<div class="hero-panel">
		<div class="panel-window">
			<div class="window-dots">
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div class="code-block">
				<p><span>$</span> npm run build</p>
				<p><span>✓</span> markdown posts parsed</p>
				<p><span>✓</span> tests passed</p>
				<p><span>✓</span> deployed to github pages</p>
			</div>
		</div>
	</div>
</section>

<section class="section-header">
	<div>
		<p class="eyebrow">Featured Posts</p>
		<h2>最近发布的文章</h2>
	</div>
	<a class="section-link" href={`${base}/blog/`}>查看全部文章</a>
</section>

<section class="featured-grid">
	{#each data.featuredPosts as post, index}
		<PostCard {post} featured={index === 0} />
	{/each}
</section>

<section class="insight-grid">
	<div class="insight-card">
		<p class="eyebrow">Writing Focus</p>
		<h3>写我真正会反复回看的内容</h3>
		<p>
			不追热点堆砌，而是记录项目里真正出现过的问题、做过的决策以及后续的复盘结果。
		</p>
	</div>
	<div class="insight-card">
		<p class="eyebrow">Topics</p>
		<ul>
			<li>Svelte 5 与 SvelteKit 实践</li>
			<li>前端工程化与维护性</li>
			<li>性能优化与发布链路</li>
			<li>测试策略与个人项目方法论</li>
		</ul>
	</div>
</section>

<style>
	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
		gap: 1.5rem;
		align-items: stretch;
	}

	.hero-copy,
	.hero-panel,
	.insight-card {
		border-radius: 1.75rem;
		border: 1px solid var(--border-color);
		background: linear-gradient(180deg, var(--card-bg), var(--card-bg-elevated));
		box-shadow: var(--shadow-soft);
	}

	.hero-copy {
		padding: 2rem;
		display: grid;
		gap: 1.35rem;
	}

	.eyebrow-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		width: fit-content;
		padding: 0.55rem 0.85rem;
		border-radius: 999px;
		background: var(--surface-soft);
		border: 1px solid var(--border-color);
		color: var(--text-soft);
		font-size: 0.9rem;
	}

	.status-dot {
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 999px;
		background: #22c55e;
		box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.12);
	}

	h1,
	h2,
	h3 {
		margin: 0;
		color: var(--heading-color);
		line-height: 1.15;
	}

	h1 {
		font-size: clamp(2.5rem, 6vw, 4.7rem);
		letter-spacing: -0.04em;
	}

	h1 span {
		background: linear-gradient(135deg, var(--accent), #22d3ee);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.lead {
		margin: 0;
		font-size: 1.06rem;
		line-height: 1.95;
		color: var(--text-soft);
		max-width: 60ch;
	}

	.actions {
		display: flex;
		gap: 0.9rem;
		flex-wrap: wrap;
	}

	.actions a,
	.section-link {
		padding: 0.9rem 1.25rem;
		border-radius: 999px;
		font-weight: 700;
	}

	.primary {
		background: linear-gradient(135deg, var(--accent), var(--accent-strong));
		color: white;
		box-shadow: var(--shadow-soft);
	}

	.secondary,
	.section-link {
		background: var(--surface-soft);
		border: 1px solid var(--border-color);
		color: var(--text-main);
	}

	.hero-meta {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.9rem;
	}

	.hero-meta div {
		padding: 1rem;
		border-radius: 1.2rem;
		background: var(--surface-soft);
		border: 1px solid var(--border-color);
		display: grid;
		gap: 0.4rem;
	}

	.hero-meta strong {
		font-size: 1.15rem;
	}

	.hero-meta span,
	.insight-card p,
	.insight-card li {
		color: var(--text-soft);
		line-height: 1.8;
	}

	.hero-panel {
		padding: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.panel-window {
		width: 100%;
		padding: 1rem;
		border-radius: 1.4rem;
		background: rgba(2, 6, 23, 0.9);
		border: 1px solid rgba(148, 163, 184, 0.16);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
	}

	:global(html[data-theme='light']) .panel-window {
		background: #dfe8f7;
	}

	.window-dots {
		display: flex;
		gap: 0.45rem;
		margin-bottom: 1rem;
	}

	.window-dots span {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 999px;
		background: rgba(148, 163, 184, 0.4);
	}

	.code-block {
		display: grid;
		gap: 0.85rem;
		padding: 1.25rem;
		border-radius: 1rem;
		background: rgba(15, 23, 42, 0.94);
		font-family: 'Cascadia Code', 'Fira Code', monospace;
		color: #dbeafe;
	}

	:global(html[data-theme='light']) .code-block {
		background: white;
		color: #1e293b;
	}

	.code-block p {
		margin: 0;
	}

	.code-block span {
		color: #38bdf8;
		margin-right: 0.6rem;
	}

	.section-header {
		margin: 2.6rem 0 1.4rem;
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: 1rem;
	}

	.eyebrow {
		margin: 0 0 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 0.8rem;
		color: var(--accent);
	}

	.featured-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.25rem;
	}

	.featured-grid :global(.featured) {
		grid-column: span 2;
	}

	.insight-grid {
		margin-top: 1.8rem;
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: 1.25rem;
	}

	.insight-card {
		padding: 1.6rem;
		display: grid;
		gap: 1rem;
	}

	.insight-card ul {
		margin: 0;
		padding-left: 1.15rem;
	}

	@media (max-width: 960px) {
		.hero,
		.featured-grid,
		.insight-grid {
			grid-template-columns: 1fr;
		}

		.featured-grid :global(.featured) {
			grid-column: auto;
		}

		.hero-meta {
			grid-template-columns: 1fr;
		}

		.section-header {
			align-items: flex-start;
			flex-direction: column;
		}
	}
</style>
