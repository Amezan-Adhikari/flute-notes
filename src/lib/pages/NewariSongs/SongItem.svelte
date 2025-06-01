<script lang="ts">
	import type { ISong } from '$lib/types';

	export let song: ISong;

	// Function to truncate text with ellipsis
	function truncateText(text, maxLength) {
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + '...';
	}
</script>

<a
	href="/all-songs/{song.id}/notation"
	class="flex cursor-pointer items-center justify-between gap-3 bg-gray-50 p-2 px-5 hover:bg-gray-100"
>
	<div class="flex items-center gap-3">
		<h1 class="text-xs md:text-base">{song.title}</h1>
		<p
			class="text-xs md:text-sm {song.difficulty === 'Easy'
				? 'text-green-600'
				: song.difficulty === 'Medium'
					? 'text-yellow-600'
					: 'text-red-600'}"
		>
			{song.difficulty}
		</p>
	</div>
	<div class="flex flex-col items-end text-xs text-gray-500">
		<p title={song.artist}>{truncateText(song.artist, 20)}</p>
		<p>{song.no_of_plays}</p>
	</div>
</a>
