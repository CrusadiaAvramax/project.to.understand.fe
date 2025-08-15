// src/app/header/header.component.ts
import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: 'header.html',
  styleUrls: ['header.scss']
})
export class Header {

  private router = inject(Router);
  private tokenKey = 'authToken';
  isLoggedIn = signal<boolean>(!!localStorage.getItem(this.tokenKey));

  onLogin(): void {
    this.router.navigate(['login'])
      .then(r => console.log(r));
  }

  onSignUp(): void {
    this.router.navigate(['sign-up'])
      .then(r => console.log(r));
  }
}
