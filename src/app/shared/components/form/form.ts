import {Component, inject, input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormFieldConfig} from '../../interfaces/form-field-options';


@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form implements OnInit {

  config = input.required<FormFieldConfig[]>();

  form!: FormGroup<{ [key: string]: FormControl<string | number> }>

  formBuilder = inject(FormBuilder);

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
      console.log('Dati del form:', this.form.value);
    } else {
      console.log('Form non valido');
    }
  }
}
