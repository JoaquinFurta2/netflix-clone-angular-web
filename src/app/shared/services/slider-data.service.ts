import { Injectable, signal, computed } from '@angular/core';
import { DataService } from './data.service';
@Injectable({  providedIn: 'root',})

export class SliderDataService {

    constructor(private dataService: DataService){}

    HomeConfig= signal<{type: 'movie' | 'tv', genre:number, page:number, sliderHeader:string}[]>(
        [
        {type:'movie', genre:28, page:this.randomPage(), sliderHeader:"Action Movies"},
        {type:'tv', genre:35, page:this.randomPage(), sliderHeader:"Tv Show's for you to laugh"},
        {type:'movie', genre:14, page:this.randomPage(), sliderHeader:"Fantasy Movies"},
        {type:'movie', genre:80, page:this.randomPage(), sliderHeader:"Crime Movies"},
        {type:'tv', genre:10765, page:this.randomPage(), sliderHeader:"Sci-fi Tv Show's"},
        {type:'tv', genre:18, page:this.randomPage(), sliderHeader:"Drama Tv Show's"},
        {type:'movie', genre:27, page:this.randomPage(), sliderHeader:"Horror Movies"},
        {type:'tv', genre:10759, page:this.randomPage(), sliderHeader:"Action-Adventure Tv Show's"},
        {type:'tv', genre:16, page:this.randomPage(), sliderHeader:"Animation Tv Show's"},
        {type:'movie', genre:12, page:this.randomPage(), sliderHeader:"Adventure Movies"},
        {type:'movie', genre:35, page:this.randomPage(), sliderHeader:"Comedy Movies"},
        {type:'tv', genre:9648, page:this.randomPage(), sliderHeader:"Mystery Tv Show's"},
        {type:'movie', genre:37, page:this.randomPage(), sliderHeader:"Western Movies"},
        ]    
      )
       
    HomeData = computed(() => {
      return this.HomeConfig().map(elem => this.fetch(elem.type, elem.page, elem.genre))
    })


    TvConfig = signal<{ type:'tv',genre:number, page:number, sliderHeader:string}[]>(
      [
        {type:'tv',genre:80, page:this.randomPage(), sliderHeader:"Crime Tv Show's"},
        {type:'tv',genre:9648, page:this.randomPage(), sliderHeader:"Mystery Tv Show's"},
        {type:'tv',genre:10759, page:this.randomPage(), sliderHeader:"Action-Adventure Tv Show's"},
        {type:'tv',genre:16, page:this.randomPage(), sliderHeader:"Animation Tv Show's"},
        {type:'tv',genre:18, page:this.randomPage(), sliderHeader:"Drama Tv Show's"},
        {type:'tv',genre:37, page:1, sliderHeader:"Tv Show's from the Old West"},
        {type:'tv',genre:10765, page:this.randomPage(), sliderHeader:"Sci-fi Tv Show's"},
        {type:'tv',genre:35, page:this.randomPage(), sliderHeader:"Tv Show's for you to laugh"},
        {type:'tv',genre:99, page:this.randomPage(), sliderHeader:"Documentaries"},
      ]
    )

    TvData = computed(() => {
        return this.TvConfig().map(elem => this.fetch('tv', elem.page, elem.genre))
    })


    MovieConfig = signal<{ type:'movie',genre:number, page:number, sliderHeader:string}[]>(
      [
        {type:'movie', genre:36, page:this.randomPage(), sliderHeader:"History Movies"},
        {type:'movie', genre:878, page:this.randomPage(), sliderHeader:"Sci-fi Movies"}, 
        {type:'movie', genre:28, page:this.randomPage(), sliderHeader:"Action Movies"},
        {type:'movie', genre:18, page:this.randomPage(), sliderHeader:"Drama Movies"},
        {type:'movie', genre:12, page:this.randomPage(), sliderHeader:"Adventure Movies"},
        {type:'movie', genre:14, page:this.randomPage(), sliderHeader:"Fantasy Movies"},
        {type:'movie', genre:53, page:this.randomPage(), sliderHeader:"Thriller Movies"},
        {type:'movie', genre:16, page:this.randomPage(), sliderHeader:"Animation Movies"},
        {type:'movie', genre:27, page:this.randomPage(), sliderHeader:"Horror Movies"},
        {type:'movie', genre:35, page:this.randomPage(), sliderHeader:"Comedy Movies"}, 
      ]
    )

    MovieData = computed(() => {
      return this.MovieConfig().map(elem => this.fetch('movie', elem.page, elem.genre))
    })

    private fetch(type:'movie' | 'tv', page:number, genre:number) {
      const data = this.dataService.discover(type, page, genre)
      return data
    }
    private randomPage() {
      return Math.floor(Math.random() * 4) + 1;
    }
 }
 
