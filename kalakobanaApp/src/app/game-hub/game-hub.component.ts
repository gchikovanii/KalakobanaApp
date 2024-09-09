import { Component } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";

@Component({
  selector: 'app-game-hub',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './game-hub.component.html',
  styleUrl: './game-hub.component.css'
})
export class GameHubComponent {

}
