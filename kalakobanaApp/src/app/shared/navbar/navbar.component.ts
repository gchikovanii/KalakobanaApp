import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faCaretDown, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isNavbarOpen = false; 
  faSignOutAlt = faSignOutAlt;
  faTachometerAlt = faUser;
  faCaretDown = faCaretDown;
  router = inject(Router);

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
  closeDropdown() {
    this.isNavbarOpen = false;
  }
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
