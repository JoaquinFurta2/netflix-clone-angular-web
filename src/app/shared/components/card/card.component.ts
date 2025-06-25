import { Component, computed, input, inject, effect, signal} from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ResizeService } from '../../services/resize.service';
import { NgOptimizedImage } from '@angular/common'
import { cardData } from '../../models/dataService.model';


@Component({
  selector: 'app-card',
  imports: [NgOptimizedImage, OverlayModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {

  mediaData = input.required<cardData>()
  isLoaded = signal(false)
  
  load() {
    console.log("Loaded")
    this.isLoaded.set(true)
  }
  
  cardImg = computed(() => {
    const size = this.resizeService.imgSize()
    let route: string
    let img = !this.mediaData().backdrop ? '/images/unknown.jpg' : this.mediaData().backdrop
  
    switch(size) {
      case "sm":
        route = "w220_and_h330_face"
        img = this.mediaData().poster ? this.mediaData().poster : '/images/unknown_resized.jpg'
        break
      case "md":
        route = "w300"
        break
      case "big":
        route = "w400"
    }

    if (img === '/images/unknown.jpg' || img === '/images/unknown_resized.jpg' )
    return img

    return `https://image.tmdb.org/t/p/${route}/${img}` 
 })
 
   title = computed(() => {

    const title =this.mediaData().title
    if(this.resizeService.imgSize() !== "big")
      return title.length >= 20 ? title.slice(0,20).concat("...") : title
    else
    return title.length >= 30 ? title.slice(0,30).concat("...") : title
   })
  
  resizeService = inject(ResizeService)
}
