import axios from 'axios';

// const BASE_URL= `http://192.168.1.64:8000/api/`
// const BASE_URL = 'http://192.168.1.64:8000/api';  // For Android Emulator
// const BASE_URL = 'https://xlang-server.onrender.com/api/v1';  // For iOS Simulator

const BASE_URL = `https://sarega699.pythonanywhere.com/api/`;

// Create API service
export const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer T9x#Lp7mWzR2@jFkqP3$Nv8YtD6!Bc4hM5X&GrJ1VwKZQ%L9yTXP*F7R`
	}
});

export const categoriesApi = {
	getAllCategories: async () => {
		const response = await api.get('/categories');
		return response.data.results;
	}
};

export const songsApi = {
	getAllSongs: async () => {
		const response = await api.get('/songs');
		return response.data.results;
	},
	getSong: async (id: number) => {
		const response = await api.get(`/songs/${id}`);
		return response.data;
	},
	createSong: async (songData: any) => {
		const response = await api.post('/songs/', songData);
		return response.data;
	},
	updateSong: async (id: number, songData: any) => {
		const response = await api.put(`/songs/${id}/`, songData);
		return response.data;
	},
	deleteSong: async (id: number) => {
		const response = await api.delete(`/songs/${id}/`);
		return response.data;
	},
	getSongNotation: async (songId: number) => {
		const response = await api.get(`/songs/${songId}/notation/`);
		return response.data;
	},
	getPopularSongs: async (activeFilter: string) => {
		const response = await api.get(`/popular-songs/?period=${activeFilter}`);
		return response.data.results;
	},
	getTrendingSongs: async () => {
		const response = await api.get('/trending-songs/');
		return response.data;
	},
	getSongsByCategory: async ({ categorySlug, page }: { categorySlug: string; page: number }) => {
		const response = await api.get(`/songs/?category=${categorySlug}&page=${page}`);
		return response.data;
	},
	getSongsUsingSearch: async (searchQuery: string) => {
		if (searchQuery.length === 0) {
			return [];
		}
		const response = await api.get(`/songs/?search=${searchQuery}`);
		return response.data.results;
	},
	updateSongPlayCount: async (songId: number) => {
		const response = await api.post(`/songs/${songId}/increment-plays/`);
		return response.data;
	},
	createSongReport: async (reportData: {
		song: number;
		issue_type: string;
		description: string;
	}) => {
		console.log(`Creating song report`, reportData);

		const response = await api.post(`/issue-reports/`, reportData);
		console.log(`Report response: response`, response);

		return response.data;
	},
	requestSong: async (reportData: { song: number; issue_type: string; description: string }) => {
		console.log(`Creating song report`, reportData);

		const response = await api.post(`/request-song/`, reportData);
		console.log(`Report response: response`, response);

		return response.data;
	}
};
