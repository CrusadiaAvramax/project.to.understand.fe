import {Component, inject, signal} from '@angular/core';
import {ToggleSwitchComponent} from '../../shared/components/toggle-switch/toggle-switch';
import {FormFieldConfig} from '../../shared/interfaces/form-field-options';
import {FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Auth} from '../../core/services/auth/auth';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Form} from '../../shared/components/form/form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ToggleSwitchComponent,
    Form
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  options = [
    {label: 'E-Commerce Login'},
    {label: 'Spid'},
    {label: 'Cie'}
  ]
  optionActual = signal(this.options[0].label)
  loginConfig: FormFieldConfig[] = [
    {
      name: 'email',
      label: "Email",
      type: 'email',
      required: true,
      placeholder: 'Inserire email',
      disabled: false
    },
    {
      name: 'password',
      label: "Password",
      type: 'password',
      required: true,
      placeholder: 'Inserire password',
      disabled: false
    }
  ]
  config = signal(this.loginConfig);
  authService = inject(Auth);
  toastrService = inject(ToastrService)
  router = inject(Router)
  activeModal = inject(NgbActiveModal);


  onChangeIndex(index: number) {
    this.optionActual.set(this.options[index]?.label ?? this.options[0].label);
  }

  onFormSubmitted($event: FormGroup) {
    console.log($event.value)
    this.authService.loginUser($event.value)
      .subscribe({
        next: (response) => {
          console.log('Login riuscito, token: ', response.token);
          const token = response.token;
          if (token) {
            this.activeModal.close();
            localStorage.setItem('authToken', token)
            this.authService.setToken(token)
          }
        },
        error: error => {
          this.toastrService.error('Errore durante la fase di login. Riprovare.', 'Errore');
          console.error(error);
        }
      })
  }
}
