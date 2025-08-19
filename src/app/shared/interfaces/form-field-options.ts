import {FormFieldOption} from './form-field-control';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox';
  value?: string | number | boolean;
  required: boolean;
  readonly?: boolean;
  disabled: boolean;
  placeholder?: string;
  email?: boolean; // per attivare Validators.email
  minLength?: number;
  maxLength?: number;
  options?: FormFieldOption[]; // per ng-select
  multiselect?: boolean;
}
