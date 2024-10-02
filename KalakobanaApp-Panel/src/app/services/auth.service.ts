import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { CustomUserProfile } from '../models/CustomUserProfile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7250/api'; 
  private loggedIn = new BehaviorSubject<boolean>(false); 

  constructor(private httpClient: HttpClient) {}
  logout(): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.loggedIn.next(false))
    );
  }

  // Check login status and return only boolean (true if user is logged in, false otherwise)
  checkLoginStatus(): Observable<boolean> {
    return this.getUserProfile().pipe(
      map((userProfile: CustomUserProfile) => {
        this.loggedIn.next(true); // Set loggedIn to true
        return true; // Return true as the user is logged in
      }),
      catchError(() => {
        this.loggedIn.next(false);  // Set loggedIn to false if user profile fetch fails
        return of(false);  // Return false in case of error
      })
    );
  }
  
  // Get user profile from API
  getUserProfile(): Observable<CustomUserProfile> {
    return this.httpClient.get<CustomUserProfile>(`${this.apiUrl}/usersession/profile`, { withCredentials: true });
  }
  // Getter for login status as Observable
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}

