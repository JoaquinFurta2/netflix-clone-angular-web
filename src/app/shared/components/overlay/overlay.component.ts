import { Component} from '@angular/core';

import { CardModalComponent } from '../card-modal/card-modal.component';

@Component({
  selector: 'app-overlay',
  imports: [CardModalComponent],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.css'
})
export class OverlayComponent {

}
