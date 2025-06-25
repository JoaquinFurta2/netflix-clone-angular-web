import { Component, inject } from '@angular/core';
import { SliderDataService } from '../../shared/services/slider-data.service';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { SliderSetUpComponent } from "../../shared/components/slider-set-up/slider-set-up.component";
import { HeroService } from '../../shared/services/hero.service';

@Component({
  selector: 'app-series',
  imports: [HeroComponent, SliderSetUpComponent],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent {
  sliderService = inject(SliderDataService)
  heroService = inject(HeroService)

  heroId = this.heroService.TV

}
