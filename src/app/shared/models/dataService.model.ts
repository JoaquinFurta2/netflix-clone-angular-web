export interface Movie {
      adult: boolean; 
      backdrop_path: string; 
      genre_ids: number[]; 
      id: number; 
      original_language: string; 
      original_title: string; 
      overview: string;
      popularity: number; 
      poster_path: string; 
      release_date: string; 
      title: string; 
      video: boolean;
      vote_average: number; 
      vote_count: number; 
      name:string
  }

  export interface TVShow {
    adult: boolean; 
    backdrop_path: string; 
    poster_path: string; 
    genre_ids: number[]; 
    id: number; 
    name:string; 
    title:string
}

export interface DiscoverPage {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}


export interface MovieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: string | null;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    revenue: number;
    runtime: number;
    tagline: string;
    title: string;
    images: Images

  }

export  interface TVShowDetails {
    adult: boolean;
    backdrop_path: string;
    created_by: Array<{
      id: number;
      credit_id: string;
      name: string;
      gender: number;
      profile_path: string;
    }>;
    episode_run_time: number[];
    first_air_date: string;
    genres: Genre[]
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
      id: number;
      name: string;
      overview: string;
      vote_average: number;
      vote_count: number;
      air_date: string;
      episode_number: number;
      production_code: string;
      runtime: number;
      season_number: number;
      show_id: number;
      still_path: string;
    };
    name: string;
    next_episode_to_air: string | null;
    networks: Array<{
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }>;
    number_of_episodes: number;
    number_of_seasons: number;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    seasons: Array<{
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
      vote_average: number;
    }>;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
    images: Images;
 
  }
  
  
export  interface Genre {
    id: number;
    name: string;
  }
  
export interface cardData {
  title: string;
  backdrop: string;
  poster:string;
  id:number
  type: 'movie' | 'tv'
}

export interface Images {
  backdrops: ImageDetails[];
  logos: ImageDetails[];
  posters: ImageDetails[];
}

export interface ImageDetails {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
  url:string;
}



export interface Credits {
  id: number; // Defaults to 0
  cast: CastMember[]; // Array of cast member objects
  crew: CrewMember[]; // Array of crew member objects
}

export interface CastMember {
  adult: boolean; // Defaults to true
  gender: number; // Defaults to 0
  id: number; // Defaults to 0
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number; // Defaults to 0
  profile_path: string;
  cast_id: number; // Defaults to 0
  character: string;
  credit_id: string;
  order: number; // Defaults to 0
}

export interface CrewMember {
  adult: boolean; // Defaults to true
  gender: number; // Defaults to 0
  id: number; // Defaults to 0
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number; // Defaults to 0
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}


export interface Seasons {
  episodes:Episode[]
}

export interface Episode {
  episode_number: number; // Defaults to 0
  id: number; // Defaults to 0
  name: string;
  overview: string;
  production_code: string;
  runtime: number; // Defaults to 0
  season_number: number; // Defaults to 0
  still_path: string;
}