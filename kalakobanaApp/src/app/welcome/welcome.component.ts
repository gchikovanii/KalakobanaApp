import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faBars, faSignInAlt, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{
  ngOnInit(): void {
    this.authService.handleLoginCallback().then(() => {
      console.log('Login successful');
      this.router.navigate(['/game-hub']);
    }).catch(err => {
      console.error('Error during login callback', err);
    });
  }
  faBar = faBars;
  faUserPlus = faUserPlus;
  faSignInAlt = faSignInAlt;
  navbarOpen = false;
  faTimes = faTimes;
  authService = inject(AuthService);
  router = inject(Router);
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  login(){
    this.authService.login();
    
  }
  register(){
    this.authService.redirectToRegistration();
  }
}
