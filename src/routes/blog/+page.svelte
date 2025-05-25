<!-- src/routes/blog/+page.svelte -->
<script>
	import { blogPosts, categories, recentPosts, popularTags, sidebarLinks } from './data.js';

	let selectedCategory = 'All Posts';
	let searchQuery = '';

	$: filteredPosts = blogPosts.filter((post) => {
		const matchesCategory =
			selectedCategory === 'All Posts' ||
			post.tags.some((tag) => {
				const normalizedTag = tag.toLowerCase().replace('-', ' ');
				const normalizedCategory = selectedCategory.toLowerCase().replace('&', '').trim();
				return (
					normalizedTag.includes(normalizedCategory) ||
					normalizedCategory.includes(normalizedTag.split(' ')[0])
				);
			});
		const matchesSearch =
			searchQuery === '' ||
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

		return matchesCategory && matchesSearch;
	});

	$: featuredPosts = blogPosts.filter((post) => post.featured);
</script>

<svelte:head>
	<title>Music Theory Blog - Learn Music Theory and Classical Harmony</title>
	<meta
		name="description"
		content="Explore music theory, classical harmony, scales, modes, and composition techniques through our comprehensive blog posts."
	/>
</svelte:head>

<div
	class="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[250px_1fr] lg:gap-8 lg:px-8 xl:grid-cols-[250px_1fr_300px]"
