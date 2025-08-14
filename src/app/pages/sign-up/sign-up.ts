import {Component, inject, signal} from '@angular/core';
import {Form} from '../../shared/components/form/form';
import {FormFieldConfig} from '../../shared/interfaces/form-field-options';
import {FormGroup} from '@angular/forms';
import {Utenti} from '../../core/services/utenti';

@Component({
  selector: 'app-sign-up',
  imports: [
    Form
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})
export class SignUp {

  utentiConfig: FormFieldConfig[] = [
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
    },
    {
      name: 'role',
      label: "Ruoli",
      type: 'select',
      required: true,
      placeholder: 'Inserire i ruoli',
      options: [
        {
          label: "Admin",
          value: "admin"
        },
        {
          label: "User",
          value: "user"
        },
      ]
    },
  ]

  config = signal(this.utentiConfig);
  userService = inject(Utenti);


  onFormSubmitted($event: FormGroup) {
    console.log($event.value)
    this.userService.registerUser($event.value)
      .subscribe({
        next: () => console.log("Registrazione ok"),
        error: error => {
          console.log(error)
        }
      })
  }
}
