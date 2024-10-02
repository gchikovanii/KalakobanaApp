import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { SidenavComponent } from "./shared/sidenav/sidenav.component";
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { CustomUserProfile } from './models/CustomUserProfile';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, SidenavComponent,  MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'KalakobanaApp-Panel';
  isLoggedIn = signal(false);
  givenName: string | null = null;
  authService = inject(AuthService);
  ngOnInit(): void {
    // First check login status
    this.authService.checkLoginStatus().subscribe({
      next: (status: boolean) => {
        this.isLoggedIn.set(status);
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
  redirect(){
    const returnUrl = encodeURIComponent('https://localhost:4300'); 
    window.location.href = `https://localhost:7250/api/auth/login?returnUrl=${returnUrl}`;
  }
  
}

