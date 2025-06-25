import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { CurrentService } from '../../shared/services/current.service';
import { HoverService } from '../../shared/services/hover.service';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { AsyncPipe } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe,CardComponent, OverlayModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  dataService = inject(DataService)
  currentService = inject(CurrentService)
  hoverService = inject(HoverService)
  timeoutId = signal<any | undefined>(undefined)


  param = signal('')
  
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.param.set(params['q'])
    });
}

  tvsSerchResults = computed(() => {
    return this.dataService.search(this.param(), 'tv')
  })

  movieSearchResults = computed(() => {
     return this.dataService.search(this.param(), 'movie')
  })

  onMouseEnter(itemId:number, card:CdkOverlayOrigin, itemType: "tv" | "movie" ) {
    const id = setTimeout(() => {
        this.currentService.SetUpDetails(itemId,itemType )
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

  OpenModal(itemId:number, itemType: "tv" | "movie") {
    this.currentService.SetUpDetails(itemId,itemType)
    .then(() =>
      this.hoverService.toggleModal()
    )
  }
}



