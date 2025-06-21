import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'about',
        loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule) //using lazyg loading for about module
    }
];
