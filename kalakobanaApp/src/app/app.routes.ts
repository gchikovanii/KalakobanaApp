import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { GameHubComponent } from './game-hub/game-hub.component';
import { RoomComponent } from './room/room.component';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
    {path: '', component: WelcomeComponent},
    {path: 'profile', component: ProfileComponent,  canActivate: [AuthGuard]},
    {path: 'game-hub', component: GameHubComponent,  canActivate: [AuthGuard]},
    {path: 'room', component: RoomComponent,  canActivate: [AuthGuard]}
];
