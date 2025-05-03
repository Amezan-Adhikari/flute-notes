export interface ISong {
    id: number;
    title: string;
    category: number;
    category_name: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | string; 
    artist: string;
    image: string | null;
    lyrics: string;
    no_of_plays: string;
  }
  
  export interface INotationLine {
    line: number;
    notes: string;
  }
  
  export interface INotation {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | string;
    artist: string;
    category: string;
    composer: string;
    scale: string;
    flute: string;
    beat: string;
    taal: string;
    notation: INotationLine[];
  }
  