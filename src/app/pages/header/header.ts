import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Auth} from '../../core/services/auth';
import {SignUp} from '../sign-up/sign-up';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Login} from '../login/login';
import {Modal} from '../../shared/components/modal/modal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgbDropdown, NgbDropdownMenu, NgbDropdownToggle],
  templateUrl: 'header.html',
  styleUrls: ['header.scss']
})
export class Header {

  protected authService = inject(Auth);
  private modalService = inject(NgbModal)

  onLogin(): void {
    const modalRef = this.modalService.open(Modal, {centered: true, size: 'md'});

    // Assign classic @Input properties for the modal component
    modalRef.componentInstance.component = Login;
    modalRef.componentInstance.title = 'Login';
  }

  onSignUp(): void {
    const modalRef = this.modalService.open(Modal, {centered: true, size: 'md'});

    // Assign classic @Input properties for the modal component
    modalRef.componentInstance.component = SignUp;
    modalRef.componentInstance.title = 'Sign up';
  }

  onLogout() {
    this.authService.logout();
  }

}
