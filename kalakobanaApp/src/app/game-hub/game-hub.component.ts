import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RoomService } from '../services/room.service';
import { GameMode } from '../Models/GameMode';
import { RoomResponse } from '../Models/roomRespose';
import { RoomLoaderComponent } from "../room-loader/room-loader.component";
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { HubService } from '../services/hub.service';
import { AuthService } from '../services/auth.service';
import { CustomUserProfile } from '../Models/userprofile';
@Component({
  selector: 'app-game-hub',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, ReactiveFormsModule, FormsModule, RoomLoaderComponent],
  templateUrl: './game-hub.component.html',
  styleUrl: './game-hub.component.css'
})
export class GameHubComponent implements OnInit{
  roomResponses: RoomResponse[] = [];
  isLoading: boolean = false;
  userClaims: any;
  showConfigurableOptions = signal(false);
  showRoundCustomizable = signal(false);
  showLikvidatorText = signal(false);
  duelConfiguration = signal(false);
  http = inject(HttpClient);
  ngOnInit(): void {
   this.fetchRooms();
  }
  fetchRooms(): void {
    this.isLoading = true; 
    this.roomService.getRooms().subscribe(
      (data: RoomResponse[]) => {
        this.roomResponses = data;
        console.log(this.roomResponses);
        this.isLoading = false; 
      },
      (error) => {
        console.error('Error fetching room responses', error);
        this.isLoading = false; 
      }
    );
  }

  // Method to get the display name for the game mode
  getGameModeName(gameMode: GameMode): string {
    switch (gameMode) {
      case GameMode.Classic:
        return 'კლასიკური'; // Classic
      case GameMode.Duel:
        return 'დუელი'; // Duel
      case GameMode.Liquidator:
        return 'ლიკვიდატორი'; // Liquidator
      case GameMode.Customizable:
        return 'კონფიგურირებადი'; // Customizable
      default:
        return 'უცნობი'; // Unknown
    }
  }
  selectedRoom: any = null;
  form!: FormGroup;
  router = inject(Router);
  roomService = inject(RoomService);
  snackbar = inject(MatSnackBar);
  isSubmitting = signal(false);
  selectRoom(room: any) {
    this.selectedRoom = room;
  }
  async submit() {
    this.isSubmitting.set(true); 
    if (this.form.valid) {
      const formData = this.form.value;
  
      if (
        formData.firstname == false && formData.lastname == false &&
        formData.city == false && formData.country == false &&
        formData.animal == false && formData.plant == false &&
        formData.river == false
      ) {
        formData.firstname = true;
        formData.lastname = true;
        formData.city = true;
        formData.country = true;
        formData.animal = true;
        formData.plant = true;
        formData.river = true;
      }
  
      // Handle gameType logic here
      if (formData.gameType === 'კლასიკური') {
        formData.rounds = 15;
      } else if (formData.gameType === 'დუელი') {
        formData.maxCounts = 2;
      } else if (formData.gameType === 'ლიკვიდატორი') {
        formData.rounds = Number(formData.maxcounts) * 3;
      }
  
      switch (formData.gameType) {
        case 'კლასიკური':
          formData.gameType = GameMode.Classic;
          break;
        case 'დუელი':
          formData.gameType = GameMode.Duel;
          break;
        case 'ლიკვიდატორი':
          formData.gameType = GameMode.Liquidator;
          break;
        case 'კონფიგურატორი':
          formData.gameType = GameMode.Customizable;
          break;
        default:
          console.error('Unknown game type');
          return;
      }
  
      const requestData = {
        name: formData.name,
        password: formData.password,
        maxUsersInRoomCount: formData.maxcounts, // assuming `maxcounts` corresponds to `MaxUsersInRoomCount`
        gameMode: formData.gameType, // assuming `gameType` corresponds to `GameMode`
        rounds: formData.rounds,
        adminId: 'AdminDataMocked',
        id: '',
        settings: {
          includeFirstName: formData.firstname,
          includeLastName: formData.lastname,
          includeCity: formData.city,
          includeCountry: formData.country,
          includeAnimal: formData.animal,
          includePlant: formData.plant,
          includeMovie: formData.movie,
          includeRiver: formData.river
        }
      };
  
      try {
        const response = await this.roomService.createRoom(requestData).toPromise();
        
        this.isSubmitting.set(true); 
        try {
          await this.hubService.createAndJoinRoom(requestData.name);
          console.log("Room created and joined");
        } catch (err) {
          console.error('Error joining room as admin:', err);
        }
  
        this.router.navigate([`/room`, response!.roomId]);
        
      } catch (error) {
        this.isSubmitting.set(true); 
        this.snackbar.open('შეცდომა ოთახის შექმნისას', 'დახურვა', {
          duration: 3000,
          panelClass: ['red-snackbar']
        });
      }
    }
  }
  joinExistingRoom(roomName: string, password: string | null) {
    this.isSubmitting.set(true);
    const joinRoomRequest = { roomName, password };
    this.roomService.joinRoom(joinRoomRequest).subscribe(
      (response) => {
        this.router.navigate([`/room/${response.roomId}`]); // Redirect to the room
      },
      (error) => {
        this.snackbar.open(error.error || 'ოთახში შესვლა ვერ მოხერხდა', 'დახურვა', {
          duration: 3000,
          panelClass: ['red-snackbar']
        });
        this.isSubmitting.set(false);
      }
    );
  }

