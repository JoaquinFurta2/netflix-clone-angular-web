import { Injectable } from '@angular/core';
import { DiscoverPage, Credits, TVShow, TVShowDetails, Episode, Seasons } from '../models/dataService.model';
import { Movie } from '../models/dataService.model';
import { MovieDetails } from '../models/dataService.model';
import { defer, Observable } from 'rxjs';

@Injectable({  providedIn: 'root',})

export class DataService {

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODFjNTJiYjcxNWU0Njk4NjRkNTAwNzhjNzE0MDczOSIsIm5iZiI6MTczNDYyNTUxMy4yODEsInN1YiI6IjY3NjQ0OGU5NTgxYTNjMDUwN2FiMWZiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1RtrfYfbdXAEFKZBo6EPg-q-fB-vt_VudhjHRLnZTZk'
    } 
  };

  async byId(type: 'movie' | 'tv', id: number): Promise<MovieDetails | TVShowDetails> {
    const url = `https://api.themoviedb.org/3/${type}/${id}?append_to_response=images`;
    const response = await fetch(url, this.options);
    const data: MovieDetails | TVShowDetails = await response.json();
    return data;
  }
  
  async search(query:string, search: 'tv' | 'movie') : Promise<Movie[] | TVShow[]> {
    const url = `https://api.themoviedb.org/3/search/${search}?query=${query}&include_adult=false&language=en-US&page=1`
    const response = await fetch(url, this.options);
    const data:DiscoverPage = await response.json()
     return data.results.filter((m)=> m.vote_count > 50)
  }
  
  async credits(type: 'movie' | 'tv', id: number): Promise<Credits> {
    const url = `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`;
    const response = await fetch(url, this.options);
    const data: Credits = await response.json();
    return data;
  }

  async season(season__num:number, id: number): Promise<Episode[]> {
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${season__num}?language=en-US`;
    const response = await fetch(url, this.options);
    const data: Seasons = await response.json();
    return data.episodes;
  }


  /*  discover(type: 'movie' | 'tv', page: number, genre:number): Observable<Movie[] | TVShow[]> {
    return defer(async () => {
      const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&page=${page}&sort_by=vote_count.desc&vote_count.gte=100&with_genres=${genre}`;
      const response = await fetch(url, this.options);
      const data: DiscoverPage = await response.json();
      return data.results;
    });
    } */
   
  async discover(type: 'movie' | 'tv', page: number, genre:number): Promise<Movie[] | TVShow[]> {
      const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&page=${page}&sort_by=vote_count.desc&vote_count.gte=100&with_genres=${genre}`;
      const response = await fetch(url, this.options);
      const data: DiscoverPage = await response.json();
      return data.results
  }

  byId2(type: 'movie' | 'tv', id: number):  Observable<MovieDetails | TVShowDetails> {
    return defer(async () => {
      const url = `https://api.themoviedb.org/3/${type}/${id}?append_to_response=images`;
      const response = await fetch(url, this.options);
      const data: MovieDetails | TVShowDetails = await response.json();
      return data;
    })
    
  }
}
