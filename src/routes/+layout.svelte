<script lang="ts">
	  import { browser } from '$app/environment'
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';

	let { children } = $props();
	const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  })
</script>
<QueryClientProvider client={queryClient}>
	<main class="p-5  flex flex-col">
		<Nav/>
		{@render children()}
	</main>

</QueryClientProvider>
