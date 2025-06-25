import { Component, input, inject, signal} from '@angular/core';
import { Movie, TVShow } from '../../models/dataService.model';
import { CardComponent } from '../card/card.component';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { MovieDetails } from '../../models/dataService.model';
import { TVShowDetails } from '../../models/dataService.model';
import { ResizeService } from '../../services/resize.service';
import { CurrentService } from '../../services/current.service';
import { HoverService } from '../../services/hover.service';

@Component({
  selector: 'app-slider-item',
  imports: [CardComponent, OverlayModule],
  templateUrl: './slider-elem.component.html',
  styleUrl: './slider-elem.component.css',
  
})
export class SliderItemComponent {
  slideData = input.required<Movie[] | TVShow[]>()
  main = input<boolean>(false)
  type = input<'movie' | 'tv'>()

  timeoutId = signal<any | undefined>(undefined)
  
  hoverService = inject(HoverService)
  resizeService = inject(ResizeService)
  currentService = inject(CurrentService)


  onMouseEnter(itemId:number, card:CdkOverlayOrigin ) {
    const id = setTimeout(() => {
        this.currentService.SetUpDetails(itemId, this.type()!)
        .then(() => {
          this.hoverService.ishover.set(itemId)
          this.hoverService.origin.set(card)
          setTimeout(() => {
            this.hoverService.isFirst.set(false)
          }, 10)

        
        })
         
    },400)
    this.timeoutId.set(id)
  }
  
   onMouseLeave() {
    clearTimeout(this.timeoutId())
  }   

  OpenModal(itemId:number) {
    this.currentService.SetUpDetails(itemId, this.type()!)
    .then(() =>
      this.hoverService.toggleModal()
    )
  }
}
