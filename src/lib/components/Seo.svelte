<script lang="ts">
	let {
		title = '徐特的技术博客',
		description = '用 Svelte 5 记录前端工程化、实践总结与技术思考。'
	} = $props<{ title?: string; description?: string }>();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#0b1120" />
</svelte:head>
