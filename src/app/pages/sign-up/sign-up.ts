import {Component, inject, signal} from '@angular/core';
import {FormFieldConfig} from '../../shared/interfaces/form-field-options';
import {FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Auth} from '../../core/services/auth/auth';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Form} from '../../shared/components/form/form';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    Form
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})
export class SignUp {

  toastrService = inject(ToastrService);
  authService = inject(Auth);

  usersConfig: FormFieldConfig[] = [
    {
      name: 'username',
      label: "Username",
      type: 'text',
      required: true,
      placeholder: 'Inserire username',
      disabled: false
    },
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
      disabled: false
    },
  ];
  config = signal(this.usersConfig);

  activeModal = inject(NgbActiveModal);



  onFormSubmitted($event: FormGroup) {
    this.authService.registerUser($event.value)
      .subscribe({
        next: () => {
          console.log("Registrazione ok");
          this.activeModal.close();
          this.toastrService.success('Registrazione avvenuta con successo!', 'Successo!');
        },
        error: error => {
          this.toastrService.error('Errore durante la registrazione.', 'Errore');
          console.error(error);
        }
      });
  }
}
