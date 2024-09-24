import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../app/services/auth.service';

@Injectable({
  providedIn: 'root', // Standalone
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.checkLoginStatus().pipe(
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/']); // Redirect to home page if not logged in
          return false;
        }
        return true;  // Allow access if logged in
      }),
      catchError(() => {
        this.router.navigate(['/']); // Handle error and redirect to home page
        return of(false);
      })
    );
  }
}
