import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
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
 
}
