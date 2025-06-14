<!-- SearchComponent.svelte -->
<script lang="ts">
	import { getAllSongsBySearch } from '$lib/apiHooks/useSongs';
	import { onMount } from 'svelte';

	export let initialQuery = '';
	export let redirectOnEnter = false;
	export let redirectOnClick = false;

	let searchQuery = initialQuery;
	let searchResults = [];
	let isSearchFocused = false;
	let searchInput: HTMLInputElement;

	// Use the existing hook to get search results
	$: query = getAllSongsBySearch(searchQuery);
	$: searchResults = $query.data || [];
	$: isLoading = $query.isLoading;

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		searchQuery = target.value;

		// If the search query is empty, clear the results
		if (!searchQuery) {
			searchResults = [];
		}

		// If the search query is less than 3 characters, don't fetch results
		if (searchQuery.length < 3) {
			searchResults = [];
			return;
		}

		// Fetch results based on the current search query
		$query.refetch();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' && redirectOnEnter && searchQuery) {
			window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
		}
	}

	function handleResultClick(result) {
		if (redirectOnClick) {
			// If the song has a slug use it, otherwise generate from title
			const songUrl = result.slug
				? `/all-songs/${result.slug}/notation`
				: `/song/${result.id}/${result.title.toLowerCase().replace(/\s+/g, '-')}`;
			window.location.href = songUrl;
		}
	}

	onMount(() => {
		// Focus on search input when component mounts (optional)
		if (initialQuery) {
			searchInput.focus();
		}
	});
</script>

<div class="relative mx-auto w-full max-w-2xl">
	<!-- Search container with subtle border -->
	<div
		class="relative overflow-hidden rounded-xl border-2 border-blue-400 shadow-md transition-colors focus-within:border-blue-500"
	>
		<div class="relative rounded-lg bg-white dark:bg-gray-800">
			<input
				bind:this={searchInput}
				type="text"
				placeholder="Search songs, ragas, or artists..."
				class="w-full rounded-lg bg-white p-4 pr-10 pl-14 text-base text-gray-800 focus:outline-none dark:bg-gray-800 dark:text-white"
				on:input={handleInput}
				on:keydown={handleKeyDown}
				on:focus={() => (isSearchFocused = true)}
				on:blur={() => setTimeout(() => (isSearchFocused = false), 200)}
				value={initialQuery}
			/>

			{#if searchQuery && searchQuery.length > 0}
				<button
					class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4"
					on:click={() => {
						searchQuery = '';
						searchInput.value = '';
					}}
				>
					<div
						class="rounded-full bg-gray-200 p-1 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 text-gray-600 dark:text-gray-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</div>
				</button>
			{/if}
		</div>
	</div>

	<!-- Search tip -->
	<div class="mt-1 text-center text-xs text-gray-500 dark:text-gray-400">
		Type at least 3 characters to search
	</div>

	<!-- Results dropdown with animation -->
	{#if isSearchFocused && searchQuery && searchQuery.length > 2}
		<div
			class="animate-fadeIn absolute z-10 mt-2 max-h-96 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800"
		>
			{#if isLoading}
				<div class="p-6 text-center">
					<div class="flex items-center justify-center">
						<div class="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
					</div>
					<p class="mt-3 font-medium text-gray-600 dark:text-gray-300">
						Searching for "{searchQuery}"...
					</p>
				</div>
			{:else if searchResults.length === 0}
				<div class="p-6 text-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mx-auto h-12 w-12 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p class="mt-3 text-gray-600 dark:text-gray-300">No results found for "{searchQuery}"</p>
					<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Try a different search term</p>
				</div>
			{:else}
				<ul class="divide-y divide-gray-200 dark:divide-gray-700">
					{#each searchResults as result}
						<li
							class="cursor-pointer p-4 transition-colors hover:bg-blue-50 dark:hover:bg-gray-700"
							on:click={() => handleResultClick(result)}
						>
							<div class="flex items-center justify-between">
								<span class="text-lg font-medium text-gray-900 dark:text-white">{result.title}</span
								>
								{#if result.difficulty}
									<span
										class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100"
										>{result.difficulty}</span
									>
								{/if}
							</div>
							{#if result.artist}
								<div class="mt-1 flex items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
									<p class="text-sm text-gray-600 dark:text-gray-400">{result.artist}</p>
								</div>
							{/if}
						</li>
					{/each}
				</ul>
				<div
					class="border-t border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-900"
				>
					<a
						href={`/search?q=${encodeURIComponent(searchQuery)}`}
						class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
					>
						View all results
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="ml-1 h-3 w-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</a>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* Add animation for the dropdown */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fadeIn {
		animation: fadeIn 0.2s ease-out forwards;
	}
</style>
