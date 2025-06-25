import { Component, inject, signal, computed, input  } from '@angular/core';

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

  type = input.required< 'movie' | 'tv'>()
  data = input.required<Movie[] | TVShow[]>()

  
 
  //Constants
  timeSlideTransition = 800

  // Signals
  movies = computed (()=> {
    return this.data()
  });
 
  currSlide = signal(0)
  buttonDisabled = signal(true)
  transitionPrev = signal(false)
  transitionNext = signal(false)

  // Computed Properties
  splitMovies = computed(() => {
    switch (this.resizeService.imgSize()) {
      case "sm" : 
        return this.splitM(3)
      case "md" :
        return this.splitM(4)
      case "big" :
        return this.splitM(5)
    }
  })

  lastElem = computed(() => this.splitMovies().length - 1)
  
  nextSlide = computed(() => 
    this.currSlide() === this.lastElem()  ? 0 : this.currSlide() + 1
  )

  prevSlide = computed(() => 
   this.currSlide() === 0 ? this.lastElem() : this.currSlide() - 1
  )

  notClickable = computed ( () => this.transitionPrev() || this.transitionNext())
  

 // Service Injection
  dataService = inject(DataService)
  resizeService = inject(ResizeService)


  // Lifecycle
  constructor() {
   
  }

  //Public Methods 
  scrollNext() {
    this.transitionNext.set(true)
    setTimeout(() => {
      this.currSlide.update(val =>  val === this.lastElem() ? 0 : val + 1)
      this.transitionNext.set(false)
      this.buttonDisabled.set(false)
    }, this.timeSlideTransition); 
}

  scrollPrev() {
    this.transitionPrev.set(true)
    setTimeout(() => {
      this.currSlide.update( val => val === 0 ? this.lastElem() : val - 1) 
      this.transitionPrev.set(false)
    }, this.timeSlideTransition);     
}

 // Private
  private splitM(n:number) {
    const arr = []
    const length = n === 3 ? this.movies().length -2 : this.movies().length
    for (let i = 0 ; i < length ; i += n) {
      arr.push(this.movies().slice(i, i + n))
    }
    return arr
  }
}
