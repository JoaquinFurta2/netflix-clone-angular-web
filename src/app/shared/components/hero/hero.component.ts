import { NgOptimizedImage, } from '@angular/common';
import { Component, computed, inject, input, signal  } from '@angular/core';
import { ImageDetails } from '../../models/dataService.model';
import { MovieDetails, TVShowDetails } from '../../models/dataService.model';
import { DataService } from '../../services/data.service';
import { HoverService } from '../../services/hover.service';
import { CurrentService } from '../../services/current.service';
import { ResizeService } from '../../services/resize.service';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {



  id = input.required<number>()
  type = input.required<"movie" | "tv">()

  currentService = inject(CurrentService)
  hoverService = inject(HoverService)
  dataService = inject(DataService)
  reszieSrevice = inject(ResizeService)


  isLoaded = signal(false)

  data = signal<{logo:ImageDetails | null, img:ImageDetails | null, overview:string}>(
    {logo:null, img:null, overview: ''})

  logoHeight = computed(() => {
    return this.reszieSrevice.imgSize() === "sm" ? 300 : 500
  })

  async ngOnInit() {
    this.data.set(await this.setUpHero())
  }

  async setUpHero() {    
      const details = await this.dataService.byId(this.type(), this.id())
      return {
          'logo': this.logo(details, this.logoHeight()),
          'overview': this.overview(details),
          'img': this.img(details)
      }
  }
    logo(details:MovieDetails | TVShowDetails, h:number){
    
        const logos =  details.images.logos
        const logo = logos.find((logo) => { return logo.iso_639_1 === "en"})
    
        if (!logo)
            return null
        
        logo.url = `https://image.tmdb.org/t/p/w${h}${logo.file_path}`
        const height = h / logo.aspect_ratio
        logo.height = height
        return logo 
    }
    
     img(details:MovieDetails | TVShowDetails){   
        const images =  details.images.backdrops
        const img = images.find((img) => { return img.width === 1920})
    
        if(!img)
            return null
        
        img.url = `https://image.tmdb.org/t/p/original${img.file_path}`
        return img
        }
    
    overview(details:MovieDetails | TVShowDetails){
         return details.overview
    }
  
    OpenModal() {
      this.currentService.SetUpDetails(this.id(), this.type())
      .then(() =>
        this.hoverService.toggleModal()
      )
    }
}
