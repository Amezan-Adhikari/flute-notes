import type { INotation, ISong } from '$lib/types';
import api from './api';

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const fetchSongs = async (page = 1): Promise<PaginatedResponse<ISong>> => {
  const res = await api.get(`songs/?page=${page}`);
  return res.data;
};

export const fetchSongById = async (id: number): Promise<ISong> => {
  const res = await api.get(`songs/${id}/`);
  return res.data;
};

export const fetchPopularSongs = async (): Promise<ISong[]> => {
  const res = await api.get('popular-songs/');
  return res.data;
};

export const fetchTrendingSongs = async (): Promise<ISong[]> => {
  const res = await api.get('trending-songs/');
  return res.data;
};

export const fetchSongNotation = async (songId: number): Promise<INotation> => {
  const res = await api.get(`songs/${songId}/notation/`);
  return res.data;
};
