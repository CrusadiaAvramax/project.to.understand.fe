import {FormFieldOption} from './form-field-control';

export type FieldType = 'text' | 'email' | 'password' | 'number' | 'select';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: FormFieldOption[]; // solo per select
}
