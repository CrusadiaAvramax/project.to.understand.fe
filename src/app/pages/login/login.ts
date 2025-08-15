import {Component, inject, signal} from '@angular/core';
import {ToggleSwitch} from '../../shared/components/toggle-switch/toggle-switch';
import {Form} from '../../shared/components/form/form';
import {FormFieldConfig} from '../../shared/interfaces/form-field-options';
import {Utenti} from '../../core/services/utenti';
import {FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Auth} from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [
    ToggleSwitch,
    Form
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  options = ['Credenziali E-Commerce', 'Spid', 'Cie']
  optionActual = signal(this.options[0])
  loginConfig: FormFieldConfig[] = [
    {
      name: 'email',
      label: "Email",
      type: 'email',
      required: true,
      placeholder: 'Inserire email'
    },
    {
      name: 'password',
      label: "Password",
      type: 'password',
      required: true,
      placeholder: 'Inserire password'
    }
  ]
  config = signal(this.loginConfig);
  userService = inject(Utenti);
  authService = inject(Auth);
  toastrService = inject(ToastrService)
  router = inject(Router)


  onChangeIndex(index: number) {
    this.optionActual.set(this.options[index]);
  }

  onFormSubmitted($event: FormGroup) {
    console.log($event.value)
    this.userService.loginUser($event.value)
      .subscribe({
        next: (response) => {
          console.log('Login riuscito, token: ', response.token);
          const token = response.token;
          if (token) {
            localStorage.setItem('authToken', token)
            this.authService.setToken(token)
          }
          this.toastrService.success('Login effettuato con successo', 'Successo!');
          this.router.navigate(['']).then(r => {
            if (r) {
              console.log('Navigazione riuscita');
              return;
            }
            console.log('Navigazione non riuscita');
          });

        },
        error: error => {
          this.toastrService.error('Errore durante la fase di login. Riprovare.', 'Errore');
          console.error(error);
        }
      })
  }
}
