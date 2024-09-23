import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faCaretDown, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { CustomUserProfile } from '../../Models/userprofile';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  givenName: string | null = null;
  isLoggedIn = false;
  authService = inject(AuthService);
  router = inject(Router);

  faSignOutAlt = faSignOutAlt;
  faTachometerAlt = faUser;
  faCaretDown = faCaretDown;

  isNavbarOpen = false;

  ngOnInit(): void {
    // First check login status
    this.authService.checkLoginStatus().subscribe({
      next: (status: boolean) => {
        this.isLoggedIn = status;
        if (status) {
          // If logged in, fetch the user profile
          this.authService.getUserProfile().subscribe({
            next: (userProfile: CustomUserProfile) => {
              this.givenName = userProfile.given_name;
            },
            error: (err) => {
              console.error('Failed to fetch user profile:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Failed to check login status:', err);
      }
    });
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  closeDropdown() {
    this.isNavbarOpen = false;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logOut() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Logout error:', err);
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.relative');
    if (!clickedInside) {
      this.isNavbarOpen = false;
    }
  }
}
