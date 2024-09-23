import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faBars, faSignInAlt, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
 
  faBar = faBars;
  faUserPlus = faUserPlus;
  faSignInAlt = faSignInAlt;
  navbarOpen = false;
  faTimes = faTimes;
  router = inject(Router);
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  login() {
    const returnUrl = encodeURIComponent('https://localhost:4200/game-hub'); 
    window.location.href = `https://localhost:7250/api/auth/login?returnUrl=${returnUrl}`;
}

  register(){
    const returnUrl = encodeURIComponent('https://localhost:4200/singout'); 
    window.location.href = `https://localhost:7250/api/auth/register?returnUrl=${returnUrl}`;
  }
}
