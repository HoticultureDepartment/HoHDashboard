import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './Home/home/home.component';
import { BeneficiaryComponent } from './Beneficiary/beneficiary/beneficiary.component';

export const routes: Routes = [
    {
        path: '', component: DashboardComponent, title: 'Dashboard',
        children: [
            { path: 'home', component: HomeComponent, title: 'Home' }
        ]
    },
    {
        path: 'beneficiary', component: BeneficiaryComponent, title: 'Beneficiary'
    },
    { path: '**', component: DashboardComponent, title: 'Dashboard' }
];
