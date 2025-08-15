// src/app/header/header.component.ts
import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {Auth} from '../../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: 'header.html',
  styleUrls: ['header.scss']
})
export class Header {

  private router = inject(Router);
  protected authService = inject(Auth);

  onLogin(): void {
    this.router.navigate(['login'])
      .then(r => console.log(r));
  }

  onSignUp(): void {
    this.router.navigate(['sign-up'])
      .then(r => console.log(r));
  }

  onLogout() {
    this.authService.logout();
  }
}
