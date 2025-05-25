<script>
	import { getPopularSongs } from '$lib/apiHooks/useSongs';
	import { formatPlays } from '$lib/utiils';
	import { goto } from '$app/navigation';

	const popularSongsQuery = getPopularSongs('all_time');

	console.log('Popular Songs Query: ', $popularSongsQuery.data);
</script>

<div class="mb-8">
	<div class="mb-4 flex items-center justify-between">
		<h2 class="text-2xl font-semibold text-gray-800">Popular Songs</h2>
		<a href="/songs" class="text-sm font-medium text-blue-700 hover:text-blue-900">View all</a>
	</div>

	{#if $popularSongsQuery.isLoading}
		<p class="text-sm text-gray-500">Loading songs...</p>
	{:else if $popularSongsQuery.error}
		<p class="text-sm text-red-500">Failed to load songs: {$popularSongsQuery.error.message}</p>
	{:else}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each $popularSongsQuery.data as item}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					class="h-full cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow transition hover:shadow-md"
					on:click={() => goto(`/notation/${item.song.id}/${item.song.title.replace(/\s+/g, '-')}`)}
				>
					<div class="mb-2 flex items-start justify-between">
						<span class="rounded bg-blue-200 px-2 py-1 text-xs font-medium text-blue-900"
							>{item.song.difficulty}</span
						>
						<span class="text-xs font-medium text-gray-600"
							>{formatPlays(item.song.no_of_plays)} views</span
						>
					</div>
					<h3 class="font-medium text-gray-800">{item.song.title}</h3>
					<div class="mt-3">
						<a
							href={`/allsongs/${item.song.id}/notation`}
							class="text-sm font-medium text-blue-700 hover:text-blue-900">View sargam</a
						>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
