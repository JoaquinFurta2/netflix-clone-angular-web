import { Component } from '@angular/core';

@Component({
  selector: 'nav-porfile',
  imports: [],
  templateUrl: './porfile.component.html',
  styleUrl: './porfile.component.css'
})
export class PorfileComponent {
  porfileList = [
    {img:"images/porfile-photo-2.png", name: "Alex"},
    {img:"images/porfile-photo-3.png", name: "Sophia"},
    {img:"images/porfile-photo-4.png", name: "Andrea"},
    {img:"images/porfile-photo-5.png", name: "Emily"},      
  ]
}
