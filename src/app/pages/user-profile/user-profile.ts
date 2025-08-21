import {Component, inject, OnInit, signal} from '@angular/core';
import {FormFieldConfig} from '../../shared/interfaces/form-field-options';
import {Form} from '../../shared/components/form/form';
import {FormGroup} from '@angular/forms';
import {User} from '../../core/services/user/user';
import {Auth} from '../../core/services/auth/auth';

@Component({
  selector: 'app-user-profile',
  imports: [
    Form
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile implements OnInit {

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
  userService = inject(User);
  authService = inject(Auth);

  getUserDetails() {
    const token = this.authService.token();
    if (token != null) {
      let decodedToken = this.authService.decodeToken(token);
      this.userService.getUser(decodedToken.email).subscribe((user) => {
        const updatedConfig = this.usersConfig.map((field) => {
          switch (field.name) {
            case 'username':
              return {...field, value: user.username};
            case 'email':
              return {...field, value: user.email};
            case 'password':
              return {...field, value: ''}; // non precompilare per sicurezza
            case 'role':
              return {...field, value: user.role}; // Assumendo user.role sia 'admin' o 'user'
            default:
              return field;
          }
        });

        this.config.set(updatedConfig);
      });
    }
  }

  ngOnInit(): void {
    this.getUserDetails();
  }



  onFormSubmitted($event: FormGroup) {
  }

}
