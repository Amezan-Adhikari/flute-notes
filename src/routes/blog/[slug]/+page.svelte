<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
	import { blogPosts, recentPosts, popularTags, sidebarLinks } from '../data.js';

	export let data;

	$: post = data.post;
	$: console.log('data:', data);
	$: relatedPosts = blogPosts
		.filter((p) => p.slug !== post.slug && p.tags.some((tag) => post.tags.includes(tag)))
		.slice(0, 3);
</script>

<svelte:head>
	<title>{post.title} - Music Theory Blog</title>
	<meta name="description" content={post.excerpt} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt} />
	<meta property="og:type" content="article" />
</svelte:head>

<div
	class="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:px-8 xl:grid-cols-[250px_1fr_300px]"
>
	<!-- Left Sidebar -->
	<aside class="sticky top-8 order-3 h-fit rounded-lg bg-gray-50 p-6 xl:order-1">
		<div class="mb-8">
			<h3 class="mb-4 text-lg font-semibold text-slate-800">Navigation</h3>
			<nav class="flex flex-col gap-2">
				{#each sidebarLinks as link}
					<a
						href={link.href}
						class="rounded px-2 py-2 text-slate-600 transition-all duration-200 hover:bg-blue-500 hover:text-white"
					>
						{link.title}
					</a>
				{/each}
			</nav>
		</div>

		<div class="mb-8">
			<h3 class="mb-4 text-lg font-semibold text-slate-800">Table of Contents</h3>
			<div class="flex flex-col gap-1">
				<a
					href="#introduction"
					class="border-l-2 border-transparent px-2 py-1 text-sm text-slate-500 transition-all duration-200 hover:border-l-blue-500 hover:text-blue-500"
					>Introduction</a
				>
				<a
					href="#main-content"
					class="border-l-2 border-transparent px-2 py-1 text-sm text-slate-500 transition-all duration-200 hover:border-l-blue-500 hover:text-blue-500"
					>Main Content</a
				>
				<a
					href="#examples"
					class="border-l-2 border-transparent px-2 py-1 text-sm text-slate-500 transition-all duration-200 hover:border-l-blue-500 hover:text-blue-500"
					>Examples</a
				>
				<a
					href="#practice"
					class="border-l-2 border-transparent px-2 py-1 text-sm text-slate-500 transition-all duration-200 hover:border-l-blue-500 hover:text-blue-500"
					>Practice Tips</a
				>
				<a
					href="#conclusion"
					class="border-l-2 border-transparent px-2 py-1 text-sm text-slate-500 transition-all duration-200 hover:border-l-blue-500 hover:text-blue-500"
					>Conclusion</a
				>
			</div>
		</div>

		<div>
			<h3 class="mb-4 text-lg font-semibold text-slate-800">Quick Actions</h3>
			<div class="flex flex-col gap-2">
				<button
					class="cursor-pointer rounded border border-gray-300 bg-white px-2 py-2 text-center text-sm text-slate-600 transition-all duration-200 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
					on:click={() => window.print()}
				>
					📄 Print Article
				</button>
				<button
					class="cursor-pointer rounded border border-gray-300 bg-white px-2 py-2 text-center text-sm text-slate-600 transition-all duration-200 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
					on:click={() =>
						navigator.share && navigator.share({ title: post.title, url: window.location.href })}
				>
					🔗 Share Article
				</button>
				<a
					href="/blog"
					class="rounded border border-gray-300 bg-white px-2 py-2 text-center text-sm text-slate-600 no-underline transition-all duration-200 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
				>
					← Back to Blog
				</a>
			</div>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="order-1 overflow-hidden rounded-lg bg-white xl:order-2">
		<article class="p-8">
			<header class="mb-12 border-b border-gray-200 pb-8">
				<div class="mb-4 text-sm text-slate-500">
					<a href="/" class="text-blue-500 hover:underline">Home</a> →
					<a href="/blog" class="text-blue-500 hover:underline">Blog</a> →
					<span>{post.title}</span>
				</div>

				<h1 class="mb-6 text-4xl leading-tight font-bold text-slate-800">{post.title}</h1>

				<div
					class="mb-4 flex flex-col items-start justify-between gap-4 rounded-lg bg-gray-50 p-4 sm:flex-row sm:items-center sm:gap-0"
				>
					<div class="flex flex-col gap-1">
						<span class="font-semibold text-slate-800">By {post.author}</span>
						<span class="text-sm text-slate-500">
							{new Date(post.publishedAt).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</span>
					</div>
					<div class="flex items-center gap-4">
						<span class="text-sm text-slate-400">{post.readTime} minute read</span>
						{#if post.featured}
							<span
								class="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 text-xs font-medium text-white"
								>Featured</span
							>
						{/if}
					</div>
				</div>

				<div class="mb-6 flex flex-wrap gap-2">
					{#each post.tags as tag}
						<span class="rounded-full bg-gray-200 px-3 py-1 text-sm text-slate-800">{tag}</span>
					{/each}
				</div>

				<p class="text-xl leading-relaxed text-slate-500 italic">{post.excerpt}</p>
			</header>

			<div class="prose prose-lg prose-slate max-w-none">
				{@html post.content
					.replace(/\n/g, '<br>')
					.replace(/#{1,6} /g, (match) => {
						const level = match.length - 1;
						return `<h${level}>`;
					})
					.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
					.replace(/\*(.*?)\*/g, '<em>$1</em>')}
			</div>

			<footer class="mt-12 border-t border-gray-200 pt-8">
				<div class="mb-8 flex flex-col gap-4 sm:flex-row">
					<button
						class="rounded bg-blue-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600"
						on:click={() => alert('Thanks for liking this post!')}
					>
						👍 Like this post
					</button>
					<button
						class="rounded bg-green-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-green-600"
						on:click={() =>
							navigator.share && navigator.share({ title: post.title, url: window.location.href })}
					>
						🔗 Share
					</button>
				</div>

				<div class="rounded-lg bg-gray-50 p-6">
					<h3 class="mb-3 text-xl font-semibold text-slate-800">About the Author</h3>
					<p class="leading-relaxed text-slate-600">
						<strong class="text-slate-800">{post.author}</strong> is a music theory educator and composer
						with expertise in classical harmony and contemporary music analysis.
					</p>
				</div>
			</footer>
		</article>

		{#if relatedPosts.length > 0}
			<section class="px-8 pb-8">
				<h2 class="mb-6 text-2xl font-bold text-slate-800">Related Posts</h2>
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each relatedPosts as relatedPost}
						<article
							class="rounded-lg bg-gray-50 p-6 transition-shadow duration-200 hover:shadow-md"
						>
							<h3 class="mb-3 text-lg font-semibold">
								<a
									href="/blog/{relatedPost.slug}"
									class="text-slate-800 transition-colors duration-200 hover:text-blue-600"
								>
									{relatedPost.title}
								</a>
							</h3>
							<p class="mb-4 text-sm leading-relaxed text-slate-600">{relatedPost.excerpt}</p>
							<div class="flex items-center justify-between text-xs text-slate-500">
								<span>By {relatedPost.author}</span>
								<span>{relatedPost.readTime} min</span>
							</div>
						</article>
					{/each}
				</div>
			</section>
		{/if}
	</main>

	<!-- Right Sidebar -->
	<aside class="sticky top-8 order-2 h-fit rounded-lg bg-gray-50 p-6 xl:order-3">
		<div class="mb-8">
			<h3 class="mb-4 text-lg font-semibold text-slate-800">Recent Posts</h3>
			<div class="flex flex-col gap-4">
				{#each recentPosts as recentPost}
					<article class="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
						<h4 class="mb-2">
							<a
								href="/blog/{recentPost.slug}"
								class="text-sm leading-snug font-medium text-slate-700 transition-colors duration-200 hover:text-blue-600"
							>
								{recentPost.title}
							</a>
						</h4>
						<div class="flex items-center justify-between text-xs text-slate-500">
							<span>{new Date(recentPost.publishedAt).toLocaleDateString()}</span>
							<span>{recentPost.readTime} min</span>
						</div>
					</article>
				{/each}
			</div>
		</div>

		<div class="mb-8">
			<h3 class="mb-4 text-lg font-semibold text-slate-800">Popular Tags</h3>
			<div class="flex flex-wrap gap-2">
				{#each popularTags as tag}
					<a
						href="/blog?search={tag}"
						class="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-slate-600 transition-all duration-200 hover:bg-blue-500 hover:text-white"
					>
						{tag}
					</a>
				{/each}
			</div>
		</div>

		<div class="mb-8">
			<h3 class="mb-4 text-lg font-semibold text-slate-800">Music Theory Tools</h3>
			<nav class="flex flex-col gap-2">
				<a
					href="/tools/scale-finder"
					class="py-1 text-slate-600 transition-colors duration-200 hover:text-blue-600"
					>🎼 Scale Finder</a
				>
				<a
					href="/tools/chord-builder"
					class="py-1 text-slate-600 transition-colors duration-200 hover:text-blue-600"
					>🎹 Chord Builder</a
				>
				<a
					href="/tools/interval-trainer"
					class="py-1 text-slate-600 transition-colors duration-200 hover:text-blue-600"
					>🎵 Interval Trainer</a
				>
				<a
					href="/tools/metronome"
					class="py-1 text-slate-600 transition-colors duration-200 hover:text-blue-600"
					>⏱️ Metronome</a
				>
			</nav>
		</div>

		<div>
			<h3 class="mb-4 text-lg font-semibold text-slate-800">Newsletter</h3>
			<div class="rounded-lg border border-gray-200 bg-white p-4">
				<p class="mb-4 text-sm leading-relaxed text-slate-600">
					Get weekly music theory tips and new posts delivered to your inbox.
				</p>
				<form class="flex flex-col gap-3">
					<input
						type="email"
						placeholder="Your email address"
						required
						class="rounded border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
					<button
						type="submit"
						class="rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600"
					>
						Subscribe
					</button>
				</form>
			</div>
		</div>
	</aside>
</div>

<style>
	/* Only keeping styles that can't be easily replaced with Tailwind */
	.prose :global(h1),
	.prose :global(h2),
	.prose :global(h3),
	.prose :global(h4) {
		color: #1e293b;
		margin: 2rem 0 1rem 0;
		line-height: 1.3;
	}

	.prose :global(h1) {
		font-size: 2.5rem;
	}
	.prose :global(h2) {
		font-size: 2rem;
	}
	.prose :global(h3) {
		font-size: 1.75rem;
	}
	.prose :global(h4) {
		font-size: 1.5rem;
	}

	.prose :global(p) {
		margin: 1.5rem 0;
		color: #475569;
		line-height: 1.8;
	}

	.prose :global(ul),
	.prose :global(ol) {
		margin: 1.5rem 0;
		padding-left: 2rem;
		color: #475569;
	}

	.prose :global(ul) {
		list-style-type: disc;
	}
	.prose :global(ol) {
		list-style-type: decimal;
	}
	.prose :global(li) {
		margin: 0.5rem 0;
	}

	.prose :global(strong) {
		font-weight: 600;
		color: #1e293b;
	}
	.prose :global(em) {
		font-style: italic;
	}

	.prose :global(a) {
		color: #3b82f6;
		text-decoration: none;
	}
	.prose :global(a:hover) {
		text-decoration: underline;
	}

	.prose :global(code) {
		background: #f1f5f9;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-family: 'Courier New', Courier, monospace;
		color: #475569;
	}

	.prose :global(pre) {
		background: #f1f5f9;
		padding: 1rem;
		border-radius: 8px;
		overflow-x: auto;
		color: #475569;
	}
</style>
