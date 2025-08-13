// src/app/header/header.component.ts
import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: 'header.html',
  styleUrls: ['header.scss']
})
export class Header {

  onLogin(): void {
    console.log("SONO L'HEADER");
  }

  onSignUp(): void {
    console.log("SONO L'HEADER");
  }
}
