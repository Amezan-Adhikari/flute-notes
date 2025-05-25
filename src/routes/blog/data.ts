export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	author: string;
	publishedAt: string;
	tags: string[];
	readTime: number;
	featured: boolean;
}

export interface SidebarLink {
	title: string;
	href: string;
	icon?: string;
}

export const blogPosts: BlogPost[] = [
	{
		id: '1',
		slug: 'music-theory-fundamentals',
		title: "Music Theory Fundamentals: A Complete Beginner's Guide",
		excerpt:
			'Learn the essential building blocks of music theory including notes, scales, intervals, and how they work together.',
		content: `# Music Theory Fundamentals: A Complete Beginner's Guide
  
  Music theory is the language that helps us understand how music works. Whether you're a complete beginner or looking to formalize your musical knowledge, understanding these fundamentals will enhance your musical journey.
  
  ## What is Music Theory?
  
  Music theory is a system that explains the elements of music - pitch, rhythm, harmony, form, and expression. It's like learning the grammar of music.
  
  ## The Musical Alphabet
  
  Music uses only seven letter names: A, B, C, D, E, F, G. These repeat infinitely in both directions.
  
  ## Key Concepts
  
  - **Notes**: The individual sounds that make up music
  - **Intervals**: The distance between two notes
  - **Scales**: Collections of notes that create a key
  - **Chords**: Multiple notes played simultaneously
  
  ## The Staff and Clefs
  
  The staff consists of five lines and four spaces where we write music. The treble clef (𝄞) and bass clef (𝄢) tell us which notes correspond to which lines.
  
  ### Reading Treble Clef
  
  - Lines (bottom to top): E, G, B, D, F ("Every Good Boy Does Fine")
  - Spaces (bottom to top): F, A, C, E ("FACE")
  
  ## Sharps and Flats
  
  Between most letter names are sharps (#) and flats (♭):
  - C# = D♭
  - D# = E♭
  - F# = G♭
  - G# = A♭
  - A# = B♭
  
  Note: There are no sharps/flats between E-F and B-C (these are natural half steps).
  
  ## Getting Started
  
  1. Learn to identify notes on the staff
  2. Practice intervals by ear
  3. Study major and minor scales
  4. Apply theory to your instrument
  
  Music theory doesn't limit creativity - it provides tools to express your musical ideas more effectively and communicate with other musicians.`,
		author: 'Dr. Sarah Collins',
		publishedAt: '2024-01-15',
		tags: ['music-theory', 'fundamentals', 'beginners', 'notes'],
		readTime: 8,
		featured: true
	},
	{
		id: '2',
		slug: 'scales-and-modes-explained',
		title: 'Understanding Scales and Modes: Beyond Major and Minor',
		excerpt:
			'Explore the world of musical modes, exotic scales, and how different scale patterns create unique musical colors and emotions.',
		content: `# Understanding Scales and Modes: Beyond Major and Minor
  
  While major and minor scales form the foundation of Western music, the world of scales and modes offers a rich palette of musical colors waiting to be explored.
  
  ## What Are Modes?
  
  Modes are variations of the major scale, each starting from a different degree. Each mode has its own unique character and emotional quality.
  
  ### The Seven Modes of the Major Scale
  
  Using C major as our example:
  
  1. **Ionian (Major)**: C-D-E-F-G-A-B - Bright, happy
  2. **Dorian**: D-E-F-G-A-B-C - Minor with raised 6th, jazzy
  3. **Phrygian**: E-F-G-A-B-C-D - Dark, Spanish/Middle Eastern
  4. **Lydian**: F-G-A-B-C-D-E - Dreamy, ethereal (#4)
  5. **Mixolydian**: G-A-B-C-D-E-F - Dominant, bluesy
  6. **Aeolian (Natural Minor)**: A-B-C-D-E-F-G - Sad, melancholic  
  7. **Locrian**: B-C-D-E-F-G-A - Unstable, rarely used
  
  ## Scale Degrees and Functions
  
  Each note in a scale has a specific function:
  - 1st: Tonic (home)
  - 2nd: Supertonic
  - 3rd: Mediant (defines major/minor)
  - 4th: Subdominant
  - 5th: Dominant (strong pull to tonic)
  - 6th: Submediant
  - 7th: Leading tone (pulls to tonic)
  
  ## Exotic Scales
  
  - **Harmonic Minor**: Natural minor with raised 7th
  - **Melodic Minor**: Ascending vs descending forms
  - **Pentatonic**: Five-note scales (major and minor)
  - **Blues Scale**: Pentatonic with added "blue note"
  
  ## Practical Applications
  
  - Use Dorian for jazz and folk music
  - Lydian creates mystical, film score sounds
  - Mixolydian is perfect for rock and blues
  - Harmonic minor adds drama and tension
  
  Understanding modes opens up new possibilities for composition, improvisation, and musical expression across all genres.`,
		author: 'Professor James Martinez',
		publishedAt: '2024-02-20',
		tags: ['scales', 'modes', 'advanced', 'composition'],
		readTime: 12,
		featured: false
	},
	{
		id: '3',
		slug: 'flute-fingerings-complete-guide',
		title: 'Complete Flute Fingering Chart: From Beginner to Advanced',
		excerpt:
			'Master flute fingerings with this comprehensive guide covering standard fingerings, alternate fingerings, and advanced techniques.',
		content: `# Complete Flute Fingering Chart: From Beginner to Advanced
  
  Proper fingering technique is essential for flute players at every level. This guide covers everything from basic fingerings to advanced alternate fingerings for tricky passages.
  
  ## Basic Flute Fingering System
  
  The flute uses a system of keys and tone holes operated by your fingers. The left hand controls the upper body, right hand the lower body.
  
  ## Hand Position
  
  - **Left Hand**: Thumb on back key, fingers curved over tone holes
  - **Right Hand**: Thumb supports the flute, fingers curved naturally
  - Keep wrists straight and relaxed
  
  ## First Octave Fingerings (Low Register)
  
  ### C4 to B4 (Middle C and above)
  - **C**: Left thumb + all fingers down
  - **D**: Lift right pinky
  - **E**: Lift right ring finger  
  - **F**: Lift right middle finger
  - **G**: Lift right index finger
  - **A**: Lift left pinky
  - **B**: Lift left ring finger
  
  ## Second Octave (High Register)
  
  Most notes in the second octave use the same fingerings but with the addition of the octave key (left thumb key).
  
  ## Advanced Techniques
  
  ### Alternate Fingerings
  
  Use alternate fingerings for:
  - Difficult technical passages
  - Better intonation
  - Smoother legato lines
  - Trill fingerings
  
  ### Common Alternate Fingerings
  
  - **High F#**: Multiple options for better intonation
  - **C# trill**: Special fingering for rapid alternation
  - **Bb**: Several alternatives for different contexts
  
  ## Practice Tips
  
  1. **Start Slowly**: Build muscle memory gradually
  2. **Use a Mirror**: Check hand position and posture  
  3. **Practice Scales**: Develop finger patterns
  4. **Long Tones**: Combine fingering practice with tone development
  
  ## Troubleshooting Common Issues
  
  - **Squeaky High Notes**: Check octave key coordination
  - **Flat Low Notes**: Ensure complete hole coverage
  - **Uneven Scales**: Practice chromatic scales slowly
  
  Regular practice with proper fingering technique will lead to clean, precise playing and the ability to tackle increasingly challenging repertoire.`,
		author: 'Maria Rodriguez',
		publishedAt: '2024-03-10',
		tags: ['flute', 'fingerings', 'technique', 'tutorial'],
		readTime: 10,
		featured: true
	},
	{
		id: '4',
		slug: 'reading-sheet-music-guide',
		title: 'How to Read Sheet Music: A Step-by-Step Approach',
		excerpt:
			'Learn to read musical notation with confidence using proven methods for recognizing notes, rhythms, and musical symbols.',
		content: `# How to Read Sheet Music: A Step-by-Step Approach
  
  Reading sheet music is like learning a new language - it takes time and practice, but the rewards are immense. This systematic approach will have you reading music with confidence.
  
  ## Why Learn to Read Music?
  
  Musical literacy opens doors to:
  - Playing any piece of written music
  - Communicating with other musicians
  - Understanding musical structure
  - Expanding your repertoire quickly
  
  ## Step 1: Master the Staff
  
  The staff has five lines and four spaces. Start with treble clef:
  - **Lines**: E, G, B, D, F ("Every Good Boy Does Fine")
  - **Spaces**: F, A, C, E ("FACE")
  
  ## Step 2: Learn Note Values
  
  - **Whole Note**: 4 beats (○)
  - **Half Note**: 2 beats (♩)
  - **Quarter Note**: 1 beat (♪)
  - **Eighth Note**: 1/2 beat (♫)
  - **Sixteenth Note**: 1/4 beat (♬)
  
  ## Step 3: Understand Time Signatures
  
  Common time signatures:
  - **4/4**: Four quarter-note beats per measure
  - **3/4**: Three quarter-note beats per measure (waltz time)
  - **2/4**: Two quarter-note beats per measure
  - **6/8**: Six eighth-note beats per measure
  
  ## Step 4: Key Signatures
  
  Key signatures tell you which notes to play as sharps or flats throughout the piece.
  
  ### Order of Sharps: F# C# G# D# A# E# B#
  ### Order of Flats: B♭ E♭ A♭ D♭ G♭ C♭ F♭
  
  ## Practice Strategies
  
  1. **Flashcards**: For note recognition
  2. **Rhythm Clapping**: Separate rhythm from pitch
  3. **Scale Practice**: Reinforce key signatures
  4. **Sight-Reading**: Read new music daily
  
  ## Common Symbols
  
  - **Slur**: Smooth connection between notes
  - **Tie**: Connects two notes of same pitch
  - **Staccato**: Short, detached notes
  - **Accent**: Emphasize the note
  - **Fermata**: Hold the note longer
  
  ## Building Speed
  
  - Start with simple melodies
  - Practice interval recognition
  - Use a metronome for steady tempo
  - Don't sacrifice accuracy for speed
  
  Remember, reading music is a skill that improves with consistent practice. Be patient with yourself and celebrate small victories along the way.`,
		author: 'Daniel Thompson',
		publishedAt: '2024-03-25',
		tags: ['sheet-music', 'reading', 'notation', 'fundamentals'],
		readTime: 7,
		featured: false
	}
];

export const categories = [
	'All Posts',
	'Music Theory',
	'Instruments',
	'Sheet Music',
	'Classical Music',
	'Composition'
];

export const recentPosts = blogPosts.slice(0, 3);

export const popularTags = [
	'music-theory',
	'flute',
	'sheet-music',
	'scales',
	'fundamentals',
	'classical'
];

export const sidebarLinks: SidebarLink[] = [
	{ title: 'Home', href: '/' },

	{ title: 'Blog', href: '/blog' },
	{ title: 'Start Playing', href: '/all-songs' }
];
