<script lang="ts">
	import { base } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const navItems = [
		{ href: '/', label: '首页' },
		{ href: '/blog', label: '文章' },
		{ href: '/about', label: '关于' }
	];

	const themeStorageKey = 'xt-blog-theme';
	let theme = $state<'dark' | 'light'>('dark');

	$effect(() => {
		if (typeof document === 'undefined') return;
		const stored = localStorage.getItem(themeStorageKey);
		const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		theme = stored === 'light' || stored === 'dark' ? stored : systemDark ? 'dark' : 'light';
		document.documentElement.dataset.theme = theme;
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		if (typeof document !== 'undefined') {
			document.documentElement.dataset.theme = theme;
			localStorage.setItem(themeStorageKey, theme);
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-shell">
	<div class="ambient ambient-a"></div>
	<div class="ambient ambient-b"></div>

	<header class="site-header">
		<div class="container header-inner">
			<a class="brand" href={`${base}/`}>
				<span class="brand-mark">XT</span>
				<span class="brand-copy">
					<strong>许特的技术博客</strong>
					<small>Frontend · Svelte · Engineering</small>
				</span>
			</a>

			<div class="nav-panel">
				<nav>
					{#each navItems as item}
						<a href={`${base}${item.href}`}>{item.label}</a>
					{/each}
				</nav>

				<button class="theme-toggle" type="button" onclick={toggleTheme} aria-label="切换主题">
					<span>{theme === 'dark' ? '☀️' : '🌙'}</span>
					<span>{theme === 'dark' ? '浅色' : '深色'}</span>
				</button>
			</div>
		</div>
	</header>

	<main class="container main-content">
		{@render children()}
	</main>

	<footer class="site-footer">
		<div class="container footer-inner">
			<div>
				<p class="footer-title">© 2026 许特</p>
				<p>Built with Svelte 5 · Markdown publishing · GitHub Pages deployment</p>
			</div>
			<div class="footer-meta">
				<span>持续记录前端工程化、Svelte 与真实项目实践</span>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(:root) {
		--bg-main: #07111f;
		--bg-secondary: #0f172a;
		--surface: rgba(10, 16, 31, 0.78);
		--surface-soft: rgba(255, 255, 255, 0.07);
		--card-bg: rgba(10, 16, 31, 0.82);
		--card-bg-elevated: rgba(18, 27, 48, 0.95);
		--border-color: rgba(148, 163, 184, 0.18);
		--border-accent: rgba(96, 165, 250, 0.42);
		--text-main: #e5eefb;
		--text-soft: #bfd0ea;
		--text-muted: #8ca3c2;
		--heading-color: #f8fbff;
		--accent: #79b8ff;
		--accent-strong: #4f8cff;
		--accent-glow: rgba(73, 135, 255, 0.24);
		--tag-bg: rgba(89, 133, 255, 0.12);
		--tag-text: #b7d4ff;
		--tag-border: rgba(104, 149, 255, 0.18);
		--shadow-soft: 0 18px 45px rgba(2, 6, 23, 0.18);
		--shadow-strong: 0 22px 55px rgba(37, 99, 235, 0.18);
	}

	:global(html[data-theme='light']) {
		--bg-main: #f3f7ff;
		--bg-secondary: #eaf0fb;
		--surface: rgba(255, 255, 255, 0.8);
		--surface-soft: rgba(15, 23, 42, 0.06);
		--card-bg: rgba(255, 255, 255, 0.88);
		--card-bg-elevated: rgba(247, 250, 255, 0.96);
		--border-color: rgba(100, 116, 139, 0.18);
		--border-accent: rgba(37, 99, 235, 0.32);
		--text-main: #142235;
		--text-soft: #334155;
		--text-muted: #64748b;
		--heading-color: #020617;
		--accent: #2563eb;
		--accent-strong: #1d4ed8;
		--accent-glow: rgba(37, 99, 235, 0.14);
		--tag-bg: rgba(37, 99, 235, 0.08);
		--tag-text: #1d4ed8;
		--tag-border: rgba(37, 99, 235, 0.12);
		--shadow-soft: 0 18px 40px rgba(148, 163, 184, 0.18);
		--shadow-strong: 0 22px 52px rgba(59, 130, 246, 0.16);
	}

	:global(body) {
		margin: 0;
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		background:
			radial-gradient(circle at top left, rgba(75, 129, 255, 0.16), transparent 25%),
			radial-gradient(circle at top right, rgba(34, 211, 238, 0.14), transparent 20%),
			linear-gradient(180deg, var(--bg-main) 0%, var(--bg-secondary) 100%);
		color: var(--text-main);
		min-height: 100vh;
		transition: background 0.25s ease, color 0.25s ease;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.app-shell {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr auto;
		position: relative;
		overflow: hidden;
	}

	.ambient {
		position: fixed;
		border-radius: 999px;
		filter: blur(60px);
		opacity: 0.55;
		pointer-events: none;
		z-index: 0;
	}

	.ambient-a {
		width: 18rem;
		height: 18rem;
		top: 4rem;
		left: -4rem;
		background: rgba(59, 130, 246, 0.18);
	}

	.ambient-b {
		width: 22rem;
		height: 22rem;
		top: 14rem;
		right: -8rem;
		background: rgba(45, 212, 191, 0.14);
	}

	.container {
		width: min(1160px, calc(100% - 2rem));
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}

	.site-header {
		position: sticky;
		top: 0;
		z-index: 10;
		backdrop-filter: blur(24px);
		background: color-mix(in srgb, var(--surface) 86%, transparent);
		border-bottom: 1px solid var(--border-color);
	}

	.header-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 0;
		gap: 1rem;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 0.9rem;
	}

	.brand-mark {
		width: 2.8rem;
		height: 2.8rem;
		display: grid;
		place-items: center;
		border-radius: 1rem;
		background: linear-gradient(135deg, var(--accent), var(--accent-strong));
		color: white;
		font-weight: 900;
		box-shadow: var(--shadow-soft);
	}

	.brand-copy {
		display: grid;
		gap: 0.15rem;
	}

	.brand-copy strong {
		font-size: 0.98rem;
		color: var(--heading-color);
	}

	.brand-copy small {
		color: var(--text-muted);
	}

	.nav-panel {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	nav {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
		padding: 0.35rem;
		border-radius: 999px;
		background: var(--surface-soft);
		border: 1px solid var(--border-color);
	}

	nav a,
	.theme-toggle {
		padding: 0.7rem 1rem;
		border-radius: 999px;
		color: var(--text-soft);
		font-weight: 600;
		border: none;
		background: transparent;
	}

	nav a:hover,
	.theme-toggle:hover {
		background: var(--surface-soft);
		color: var(--heading-color);
	}

	.theme-toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		cursor: pointer;
		border: 1px solid var(--border-color);
		background: color-mix(in srgb, var(--surface) 80%, transparent);
	}

	.main-content {
		padding: 3rem 0 4rem;
	}

	.site-footer {
		border-top: 1px solid var(--border-color);
		background: color-mix(in srgb, var(--surface) 84%, transparent);
	}

	.footer-inner {
		padding: 1.6rem 0 2.5rem;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		color: var(--text-muted);
	}

	.footer-title {
		margin: 0 0 0.3rem;
		color: var(--heading-color);
		font-weight: 700;
	}

	.footer-inner p,
	.footer-inner span {
		margin: 0;
		line-height: 1.8;
	}

	@media (max-width: 820px) {
		.header-inner,
		.footer-inner,
		.nav-panel {
			flex-direction: column;
			align-items: flex-start;
		}

		nav {
			width: 100%;
			justify-content: flex-start;
		}
	}
</style>
