<script>
	import { getPopularSongs } from "$lib/apiHooks/useSongs";
	import { formatPlays } from "$lib/utiils";
	import { goto } from '$app/navigation';

	const popularSongsQuery = getPopularSongs('all_time');

	console.log("Popular Songs Query: ", $popularSongsQuery.data);
</script>

<div class="mb-8">
	<div class="flex justify-between items-center mb-4">
		<h2 class="text-2xl font-semibold text-gray-800">Popular Songs</h2>
		<a href="/songs" class="text-blue-700 hover:text-blue-900 text-sm font-medium">View all</a>
	</div>

	{#if $popularSongsQuery.isLoading}
		<p class="text-gray-500 text-sm">Loading songs...</p>
	{:else if $popularSongsQuery.error}
		<p class="text-red-500 text-sm">Failed to load songs: {$popularSongsQuery.error.message}</p>
	{:else}
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {#each $popularSongsQuery.data as item}
            <div
                class="bg-white rounded-lg shadow border border-gray-300 hover:shadow-md transition p-4 cursor-pointer h-full"
                on:click={() => goto(`/song/${item.song.id}`)}
            >
                <div class="flex justify-between items-start mb-2">
                    <span class="bg-blue-200 text-blue-900 text-xs px-2 py-1 rounded font-medium">{item.song.difficulty}</span>
                    <span class="text-gray-600 text-xs font-medium">{formatPlays(item.song.no_of_plays)} views</span>
                </div>
                <h3 class="font-medium text-gray-800">{item.song.title}</h3>
                <div class="mt-3">
                    <a href={`/song/${item.song.id}`} class="text-blue-700 hover:text-blue-900 text-sm font-medium">View sargam</a>
                </div>
            </div>
        {/each}
    </div>
    
	{/if}
</div>
