import {Type} from '@angular/core';

export interface ToggleOption {
  label: string;
  component?: Type<any>; // Componente opzionale da renderizzare per l'opzione
}
