import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { Observable } from 'rxjs';
import { Movie, TVShow } from '../../models/dataService.model';

@Component({
  selector: 'app-slider-set-up',
  imports: [AsyncPipe, SliderComponent],
  templateUrl: './slider-set-up.component.html',
  styleUrl: './slider-set-up.component.css'
})
export class SliderSetUpComponent {
  configInput = input.required<{type: 'movie' | 'tv', genre:number, page:number, sliderHeader:string}[]>()
  dataInput = input.required<Promise<Movie[] | TVShow[]>[]>()
}
