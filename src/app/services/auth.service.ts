import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs';
import * as auth0 from 'auth0-js';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  _baseUrlBe = environment.baseUrlBe;
  _baseUrlFe = environment.baseUrlFe;  

  _audience = environment.audience;
  _redirectUri = environment.redirectUri;    

  auth0 = new auth0.WebAuth({
    clientID: '0BMucSVYliQzvOPesG5UBRSysSddzuOa',
    domain: 'koby5i.eu.auth0.com',
    responseType: 'token id_token',
    audience: this._audience ,
    redirectUri: this._redirectUri ,
    scope: 'openid view:registration view:registrations',
    prompt: 'login' // force login
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    console.log('baseUrlBe   = ' + this._baseUrlBe);
    console.log('baseUrlFe   = ' + this._baseUrlFe);
    console.log('audience    = ' + this._audience);
    console.log('redirectUri = ' + this._redirectUri);    

    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/admin']);
      } else if (err) {
        this.router.navigate(['/admin']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

}
