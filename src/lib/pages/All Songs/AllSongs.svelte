<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { Input } from "flowbite-svelte";
    import { browser } from '$app/environment';
    
    let songs = [];
    let filteredSongs = [];
    let searchQuery = '';
    let isLoading = true;
    let error = null;
    
    // Function to truncate text with ellipsis
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
    
    // Fetch songs from API
    async function fetchSongs() {
        try {
            isLoading = true;
            const response = await fetch('https://sarega699.pythonanywhere.com/api/songs/');
            if (!response.ok) {
                throw new Error('Failed to fetch songs');
            }
            const data = await response.json();
            songs = data.results;
            // After fetching, apply any existing search query
            filterSongs();
            isLoading = false;
        } catch (err) {
            error = err.message;
            isLoading = false;
        }
    }
    
    onMount(async () => {
        if (browser) {
            // Check for query parameter in URL when page loads
            const urlParams = new URLSearchParams(window.location.search);
            const queryParam = urlParams.get('query');
            
            if (queryParam) {
                searchQuery = queryParam;
                // Clear the query parameter after getting it
                window.history.replaceState(null, '', window.location.pathname);
            }
        }
        
        // Fetch songs data
        await fetchSongs();
    });
    
    // Filter songs based on search query
    function filterSongs() {
        if (!searchQuery.trim()) {
            filteredSongs = songs;
            return;
        }
        
        const query = searchQuery.toLowerCase();
        filteredSongs = songs.filter(song => 
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query) ||
            song.category_name.toLowerCase().includes(query) ||
            song.difficulty.toLowerCase().includes(query)
        );
    }
    
    // Make search reactive - filter songs whenever searchQuery changes
    $: searchQuery, updateSearch();
    
    function updateSearch() {
        if (songs.length > 0) {
            filterSongs();
        }
    }
</script>

<main class="py-10">
    <div class="md:px-10 w-full">
        <!-- Search input that triggers filtering on change -->
        <div class="flex items-center gap-5 bg-gray-100 px-4 rounded-full py-1">
            <img src="/images/search.svg" alt="search" class="w-6 h-6"/>
            <Input 
                class="w-full bg-transparent border-none focus:border-none focus:ring-0"
                type="text"
                bind:value={searchQuery}
                placeholder="Search for songs, sargams"/>
            <img src="/images/enter.svg" alt="enter" class="hover:scale-105 h-7">
        </div>
    </div>

    <section class="flex font-[poppins] flex-col gap-1 mt-3 px-2 md:px-20">
        {#if isLoading}
            <div class="flex justify-center my-10">
                <div class="animate-spin rounded-full h-10 w-10 border-4 border-r-white border-blue-500"></div>
            </div>
        {:else if error}
            <div class="text-center text-red-500 my-5">
                Error: {error}
            </div>
        {:else if filteredSongs.length === 0}
            <div class="text-center text-gray-500 my-5">
                No songs found matching your search.
            </div>
        {:else}
            {#each filteredSongs as song}
                <a href="/allsongs/{song.id}/notation" class="p-2 px-5 md:px-10 cursor-pointer hover:bg-gray-100 flex items-center justify-between gap-3 bg-gray-50">
                    <div class="flex items-center gap-3">
                        <h1 class="text-xs md:text-base">{song.title}</h1>
                        <p class="md:text-sm text-xs {song.difficulty === 'Easy' ? 'text-green-600' : 
                                         song.difficulty === 'Medium' ? 'text-yellow-600' : 
                                         'text-red-600'}">
                            {song.difficulty}
                        </p>
                    </div>
                    <div class="flex flex-col items-end text-xs text-gray-500">
                        <p title={song.artist}>{truncateText(song.artist, 20)}</p>
                        <p>{song.no_of_plays}</p>
                    </div>
                </a>
            {/each}
        {/if}
    </section>
</main>