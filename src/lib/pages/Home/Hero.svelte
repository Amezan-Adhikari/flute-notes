<script>
	import Search from "$lib/components/Search.svelte";
    import Leftpane from "./Leftpane.svelte";
    import RightPane from "./RightPane.svelte";
    let searchQuery = '';
    
    // Sample featured songs - replace with your actual data
    const featuredSongs = [
        { title: "Mere Rashke Qamar", difficulty: "Intermediate", views: "10.2K" },
        { title: "Tera Ban Jaunga", difficulty: "Beginner", views: "8.7K" },
        { title: "Tum Hi Ho", difficulty: "Advanced", views: "15.3K" },
        { title: "Kesariya", difficulty: "Intermediate", views: "12.1K" }
    ];
    
    // Sample ragas for quick access
    const popularRagas = [
        "Bhairav", "Yaman", "Malkauns", "Bhimpalasi", "Darbari", "Khamaj"
    ];
</script>

<section class="min-h-screen flex flex-col md:flex-row">
    <!-- Left Sidebar (Categories) - hidden on mobile -->
    <Leftpane />
    
    <!-- Main content -->
    <div class="flex-1 flex flex-col p-4 md:p-8">
        <!-- Hero Section -->
        <div class="flex flex-col gap-4 items-center mb-8 mt-6">
            <h1 class="font-[poppins] text-4xl md:text-6xl text-center text-gray-800">Learn flute with sargam notations</h1>
            <p class="font-[poppins] text-center max-w-sm md:max-w-xl text-base md:text-lg text-gray-700">With <span class="Logo font-[koho] font-bold">FLUTE NOTES</span>, you can search from the vast collection of songs, sargams, and ragas</p>
            <Search bind:searchQuery={searchQuery} redirectOnEnter={true} redirectOnClick={true} />
        </div>
        
        <!-- Featured Content Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <!-- Ad Space (Left Rectangle) -->
            <div class="bg-gray-200 rounded-lg p-4 flex items-center justify-center border border-gray-300 h-48 shadow-sm">
                <p class="text-gray-600 text-sm font-medium">Advertisement Space</p>
            </div>
            
            <!-- Quick Start Guide -->
            <div class="bg-blue-100 rounded-lg p-6 flex flex-col items-center justify-center border border-blue-200 h-48 shadow-sm">
                <h3 class="text-xl font-semibold mb-3 text-blue-800">New to Flute?</h3>
                <p class="text-center text-sm mb-4 text-blue-700">Start with our beginner-friendly guides</p>
                <button class="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-full text-sm shadow-sm">Start Learning</button>
            </div>
            
            <!-- Ad Space (Right Rectangle) -->
            <div class="bg-gray-200 rounded-lg p-4 flex items-center justify-center border border-gray-300 h-48 shadow-sm">
                <p class="text-gray-600 text-sm font-medium">Advertisement Space</p>
            </div>
        </div>
        
        <!-- Featured Songs Section -->
        <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-semibold text-gray-800">Popular Songs</h2>
                <a href="/songs" class="text-blue-700 hover:text-blue-900 text-sm font-medium">View all</a>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {#each featuredSongs as song}
                    <div class="bg-white rounded-lg shadow border border-gray-300 hover:shadow-md transition p-4">
                        <div class="flex justify-between items-start mb-2">
                            <span class="bg-blue-200 text-blue-900 text-xs px-2 py-1 rounded font-medium">{song.difficulty}</span>
                            <span class="text-gray-600 text-xs font-medium">{song.views} views</span>
                        </div>
                        <h3 class="font-medium text-gray-800">{song.title}</h3>
                        <div class="mt-3">
                            <a href={`/song/${song.title.toLowerCase().replace(/\s+/g, '-')}`} class="text-blue-700 hover:text-blue-900 text-sm font-medium">View sargam</a>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        
        <!-- Newsletter Section -->
        <div class="bg-gray-100 rounded-lg p-6 mb-8 border border-gray-300 shadow-sm">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 class="text-xl font-semibold mb-2 text-gray-800">Stay updated with new sargams</h3>
                    <p class="text-gray-700 text-sm">Get weekly updates on new additions to our collection</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-2">
                    <input type="email" placeholder="Your email address" class="border border-gray-400 rounded-lg px-4 py-2 text-sm w-full sm:w-auto" />
                    <button class="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg text-sm shadow-sm">Subscribe</button>
                </div>
            </div>
        </div>
    </div>
    
    <RightPane />
</section>

<style>
    /* You can add any additional custom styles here */
    :global(body) {
        background-color: #ffffff;
    }
</style>