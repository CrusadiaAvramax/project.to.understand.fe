import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Auth} from '../../../core/services/auth';
import {SignUp} from '../../../pages/sign-up/sign-up';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Login} from '../../../pages/login/login';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: 'header.html',
  styleUrls: ['header.scss']
})
export class Header {

  protected authService = inject(Auth);
  private modalService = inject(NgbModal)

  onLogin(): void {
    this.modalService.open(Login, {

      ariaLabelledBy: 'modal-basic-title',

      fullscreen: "xl",
    })
      .result.then(
      () => {
        console.log(`Modal closed with`);
      },
      () => {
        console.log(`Modal dismissed`);
      }
    );
  }

  onSignUp(): void {
    this.modalService.open(SignUp, {

      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'modal-adaptive'

    })
      .result.then(
      () => {
        console.log(`Modal closed with`);
      },
      () => {
        console.log(`Modal dismissed`);
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }


}
