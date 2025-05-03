<script>

	import { formatPlays } from "$lib/utiils";

    // Sample trending songs data
    const trendingSongs = [
        { id: 1, title: "Tum Hi Ho", artist: "Arijit Singh", plays: 12500 },
        { id: 2, title: "Agar Tum Saath Ho", artist: "Alka Yagnik & Arijit Singh", plays: 10800 },
        { id: 3, title: "Channa Mereya", artist: "Arijit Singh", plays: 9700 },
        { id: 4, title: "Kal Ho Naa Ho", artist: "Sonu Nigam", plays: 8900 },
        { id: 5, title: "Lag Ja Gale", artist: "Lata Mangeshkar", plays: 8500 },
        { id: 6, title: "Raabta", artist: "Arijit Singh", plays: 7800 },
        
    ];
    
 
</script>
    <!-- Right Sidebar (Trending) - hidden on mobile -->
    <div class="hidden md:flex md:w-80 lg:w-96 bg-gray-50 flex-col p-6 border-l border-gray-200 h-screen overflow-y-auto">
        <!-- Trending Songs Section -->
        <div class="mb-4">
            <h2 class="font-[poppins] text-xl font-semibold mb-4 text-gray-800">Trending Notes</h2>
            
            <div class="space-y-3">
                {#each trendingSongs as song}
                    <div class="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-100">
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <h3 class="font-[poppins] font-medium text-gray-900">{song.title}</h3>
                                <p class="text-sm text-gray-600">{song.artist}</p>
                            </div>
                            <div class="flex items-center text-xs text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {formatPlays(song.plays)}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        
        <!-- Ad Space -->
        <div class="mt-8">
            <div class="bg-gray-100 rounded-lg p-4 text-center">
                <p class="text-sm text-gray-600 mb-2">Advertisement</p>
                <div class="bg-gray-200 h-40 flex items-center justify-center rounded border border-gray-300">
                    <span class="text-gray-500">Ad Space</span>
                </div>
            </div>
        </div>
    </div>