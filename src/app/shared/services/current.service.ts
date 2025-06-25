import { Injectable, computed, signal } from '@angular/core';
import { MovieDetails, TVShowDetails, ImageDetails, Credits,  Genre, Seasons, Episode } from '../models/dataService.model';
import { DataService } from './data.service';

@Injectable({  providedIn: 'root',})

export class CurrentService {

    constructor(private dataService: DataService) {}

    details = signal<MovieDetails | TVShowDetails>(
        {
            adult: false,
            backdrop_path: '',
            belongs_to_collection: null,
            genres: [] as Genre[], // Empty array for genres
            homepage: '',
            id: 0,
            imdb_id: '',
            original_language: '',
            original_title: '',
            overview: '',
            popularity: 0,
            poster_path: '',
            release_date: '',
            revenue: 0,
            runtime: 0,
            tagline: '',
            title: '',
            images: {
              backdrops: [] as ImageDetails[], // Empty array for backdrops
              logos: [] as ImageDetails[],    // Empty array for logos
              posters: [] as ImageDetails[],  // Empty array for posters
            },
          }
         
    )

    type = computed(() => {
        return 'number_of_seasons' in this.details() ? 'tv' : 'movie'
    })

    id = computed(() => {
        return this.details().id
    })

    release = computed(() => {
    const media = this.details()
    return 'number_of_seasons' in media ? media.first_air_date : media.release_date
    })

    img = computed(() => {
    const lookFor = this.details().backdrop_path
    if (!lookFor) {
    const img:ImageDetails =  {
        url: `/images/unknown.jpg`, // Replace with your default image URL
        height: 400, // Default height
        aspect_ratio: 1.78, // Default aspect ratio (16:9)
        iso_639_1:"",
        file_path:"",
        vote_average:0,
        vote_count:0,
        width:0
    };
    return img
    }
    const images =  this.details().images.backdrops
    const img = images.find((img) => { return img.file_path === lookFor })!
    img.url = `https://image.tmdb.org/t/p/w400/${img.file_path}`
    img.height = 400 / img.aspect_ratio
    return img
    })

    bigImg = computed(() => {
    if (this.img().file_path !== "") {
            return `https://image.tmdb.org/t/p/w780/${this.img().file_path}`
    }
        return `images/unknown.jpg`
    })

    genres = computed(() => {
    const arr = this.details().genres
        if (arr.length > 4) {
        arr.splice(4)
        return arr
        } else 
        return arr
    })

    duration = computed(()=> {
    const media = this.details()
    if ('number_of_seasons' in media) {
        return media.number_of_seasons === 1 ? media.number_of_episodes + " Episodes" : media.number_of_seasons + " Seasons"
    } else {     
        const hours = Math.floor(media.runtime / 60);
        const minutes = media.runtime % 60;
    
        const hoursPart = hours > 0 ? `${hours}h` : '';
        const minutesPart = minutes > 0 ? `${minutes}min` : '';
    
        return `${hoursPart}${hoursPart && minutesPart ? ' ' : ''}${minutesPart}`.trim();
        }
    })

    title = computed(() => {
    const media = this.details()
    if ('name' in media) {  
        return media.name
    } else {
        return media.title
    }
    })
    
    overview = computed(() => {
    return this.details().overview
    })
    
    logo = computed(() => {
        const logos =  this.details().images.logos
        const logo = logos.find((logo) => { return logo.iso_639_1 === "en" && logo.aspect_ratio > 1.5})

        if (!logo)
            return null
        
        logo.url = `https://image.tmdb.org/t/p/w300/${logo.file_path}`
        const height = 300 / logo.aspect_ratio
        logo.height = height
        return logo 
    }) 

    credits = signal<Credits>({ cast: [], crew: [], id: 0 })  
    
    director = computed(() => {
        if (this.credits().crew.length !== 0 && this.credits().crew) {
            const director = this.credits().crew.find(person => person.job === 'Director')
            if (director) {
                return director.name
            } else 
                return "not found"
        } else 
            return "not found"
        
    })
    
    writer = computed(() => {
        return this.credits().crew.filter(person => person.job === 'Writer').map(crew => crew.name)
    })
    
    cast = computed(()=> {
        return this.credits().cast.filter((cast, idx) => idx <= 10)
    })


    seasonDetails = signal<Episode[] | null>(null)
    season = signal(1)

    seasonNumb = computed(() => {
        const media = this.details()
        return "number_of_seasons" in media ? Array.from({ length: media.number_of_seasons}, (_, i) => i + 1) : []
    })
    
    seasonTotal = computed(() => {
        const media = this.details()
        return "number_of_seasons" in media ? media.number_of_seasons : 0
    })


    SetUpCredits() {  
        this.dataService.credits(this.type(),this.id())
        .then((data) => this.credits.set(data))      
    }

    async SetUpDetails(id: number, type: 'movie' | 'tv') {
        const data = await this.dataService.byId( type , id)
        this.details.set(data)
        return true
    }

    SetUpSeason() {
        this.dataService.season(this.season(), this.id())
        .then((data)=> {
            this.seasonDetails.set(data)
        })
    }

} 