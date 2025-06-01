<script>
	//@ts-nocheck
	import { Input } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let searchQuery = '';
	export let redirectOnEnter = false;
	export let redirectOnClick = false;

	// Handle search submission
	function handleSearch() {
		if (redirectOnEnter || redirectOnClick) {
			goto(`/all-songs?query=${encodeURIComponent(searchQuery)}`);
		}
	}

	// Handle keyboard events (for Enter key)
	function handleKeydown(event) {
		if (event.key === 'Enter' && redirectOnEnter) {
			handleSearch();
		}
	}
</script>

<div class="flex items-center gap-5 rounded-full bg-gray-100 px-4 py-1">
	<img src="/images/search.svg" alt="search" class="h-6 w-6" />
	<Input
		class="w-full border-none bg-transparent focus:border-none focus:ring-0"
		type="text"
		bind:value={searchQuery}
		on:keydown={handleKeydown}
		placeholder="Search for songs, sargams"
	/>
	{#if redirectOnClick}
		<a
			class="hover:scale-105"
			href="/all-songs?query={encodeURIComponent(searchQuery)}"
			on:click|preventDefault={handleSearch}
		>
			<img src="/images/enter.svg" alt="enter" />
		</a>
	{:else}
		<button class="hover:scale-105" on:click={handleSearch}>
			<img src="/images/enter.svg" alt="enter" />
		</button>
	{/if}
</div>
