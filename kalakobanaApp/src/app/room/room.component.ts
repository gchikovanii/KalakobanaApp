import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  faSignOutAlt = faSignOutAlt;
  router = inject(Router);
  logOut(){
    this.router.navigate(['/game-hub']);
  }
  randomLetter: string = '';
  currentRound: number = 0;
  totalRounds: number = 12;

  ngOnInit(): void {
    this.generateRandomLetter();
  }

  generateRandomLetter(): void {
    const alphabet = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭჯხჰ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    this.randomLetter = alphabet[randomIndex];
  }
}
