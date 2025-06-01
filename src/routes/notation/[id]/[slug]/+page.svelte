<script>
	//@ts-nocheck
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';

	let songData = null;
	let isLoading = true;
	let error = null;
	let songId = null;

	// SEO variables
	let pageTitle = 'Loading Song...';
	let pageDescription = 'Loading flute notation...';
	let canonicalUrl = '';

	// Determine the notation type
	let isSimpleNotation = false;
	let isComplexNotation = false;

	// Auto-scroll variables
	let isScrolling = false;
	let scrollInterval;
	let countdownValue = 3;
	let showCountdown = false;
	let notationContainer;
	let scrollSpeed = 1;
	let speedMultiplier = 1;
	let speedOptions = [0.5, 0.8, 1, 1.5, 2];
	let currentSpeedIndex = 2;

	// Lenient anti-scraping protection variables
	let isProtected = false; // Start with false instead of true
	let userInteracted = false;
	let viewStartTime = Date.now();
	let mouseMovements = 0;
	let keystrokes = 0;
	let isBot = false;

	onMount(async () => {
		// More lenient bot detection
		isBot = detectBot();

		// Only block if clearly a bot, not on suspicious behavior
		if (isBot) {
			error = 'Please enable JavaScript and try again';
			isLoading = false;
			return;
		}

		// Add human detection (non-blocking)
		addHumanDetection();

		// Extract the song ID from the route parameters
		songId = $page.params.id;
		canonicalUrl = $page.url.href;

		if (songId) {
			// Reduced delay for better UX
			await new Promise((resolve) => setTimeout(resolve, 300));

			// Much more lenient conditions - load content immediately for most users
			if (validateHumanBehavior() || Date.now() - viewStartTime > 2000) {
				await fetchSongNotation(songId);
			} else {
				// Give users a bit more time, then load anyway
				setTimeout(async () => {
					await fetchSongNotation(songId);
				}, 2000);
			}
		} else {
			error = 'Song ID not found in URL';
			isLoading = false;
			updateSEOTags();
		}
	});

	onDestroy(() => {
		if (scrollInterval) {
			clearInterval(scrollInterval);
		}
		removeHumanDetection();
	});

	// Update SEO tags based on song data
	function updateSEOTags() {
		if (songData && songData.title) {
			pageTitle = `${songData.title} - Flute Notation | Sheet Music`;
			pageDescription = `Flute notes for ${songData.title}${songData.composer ? ` by ${songData.composer}` : ''}. Complete musical notation with auto-scroll feature for flute players.`;
		} else if (error) {
			pageTitle = 'Song Not Found | Flute Notation';
			pageDescription =
				'The requested song notation could not be found. Browse our collection of flute sheet music and musical notations.';
		} else {
			pageTitle = `Song #${songId} - Flute Notation | Sheet Music`;
			pageDescription = `Flute notes for Song #${songId}. Musical notation with auto-scroll feature for flute players and musicians.`;
		}
	}

	// Much more lenient bot detection - only catch obvious bots
	function detectBot() {
		if (typeof window === 'undefined' || typeof navigator === 'undefined') return true;

		try {
			// Only check for the most obvious bot indicators
			const checks = [
				// Only block if explicitly marked as webdriver
				() => !window.navigator.webdriver,
				// Only block obvious automation tools
				() => !window.phantom && !window._phantom,
				// Basic selenium check
				() => !document.$cdc_asdjflasutopfhvcZLmcfl_
			];

			// If any check fails, it might be a bot, but be lenient
			const failedChecks = checks.filter((check) => {
				try {
					return !check();
				} catch {
					return false; // If check fails, assume it's fine
				}
			});

			// Only consider it a bot if multiple obvious indicators are present
			return failedChecks.length >= 2;
		} catch {
			// If detection fails, assume it's a human
			return false;
		}
	}

	// More lenient rate limiting
	let requestCount = 0;
	const MAX_REQUESTS = 20; // Increased from 5
	const RATE_LIMIT_WINDOW = 60000; // 1 minute

	function checkRateLimit() {
		// Skip rate limiting in many cases
		if (typeof localStorage === 'undefined') return;

		try {
			const now = Date.now();
			const stored = localStorage.getItem('notation_requests');
			let requests = [];

			if (stored) {
				requests = JSON.parse(stored).filter((time) => now - time < RATE_LIMIT_WINDOW);
			}

			if (requests.length >= MAX_REQUESTS) {
				throw new Error('Too many requests. Please wait a moment before trying again.');
			}

			requests.push(now);
			localStorage.setItem('notation_requests', JSON.stringify(requests));
		} catch (e) {
			// If rate limiting fails, just continue
			console.warn('Rate limiting failed:', e);
		}
	}

	// Human interaction tracking (non-blocking)
	let documentReady = false;

	function trackMouseMovement(e) {
		mouseMovements++;
		if (mouseMovements > 3) {
			// Reduced threshold
			userInteracted = true;
		}
	}

	function trackKeystrokes(e) {
		keystrokes++;
		if (keystrokes > 1) {
			// Reduced threshold
			userInteracted = true;
		}
	}

	// Add event listeners for human detection
	function addHumanDetection() {
		if (typeof document === 'undefined') return;

		document.addEventListener('mousemove', trackMouseMovement);
		document.addEventListener('keydown', trackKeystrokes);
		document.addEventListener('click', () => {
			userInteracted = true;
		});
		document.addEventListener('scroll', () => {
			userInteracted = true;
		});

		// Optional: Remove these if they're too restrictive
		// document.addEventListener('contextmenu', (e) => e.preventDefault());
		// document.addEventListener('selectstart', (e) => {
		// 	if (e.target.closest('.notation-content')) {
		// 		e.preventDefault();
		// 	}
		// });

		documentReady = true;
	}

	// Clean up event listeners
	function removeHumanDetection() {
		if (typeof document === 'undefined' || !documentReady) return;

		document.removeEventListener('mousemove', trackMouseMovement);
		document.removeEventListener('keydown', trackKeystrokes);
	}

	// Much more lenient validation
	function validateHumanBehavior() {
		const timeOnPage = Date.now() - viewStartTime;
		const hasInteracted = userInteracted || mouseMovements > 0 || keystrokes > 0;
		const reasonableTime = timeOnPage > 1000; // Reduced from 2000ms

		// Be much more lenient - just basic checks
		return hasInteracted || reasonableTime || !isBot;
	}

	// Fetch song notation from API with lenient protection
	async function fetchSongNotation(id) {
		try {
			isLoading = true;

			// Optional rate limiting (won't block most users)
			try {
				checkRateLimit();
			} catch (rateLimitError) {
				// Don't block, just warn
				console.warn(rateLimitError.message);
			}

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
				scrollSpeed = songData.notation.bpm / 200;
			} else {
				scrollSpeed = 1;
			}

			updateSEOTags();
			isLoading = false;
			isProtected = false;
		} catch (err) {
			error = err.message;
			updateSEOTags();
			isLoading = false;
		}
	}

	// Manual content unlock (rarely needed now)
	async function unlockContent() {
		await fetchSongNotation(songId);
	}

	// Start auto-scroll with countdown
	function startAutoScroll() {
		if (isScrolling) return;

		showCountdown = true;
		countdownValue = 3;

		const countdownInterval = setInterval(() => {
			countdownValue--;

			if (countdownValue <= 0) {
				clearInterval(countdownInterval);
				showCountdown = false;

				isScrolling = true;
				scrollInterval = setInterval(() => {
					if (notationContainer) {
						notationContainer.scrollTop += scrollSpeed * speedMultiplier;

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

		if (isScrolling && scrollInterval) {
			clearInterval(scrollInterval);
			scrollInterval = setInterval(() => {
				if (notationContainer) {
					notationContainer.scrollTop += scrollSpeed * speedMultiplier;

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

	// Generate structured data for SEO
	$: structuredData = songData
		? {
				'@context': 'https://schema.org',
				'@type': 'MusicComposition',
				name: songData.title || `Song #${songId}`,
				composer: songData.composer
					? {
							'@type': 'Person',
							name: songData.composer
						}
					: undefined,
				musicalKey: songData.scale || undefined,
				genre: 'Flute Music',
				description: pageDescription,
				url: canonicalUrl,
				inLanguage: 'en',
				datePublished: new Date().toISOString().split('T')[0],
				publisher: {
					'@type': 'Organization',
					name: 'Flute Notation'
				}
			}
		: null;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{pageTitle}</title>
	<meta name="title" content={pageTitle} />
	<meta name="description" content={pageDescription} />
	<meta
		name="keywords"
		content="flute notation, sheet music, {songData?.title || 'music'}, {songData?.composer ||
			'composer'}, musical notes, flute music, instrumental music"
	/>
	<meta name="author" content="Flute Notation" />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="revisit-after" content="7 days" />

	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:site_name" content="Flute Notation" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:url" content={canonicalUrl} />
	<meta property="twitter:title" content={pageTitle} />
	<meta property="twitter:description" content={pageDescription} />

	<!-- Additional Meta Tags -->
	<meta name="theme-color" content="#3B82F6" />
	<meta name="msapplication-TileColor" content="#3B82F6" />

	<!-- Structured Data -->
	{#if structuredData}
		{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
	{/if}

	<!-- Preconnect to external domains for performance -->
	<link rel="preconnect" href="https://sarega699.pythonanywhere.com" />

	<!-- Additional SEO hints -->
	<meta name="format-detection" content="telephone=no" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />

	<!-- Lighter anti-scraping styles -->
	<style>
		/* Optional: Disable text selection on notation content */
		.notation-content {
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}

		/* Hide content from print (optional) */
		@media print {
			.notation-content {
				display: none !important;
			}
		}
	</style>
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
			{#if error.includes('interact') || error.includes('denied')}
				<button
					on:click={unlockContent}
					class="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
				>
					Click to Load Content
				</button>
			{/if}
		</div>
	{:else if isProtected}
		<div class="my-10 text-center">
			<h2 class="mb-4 text-xl">Loading content...</h2>
			<p class="mb-4 text-gray-600">If content doesn't load automatically, click below</p>
			<button
				on:click={unlockContent}
				class="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
			>
				Load Notation
			</button>
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

			<!-- Auto-scroll controls -->
			<div class="mt-4 flex items-center gap-4">
				<button
					on:click={startAutoScroll}
					class="text-sm font-medium text-blue-600 hover:text-blue-800 disabled:opacity-50"
					class:opacity-50={isScrolling}
					aria-label="Start auto-scroll for notation"
				>
					Start Scroll
				</button>

				<button
					on:click={stopAutoScroll}
					class="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
					class:opacity-50={!isScrolling}
					aria-label="Stop auto-scroll"
				>
					Stop
				</button>

				<button
					on:click={changeSpeed}
					class="text-sm font-medium text-purple-600 hover:text-purple-800"
					aria-label="Change scroll speed"
				>
					Speed: {speedOptions[currentSpeedIndex]}x
				</button>

				<a
					href="/all-songs"
					class="ml-auto text-sm text-gray-600 hover:text-gray-800"
					aria-label="Back to all songs"
				>
					Back to Songs
				</a>
			</div>
		</div>

		<!-- Countdown overlay -->
		{#if showCountdown}
			<div
				class="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-40"
				aria-live="polite"
				aria-label="Auto-scroll countdown"
			>
				<div class="text-9xl font-bold text-white">{countdownValue}</div>
			</div>
		{/if}

		<!-- Notation Section -->
		<div
			bind:this={notationContainer}
			class="notation-content scrollbar-none relative max-h-[70vh] overflow-y-auto font-mono"
			style="scroll-behavior: smooth;"
			role="main"
			aria-label="Musical notation"
		>
			<!-- Simple Notation Format -->
			{#if isSimpleNotation}
				<div class="my-4">
					{#each songData.notation as line, index}
						<div class="mb-6" role="group" aria-label="Notation line {index + 1}">
							<div class="text-xl tracking-wider">{line.notes}</div>
						</div>
					{/each}
				</div>

				<!-- Complex Notation Format -->
			{:else if isComplexNotation}
				<div class="my-4">
					{#each songData.notation.Song as row, rowIndex}
						<div
							class="mb-8 flex justify-between"
							role="group"
							aria-label="Notation section {rowIndex + 1}"
						>
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
											role="complementary"
											aria-label="Lyrics"
										>
											{section.lyrics}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/each}
				</div>

				<!-- Unknown Format -->
			{:else}
				<div class="my-4">
					<pre
						class="text-xs whitespace-pre-wrap md:text-sm"
						role="code"
						aria-label="Raw notation data">{JSON.stringify(songData.notation, null, 2)}</pre>
				</div>
			{/if}
		</div>
	{:else}
		<div class="my-10 text-center text-gray-500">No song data found.</div>
	{/if}
</main>
