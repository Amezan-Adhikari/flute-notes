<script>
	//@ts-nocheck
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';

	let songData = null;
	let isLoading = true;
	let error = null;
	let songId = null;

	// Determine the notation type
	let isSimpleNotation = false;
	let isComplexNotation = false;

	// Auto-scroll variables
	let isScrolling = false;
	let scrollInterval;
	let countdownValue = 3;
	let showCountdown = false;
	let notationContainer;
	let scrollSpeed = 1; // Base scroll speed
	let speedMultiplier = 1; // Default speed multiplier
	let speedOptions = [0.5, 0.8, 1, 1.5, 2];
	let currentSpeedIndex = 2; // Default to 1x (index 2)

	onMount(async () => {
		// Extract the song ID from the route parameters
		songId = $page.params.id;

		if (songId) {
			await fetchSongNotation(songId);
		} else {
			error = 'Song ID not found in URL';
			isLoading = false;
		}
	});

	onDestroy(() => {
		if (scrollInterval) {
			clearInterval(scrollInterval);
		}
	});

	// Fetch song notation from API
	async function fetchSongNotation(id) {
		try {
			isLoading = true;
			const response = await fetch(
				`https://sarega699.pythonanywhere.com/api/songs/${id}/notation/`
			);
			if (!response.ok) {
				throw new Error('Failed to fetch song notation');
			}
			songData = await response.json();

			// Determine the notation type based on the structure
			isSimpleNotation = Array.isArray(songData.notation);
			isComplexNotation =
				songData.notation && songData.notation.Song && Array.isArray(songData.notation.Song);

			// Calculate scroll speed based on BPM if available
			if (isComplexNotation && songData.notation.bpm) {
				// Calculate pixels per beat based on BPM - slower than before
				scrollSpeed = songData.notation.bpm / 200;
			} else {
				// Default scroll speed if BPM not available - slower
				scrollSpeed = 1;
			}

			isLoading = false;
		} catch (err) {
			error = err.message;
			isLoading = false;
		}
	}

	// Start auto-scroll with countdown
	function startAutoScroll() {
		if (isScrolling) return;

		showCountdown = true;
		countdownValue = 3;

		// Start countdown
		const countdownInterval = setInterval(() => {
			countdownValue--;

			if (countdownValue <= 0) {
				clearInterval(countdownInterval);
				showCountdown = false;

				// Start scrolling
				isScrolling = true;
				scrollInterval = setInterval(() => {
					if (notationContainer) {
						// Apply speed multiplier to the scroll speed
						notationContainer.scrollTop += scrollSpeed * speedMultiplier;

						// Stop if we've reached the bottom
						if (
							notationContainer.scrollTop + notationContainer.clientHeight >=
							notationContainer.scrollHeight
						) {
							clearInterval(scrollInterval);
							isScrolling = false;
						}
					}
				}, 1); // Update interval - smaller for smoother scrolling
			}
		}, 1000);
	}

	// Stop auto-scroll
	function stopAutoScroll() {
		if (scrollInterval) {
			clearInterval(scrollInterval);
			isScrolling = false;
		}
	}

	// Change scroll speed
	function changeSpeed() {
		currentSpeedIndex = (currentSpeedIndex + 1) % speedOptions.length;
		speedMultiplier = speedOptions[currentSpeedIndex];

		// If already scrolling, update the scroll speed dynamically
		if (isScrolling && scrollInterval) {
			clearInterval(scrollInterval);
			scrollInterval = setInterval(() => {
				if (notationContainer) {
					notationContainer.scrollTop += scrollSpeed * speedMultiplier;

					// Stop if we've reached the bottom
					if (
						notationContainer.scrollTop + notationContainer.clientHeight >=
						notationContainer.scrollHeight
					) {
						clearInterval(scrollInterval);
						isScrolling = false;
					}
				}
			}, 50);
		}
	}
</script>

<svelte:head>
	<title>{songData ? songData.title || `Song #${songId}` : 'Loading Song...'}</title>
</svelte:head>

