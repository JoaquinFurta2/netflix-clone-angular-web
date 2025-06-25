import { Component, inject} from '@angular/core';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { SliderDataService } from '../../shared/services/slider-data.service';
import { SliderSetUpComponent } from '../../shared/components/slider-set-up/slider-set-up.component';
import { HeroService } from '../../shared/services/hero.service';


@Component({
  selector: 'app-home',
  imports: [HeroComponent, SliderSetUpComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  SliderService = inject(SliderDataService)
  heroService = inject(HeroService)
  heroId = this.heroService.HOME
  

}