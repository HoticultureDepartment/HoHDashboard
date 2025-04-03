import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './Home/home/home.component';
import { BeneficiaryComponent } from './Beneficiary/beneficiary/beneficiary.component';
import { AddComponentComponent } from './Component/add-component/add-component.component';

export const routes: Routes = [
    {
        path: '', component: DashboardComponent, title: 'Dashboard',
        children: [
            { path: 'home', component: HomeComponent, title: 'Home' },
        ]
    },
    {
        path: 'beneficiary', component: BeneficiaryComponent, title: 'Beneficiary'
    },
    { path: 'component', component: AddComponentComponent, title: 'Component' },
    { path: '**', component: DashboardComponent, title: 'Dashboard' }
];
