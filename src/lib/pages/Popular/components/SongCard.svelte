<!-- src/routes/popular/components/SongCard.svelte -->
<script lang="ts">
  export let id: number;
  export let title: string;
  export let artist: string;
  export let views: number;
  export let featured: boolean = false;
</script>

<div class="relative group bg-white rounded-lg shadow-sm hover:shadow transition-all duration-300 h-full">
  <!-- Card header with subtle gradient -->
  <div class="{featured ? 'h-20' : 'h-16'} bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-100">
    {#if featured}
      <div class="absolute top-3 left-3 px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full">
        Featured
      </div>
    {/if}
  </div>
  
  <!-- Content wrapper -->
  <div class="p-5 relative">
    <!-- Play button -->
    <a href="/allsongs/{id}/notation" class="absolute {featured ? '-top-10' : '-top-8'} right-5 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-gray-700 hover:text-indigo-500 group-hover:scale-105 transition-all duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
      </svg>
    </a>
    
    <!-- Music icon -->
    <div class="{featured ? 'w-14 h-14' : 'w-12 h-12'} rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
      <span class="text-gray-600 {featured ? 'text-2xl' : 'text-xl'}">🎵</span>
    </div>
    
    <!-- Song info -->
    <h3 class="font-medium text-gray-800 mb-1 truncate {featured ? 'text-lg' : 'text-base'}">{title}</h3>
    <p class="text-sm text-gray-500 mb-4">{artist}</p>
    
    <!-- Tags and stats -->
    <div class="flex justify-between items-center">
      <div class="flex space-x-2">
        <span class="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">Flute</span>
        <span class="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">Notes</span>
      </div>
      <span class="text-gray-400 text-xs flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        {views}
      </span>
    </div>
  </div>
  
  <!-- Hover effect - subtle indigo tint -->
  
</div>