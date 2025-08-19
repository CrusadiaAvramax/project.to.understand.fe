import {Component, signal} from '@angular/core';
import {FormFieldConfig} from '../../shared/interfaces/form-field-options';
import {Form} from '../../shared/components/form/form';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [
    Form
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile {

  usersConfig: FormFieldConfig[] = [
    {
      name: 'username',
      label: "Username",
      type: 'text',
      required: true,
      placeholder: 'Inserire username',
      disabled: true
    },
    {
      name: 'email',
      label: "Email",
      type: 'email',
      required: true,
      placeholder: 'Inserire email',
      disabled: true
    },
    {
      name: 'password',
      label: "Password",
      type: 'password',
      required: true,
      placeholder: 'Inserire password',
      disabled: true
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
      ],
      disabled: true
    },
  ];
  config = signal(this.usersConfig);


  onFormSubmitted($event: FormGroup) {
  }

}
