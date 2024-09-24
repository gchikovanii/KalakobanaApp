import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { GameHubComponent } from './game-hub/game-hub.component';
import { RoomComponent } from './room/room.component';
import { AuthGuard } from '../guards/auth.guard';
import { LoggedInRedirectGuard } from '../guards/login.guard';

export const routes: Routes = [
    {path: '', component: WelcomeComponent, canActivate:[LoggedInRedirectGuard]},
    {path: 'profile', component: ProfileComponent,  canActivate: [AuthGuard]},
    {path: 'game-hub', component: GameHubComponent,  canActivate: [AuthGuard]},
    {path: 'room', component: RoomComponent,  canActivate: [AuthGuard]}
];
