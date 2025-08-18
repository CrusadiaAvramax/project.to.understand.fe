import {Component, effect, inject, Injector, input, output, signal, ViewChild, ViewContainerRef} from '@angular/core';
import {ToggleOption} from '../../interfaces/toggle-options';


@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.html',
  styleUrls: ['./toggle-switch.scss'],
  standalone: true,
  imports: []
})
export class ToggleSwitchComponent {
  // Input: array di opzioni configurate con label e (opzionalmente) componente
  options = input.required<ToggleOption[]>();

  // Indice selezionato (due-way binding opzionale)
  selectedIndex = signal<number>(0);
  selectedIndexChange = output<number>();

  // Riferimento al contenitore dinamico dove caricare il componente
  @ViewChild('dynamicOutlet', {read: ViewContainerRef, static: true})
  private dynamicOutlet!: ViewContainerRef;

  // Injector ereditato (necessario per creare il componente dinamico)
  private injector = inject(Injector);

  // Effetto per reagire ai cambiamenti di selectedIndex o options
  constructor() {
    effect(() => {
      const index = this.selectedIndex();
      const opts = this.options();

      // Validazione indice
      if (index < 0 || index >= opts.length) return;

      // Notifica il cambio
      this.selectedIndexChange.emit(index);

      // Carica il componente dinamico
      this.loadComponent();
    });
  }

  selectOption(index: number) {
    this.selectedIndex.set(index);
  }

  private loadComponent() {
    if (!this.dynamicOutlet || this.selectedIndex() >= this.options().length) return;

    // Pulisci il contenuto precedente
    this.dynamicOutlet.clear();

    const option = this.options()[this.selectedIndex()];
    if (option?.component) {
      this.dynamicOutlet.createComponent(option.component, {
        injector: this.injector // eredita il contesto (es. servizi)
      });
    }
  }
}
