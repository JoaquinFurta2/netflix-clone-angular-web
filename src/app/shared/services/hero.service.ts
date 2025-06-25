import { Injectable, signal, computed } from '@angular/core';
import { DataService } from './data.service';
@Injectable({  providedIn: 'root',})

export class HeroService { 
    private homeHeroIds = [315635,27205,333339]
    private tvHeroIds = [66732,1402,44217]
    private movieHeroIds = [120,198663,718930]

    public HOME = this.select(this.homeHeroIds)
    public TV = this.select(this.tvHeroIds)
    public MOVIE = this.select(this.movieHeroIds)

    private select(arr:number[]) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
}