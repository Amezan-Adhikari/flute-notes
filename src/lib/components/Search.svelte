<script>
    //@ts-nocheck
    import { Input } from "flowbite-svelte";
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    export let searchQuery = '';
    export let redirectOnEnter = false;
    export let redirectOnClick = false;
    
    // Handle search submission
    function handleSearch() {
        if (redirectOnEnter || redirectOnClick) {
            goto(`/allsongs?query=${encodeURIComponent(searchQuery)}`);
        }
    }
    
    // Handle keyboard events (for Enter key)
    function handleKeydown(event) {
        if (event.key === 'Enter' && redirectOnEnter) {
            handleSearch();
        }
    }
</script>

<div class="flex items-center gap-5 bg-gray-100 px-4 rounded-full py-1">
    <img src="/images/search.svg" alt="search" class="w-6 h-6"/>
    <Input 
        class="w-full bg-transparent border-none focus:border-none focus:ring-0"
        type="text"
        bind:value={searchQuery}
        on:keydown={handleKeydown}
        placeholder="Search for songs, sargams"/>
    {#if redirectOnClick}
        <a class="hover:scale-105" href="/allsongs?query={encodeURIComponent(searchQuery)}" on:click|preventDefault={handleSearch}>
            <img src="/images/enter.svg" alt="enter">
        </a>
    {:else}
        <button class="hover:scale-105" on:click={handleSearch}>
            <img src="/images/enter.svg" alt="enter">
        </button>
    {/if}
</div>