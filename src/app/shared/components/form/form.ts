import {Component, inject, input, OnInit, output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormFieldConfig} from '../../interfaces/form-field-options';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgSelectComponent} from '@ng-select/ng-select';


@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    NgSelectComponent
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form implements OnInit {

  config = input.required<FormFieldConfig[]>();
  formSubmitted = output<FormGroup>();

  form!: FormGroup<{ [key: string]: FormControl<string | number> }>

  formBuilder = inject(FormBuilder);
  snackBar = inject(MatSnackBar)

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    const controls: { [key: string]: FormControl<string | number> } = {};

    this.config()?.forEach((field: FormFieldConfig) => {
      const validators =
        field.required ? [Validators.required] : [];

      controls[field.name] = this.formBuilder.nonNullable.control<string | number>(
        '',
        {validators}
      );
    });

    this.form = new FormGroup(controls);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form);
    } else {
      this.snackBar.open('Compila correttamente tutti i campi.', 'Chiudi', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['snack-error']
      });
    }
  }
}
