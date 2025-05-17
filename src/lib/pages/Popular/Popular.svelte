<!-- src/routes/popular/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import SongCard from './components/SongCard.svelte';
  import CategoryFilter from './components/CategoryFilter.svelte';
  import {categories } from './data';
	import { getPopularSongs } from '$lib/apiHooks/useSongs';
	import { json } from '@sveltejs/kit';
  
  // Search functionality
  let searchQuery = "";
  let activeCategory = "All";
  const popularSongsQuery = getPopularSongs('all_time');

  
  // For masonry effect management
  let columnHeights = [0, 0, 0];
  let columnItems = [[], [], []];
  $: popularSongs = $popularSongsQuery.data;
  
  onMount(() => {
    calculateMasonryLayout();
    window.addEventListener('resize', calculateMasonryLayout);
    return () => {
      window.removeEventListener('resize', calculateMasonryLayout);
    };
    
  });
  
  async function calculateMasonryLayout() {
    // This would be implemented with actual DOM elements in real usage
    // For now, let's just distribute items evenly for the demo
    columnItems = [[], [], []];
    await popularSongs.forEach((song, index) => {
      const columnIndex = index % 3;
      columnItems[columnIndex].push(song);
    });
  }
  
  function setActiveCategory(category) {
    activeCategory = category;
    // Filter songs based on category
    // This would trigger a recalculation of the masonry layout
  }
</script>

<svelte:head>
  <title>Popular Songs | Flute Notes</title>
</svelte:head>

<div class="min-h-screen font-[poppins] px-4 py-6 bg-gray-50">
  <!-- Page title and search -->
  <div class="max-w-6xl mx-auto mb-8">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h1 class="text-3xl font-bold text-gray-800">Popular Flute Notes</h1>
      
      <!-- Search bar -->
      <div class="relative w-full md:w-auto md:min-w-[320px]">
        <input 
          type="text" 
          bind:value={searchQuery}
          placeholder="Search popular notes..." 
          class="w-full py-2 px-10 bg-white rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
        />
      </div>
    </div>
  </div>
  
  <!-- Category filters - horizontal scrolling on mobile -->
  <div class="max-w-6xl scrollbar-none mx-auto mb-8 overflow-x-auto">
    <div class="flex gap-2 pb-2 min-w-max">
      <button 
        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
          {activeCategory === 'All' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}"
        on:click={() => setActiveCategory('All')}
      >
        All
      </button>
      
      {#each categories as category}
        <CategoryFilter 
          name={category.name} 
          icon={category.icon}
          active={activeCategory === category.name}
          onClick={() => setActiveCategory(category.name)}
        />
      {/each}
    </div>
  </div>

  <!-- Highlighted card -->
  <div class="max-w-6xl mx-auto mb-8">
    <div class="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl p-6 shadow-lg text-white">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 class="text-2xl font-bold mb-2">New to Flute?</h2>
          <p class="text-indigo-100 mb-4">Start with our beginner-friendly guides to learn sargam notations</p>
          <button class="bg-white text-indigo-600 px-6 py-2 rounded-full hover:bg-opacity-90 transition font-medium shadow-md">
            Start Learning
          </button>
        </div>
        <div class="flex-shrink-0 w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <span class="text-5xl">🎵</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Masonry layout songs grid -->
  <div class="max-w-6xl mx-auto">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Trending Now</h2>
    
    <!-- Masonry grid - uses CSS grid for responsive layout -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each popularSongs as item, i}
        <div class="transform transition duration-300 hover:-translate-y-1 hover:shadow-md {i % 3 === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}">
          <SongCard 
            title={item.song.title} 
            artist={item.song.artist} 
            views={item.song.no_of_plays} 
            id={item.song.id}
            featured={i === 0 || i === 5}
          />
        </div>
      {/each}
    </div>
  </div>

  <!-- Top artists section -->
  <div class="max-w-6xl mx-auto my-12">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Popular Artists</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {#each ['Artist 1', 'Artist 2', 'Artist 3', 'Artist 4', 'Artist 5', 'Artist 6'] as artist, i}
        <div class="bg-white rounded-lg p-4 text-center shadow hover:shadow-md transition cursor-pointer">
          <div class="w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span class="text-2xl">🎵</span>
          </div>
          <p class="font-medium text-gray-800">{artist}</p>
        </div>
      {/each}
    </div>
  </div>
</div>