<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Input } from 'flowbite-svelte';
	import { useQueryClient } from '@tanstack/svelte-query';
	import Pagination from '$lib/components/Pagination.svelte';
	import type { ISong } from '$lib/types';
	import type { ComponentType } from 'svelte';
	import { getAllSongsByCategory } from '$lib/apiHooks/useSongs';
	import SongListItem from './SongListItem.svelte';

	// Props for left and right pane components
	export let LeftPaneComponent: ComponentType;
	export let RightPaneComponent: ComponentType;
	export let leftPaneProps: Record<string, any> = {};
	export let rightPaneProps: Record<string, any> = {};

	interface SongResponse {
		count: number;
		results: ISong[];
	}

	let songs: ISong[] = [];
	let filteredSongs: ISong[] = [];
	let searchQuery = '';
	let currentPage = 1;
	let totalPages = 10;
	const pageSize = 10;

	// Extract category from URL pathname
	$: categorySlug = getCategoryFromUrl($page.url.pathname);

	const queryClient = useQueryClient();

	// Function to extract category from URL
	function getCategoryFromUrl(pathname: string): string {
		// Remove leading slash and extract the category
		// For URL like "/hindi-songs", this will return "hindi"
		const segments = pathname.split('/').filter(Boolean);
		if (segments.length > 0) {
			const categorySegment = segments[0];
			// Remove the "-songs" suffix if it exists
			return categorySegment.replace('-songs', '');
		}
		return 'hindi'; // Default fallback
	}

	// Use the getAllSongsByCategory function - only create query when categorySlug is available
	$: songsQuery = categorySlug
		? getAllSongsByCategory({
				categorySlug,
				page: currentPage
			})
		: null;

	// Reactive statement to update songs when query data changes
	$: {
		if ($songsQuery?.data) {
			songs = $songsQuery.data.results;
			totalPages = Math.ceil($songsQuery.data.count / pageSize);
			filterSongs();
		} else if (categorySlug && !$songsQuery?.isLoading) {
			// Reset songs if no data and not loading
			songs = [];
			filteredSongs = [];
			totalPages = 0;
		}
	}

	onMount(() => {
		if (browser) {
			const urlParams = new URLSearchParams(window.location.search);
			const queryParam = urlParams.get('query');

			if (queryParam) {
				searchQuery = queryParam;
				window.history.replaceState(null, '', window.location.pathname);
			}
		}
	});

	function filterSongs() {
		if (!songs || songs.length === 0) {
			filteredSongs = [];
			return;
		}

		if (!searchQuery.trim()) {
			filteredSongs = songs;
			return;
		}

		const query = searchQuery.toLowerCase();
		filteredSongs = songs.filter(
			(song) =>
				song.title.toLowerCase().includes(query) ||
				song.artist.toLowerCase().includes(query) ||
				song.category_name.toLowerCase().includes(query) ||
				song.difficulty.toLowerCase().includes(query)
		);
	}

	// Reactive statement for search filtering
	$: {
		if (songs.length > 0) {
			filterSongs();
		}
	}

	function goToPage(pageNum: number) {
		if (pageNum >= 1 && pageNum <= totalPages) {
			currentPage = pageNum;
			// The query will automatically refetch with the new page due to reactive statement
		}
	}
</script>

<main class="flex min-h-screen">
	<svelte:component this={LeftPaneComponent} {...leftPaneProps} />

	<div class="flex-1 px-4 py-10">
		<div class="w-full md:px-6">
			<div class="flex items-center gap-5 rounded-full bg-gray-100 px-4 py-1">
				<img src="/images/search.svg" alt="search" class="h-6 w-6" />
				<Input
					class="w-full border-none bg-transparent focus:border-none focus:ring-0"
					type="text"
					bind:value={searchQuery}
					placeholder="Search for songs, sargams"
				/>
				<img src="/images/enter.svg" alt="enter" class="h-7 hover:scale-105" />
			</div>
		</div>

		<section class="mt-3 flex flex-col gap-1 font-[poppins]">
			{#if !songsQuery}
				<div class="my-5 text-center text-gray-500">Loading category...</div>
			{:else if $songsQuery.isLoading}
				<div class="my-10 flex justify-center">
					<div
						class="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-r-white"
					></div>
				</div>
			{:else if $songsQuery.isError}
				<div class="my-5 text-center text-red-500">Error loading songs. Please try again.</div>
			{:else if filteredSongs.length === 0}
				<div class="my-5 text-center text-gray-500">No songs found matching your search.</div>
			{:else}
				{#each filteredSongs as song}
					<SongListItem {song} />
				{/each}

				<Pagination
					{currentPage}
					{totalPages}
					{goToPage}
					on:prev={() => goToPage(currentPage - 1)}
					on:next={() => goToPage(currentPage + 1)}
				/>
			{/if}
		</section>
	</div>

	<svelte:component this={RightPaneComponent} {...rightPaneProps} />
</main>
