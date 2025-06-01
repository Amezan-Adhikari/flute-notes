<!-- SearchResults.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getAllSongsBySearch } from '$lib/apiHooks/useSongs';
	import SearchComponent from './SearchComponent.svelte';

	let searchQuery = '';

	// Get search query from URL parameters
	onMount(() => {
		searchQuery = $page.url.searchParams.get('q') || '';
	});

	// Use the provided hook to fetch search results
	$: searchResults = getAllSongsBySearch(searchQuery);
</script>

<section class="mx-auto min-h-screen max-w-6xl p-4 md:p-8">
	<div class="mb-8">
		<h1 class="mb-2 text-3xl font-semibold text-gray-800">Search Results</h1>
		<p class="text-gray-600">
			Showing results for: <span class="font-medium">"{searchQuery}"</span>
		</p>
	</div>

	<!-- Search Input using our component -->
	<div class="mb-8">
		<SearchComponent initialQuery={searchQuery} redirectOnEnter={true} />
	</div>

	<!-- Results List -->
	{#if $searchResults.isLoading && searchQuery.length > 2}
		<div class="flex items-center justify-center p-10">
			<div class="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-700"></div>
		</div>
	{:else if $searchResults.isError}
		<div class="mb-6 rounded-lg border border-red-300 bg-red-100 p-4 text-red-800">
			<p>Error loading search results. Please try again later.</p>
		</div>
	{:else if !searchQuery || searchQuery.length < 3}
		<div class="rounded-lg bg-blue-100 p-8 text-center">
			<h3 class="mb-2 text-xl font-medium text-blue-800">Start searching</h3>
			<p class="mb-4 text-blue-700">Please enter at least 3 characters to search for songs.</p>
		</div>
	{:else if $searchResults.data && $searchResults.data.length === 0}
		<div class="rounded-lg bg-gray-100 p-8 text-center">
			<h3 class="mb-2 text-xl font-medium text-gray-700">No results found</h3>
			<p class="mb-4 text-gray-600">We couldn't find any songs matching your search.</p>
			<div class="mx-auto max-w-md">
				<h4 class="mb-2 font-medium text-gray-700">Suggestions:</h4>
				<ul class="list-disc pl-5 text-left text-gray-600">
					<li>Check the spelling of your search terms</li>
					<li>Try using fewer or more general keywords</li>
					<li>Try searching by artist name or raga</li>
				</ul>
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each $searchResults.data as song}
				<a href={`/all-songs/${song.id}/notation`} class="block">
					<div
						class="rounded-lg border border-gray-300 bg-white p-4 shadow transition hover:shadow-md"
					>
						<div class="mb-2 flex items-start justify-between">
							{#if song.difficulty}
								<span class="rounded bg-blue-200 px-2 py-1 text-xs font-medium text-blue-900"
									>{song.difficulty}</span
								>
							{/if}
							{#if song.views}
								<span class="text-xs font-medium text-gray-600">{song.views} views</span>
							{/if}
						</div>
						<h3 class="mb-1 font-medium text-gray-800">{song.title}</h3>
						{#if song.artist}
							<p class="mb-2 text-sm text-gray-600">Artist: {song.artist}</p>
						{/if}
						{#if song.raga}
							<p class="mb-2 text-sm text-gray-600">Raga: {song.raga}</p>
						{/if}
						<div class="mt-2">
							<span class="text-sm font-medium text-blue-700 hover:text-blue-900">View sargam</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</section>
