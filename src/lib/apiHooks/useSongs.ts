import { categoriesApi, songsApi } from '$lib/services/api';
import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';

// Query keys
export const queryKeys = {
	songs: ['songs'],
	song: (id: number) => ['song', id],
	songNotation: (songId: number) => ['song', songId, 'notation'],
	popularSongs: ['popular-songs'],
	trendingSongs: ['trending-songs'],
	categories: ['categories'],
	category: (id: number) => ['category', id],
	categorySongs: (categorySlug: string) => ['songs', categorySlug]
};

// Songs queries
export function getAllSongs() {
	return createQuery({
		queryKey: queryKeys.songs,
		queryFn: songsApi.getAllSongs,
		staleTime: 1000 * 60 * 5 // 5 minutes
	});
}

export function getSong(id: number) {
	return createQuery({
		queryKey: queryKeys.song(id),
		queryFn: () => songsApi.getSong(id)
	});
}

export function createSong() {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: (songData: any) => songsApi.createSong(songData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.songs });
		}
	});
}

export function updateSong(id: number) {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: (songData: any) => songsApi.updateSong(id, songData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.songs });
			queryClient.invalidateQueries({ queryKey: queryKeys.song(id) });
		}
	});
}

export function deleteSong(id: number) {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: () => songsApi.deleteSong(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.songs });
		}
	});
}

export function getSongNotation(songId: number) {
	return createQuery({
		queryKey: queryKeys.songNotation(songId),
		queryFn: () => songsApi.getSongNotation(songId)
	});
}

export function getPopularSongs(activeFilter: string) {
	return createQuery({
		queryKey: queryKeys.popularSongs,
		queryFn: () => songsApi.getPopularSongs(activeFilter),
		staleTime: 1000 * 60 * 5 // 5 minutes
	});
}

export function getTrendingSongs() {
	return createQuery({
		queryKey: queryKeys.trendingSongs,
		queryFn: songsApi.getTrendingSongs,
		staleTime: 1000 * 60 * 5 // 5 minutes
	});
}

export function getAllSongsByCategory({
	categorySlug,
	page
}: {
	categorySlug: string;
	page: number;
}) {
	return createQuery({
		queryKey: queryKeys.categorySongs(categorySlug),
		queryFn: () =>
			songsApi.getSongsByCategory({
				categorySlug,
				page
			})
	});
}

export function getAllSongsBySearch(searchQuery: string) {
	return createQuery({
		queryKey: ['songs', searchQuery],
		queryFn: () => songsApi.getSongsUsingSearch(searchQuery)
	});
}

// Categories queries
export function getAllCategories() {
	return createQuery({
		queryKey: queryKeys.categories,
		queryFn: categoriesApi.getAllCategories,
		staleTime: 1000 * 60 * 5 // 5 minutes
	});
}

export function createSongReport() {
	const queryClient = useQueryClient();
	console.log('Creating song report');

	return createMutation({
		mutationFn: (songData: any) => songsApi.createSongReport(songData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.songs });
		},
		onError: (error) => {
			console.error('Error creating song report:', error);
		}
	});
}

export function requestASong() {
	const queryClient = useQueryClient();
	console.log('requesting song ');

	return createMutation({
		mutationFn: (songData: any) => songsApi.requestSong(songData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.songs });
		},
		onError: (error) => {
			console.error('Error creating song report:', error);
		}
	});
}

export const updateSongPlayCount = async (songId: number) => {
	const { data, error } = await songsApi.updateSongPlayCount(songId);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};
