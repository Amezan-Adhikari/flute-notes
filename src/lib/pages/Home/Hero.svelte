<!-- Updated +page.svelte (Home page) -->
<script>
	import Leftpane from './Leftpane.svelte';
	import PopularSongs from './PopularSongs.svelte';
	import RightPane from './RightPane.svelte';
	import SearchComponent from './SearchComponent.svelte';
</script>

<section class="flex min-h-screen flex-col md:flex-row">
	<!-- Left Sidebar (Categories) - hidden on mobile -->
	<Leftpane />

	<!-- Main content -->
	<div class="flex flex-1 flex-col p-4 md:p-8">
		<!-- Hero Section -->
		<div class="mt-6 mb-8 flex flex-col items-center gap-4">
			<h1 class="text-center font-[poppins] text-4xl text-gray-800 md:text-6xl">
				Learn flute with sargam notations
			</h1>
			<p class="max-w-sm text-center font-[poppins] text-base text-gray-700 md:max-w-xl md:text-lg">
				With <span class="Logo font-[koho] font-bold">FLUTE NOTES</span>, you can search from the
				vast collection of songs, sargams, and ragas
			</p>
			<div class="w-full max-w-xl">
				<SearchComponent redirectOnEnter={true} redirectOnClick={true} />
			</div>
		</div>

		<!-- Featured Content Section -->
		<div class="mb-8 flex grid-cols-1 items-center justify-center gap-6 md:grid-cols-3">
			<!-- Ad Space (Left Rectangle) -->
			<!-- <div class="bg-gray-200 rounded-lg p-4 flex items-center justify-center border border-gray-300 h-48 shadow-sm">
                <p class="text-gray-600 text-sm font-medium">Advertisement Space</p>
            </div> -->

			<!-- Quick Start Guide -->
			<div
				class="flex h-48 flex-col items-center justify-center rounded-lg border border-blue-200 bg-blue-100 p-6 shadow-sm"
			>
				<h3 class="mb-3 text-xl font-semibold text-blue-800">New to Flute?</h3>
				<p class="mb-4 text-center text-sm text-blue-700">
					Start with our beginner-friendly guides
				</p>
				<button
					on:click={() => (window.location.href = '/blog')}
					class="rounded-full bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
					>Start Learning</button
				>
			</div>

			<!-- Ad Space (Right Rectangle) -->
			<!-- <div
				class="flex h-48 items-center justify-center rounded-lg border border-gray-300 bg-gray-200 p-4 shadow-sm"
			>
				<p class="text-sm font-medium text-gray-600">Advertisement Space</p>
			</div> -->
		</div>

		<!-- Featured Songs Section -->
		<PopularSongs />

		<!-- Newsletter Section -->
		<div class="mb-8 rounded-lg border border-gray-300 bg-gray-100 p-6 shadow-sm">
			<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h3 class="mb-2 text-xl font-semibold text-gray-800">Stay updated with new sargams</h3>
					<p class="text-sm text-gray-700">Get weekly updates on new additions to our collection</p>
				</div>
				<div class="flex flex-col gap-2 sm:flex-row">
					<input
						type="email"
						placeholder="Your email address"
						class="w-full rounded-lg border border-gray-400 px-4 py-2 text-sm sm:w-auto"
					/>
					<button
						class="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
						>Subscribe</button
					>
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
