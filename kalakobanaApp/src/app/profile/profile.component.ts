import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.relative');
    if (!clickedInside) {
      this.isNavbarOpen = false;
    }
  }
}
