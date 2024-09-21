import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  login(){
  }
  register(){
  }
}
