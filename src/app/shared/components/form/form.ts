import {Component, computed, effect, input, OnInit, output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormFieldConfig} from '../../interfaces/form-field-options';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgSelectModule
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form implements OnInit {
  // --- Inputs ---
  config = input.required<FormFieldConfig[]>();
  nameSubmitButton = input.required<string>();
  formDisabled = input<boolean>(false);

  // --- Output ---
  formSubmitted = output<FormGroup>();
  form!: FormGroup<{ [key: string]: FormControl<string | number> }>;
  // --- Internal state ---
  private internalOverride = signal<boolean | null>(null); // null = nessun override
  formDisabledSignal = computed(() => {
    const local = this.internalOverride();
    return local !== null ? !local : this.formDisabled();
  });
  // --- Reattività: abilita/disabilita il form in base al segnale ---
  private readonly formToggleEffect = effect(() => {
    const isDisabled = this.formDisabledSignal();
    if (!this.form) return;

    if (isDisabled) {
      this.form.disable({emitEvent: false});
    } else {
      this.form.enable({emitEvent: false});
    }
  });
  // --- Reset override se cambiano gli input (nuovo form aperto) ---
  private readonly resetOverrideEffect = effect(() => {
    const _ = this.config();
    const __ = this.formDisabled();
    this.internalOverride.set(null); // reset override locale
  });

// --- Lifecycle ---
  ngOnInit(): void {
    this.buildForm();
  }

  // --- Submit handler ---
  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form);
    }
  }

  // --- Attiva override locale per abilitare il form ---
  editForm(): void {
    this.internalOverride.set(true);
  }

  // --- Costruzione del form ---
  private buildForm(): void {
    const controls: { [key: string]: FormControl<string | number> } = {};
    const globallyDisabled = this.formDisabledSignal();

    this.config()?.forEach((field: FormFieldConfig) => {
      const validators = field.required ? [Validators.required] : [];
      const initialValue = (field.value ?? '') as string | number;
      const disabled = Boolean(globallyDisabled || field.disabled);

      controls[field.name] = new FormControl<string | number>(
        {value: initialValue, disabled: disabled},
        {nonNullable: true, validators}
      );
    });

    this.form = new FormGroup(controls);
  }
}
