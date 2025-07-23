import { Component, inject, signal, computed, input, viewChild, ElementRef, ViewChild, effect, linkedSignal  } from '@angular/core';

import { SliderItemComponent } from '../slider-elem/slider-elem.component';
import { DataService} from '../../services/data.service';
import { ResizeService } from '../../services/resize.service';
import { Movie, TVShow } from '../../models/dataService.model';

@Component({
  selector: 'app-slider',
  imports: [SliderItemComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {

   // Service Injection
  dataService = inject(DataService)
  resizeService = inject(ResizeService)

  elem = viewChild.required('elem', {read:ElementRef})
  type = input.required< 'movie' | 'tv'>()
  data = input.required<Movie[] | TVShow[]>()

  //Constants
  timeSlideTransition = 800

  // Signals
  movies = computed (()=> {
    return this.data()
  });
 
  currSlide = signal(1)
  buttonDisabled = signal(true)
  disableTransition = signal(false)

  

  // Computed Properties

  itemWidth = computed(() => this.resizeService.sliderWidth());

  splitMovies = computed(() => {
    switch (this.resizeService.imgSize()) {
      case "sm" : 
        console.log('sm')
        return this.splitM(3)
      case "md" :
        return this.splitM(4)
      case "big" :
        return this.splitM(5)
    }
  })

  trackTransform = computed(() => {
    const width = this.itemWidth();
    return `translateX(-${this.currSlide() * width}px)`;
  });



  // Lifecycle
  constructor() {
  }



 

scrollNext() {
  this.disableTransition.set(false); 
  this.currSlide.set(this.currSlide() + 1);

  // Wait for the animation to finish
  setTimeout(() => {
    if (this.currSlide() === this.splitMovies().length - 1) {
      this.disableTransition.set(true); 
      this.currSlide.set(1);         
    }
  }, 800);
}

scrollPrev() {
 this.disableTransition.set(false); 
  this.currSlide.set(this.currSlide() - 1);

  // Wait for the animation to finish
  setTimeout(() => {

    if (this.currSlide() === 0) {
      this.disableTransition.set(true); 
      this.currSlide.set(4);            
    }
  }, 800);
} 



 // Private
  private splitM(n:number) {
    const arr = []
    const length = n === 3 ? this.movies().length -2 : this.movies().length
    for (let i = 0 ; i < length ; i += n) {
      arr.push(this.movies().slice(i, i + n))
    }
    arr.push(arr[0])
    arr.unshift(arr.at(-2)!)

    return arr
  }

  ngAfterViewInit() {
    this.resizeService.resizeObserver.observe(this.elem().nativeElement);
  }
}
