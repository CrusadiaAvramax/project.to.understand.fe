import {FormFieldOption} from './form-field-control';
import {FieldType} from './field-type';


export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: FormFieldOption[]; // solo per select
  multiselect?: boolean;
}
