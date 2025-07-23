import { Component, input, inject, signal} from '@angular/core';
import { Movie, TVShow } from '../../models/dataService.model';
import { CardComponent } from '../card/card.component';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { ResizeService } from '../../services/resize.service';


@Component({
  selector: 'app-slider-item',
  imports: [CardComponent, OverlayModule],
  templateUrl: './slider-elem.component.html',
  styleUrl: './slider-elem.component.css',
  
})
export class SliderItemComponent {
  slideData = input.required<Movie[] | TVShow[]>()
  type = input.required<'movie' | 'tv'>()
}
