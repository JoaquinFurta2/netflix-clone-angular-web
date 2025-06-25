import { Component,inject, computed, viewChild, ElementRef, effect, signal} from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { CurrentService } from '../../services/current.service';
import { HoverService } from '../../services/hover.service';
import { trigger, state, style, animate, transition} from '@angular/animations';
import {CdkMenuModule} from '@angular/cdk/menu';
import { EpisodeCardComponent } from '../episode-card/episode-card.component';
import { signalUpdateFn } from '@angular/core/primitives/signals';
import { MyListService } from '../../services/mylist.service';


@Component({
  selector: 'app-card-modal',
  imports: [DatePipe, NgOptimizedImage, CdkMenuModule, EpisodeCardComponent ],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css',
  animations: [
      trigger('animation', [
        state('visible', style({
          translate:"0"      
          
           
        })),
        state('hidden', style({
          translate:"0"
        })),
        transition('hidden <=> visible', animate('1s ease-in-out')),
      ])
    ],
})
export class CardModalComponent {

  isOpen = signal<"visible" | "hidden">("hidden")
  isLiked = signal(false)

  toggleAnimation() {
    this.isOpen() === "hidden" ? this.isOpen.set('visible') : this.isOpen.set('hidden')
  }

  currentService = inject(CurrentService)
  hoverService = inject(HoverService)
  myListService = inject(MyListService)

  modal = viewChild.required<ElementRef<HTMLDialogElement>>('modal');

 
  open = computed(() => {
     this.hoverService.Modal()
        ? this.openModal()
        :  this.closeModal()
  })

  CheckModal =  effect(() => {
      this.open()
  })  

  openModal() { 
    this.currentService.SetUpCredits()
    if (this.currentService.type() === "tv")
      this.currentService.SetUpSeason()
    this.modal().nativeElement.showModal()
  }
    
  closeModal() {
    this.modal().nativeElement.close()
  }

  OnClick(e:MouseEvent) {
    const modalDimensions = this.modal().nativeElement.getBoundingClientRect()
    if (
      e.clientX < modalDimensions.left ||
      e.clientX > modalDimensions.right ||
      e.clientY < modalDimensions.top ||
      e.clientY > modalDimensions.bottom
    ) {
      this.currentService.season.set(1)
      this.currentService.seasonDetails.set(null)
      this.index.set(10)
      this.hoverService.toggleModal()

    }


  }
  OnSeasonChange(n:number) {
    this.currentService.season.set(n)
    this.currentService.SetUpSeason()
  }

  index = signal(10)

  update() {
    this.index.update(val => val + 10)
  }
}


