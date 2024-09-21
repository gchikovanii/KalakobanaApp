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
      redirect_uri: 'https://localhost:7250/signin-oidc',  
      post_logout_redirect_uri: 'http://localhost:4200/',
      response_type: 'code',
      scope: 'openid profile kalakobanaapi.read kalakobanaapi.write roles subscription',
      silent_redirect_uri: 'http://localhost:4200/silent-renew',
      automaticSilentRenew: true
    };
    this.userManager = new UserManager(settings);
    // Load user from session storage if available
    this.userManager.getUser().then(user => {
      this.user = user;
    });
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
  handleLoginCallback(): Promise<void> {
    return this.userManager.signinRedirectCallback().then(user => {
      this.user = user;
    });
  }

  redirectToRegistration(): void {
    const urlCont = '?returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DkalakobanaBFF%26redirect_uri%3Dhttps%253A%252F%252Flocalhost%253A7250%252Fsignin-oidc%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520kalakobanaapi.read%2520kalakobanaapi.write%2520roles%2520subscription%26state%3D8d7e6c4d562943bb8cd084205e95e293%26code_challenge%3DEDMVD43cTLPjZKa4E8q974sfUomkNhPjwXMoMYuBoOw%26code_challenge_method%3DS256%26response_mode%3Dquery';
    const registrationUrl = 'https://localhost:5001/User/Registration' + urlCont;
    window.location.href = registrationUrl; 
  }
}
