import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './Home/home/home.component';

export const routes: Routes = [
    {
        path: '', component: DashboardComponent, title: 'Dashboard',
        children: [
            { path: 'home', component: HomeComponent, title: 'Home' }
        ]
    }
];
