import { Component} from '@angular/core';
import { CardHoverComponent } from '../card-hover/card-hover.component';
import { CardModalComponent } from '../card-modal/card-modal.component';

@Component({
  selector: 'app-overlay',
  imports: [CardHoverComponent, CardModalComponent],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.css'
})
export class OverlayComponent {

}
