import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-episode-card',
  imports: [],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.css'
})
export class EpisodeCardComponent {
  episode = input.required<{img:string, name:string, runtime:number, overview:string, number:number}>()

  overview = computed(() => {
    const overview = this.episode().overview

     return overview.length >= 200 ? overview.slice(0,overview.indexOf(".", 180) + 1 ) : overview
  })
}
