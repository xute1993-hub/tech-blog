<script lang="ts">
	import { base } from '$app/paths';
	import Seo from '$lib/components/Seo.svelte';
</script>

<Seo title="关于我 | 许特的技术博客" description="关于作者、写作主题和站点定位。" />

<section class="about-hero">
	<div class="intro-card">
		<p class="eyebrow">About the Author</p>
		<h1>你好，我是许特</h1>
		<p>
			一名前端开发者，持续关注 Svelte、前端工程化、性能优化与长期可维护的项目设计。
		</p>
		<p>
			我希望这个博客不是简单的“文章存放处”，而是一个能把知识、实践、复盘与个人方法论串联起来的技术空间。
		</p>
		<div class="chips">
			<span>Svelte 5</span>
			<span>Frontend Engineering</span>
			<span>Testing</span>
			<span>GitHub Pages</span>
		</div>
	</div>

	<div class="side-card">
		<h2>这个站点包含什么？</h2>
		<ul>
			<li>Markdown 驱动的写作系统</li>
			<li>Vitest 与 Playwright 测试</li>
			<li>深色 / 浅色主题切换</li>
			<li>GitHub Actions 自动部署</li>
		</ul>
		<a class="home-link" href={`${base}/`}>返回首页</a>
	</div>
</section>

<style>
	.about-hero {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
		gap: 1.25rem;
	}

	.intro-card,
	.side-card {
		padding: 2rem;
		border-radius: 1.75rem;
		background: linear-gradient(180deg, var(--card-bg), var(--card-bg-elevated));
		border: 1px solid var(--border-color);
		box-shadow: var(--shadow-soft);
		display: grid;
		gap: 1rem;
	}

	.eyebrow {
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 0.8rem;
		color: var(--accent);
	}

	h1,
	h2,
	p {
		margin: 0;
	}

	h1 {
		font-size: clamp(2.3rem, 5vw, 3.6rem);
		line-height: 1.1;
		color: var(--heading-color);
	}

	h2 {
		color: var(--heading-color);
	}

	p,
	li {
		color: var(--text-soft);
		line-height: 1.9;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.chips span {
		padding: 0.5rem 0.85rem;
		border-radius: 999px;
		background: var(--tag-bg);
		color: var(--tag-text);
		border: 1px solid var(--tag-border);
	}

	ul {
		margin: 0;
		padding-left: 1.15rem;
	}

	.home-link {
		color: var(--accent);
		font-weight: 700;
	}

	@media (max-width: 900px) {
		.about-hero {
			grid-template-columns: 1fr;
		}
	}
</style>
