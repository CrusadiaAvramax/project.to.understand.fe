import {Component, signal} from '@angular/core';
import {Form} from '../../shared/components/form/form';
import {FormFieldConfig} from '../../shared/interfaces/form-field-options';

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
      name: 'email', label: "Email", type: 'email', required: true, placeholder: 'Inserire email'
    },
    {
      name: 'password', label: "Passowrd", type: 'password', required: true, placeholder: 'Inserire password'
    },
    {
      name: 'ruolo', label: "Ruoli", type: 'select', required: true, placeholder: 'Inserire i ruoli', options: [
        {label: "Admin", value: "admin"},
        {label: "User", value: "user"},
      ]
    },
  ]

  config = signal(this.utentiConfig);


}
