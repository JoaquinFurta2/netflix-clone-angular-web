import { Component, inject } from '@angular/core';
import { SliderDataService } from '../../shared/services/slider-data.service';
import { HeroComponent } from "../../shared/components/hero/hero.component";
import { SliderSetUpComponent } from '../../shared/components/slider-set-up/slider-set-up.component';
import { HeroService } from '../../shared/services/hero.service';

@Component({
  selector: 'app-movies',
  imports: [HeroComponent, SliderSetUpComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  sliderDataService = inject(SliderDataService)
  heroService = inject(HeroService)

  heroId = this.heroService.MOVIE

}
