import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckDouble, faCommentDots, faPaperPlane, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';  
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { faPersonBooth } from '@fortawesome/free-solid-svg-icons';
import { RoomService } from '../services/room.service';
import { LeaveRoomRequest } from '../Models/createRoomRequest';
import { HubService } from '../services/hub.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { CustomUserProfile } from '../Models/userprofile';
import { Subscription } from 'rxjs';
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
  faPaperPlane = faPaperPlane;
  isLeaving = signal(false);
  router = inject(Router);
  roundIsFinished = signal(false);
  faThumbs = faCheckDouble;
  // Array to keep track of used letters
  usedLetters: string[] = [];
  gameFinished = signal(false);
  alphabet: string = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ';
  randomLetter: string = '';  // Letter to be displayed
  currentRound: number = 0;
  totalRounds: number = 2;
  displayLetter = signal(true);
  rows: any[] = [];
  resultRows: any[] = [
    {
      userName: 'ჩიქო',
      firstName: { v: 'მარია', p: 10 },  
      lastName: { v: 'მაკაშვილი', p: 10 },     
      city: { v: 'მაინცი', p: 10 },     
      country: { v: 'მონღოლეთი', p: 5 },      
      animals: { v: 'მაიმუნი', p: 5 }, 
      plants: { v: 'მანგო', p: 10 },
      movies: { v: 'მატრიცა', p: 15 }, 
      result: '65'
    },
    {
      userName: 'ჯოლიხი',
      firstName: { v: 'მუკაკო', p: 5 },  
      lastName: { v: 'მუკალტინიშვილი', p: 10 }, 
      city: { v: 'მემინგემი', p: 10 },    
      country: { v: 'მონღოლეთი', p: 5 },      
      animals: { v: 'მაიმუნი', p: 5 }, 
      plants: { v: 'მარაკუია', p: 10 }, 
      movies: { v: '', p: 0 },
      result: '45'
    },
    {
      userName: 'მაჭა',
      firstName: { v: 'მაკაკო', p: 0 },  
      lastName: { v: 'მაკარიძე', p: 0 }, 
      city: { v: '', p: 0 },     
      country: { v: 'მონღოლეთი', p: 0 }, 
      animals: { v: 'მაიმუნი', p: 0 }, 
      plants: { v: 'მარწყვი', p: 0 }, 
      movies: { v: '', p: 0 },
      result: '40'
    }
  ];
  roomService = inject(RoomService);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  roomName!: string;
  givenName: string = '';
  private userLeftSubscription!: Subscription;
  private roomTerminatedSubscription!: Subscription;
  
  
  async logOut() {
    this.isLeaving.set(true);
    if (!this.roomName) {
      console.error('Room Name not found in the URL');
      return;
    }

    const leaveRoomRequest: LeaveRoomRequest = {
      roomName: this.roomName // Sending roomName to backend
    };


    try {
      this.authService.getUserProfile().subscribe({
        next: (userProfile: CustomUserProfile) => {
          this.givenName = userProfile.given_name;
          Promise.all([
            this.hubService.leaveRoom(this.roomName, this.givenName)
          ]).then(() => {
            setTimeout(() => {
              this.router.navigate(['/game-hub']);
            }, 3000); // Adjust delay as needed
          });
        },
        error: (err) => {
          console.error('Failed to fetch user profile:', err);
        }
      });
     
    } catch (error) {
      // Handle errors for both calls
      console.error('Failed to leave the room', error);
      this.isLeaving.set(false);
    }
  }

  ngOnInit() {
    this.roomName = this.route.snapshot.paramMap.get('id') ?? '';
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
    
    this.hubService.userJoined$.subscribe({
      next: (message: string) => {
        this.joinedUsers.push(message);
        console.log(message);
        this.snackbar.open(message || 'ახალი მომხარებელი შემოვიდა', 'დახურვა', {
          duration: 3000,
          panelClass: ['red-snackbar']
        });
      },
      error: (err) => console.error('Error receiving message:', err)
    });
    this.hubService.userLeft$.subscribe({
      next: (message: string) => {
        console.log("User left message received:", message);
        this.snackbar.open(message || 'მომხმარებელი დატოვა ოთახი', 'დახურვა', {
          duration: 3000,
          panelClass: ['red-snackbar']
        });
      },
      error: (err) => console.error('Error receiving left message:', err)
    });

    // Subscribe to room terminated event
    this.hubService.roomTerminated$.subscribe({
      next: (message: string) => {
        this.snackbar.open(message || 'ოთახი გაუქმდა', 'დახურვა', {
          duration: 3000,
          panelClass: ['red-snackbar']
        });
        // Redirect after the message disappears
        this.router.navigate(['/game-hub']); 
      },
      error: (err) => console.error('Error receiving termination message:', err)
    });
  }
  ngOnDestroy(): void {
    this.userLeftSubscription.unsubscribe();
    this.roomTerminatedSubscription.unsubscribe();
  }
  hubService = inject(HubService);
  snackbar = inject(MatSnackBar);

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
  
      if (index + 1 < this.totalRounds) {
        // Enable the next row (if it's not the last one)
        this.currentRound++;
      } else if (index + 1 === this.totalRounds) {
        // If it's the last round, mark the game as finished
        this.gameFinished.set(true);
        this.displayLetter.set(false);
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
  joinedUsers: string[] = [];
  onAnimationEnd() {
    this.letterAnimated = false;
  }

}
