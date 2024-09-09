import { Component } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-hub',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './game-hub.component.html',
  styleUrl: './game-hub.component.css'
})
export class GameHubComponent {
  rooms = [
    { id: 1,name: 'სატესტო ოთახი 1', players: 1, maxPlayers: 10, isPrivate: false, mode: 'კლასიკური',gameStatus: false, },
    {id: 2, name: 'სატესტო ოთახი 2', players: 2, maxPlayers: 5, isPrivate: true, mode: 'გადარჩენა',gameStatus: true,},
  ];

  selectedRoom: any = null;

  selectRoom(room: any) {
    this.selectedRoom = room;
  }

  
}
