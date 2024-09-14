import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-hub',
  standalone: true,
  imports: [NavbarComponent,CommonModule, RouterModule,ReactiveFormsModule,FormsModule ],
  templateUrl: './game-hub.component.html',
  styleUrl: './game-hub.component.css'
})
export class GameHubComponent {
  rooms = [
    { id: 1,name: 'სატესტო ოთახი 1', players: 1, maxPlayers: 10, isPrivate: false, mode: 'კლასიკური',gameStatus: false, },
    {id: 2, name: 'სატესტო ოთახი 2', players: 2, maxPlayers: 5, isPrivate: true, mode: 'გადარჩენა',gameStatus: false,},
  ];

  selectedRoom: any = null;
  form!: FormGroup;
  router = inject(Router);
  selectRoom(room: any) {
    this.selectedRoom = room;
  }
   submit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log(formData); 
    }
  }
  onGameTypeChange() {
    const gameType = this.form.get('gameType')?.value;
    this.showConfigurableOptions = gameType === 'კონფიგურირებადი';
    // Reset the rounds input if not "კონფიგურირებადი"
    if (!this.showConfigurableOptions) {
      this.form.get('rounds')?.reset();
    }
  }
  refresh(){
    //Refetch Data
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
  showConfigurableOptions = false;
  
  constructor() {
   this.initializeForm();
  }
initializeForm(){
  this.form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl(''),
    maxcounts: new FormControl('', { validators: [Validators.required, Validators.max(16)] }),
    gameType: new FormControl('კლასიკური', [Validators.required]),
    rounds: new FormControl('',{ validators: [Validators.required, Validators.max(33)] }) ,
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

  confirmRedirect() {
    if (this.selectedRoom.isPrivate && !this.isPasswordValid()) {
      this.isPasswordIncorrect = true;
      this.router.navigate(['/room']);
      return;
    }
    // Perform the redirect logic here
    this.router.navigate(['/room']);
    this.closeRedirectModal();
  }

  isPasswordValid() {
    // Add the logic to validate the password here
    return this.enteredPassword === 'test'; 
  }
}
