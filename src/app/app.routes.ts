import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SeriesComponent } from './pages/series/series.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { SearchComponent } from './pages/search/search.component';


export const routes: Routes = [
    {path: '',
     component: HomeComponent
    },
    {   path: 'series',
        component: SeriesComponent
       },
    {path: 'movies',
     component: MoviesComponent
    },
    {path: 'my-list',
        component: MyListComponent
    },
    {path: 'search',
     component: SearchComponent
    }
];
