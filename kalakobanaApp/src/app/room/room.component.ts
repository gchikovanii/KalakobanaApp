import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCommentDots, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  router = inject(Router);
  roundIsFinished = signal(false);
  // Array to keep track of used letters
  usedLetters: string[] = [];

  alphabet: string = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ';
  randomLetter: string = '';  // Letter to be displayed
  currentRound: number = 0;
  totalRounds: number = 12;

  rows: any[] = [];
  resultRows: any[] = [
    {
      userName: 'user1',
      firstName: 'John',
      lastName: 'Doe',
      city: 'New York',
      country: 'USA',
      animals: 'Dogs, Cats',
      plants: 'Cactus, Fern',
      movies: 'Inception, Matrix',
      result: '150'
    },
    {
      userName: 'user2',
      firstName: 'Jane',
      lastName: 'Smith',
      city: 'London',
      country: 'UK',
      animals: 'Rabbits, Horses',
      plants: 'Rose, Tulip',
      movies: 'Titanic, Avatar',
      result: '30'
    },
    {
      userName: 'user3',
      firstName: 'Alex',
      lastName: 'Johnson',
      city: 'Sydney',
      country: 'Australia',
      animals: 'Kangaroo, Koala',
      plants: 'Eucalyptus, Acacia',
      movies: 'Mad Max, Crocodile Dundee',
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
      this.roundIsFinished.set(true);
      // Enable the next row
      if (index + 1 < this.totalRounds) {
        this.currentRound++;
      }
    }
  }
  continueGame(){
    this.roundIsFinished.set(false);

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
