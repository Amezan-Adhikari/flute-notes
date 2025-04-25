<script>

	import Search from "$lib/components/Search.svelte";
    let searchQuery = '';
</script>
<section class="h-[100vh] flex flex-col gap-26 justify-center items-center">
    <div class="flex flex-col gap-4 items-center">
        <h1 class="font-[poppins] text-4xl md:text-6xl text-center">Learn flute with sargam notations</h1>
        <p class="font-[poppins] text-center max-w-sm md:max-w-xl text-xs md:text-base">With <span class="Logo font-[koho]">FLUTE NOTES</span>, you can search from the vast collection of songs, sargams, and ragas</p>
    </div>
    <Search bind:searchQuery={searchQuery} redirectOnEnter={true} redirectOnClick={true} />
</section>