import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInRedirectGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.checkLoginStatus().pipe(
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['/game-hub']);  // Redirect logged-in users to game-hub
          return false;  // Block the current route
        }
        return true;  // Allow access if not logged in
      }),
      catchError(() => {
        return of(true);  // In case of an error, allow access (default behavior)
      })
    );
  }
}
