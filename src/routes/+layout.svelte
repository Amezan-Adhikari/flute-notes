<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<main class="p-5 md:mx-30 lg:mx-50 2xl:mx-60 flex flex-col">
    <Nav/>
	{@render children()}
</main>
