import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userManager!: UserManager;
  private user: User | null = null;
  constructor() { 
    const settings = {
      authority: 'https://localhost:5001',  
      client_id: 'kalakobanaBFF',          
      redirect_uri: 'http://localhost:4200/callback',  
      post_logout_redirect_uri: 'http://localhost:4200/',
      response_type: 'code',
      scope: 'openid profile kalakobanaapi.read kalakobanaapi.write roles subscription',
      silent_redirect_uri: 'http://localhost:4200/silent-renew',
      automaticSilentRenew: true
    };
  }
  login(): void {
    this.userManager.signinRedirect();
  }

  logout(): void {
    this.userManager.signoutRedirect();
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getAccessToken(): string | null {
    return this.user?.access_token ?? null;
  }
}
