// src/routes/popular/types.ts
export interface Song {
  id: number;
  title: string;
  artist: string;
  views: number;
  category: string;
}

export interface Category {
  name: string;
  count: number;
  icon: string;
}