import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { AsyncPipe } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';


@Component({
  selector: 'app-search',
  imports: [AsyncPipe,CardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

 
  dataService = inject(DataService)
 

  typeMovie = signal<'movie' | 'tv'>('movie') //this types are because of a bug with angular template @let that conflicts with typescript 
  typeTv = signal<'movie' | 'tv'>('tv')


  param = signal('')
  
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.param.set(params['q'])
    });
}

  tvsSerchResults = computed(() => {
    return this.dataService.search(this.param(), 'tv')
  })

  movieSearchResults = computed(() => {
     return this.dataService.search(this.param(), 'movie')
  })
}



