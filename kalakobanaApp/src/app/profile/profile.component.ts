import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from "../shared/navbar/navbar.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  showProfileForm: boolean = true;
  showSubscriptionForm: boolean = false;
  activeView: string = 'profile'; 

  toggleView(view: string) {
    this.activeView = view; 
    if (view === 'profile') {
      this.showProfileForm = true;
      this.showSubscriptionForm = false;
    } else if (view === 'subscription') {
      this.showProfileForm = false;
      this.showSubscriptionForm = true;
    }
  }
 
}
