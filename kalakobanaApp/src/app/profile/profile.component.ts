import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faCaretDown, faSignOutAlt, faTachometerAlt, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  isNavbarOpen = false; 
  faSignOutAlt = faSignOutAlt;
  faTachometerAlt = faUser;
  faCaretDown = faCaretDown;
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
  closeDropdown() {
    this.isNavbarOpen = false;
  }

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
  router = inject(Router);
  goToProfile(){
    this.router.navigate(['/profile']);
  }
  logOut(){
    this.router.navigate(['/']);
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.relative');
    if (!clickedInside) {
      this.isNavbarOpen = false;
    }
  }
}
