import { Component, signal,inject  } from '@angular/core';
import { NgOptimizedImage, DatePipe } from '@angular/common';
import { CurrentService } from '../../services/current.service';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { HoverService } from '../../services/hover.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { MyListService } from '../../services/mylist.service';


@Component({
  selector: 'app-card-hover',
  imports: [NgOptimizedImage, DatePipe, OverlayModule],
  templateUrl: './card-hover.component.html',
  styleUrl: './card-hover.component.css',
  animations: [
    trigger('animation', [
      state('visible', style({
        opacity:1,
        scale:1,
        translate:0
         
      })),
      state('hidden', style({
        opacity:0,
        scale:0.9,
        translate:'0 15%',
        
      
      })),
      state('leaving', style({
        opacity:0,
        scale:0.9,
        translate:'0 18%',
       
      
      })),
      transition('hidden <=> visible', animate('0.4s ease-in-out')),
      transition('visible <=> leaving', animate('0.4s ease-in-out'))
    ])
  ],
  host:{'(window:scroll)': 'onScroll()'}
})
export class CardHoverComponent {

  isOpen = signal<'visible' | 'hidden' | 'leaving'>('hidden')
  isLiked = signal(false)

  currentService = inject(CurrentService)
  hoverService = inject(HoverService)
  myListService = inject(MyListService)

    
  mouseEnter() {
    this.isOpen.set('visible')
  }
    
  mouseLeave() {
    this.isOpen.set('leaving')
    setTimeout(() => {
      this.isOpen.set('hidden')
      this.hoverService.ishover.set(0)
    }, 400);
  } 
  
  onScroll() {
      if (this.isOpen() === 'visible')
        this.mouseLeave()
  }
  
}
