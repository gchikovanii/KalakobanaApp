import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { DataManiputaionComponent } from './data-maniputaion/data-maniputaion.component';


export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'custom-manipulation', component: UserManagementComponent},
    {path: 'custom-data-manipulation', component: DataManiputaionComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];