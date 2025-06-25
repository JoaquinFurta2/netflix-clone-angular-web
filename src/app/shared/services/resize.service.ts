import { Injectable, signal, computed } from '@angular/core';
import { fromEvent, distinctUntilChanged, Subscription } from 'rxjs';

@Injectable({  providedIn: 'root',})

export class ResizeService {
    
    resize:Subscription
    screen = signal<number>(window.innerWidth)

    imgSize = computed<"sm" | "md" | "big">(() => {
        const width = this.screen();
        if (width <= 800) {
          return "sm";
        } else if (width <= 1200) {
          return "md";
        } else {
          return "big";
        }
      })

      constructor() {
          this.resize = fromEvent(window, 'resize')
        .pipe(
          distinctUntilChanged()
        )
        .subscribe(()=> {
          this.screen.set(window.innerWidth)
        })
      }
      
      ngOnDestroy() {
        this.resize.unsubscribe()
      }

}