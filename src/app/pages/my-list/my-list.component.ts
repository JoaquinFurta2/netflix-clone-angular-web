import { Component, computed, inject, signal, effect } from '@angular/core';
import { MyListService } from '../../shared/services/mylist.service';
import { DataService } from '../../shared/services/data.service';
import { AsyncPipe } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import { cardData } from '../../shared/models/dataService.model';
import { Signal } from '@angular/core';
import { CurrentService } from '../../shared/services/current.service';
import { HoverService } from '../../shared/services/hover.service';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'app-my-list',
  imports: [AsyncPipe, CardComponent, CdkOverlayOrigin],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.css'
})
export class MyListComponent {

  myListService = inject(MyListService)
  dataSevice = inject(DataService)
  currentService = inject(CurrentService)
  hoverService = inject(HoverService)
  timeoutId = signal<any | undefined>(undefined)
  
  list = computed(() => {return this.myListService.list()})

  cardData: Signal<Promise<cardData[]>> = computed(async () => {
  const promises = this.list().map(async (elem) => {
    const data = await this.dataSevice.byId(elem.type, elem.id);
    return {
      title: 'name' in data ? data.name : data.title,
      backdrop: data.backdrop_path,
      poster: data.poster_path,
      id: elem.id
    };
  });
  
    return await Promise.all(promises);
  });
  
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
