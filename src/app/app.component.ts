import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { OverlayComponent } from './shared/components/overlay/overlay.component';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, OverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'netflix-clone';

}
