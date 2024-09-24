import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  form = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    userName: new FormControl('',Validators.required)
  })

  showProfileForm = signal(true);
  showSubscriptionForm = signal(false);
  activeView = signal('profile');

  
  toggleView(view: string) {
    this.activeView.set(view); 
    if (view === 'profile') {
      this.showProfileForm.set(true);  
      this.showSubscriptionForm.set(false);  
    } else if (view === 'subscription') {
      this.showProfileForm.set(false);  
      this.showSubscriptionForm.set(true);  
    }
  }
  onSubmit(){
    console.log(this.form.value.firstName);
    console.log(this.form.value.lastName);
    console.log(this.form.value.userName);
  }
}
