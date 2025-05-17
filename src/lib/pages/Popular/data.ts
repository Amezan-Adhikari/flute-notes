// src/routes/popular/data.ts
import type { Song, Category } from './types';


// This file contains dummy data that you can replace with your actual data system
export const popularSongs: Song[] = [
  {
    id: 1,
    title: "IPL Theme Tune",
    artist: "Unknown",
    views: 533,
    category: "Theme Music"
  },
  {
    id: 2,
    title: "Krishna Dhun Mahabharata",
    artist: "Mahabharat",
    views: 548,
    category: "Hindi Songs"
  },
  {
    id: 3,
    title: "Krishna Flute (CN) [Easy Version]",
    artist: "Unknown",
    views: 502,
    category: "Classical"
  },
  {
    id: 4,
    title: "Raga Hamsadhwani Alankars For Practice – 2",
    artist: "Unknown",
    views: 503,
    category: "Sargams"
  },
  {
    id: 5,
    title: "Chahun Main Ya Naa (Easy Version)",
    artist: "Unknown",
    views: 505,
    category: "Hindi Songs"
  },
  {
    id: 6,
    title: "Game of Thrones Theme",
    artist: "HBO",
    views: 492,
    category: "Theme Music"
  },
  {
    id: 7,
    title: "Tujhe Dekha To",
    artist: "DDLJ",
    views: 478,
    category: "Hindi Songs"
  },
  {
    id: 8,
    title: "Symphony No. 9",
    artist: "Beethoven",
    views: 465,
    category: "Classical"
  }
];

export const categories: Category[] = [
  { name: "English Songs", count: 29, icon: "🎤" },
  { name: "Hindi Songs", count: 943, icon: "🎤" },
  { name: "Nepali Songs", count: 3, icon: "🎤" },
  { name: "Theme Music", count: 27, icon: "🎵" },
  { name: "Sargams", count: 17, icon: "🎵" },
  { name: "Classical", count: 15, icon: "🌐" }
];