>
	<!-- Left Sidebar -->
	<aside class="sticky top-8 order-3 h-fit rounded-lg bg-gray-50 p-6 lg:order-1">
		<div class="mb-8">
			<h3 class="mb-4 text-lg font-semibold text-slate-800">Navigation</h3>
			<nav class="flex flex-col gap-2">
				{#each sidebarLinks as link}
					<a
						href={link.href}
						class="rounded px-3 py-2 text-slate-600 transition-all duration-200 hover:bg-blue-500 hover:text-white"
						class:bg-blue-500={link.href === '/blog'}
						class:text-white={link.href === '/blog'}
					>
						{link.title}
					</a>
				{/each}
			</nav>
		</div>

		<div class="mb-8">
			<h3 class="mb-4 text-lg font-semibold text-slate-800">Categories</h3>
			<div class="flex flex-col gap-2">
				{#each categories as category}
					<button
						class="rounded border border-gray-300 bg-white px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
						class:bg-blue-500={selectedCategory === category}
						class:text-white={selectedCategory === category}
						class:border-blue-500={selectedCategory === category}
						class:hover:bg-blue-600={selectedCategory === category}
						on:click={() => (selectedCategory = category)}
					>
						{category}
					</button>
				{/each}
			</div>
		</div>

		<div>
			<h3 class="mb-4 text-lg font-semibold text-slate-800">Search</h3>
			<input
				type="search"
				placeholder="Search posts..."
				bind:value={searchQuery}
				class="w-full rounded border border-gray-300 px-3 py-3 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="order-1 rounded-lg bg-white p-6 sm:p-8 lg:order-2">
		<header class="mb-12 text-center">
			<h1 class="mb-2 text-4xl font-bold text-slate-800">Learn Music Theory and Flute</h1>
			<p class="text-lg text-slate-500">
				Explore the fundamentals of music theory, classical harmony, and composition
			</p>
		</header>

		<!-- Featured Posts -->
		{#if featuredPosts.length > 0 && selectedCategory === 'All Posts' && searchQuery === ''}
			<section class="mb-12">
				<h2 class="mb-6 text-2xl font-bold text-slate-800">Featured Posts</h2>
				<div class="grid gap-8 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
					{#each featuredPosts as post}
						<article
							class="rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
						>
							<div class="mb-4 flex flex-wrap gap-4 text-sm opacity-90">
								<span>By {post.author}</span>
								<span>{new Date(post.publishedAt).toLocaleDateString()}</span>
								<span>{post.readTime} min read</span>
							</div>
							<h3 class="mb-4 text-xl font-semibold">
								<a
									href="/blog/{post.slug}"
									class="text-white transition-colors duration-200 hover:text-gray-200"
								>
									{post.title}
								</a>
							</h3>
							<p class="mb-4 leading-relaxed opacity-90">{post.excerpt}</p>
							<div class="flex flex-wrap gap-2">
								{#each post.tags as tag}
									<span class="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm"
										>{tag}</span
									>
								{/each}
							</div>
						</article>
					{/each}
				</div>
			</section>
		{/if}

		<!-- All Posts -->
		<section>
			<h2 class="mb-8 flex flex-wrap items-center gap-4 text-2xl font-bold text-slate-800">
				<span>
					{selectedCategory === 'All Posts' ? 'All Posts' : `Posts in ${selectedCategory}`}
				</span>
				{#if searchQuery}
					<span class="text-lg font-normal text-slate-500">matching "{searchQuery}"</span>
				{/if}
				<span class="text-lg font-normal text-slate-400">({filteredPosts.length})</span>
			</h2>

			{#if filteredPosts.length === 0}
				<div class="py-12 text-center">
					<p class="mb-4 text-lg text-slate-500">No posts found matching your criteria.</p>
					<button
						class="rounded bg-blue-500 px-6 py-3 text-white transition-colors duration-200 hover:bg-blue-600"
						on:click={() => {
							selectedCategory = 'All Posts';
							searchQuery = '';
						}}
					>
						Clear filters
					</button>
				</div>
			{:else}
				<div class="grid gap-8">
					{#each filteredPosts as post}
						<article
							class="rounded-lg border-l-4 border-blue-500 bg-gray-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							<div
								class="mb-4 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:gap-4"
							>
								<span>By {post.author}</span>
								<span>{new Date(post.publishedAt).toLocaleDateString()}</span>
								<span>{post.readTime} min read</span>
							</div>
							<h3 class="mb-4 text-xl font-semibold">
								<a
									href="/blog/{post.slug}"
									class="text-slate-800 transition-colors duration-200 hover:text-blue-600"
								>
									{post.title}
								</a>
							</h3>
							<p class="mb-4 leading-relaxed text-slate-600">{post.excerpt}</p>
							<div class="mb-4 flex flex-wrap gap-2">
								{#each post.tags as tag}
									<span class="rounded-full bg-gray-200 px-3 py-1 text-sm text-slate-800"
										>{tag}</span
									>
								{/each}
							</div>
							<a
								href="/blog/{post.slug}"
								class="font-medium text-blue-500 transition-all duration-200 hover:text-blue-600 hover:underline"
							>
								Read More →
							</a>
						</article>
					{/each}
				</div>
			{/if}
		</section>
	</main>

	<!-- Right Sidebar -->
	<aside class="sticky top-8 order-2 h-fit rounded-lg bg-gray-50 p-6 lg:order-3">
		<div class="mb-8">
			<h3 class="mb-4 text-lg font-semibold text-slate-800">Recent Posts</h3>
			<div class="flex flex-col gap-4">
				{#each recentPosts as post}
					<article class="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
						<h4 class="mb-2">
							<a
								href="/blog/{post.slug}"
								class="text-sm leading-snug font-medium text-slate-700 transition-colors duration-200 hover:text-blue-600"
							>
								{post.title}
							</a>
						</h4>
						<div class="flex items-center justify-between text-xs text-slate-500">
							<span>{new Date(post.publishedAt).toLocaleDateString()}</span>
							<span>{post.readTime} min</span>
						</div>
					</article>
				{/each}
			</div>
		</div>

		<div class="mb-8">
			<h3 class="mb-4 text-lg font-semibold text-slate-800">Popular Tags</h3>
			<div class="flex flex-wrap gap-2">
				{#each popularTags as tag}
					<button
						class="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-slate-600 transition-all duration-200 hover:bg-blue-500 hover:text-white"
						on:click={() => (searchQuery = tag)}
					>
						{tag}
					</button>
				{/each}
			</div>
		</div>

		<div>
			<h3 class="mb-4 text-lg font-semibold text-slate-800">Music Theory Resources</h3>
			<nav class="flex flex-col gap-2">
				<a
					href="/theory/scales"
					class="rounded px-3 py-2 text-slate-600 transition-all duration-200 hover:bg-blue-500 hover:text-white"
					>Scale Reference</a
				>
				<a
					href="/theory/chords"
					class="rounded px-3 py-2 text-slate-600 transition-all duration-200 hover:bg-blue-500 hover:text-white"
					>Chord Charts</a
				>
				<a
					href="/theory/circle-of-fifths"
					class="rounded px-3 py-2 text-slate-600 transition-all duration-200 hover:bg-blue-500 hover:text-white"
					>Circle of Fifths</a
				>
				<a
					href="/theory/modes"
					class="rounded px-3 py-2 text-slate-600 transition-all duration-200 hover:bg-blue-500 hover:text-white"
					>Mode Explorer</a
				>
			</nav>
		</div>
	</aside>
</div>