<main class="poppins mx-auto my-10 max-w-6xl py-6 md:px-8">
	{#if isLoading}
		<div class="my-20 flex justify-center">
			<div
				class="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-r-white"
			></div>
		</div>
	{:else if error}
		<div class="my-10 text-center text-red-500">
			<p>{error}</p>
		</div>
	{:else if songData}
		<!-- Song Header Information -->
		<div class="mb-6 border-b pb-4">
			<h1 class="font-[poppins-semibold] text-2xl md:text-3xl">
				{songData.title || `Song #${songId}`}
			</h1>

			<div class="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
				{#if songData.composer}
					<div>
						<span class="text-gray-500">Composer:</span>
						{songData.composer}
					</div>
				{/if}

				{#if songData.scale}
					<div>
						<span class="text-gray-500">Scale:</span>
						{songData.scale}
					</div>
				{/if}

				{#if songData.flute}
					<div>
						<span class="text-gray-500">Flute:</span>
						{songData.flute}
					</div>
				{/if}

				{#if songData.beat || songData.taal}
					<div>
						<span class="text-gray-500">Beat/Taal:</span>
						{songData.beat || ''}
						{songData.taal ? `(${songData.taal})` : ''}
					</div>
				{/if}

				{#if songData.notation && songData.notation.bpm}
					<div>
						<span class="text-gray-500">BPM:</span>
						{songData.notation.bpm}
					</div>
				{/if}
			</div>

			<!-- Auto-scroll controls - More subtle -->
			<div class="mt-4 flex items-center gap-4">
				<a
					href="#"
					on:click|preventDefault={startAutoScroll}
					class="text-sm font-medium text-blue-600 hover:text-blue-800 disabled:opacity-50"
					class:opacity-50={isScrolling}
				>
					Start Scroll
				</a>

				<a
					href="#"
					on:click|preventDefault={stopAutoScroll}
					class="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
					class:opacity-50={!isScrolling}
				>
					Stop
				</a>

				<a
					href="#"
					on:click|preventDefault={changeSpeed}
					class="text-sm font-medium text-purple-600 hover:text-purple-800"
				>
					Speed: {speedOptions[currentSpeedIndex]}x
				</a>

				<a href="/allsongs" class="ml-auto text-sm text-gray-600 hover:text-gray-800">
					Back to Songs
				</a>
			</div>
		</div>

		<!-- Countdown overlay - Semi-transparent -->
		{#if showCountdown}
			<div class="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-40">
				<div class="text-9xl font-bold text-white">{countdownValue}</div>
			</div>
		{/if}

		<!-- Notation Section -->
		<div
			bind:this={notationContainer}
			class="scrollbar-none relative max-h-[70vh] overflow-y-auto font-mono"
			style="scroll-behavior: smooth;"
		>
			<!-- Simple Notation Format -->
			{#if isSimpleNotation}
				<div class="my-4">
					{#each songData.notation as line}
						<div class="mb-6">
							<div class="text-xl tracking-wider">{line.notes}</div>
						</div>
					{/each}
				</div>

				<!-- Complex Notation Format -->
			{:else if isComplexNotation}
				<div class="my-4">
					{#each songData.notation.Song as row, rowIndex}
						<div class="mb-8 flex justify-between">
							{#each row as section}
								<div class="mb-6">
									<!-- Display all columns in a single row -->
									<div class="flex flex-wrap overflow-x-auto">
										{#each section.column as col, colIndex}
											<div class="p-1 text-center whitespace-nowrap md:p-2">
												{#each col.notation as noteObj}
													<span class="text-xs md:text-xl">{noteObj.note}</span>
												{/each}
											</div>
										{/each}
									</div>

									<!-- Lyrics if available -->
									{#if section.lyrics}
										<div
											class="mt-1 text-xs italic md:text-sm text-{section.lyricsAlign || 'center'}"
										>
											{section.lyrics}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/each}
				</div>

				<!-- Unknown Format - Simple display -->
			{:else}
				<div class="my-4">
					<pre class="text-xs whitespace-pre-wrap md:text-sm">{JSON.stringify(
							songData.notation,
							null,
							2
						)}</pre>
				</div>
			{/if}
		</div>
	{:else}
		<div class="my-10 text-center text-gray-500">No song data found.</div>
	{/if}
</main>
