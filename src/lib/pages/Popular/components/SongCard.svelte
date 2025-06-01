<!-- src/routes/popular/components/SongCard.svelte -->
<script lang="ts">
	export let id: number;
	export let title: string;
	export let artist: string;
	export let views: number;
	export let featured: boolean = false;
</script>

<div
	class="group relative h-full rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow"
>
	<!-- Card header with subtle gradient -->
	<div
		class="{featured
			? 'h-20'
			: 'h-16'} border-b border-gray-100 bg-gradient-to-r from-gray-100 to-gray-50"
	>
		{#if featured}
			<div
				class="absolute top-3 left-3 rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600"
			>
				Featured
			</div>
		{/if}
	</div>

	<!-- Content wrapper -->
	<div class="relative p-5">
		<!-- Play button -->
		<a
			href="/all-songs/{id}/notation"
			class="absolute {featured
				? '-top-10'
				: '-top-8'} right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow transition-all duration-300 group-hover:scale-105 hover:text-indigo-500"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
					clip-rule="evenodd"
				/>
			</svg>
		</a>

		<!-- Music icon -->
		<div
			class="{featured
				? 'h-14 w-14'
				: 'h-12 w-12'} mb-4 flex items-center justify-center rounded-full border border-gray-100 bg-gray-50"
		>
			<span class="text-gray-600 {featured ? 'text-2xl' : 'text-xl'}">🎵</span>
		</div>

		<!-- Song info -->
		<h3 class="mb-1 truncate font-medium text-gray-800 {featured ? 'text-lg' : 'text-base'}">
			{title}
		</h3>
		<p class="mb-4 text-sm text-gray-500">{artist}</p>

		<!-- Tags and stats -->
		<div class="flex items-center justify-between">
			<div class="flex space-x-2">
				<span class="rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-600">Flute</span>
				<span class="rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-600">Notes</span>
			</div>
			<span class="flex items-center text-xs text-gray-400">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-1 h-3 w-3"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
					/>
				</svg>
				{views}
			</span>
		</div>
	</div>

	<!-- Hover effect - subtle indigo tint -->
</div>
