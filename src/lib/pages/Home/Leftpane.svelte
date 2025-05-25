<script lang="ts">
	import { getAllCategories } from '$lib/apiHooks/useSongs';
	import { formatPlays } from '$lib/utiils';

	// Use the Svelte Query hook for categories
	const categoriesQuery = getAllCategories();

	const getCategoryHref = (categorySlug: string) => {
		switch (categorySlug) {
			case 'hindi':
				return 'hindi-songs';
			case 'english':
				return 'english-songs';
			case 'sargams':
				return 'sargams';
			case 'all':
				return 'all-songs';
			case 'nepali':
				return 'nepali-songs';
			case 'newari':
				return 'newari-songs';
			case 'theme':
				return 'sargams';
			case 'classical':
				return 'sargams';
			default:
				return `/${categorySlug}`;
		}
	};
</script>

<div
	class="hidden h-screen flex-col overflow-y-auto border-r border-gray-200 bg-gray-50 p-6 md:flex md:w-72 lg:w-80"
>
	<!-- Categories Section -->
	<div class="mb-8">
		<h2 class="mb-4 font-[poppins] text-xl font-semibold text-gray-800">Categories</h2>

		{#if $categoriesQuery.isLoading}
			<div class="flex justify-center py-4">
				<div class="animate-pulse text-gray-500">Loading categories...</div>
			</div>
		{:else if $categoriesQuery.error}
			<div class="rounded-lg bg-red-50 p-3 text-sm text-red-600">
				Error loading categories: {$categoriesQuery.error.message}
			</div>
		{:else}
			<div class="space-y-3">
				{#each $categoriesQuery.data as category}
					<a
						href="/{getCategoryHref(category.slug)}"
						class="group flex cursor-pointer items-center rounded-lg p-3 transition-all duration-200 hover:bg-white hover:shadow-sm"
					>
						<div
							class="mr-3 flex h-10 w-10 items-center justify-center rounded-full"
							style="background-color: {category.color}20; color: {category.color};"
						>
							{#if category.icon_name === 'musical-notes'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									viewBox="0 0 512 512"
									fill="currentColor"
								>
									<path
										d="M421.84 37.37C385.08 10.86 324.89 4.65 324.89 4.65l-83.21 91.21 113.13 124.15 67.03-173.64z"
									/>
									<path
										d="M208 32l-93 87.72 117.18 128.54L208 32zM465.61 480c-33.69 0-61.02-27.34-61.02-61.04 0-26.09 16.44-49.16 41.13-57.5 3.94-1.33 6.58-4.98 6.58-9.13V121.28l-58.8 153.41c-1.35 3.54-4.76 5.87-8.51 5.87-1.03 0-2.08-.17-3.1-.53L141.72 204.14l-5.23 1.34C93.21 218.33 48 269.54 48 343.04 48 431.01 109.99 480 185.36 480c47.99 0 81.09-20.73 135.64-36.33 17.13-4.9 40.19-9.85 64.94-9.85 27.18 0 52.07 5.08 78.55 15.85.89.37 1.82.55 2.76.55 3.47 0 6.67-2.39 7.47-5.89.36-1.59.2-3.21-.47-4.67C466.71 423.43 416 389.61 416 337.5c0-28.19 9.98-50.73 28.66-64.82 3.41-2.58 8.28-1.91 10.86 1.5 2.58 3.41 1.91 8.28-1.5 10.86-14.53 11-22.02 27.92-22.02 52.46 0 30.67 21.75 58.21 54.01 83.4-24.15-7.82-46.04-11.76-69.36-11.76-26.37 0-50.59 5.19-68.83 10.38-10.94 3.11-178.15 38.16-238.6-54.96 28.59 10.12 53.81 13.59 78.83 13.59 68.58 0 118.5-17.44 118.5-17.44s-60.25-105.48-133-105.48c-39.17 0-69.55 14.48-91.25 35.49 2.82-66.83 27.82-118.59 71-131.96l4.34-1.34 242.77 75.93L338.52 96.7l-40.43-44.38c67 0 107.25 16.47 107.25 16.47s58.26-8.32 109.36 23.93c2.69 1.7 8.76 8.36 11.3 8.24V352.3c-35.44 8.87-59.83 40.59-59.83 78.7 0 43.57 35.44 79.02 79.01 79.02s79.01-35.45 79.01-79.02c0-43.58-35.44-79.03-79.01-79.03-3.97 0-8.02.33-12.08.97V106.72l-42.83-16.93c-2.86-1.13-6.1-1.14-8.98-.02z"
									/>
								</svg>
							{/if}
							{#if category.icon_name === 'musical-note'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									viewBox="0 0 512 512"
									fill="currentColor"
								>
									<path
										d="M381.55 32.05c-18.13 4.32-126.66 31.48-144.29 36.5a16.11 16.11 0 00-12.11 15.69v278.31c-.06 16-10.42 33.94-24.32 42.29-12.61 7.59-27.78 8.71-45.9 3.26-69.63-21-16.63-105.47 60.29-92.33a16.08 16.08 0 0012.16-2.79 16.2 16.2 0 006.63-13.11V139.28a16.12 16.12 0 0112.12-15.7c16.55-4.82 123.54-30.88 142.1-35.46a16.14 16.14 0 0120.05 15.65v192.26c0 16.11-10.63 33.95-24.7 42.25-12.36 7.25-27.41 8.89-45.15 4.87-69.35-16-26.6-105.28 51-95.23a16.05 16.05 0 0012.12-2.82 16.12 16.12 0 006.59-13V47.76a16.07 16.07 0 00-19.59-15.71z"
									/>
								</svg>
							{/if}
							{#if category.icon_name === 'film'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									viewBox="0 0 512 512"
									fill="currentColor"
								>
									<path
										d="M436 80H76a44.05 44.05 0 00-44 44v264a44.05 44.05 0 0044 44h360a44.05 44.05 0 0044-44V124a44.05 44.05 0 00-44-44zM112 388a12 12 0 01-12 12H76a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12H76a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12H76a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12H76a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm241.68 124H158.32a16 16 0 010-32h195.36a16 16 0 110 32zM448 388a12 12 0 01-12 12h-24a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12h-24a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12h-24a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12zm0-80a12 12 0 01-12 12h-24a12 12 0 01-12-12v-24a12 12 0 0112-12h24a12 12 0 0112 12z"
									/>
								</svg>
							{/if}
							{#if category.icon_name === 'help-buoy-outline'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									viewBox="0 0 512 512"
									fill="none"
									stroke="currentColor"
									stroke-width="32"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="256" cy="256" r="208" />
									<circle cx="256" cy="256" r="80" />
									<path
										d="M208 54l8 132M296 186l8-132M208 458l8-132M296 326l8 132M458 208l-132 8M186 296l-132 8M458 304l-132-8M186 216l-132-8"
									/>
								</svg>
							{/if}
						</div>
						<div class="flex-1">
							<h3 class="font-[poppins] font-medium text-gray-900 group-hover:text-gray-900">
								{category.title}
							</h3>
							<p class="text-xs text-gray-500">{category.count} songs</p>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Ad Space -->
	<div class="mb-8">
		<!-- <div class="rounded-lg bg-gray-100 p-4 text-center">
			<p class="mb-2 text-sm text-gray-600">Advertisement</p>
			<div class="flex h-32 items-center justify-center rounded border border-gray-300 bg-gray-200">
				<span class="text-gray-500">Ad Space</span>
			</div>
		</div> -->
	</div>

	<!-- Top Songs of All Time (Commented out in the original) -->
	<!-- <div>
        <h2 class="font-[poppins] text-xl font-semibold mb-4 text-gray-800">All Time Favorites</h2>
        
        <div class="space-y-2">
            {#each topSongsAllTime as song, index}
                <a href="/song/{song.id}" class="flex items-center py-2 px-1 border-b border-gray-100 hover:bg-white transition-colors duration-200">
                    <div class="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs mr-3">
                        {index + 1}
                    </div>
                    <div class="flex-1">
                        <h3 class="font-[poppins] text-sm font-medium text-gray-900">{song.title}</h3>
                        <p class="text-xs text-gray-600">{song.artist}</p>
                    </div>
                    <div class="text-xs text-gray-500">
                        {formatPlays(song.plays)}
                    </div>
                </a>
            {/each}
        </div>
    </div> -->
</div>