  onGameTypeChange() {
    this.form.get('name')?.reset();
    this.form.get('password')?.reset();
    this.form.get('maxcounts')?.reset();
    this.form.get('rounds')?.reset();
    const gameType = this.form.get('gameType')?.value;
    this.showConfigurableOptions.set(gameType === 'კონფიგურირებადი' || gameType === 'ლიკვიდატორი'
      || gameType === 'დუელი'
     );
     this.showRoundCustomizable.set(gameType === 'კონფიგურირებადი' || gameType === 'დუელი')
     this.showLikvidatorText.set(gameType ==='ლიკვიდატორი');
     this.duelConfiguration.set(gameType ==='დუელი')
     if (this.duelConfiguration()) {
      this.form.get('maxcounts')?.setValidators(Validators.max(2));
    }
    if(this.showLikvidatorText()){
      this.form.get('rounds')?.setValidators(Validators.max(11));
    }
    // Reset the rounds input if not "კონფიგურირებადი"
    if (!this.showConfigurableOptions) {
      this.form.get('rounds')?.reset();
    }
  }
  refresh(){
    this.fetchRooms();
  }
  isFormOpen = false;

  openForm() {
    this.isFormOpen = true;
    this.form.reset();
    this.initializeForm();
    this.onGameTypeChange();
    this.allSelected = false;
  }

  closeForm() {
    this.isFormOpen = false;
    this.form.reset();
  }

  hubService = inject(HubService);
  constructor() {
   this.initializeForm();
  }

initializeForm(){
  this.form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl(''),
    maxcounts: new FormControl('', { validators: [Validators.required, Validators.max(16)] }),
    gameType: new FormControl('კლასიკური', [Validators.required]),
    rounds: new FormControl('',{ validators: [Validators.max(33)] }) ,
    firstname: new FormControl(false), // Checkbox for firstname
    lastname: new FormControl(false),
    city: new FormControl(false),
    country: new FormControl(false),
    animal: new FormControl(false),
    plant: new FormControl(false),
    movie: new FormControl(false),
    river: new FormControl(false)
  });
}

showDropdown = false; // Controls the visibility of the dropdown
allSelected = false; 
toggleSelectAll() {
  const allChecked = !this.allSelected;
  this.allSelected = allChecked;
  this.form.patchValue({
    firstname: allChecked,
    lastname: allChecked,
    city: allChecked,
    country: allChecked,
    animal:allChecked,
    plant:allChecked,
    movie:allChecked,
    river:allChecked
  });
}
toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}

// Check if individual checkboxes are selected
checkIndividual() {
  const { firstname, lastname, city, country, animal, plant,movie,river } = this.form.value;
  this.allSelected = firstname && lastname && city  &&country &&animal &&plant &&movie &&river;
}
  isRedirectModalOpen = false;
  enteredPassword: string = '';
  isPasswordIncorrect = false;

  openRedirectModal(room: any) {
    this.selectedRoom = room;
    this.isRedirectModalOpen = true;
    this.enteredPassword = '';
    this.isPasswordIncorrect = false;
  }

  closeRedirectModal() {
    this.isRedirectModalOpen = false;
    this.selectedRoom = null;
  }
  authService = inject(AuthService);
  givenName: string ='';
  confirmRedirect() {
    this.joinExistingRoom(this.selectedRoom.name, this.enteredPassword);
    
    this.authService.getUserProfile().subscribe({
      next: (userProfile: CustomUserProfile) => {
        this.givenName = userProfile.given_name;
        console.log('User Profile fetched:', this.givenName);
  
        this.hubService.joinRoom(this.selectedRoom.name, this.givenName, this.enteredPassword)
          .then(() => {
            console.log('Joined room successfully');
            this.closeRedirectModal();
          })
          .catch(err => console.error('Error joining room:', err));
      },
      error: (err) => {
        console.error('Failed to fetch user profile:', err);
      }
    });
  }
}
