<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { Input } from "flowbite-svelte";
    import { fetchSongs } from '$lib/services/songService';
    import { useQueryClient, createQuery } from '@tanstack/svelte-query';
  
    import RightPane from './RightPane.svelte';

    import Leftpane from './Leftpane.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
	import type { ISong } from '$lib/types';
	import { SongListItem } from '$lib/components';
  
  
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
  
    const queryClient = useQueryClient();
  
    const songsQuery = createQuery<SongResponse>({
      queryKey: ['songs', currentPage],
      queryFn: () => fetchSongs(currentPage),
      keepPreviousData: true
    });
  
    $: if ($songsQuery.data) {
      songs = $songsQuery.data.results;
      totalPages = Math.ceil($songsQuery.data.count / pageSize);
      filterSongs();
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
      if (!searchQuery.trim()) {
        filteredSongs = songs;
        return;
      }
  
      const query = searchQuery.toLowerCase();
      filteredSongs = songs.filter((song) =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.category_name.toLowerCase().includes(query) ||
        song.difficulty.toLowerCase().includes(query)
      );
    }
  
    $: searchQuery, updateSearch();
  
    function updateSearch() {
      if (songs.length > 0) {
        filterSongs();
      }
    }
  
    function goToPage(pageNum: number) {
      if (pageNum >= 1 && pageNum <= totalPages) {
        currentPage = pageNum;
      }
    }
  </script>
  
  <main class="flex min-h-screen">
    <Leftpane />
  
    <div class="flex-1 py-10 px-4">
      <div class="md:px-6 w-full">
        <div class="flex items-center gap-5 bg-gray-100 px-4 rounded-full py-1">
          <img src="/images/search.svg" alt="search" class="w-6 h-6" />
          <Input 
            class="w-full bg-transparent border-none focus:border-none focus:ring-0"
            type="text"
            bind:value={searchQuery}
            placeholder="Search for songs, sargams"
          />
          <img src="/images/enter.svg" alt="enter" class="hover:scale-105 h-7" />
        </div>
      </div>
  
      <section class="flex font-[poppins] flex-col gap-1 mt-3">
        {#if $songsQuery.isLoading}
          <div class="flex justify-center my-10">
            <div class="animate-spin rounded-full h-10 w-10 border-4 border-r-white border-blue-500"></div>
          </div>
        {:else if $songsQuery.isError}
          <div class="text-center text-red-500 my-5">
            Error loading songs. Please try again.
          </div>
        {:else if filteredSongs.length === 0}
          <div class="text-center text-gray-500 my-5"> 
            No songs found matching your search.
          </div>
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
  
    <RightPane />
  </main>
  