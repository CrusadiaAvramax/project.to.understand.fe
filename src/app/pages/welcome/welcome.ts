import {Component, inject} from '@angular/core';

import {Login} from '../login/login';
import {SignUp} from '../sign-up/sign-up';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Modal} from '../../shared/components/modal/modal';
import {ToggleSwitchComponent} from '../../shared/components/toggle-switch/toggle-switch';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss'
})
export class Welcome {

  modalService = inject(NgbModal)
  toggleOptions = [
    {label: 'Login', component: Login},
    {label: 'Sign up', component: SignUp}
  ];

  navigateToShop() {
    const modalRef = this.modalService.open(Modal, {centered: true, size: 'lg'});

    // Assign classic @Input properties for the modal component
    modalRef.componentInstance.component = ToggleSwitchComponent;
    modalRef.componentInstance.title = 'Inizia ora';
    modalRef.componentInstance.inputs = {
      options: this.toggleOptions
    };
  }

}
