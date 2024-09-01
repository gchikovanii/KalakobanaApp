import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path: '', component: WelcomeComponent},
    {path: 'profile', component: ProfileComponent}
];
