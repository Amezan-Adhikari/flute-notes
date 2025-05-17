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
  
  <section class="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-semibold text-gray-800 mb-2">Search Results</h1>
      <p class="text-gray-600">Showing results for: <span class="font-medium">"{searchQuery}"</span></p>
    </div>
    
    <!-- Search Input using our component -->
    <div class="mb-8">
      <SearchComponent initialQuery={searchQuery} redirectOnEnter={true} />
    </div>
    
    <!-- Results List -->
    {#if $searchResults.isLoading && searchQuery.length > 2}
      <div class="flex justify-center items-center p-10">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    {:else if $searchResults.isError}
      <div class="bg-red-100 border border-red-300 text-red-800 p-4 rounded-lg mb-6">
        <p>Error loading search results. Please try again later.</p>
      </div>
    {:else if !searchQuery || searchQuery.length < 3}
      <div class="bg-blue-100 p-8 rounded-lg text-center">
        <h3 class="text-xl font-medium text-blue-800 mb-2">Start searching</h3>
        <p class="text-blue-700 mb-4">Please enter at least 3 characters to search for songs.</p>
      </div>
    {:else if $searchResults.data && $searchResults.data.length === 0}
      <div class="bg-gray-100 p-8 rounded-lg text-center">
        <h3 class="text-xl font-medium text-gray-700 mb-2">No results found</h3>
        <p class="text-gray-600 mb-4">We couldn't find any songs matching your search.</p>
        <div class="max-w-md mx-auto">
          <h4 class="font-medium text-gray-700 mb-2">Suggestions:</h4>
          <ul class="text-gray-600 text-left list-disc pl-5">
            <li>Check the spelling of your search terms</li>
            <li>Try using fewer or more general keywords</li>
            <li>Try searching by artist name or raga</li>
          </ul>
        </div>
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each $searchResults.data as song}
          <a href={`/song/${song.id}/${song.slug || song.title.toLowerCase().replace(/\s+/g, '-')}`} class="block">
            <div class="bg-white rounded-lg shadow hover:shadow-md transition border border-gray-300 p-4">
              <div class="flex justify-between items-start mb-2">
                {#if song.difficulty}
                  <span class="bg-blue-200 text-blue-900 text-xs px-2 py-1 rounded font-medium">{song.difficulty}</span>
                {/if}
                {#if song.views}
                  <span class="text-gray-600 text-xs font-medium">{song.views} views</span>
                {/if}
              </div>
              <h3 class="font-medium text-gray-800 mb-1">{song.title}</h3>
              {#if song.artist}
                <p class="text-sm text-gray-600 mb-2">Artist: {song.artist}</p>
              {/if}
              {#if song.raga}
                <p class="text-sm text-gray-600 mb-2">Raga: {song.raga}</p>
              {/if}
              <div class="mt-2">
                <span class="text-blue-700 hover:text-blue-900 text-sm font-medium">View sargam</span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </section>