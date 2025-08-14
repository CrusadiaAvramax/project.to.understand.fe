import {Component, inject, signal} from '@angular/core';
import {ToggleSwitch} from '../../shared/components/toggle-switch/toggle-switch';
import {Form} from '../../shared/components/form/form';
import {FormFieldConfig} from '../../shared/interfaces/form-field-options';
import {Utenti} from '../../core/services/utenti';
import {FormGroup} from '@angular/forms';

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

  onChangeIndex(index: number) {
    this.optionActual.set(this.options[index]);
  }

  onFormSubmitted($event: FormGroup) {
    console.log($event.value)
    this.userService.loginUser($event.value)
      .subscribe({
        next: () => console.log("Login ok"),
        error: error => {
          console.log(error)
        }
      })
  }
}
