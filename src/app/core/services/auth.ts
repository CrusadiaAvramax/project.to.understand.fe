import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  isLoggedIn = signal<boolean>(false);
  private tokenKey = 'authToken';

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedIn.set(true);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn.set(false);
  }
}

