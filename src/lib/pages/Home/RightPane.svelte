<script>
	import { goto } from '$app/navigation';

	// @ts-nocheck

	import { getTrendingSongs } from '$lib/apiHooks/useSongs';
	import { formatPlays } from '$lib/utiils';

	// Use the Svelte Query hook for trending songs
	const trendingSongsQuery = getTrendingSongs();
</script>

<!-- Right Sidebar (Trending) - hidden on mobile -->
<div
	class="hidden h-screen flex-col overflow-y-auto border-l border-gray-200 bg-gray-50 p-6 md:flex md:w-80 lg:w-96"
>
	<!-- Trending Songs Section -->
	<div class="mb-4">
		<h2 class="mb-4 font-[poppins] text-xl font-semibold text-gray-800">Trending Notes</h2>

		{#if $trendingSongsQuery.isLoading}
			<div class="flex justify-center py-4">
				<div class="animate-pulse text-gray-500">Loading trending songs...</div>
			</div>
		{:else if $trendingSongsQuery.error}
			<div class="rounded-lg bg-red-50 p-3 text-sm text-red-600">
				Error loading trending songs: {$trendingSongsQuery.error.message}
			</div>
		{:else}
			<div class="space-y-3">
				{#each $trendingSongsQuery.data?.results as trendingItem}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div
						role="button"
						tabindex="0"
						aria-label="Go to song"
						aria-describedby="trending-song"
						aria-expanded="false"
						aria-haspopup="true"
						on:click={() =>
							goto(
								`/notation/${trendingItem.song.id}/${trendingItem.song.title.replace(/\s+/g, '-')}`
							)}
						class="cursor-pointer rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-shadow duration-200 hover:shadow-md"
					>
						<div class="flex items-start justify-between">
							<div class="flex-1">
								<h3 class="font-[poppins] font-medium text-gray-900">{trendingItem.song.title}</h3>
								<p class="text-sm text-gray-600">{trendingItem.song.artist}</p>
							</div>
							<div class="flex items-center text-xs text-gray-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mr-1 h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								{formatPlays(trendingItem.song.no_of_plays)}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Ad Space -->
	<div class="mt-8">
		<!-- <div class="bg-gray-100 rounded-lg p-4 text-center">
			<p class="text-sm text-gray-600 mb-2">Advertisement</p>
			<div class="bg-gray-200 h-40 flex items-center justify-center rounded border border-gray-300">
				<span class="text-gray-500">Ad Space</span>
			</div>
		</div> -->
	</div>
</div>
