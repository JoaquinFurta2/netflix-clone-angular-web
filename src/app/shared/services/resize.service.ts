import { Injectable, signal, computed } from '@angular/core';
import { fromEvent, distinctUntilChanged, Subscription, debounceTime } from 'rxjs';

@Injectable({  providedIn: 'root',})

export class ResizeService {
    
    resize:Subscription
    screen = signal<number>(window.innerWidth)
    sliderWidth = signal(0)

    imgSize = computed<"sm" | "md" | "big">(() => {
        const width = this.screen();
        if (width < 800) {
          return "sm";
        } else if (width <= 1200) {
          return "md";
        } else {
          return "big";
        }
      })

    resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      this.sliderWidth.set(width) 
    });

    

    constructor() {
        this.resize = fromEvent(window, 'resize')
      .pipe(
        distinctUntilChanged(),
      )
      .subscribe(()=> {
        this.screen.set(window.innerWidth)
      })
    }
      
      ngOnDestroy() {
        this.resize.unsubscribe()
        this.resizeObserver.disconnect();
  
      }

}