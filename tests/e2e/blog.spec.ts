import { expect, test } from '@playwright/test';

test('home page shows upgraded hero content and navigates to markdown archive', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByRole('heading', { name: /用 Svelte 5 构建我的前端技术写作与知识沉淀空间/ })).toBeVisible();
	await page.getByRole('link', { name: '阅读最新文章' }).click();
	await expect(page).toHaveURL(/\/blog\/$/);
	await expect(page.getByRole('heading', { name: '技术文章库' })).toBeVisible();
});

test('blog detail page renders markdown article', async ({ page }) => {
	await page.goto('/blog/welcome-to-my-markdown-blog/');

	await expect(page.getByRole('heading', { name: '欢迎来到我的 Markdown 技术博客' })).toBeVisible();
	await expect(page.getByText('为什么要做一个技术博客')).toBeVisible();
});

test('theme toggle switches label', async ({ page }) => {
	await page.goto('/');

	const toggle = page.getByRole('button', { name: '切换主题' });
	const before = (await toggle.textContent()) ?? '';

	await toggle.click();
	await expect(toggle).not.toHaveText(before);
});

test('blog search filters posts by keyword', async ({ page }) => {
	await page.goto('/blog/');

	await page.getByPlaceholder('搜索标题、描述、标签或正文关键字').fill('长期成本');

	await expect(page.getByText('搜索词：')).toBeVisible();
	await expect(page.getByRole('link', { name: /前端工程化里最容易被忽视的长期成本/ })).toBeVisible();
	await expect(page.getByRole('link', { name: /欢迎来到我的 Markdown 技术博客/ })).toHaveCount(0);
});
