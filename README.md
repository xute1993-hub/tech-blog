# tech-blog

一个基于 **Svelte 5 + SvelteKit** 构建的个人技术博客，现已升级为：

- **Markdown 内容驱动**
- **更高级的科技感 UI**
- **深色 / 浅色主题切换**
- **Vitest 单元测试**
- **Playwright E2E 测试**
- **GitHub Actions 自动部署到 GitHub Pages**

## 当前功能

- 首页展示精选文章与站点定位
- 文章列表页自动读取 Markdown 文章
- 文章详情页自动渲染 Markdown 为 HTML
- 关于页面展示作者与站点信息
- 支持深色 / 浅色主题切换并记忆主题偏好
- 支持 GitHub Pages 静态部署

## 技术栈

- Svelte 5
- SvelteKit
- TypeScript
- gray-matter
- marked
- Vitest
- Testing Library
- Playwright
- GitHub Actions
- GitHub Pages

## 文章系统

Markdown 文章目录：

```text
src/content/posts/
```

每篇文章都使用 Frontmatter，例如：

```md
---
title: 示例文章
description: 文章描述
date: 2026-04-08
tags:
  - Svelte
  - Frontend
published: true
---

## 正文标题

正文内容
```

当前已内置 5 篇前端技术文章。

## 本地开发

```bash
npm install
npm run dev -- --open
```

## 本地检查与测试

```bash
npm run check
npm run test:unit
npm run test:e2e
```

或直接执行：

```bash
npm test
```

## 构建

```bash
npm run build
npm run preview
```

## GitHub Pages 部署说明

当前仓库名为：`tech-blog`

因此构建时会自动使用：

```bash
BASE_PATH=/tech-blog
```

部署地址预计为：

```text
https://xute1993-hub.github.io/tech-blog/
```

## 初始化 Git 并推送到 GitHub

如果你还没有初始化仓库，可在项目目录执行：

```bash
git init
git add .
git commit -m "feat: upgrade blog with markdown system and premium UI"
git branch -M main
git remote add origin https://github.com/xute1993-hub/tech-blog.git
git push -u origin main
```

## 开启 GitHub Pages

推送完成后，到 GitHub 仓库设置中检查：

- `Settings`
- `Pages`
- `Build and deployment`
- `Source` 选择 **GitHub Actions**

之后每次 push 到 `main`，都会自动执行：

- 类型检查
- 单元测试
- E2E 测试
- 构建
- 部署到 GitHub Pages

## 后续可扩展方向

- 文章标签筛选
- 全文搜索
- RSS 订阅
- sitemap / robots / 更完整 SEO
- Markdown 代码高亮
- 评论系统
