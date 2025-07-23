import { Component, computed, inject, signal} from '@angular/core';
import { MyListService } from '../../shared/services/mylist.service';
import { DataService } from '../../shared/services/data.service';
import { AsyncPipe } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import { cardData } from '../../shared/models/dataService.model';
import { Signal } from '@angular/core';


@Component({
  selector: 'app-my-list',
  imports: [AsyncPipe, CardComponent],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.css'
})
export class MyListComponent {
  
  myListService = inject(MyListService)
  dataSevice = inject(DataService)
  
  list = computed(() => {return this.myListService.list()})

  cardData: Signal<Promise<cardData[]>> = computed(async () => {
  const promises = this.list().map(async (elem) => {
    const data = await this.dataSevice.byId(elem.type, elem.id);
    return {
      title: 'name' in data ? data.name : data.title,
      backdrop: data.backdrop_path,
      poster: data.poster_path,
      id: elem.id,
      type: elem.type
    };
  });
  
    return await Promise.all(promises);
  });
  
  
}
