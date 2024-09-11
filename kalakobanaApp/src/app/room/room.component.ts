import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCommentDots, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';  
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
  animations: [
    trigger('fadeInSequential', [
      transition(':enter', [
        query('td', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('300ms', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  
})
export class RoomComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  router = inject(Router);
  roundIsFinished = signal(false);
  // Array to keep track of used letters
  usedLetters: string[] = [];
  gameFinished = signal(false);
  alphabet: string = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ';
  randomLetter: string = '';  // Letter to be displayed
  currentRound: number = 0;
  totalRounds: number = 2;

  rows: any[] = [];
  resultRows: any[] = [
    {
      userName: 'user1',
      firstName: { v: 'John', p: 10 },  
      lastName: { v: 'Doe', p: 15 },     
      city: { v: 'New York', p: 5 },     
      country: { v: 'USA', p: 10 },      
      animals: { v: 'Dogs, Cats', p: 15 }, 
      plants: { v: 'Cactus, Fern', p: 5 },
      movies: { v: 'Inception, Matrix', p: 10 }, 
      result: '150'
    },
    {
      userName: 'user2',
      firstName: { v: 'Jane', p: 5 },  
      lastName: { v: 'Smith', p: 10 }, 
      city: { v: 'London', p: 15 },    
      country: { v: 'UK', p: 5 },      
      animals: { v: 'Rabbits, Horses', p: 10 }, 
      plants: { v: 'Rose, Tulip', p: 5 }, 
      movies: { v: 'Titanic, Avatar', p: 15 },
      result: '30'
    },
    {
      userName: 'user3',
      firstName: { v: 'Alex', p: 10 },  
      lastName: { v: 'Johnson', p: 15 }, 
      city: { v: 'Sydney', p: 5 },     
      country: { v: 'Australia', p: 10 }, 
      animals: { v: 'Kangaroo, Koala', p: 15 }, 
      plants: { v: 'Eucalyptus, Acacia', p: 10 }, 
      movies: { v: 'Mad Max, Crocodile Dundee', p: 15 },
      result: '45'
    }
  ];
  
  logOut() {
    this.router.navigate(['/game-hub']);
  }

  ngOnInit() {
    for (let i = 0; i < this.totalRounds; i++) {
      this.rows.push({
        firstName: '',
        lastName: '',
        city: '',
        country: '',
        animals: '',
        plants: '',
        movies: '',
        enabled: false,  
        started: false,  
        completed: false 
      });
    }
  }

  generateNewLetter(): string {
    let letter = this.alphabet[Math.floor(Math.random() * this.alphabet.length)];

    // Keep generating a new letter if it's already been used
    while (this.usedLetters.includes(letter)) {
      letter = this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
    }

    // Add the new letter to the used letters array
    this.usedLetters.push(letter);
    this.letterAnimated = true;
    return letter;
  }
  rountToDisplay =0;
  startStopRow(index: number) {
    if (!this.rows[index].started) {
      // Start the row and generate a new random letter
      this.rountToDisplay++;
      this.rows[index].enabled = true;
      this.rows[index].started = true;
      this.randomLetter = this.generateNewLetter(); // Set the new random letter
    } else {
      // Stop the row
      this.rows[index].enabled = false;
      this.rows[index].completed = true;
      this.rows[index].started = false;
  
      // Mark the round as finished
      this.roundIsFinished.set(true);
  
      // Check if it's the last row/round
      if (index + 1 < this.totalRounds) {
        // Enable the next row (if it's not the last one)
        this.currentRound++;
      } else if (index + 1 === this.totalRounds) {
        // If it's the last round, mark the game as finished
        this.gameFinished.set(true);
      }
    }
  }
  continueGame(){
    this.roundIsFinished.set(false);
    if(this.currentRound == this.totalRounds){
      this.gameFinished.set(true);
    }
  }
  faCommentDots = faCommentDots;
  isChatOpen = false;
  newMessage = '';
  messages = [
    {
      userName: 'მომხარებელი1',
      userImage: 'path_to_image1.jpg',
      text: 'სალამი!',
    },
    {
      userName: 'მომხარებელი2',
      userImage: 'path_to_image2.jpg',
      text: 'სალამი მომარებელი1!',
    }
  ];

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({
        userName: 'Current User', // Set to the actual user name
        userImage: 'path_to_current_user_image.jpg', // Set to the actual user image
        text: this.newMessage
      });
      this.newMessage = ''; // Clear the input
    }
  }
  letterAnimated = false;

  onAnimationEnd() {
    this.letterAnimated = false;
  }
}
