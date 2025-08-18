import {AfterViewInit, Component, inject, Injector, Input, Type, ViewChild, ViewContainerRef,} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html'
})
export class Modal implements AfterViewInit {

  @Input() component!: Type<any>;

  @Input() title!: string;
  // Optional inputs to pass to the dynamically created component
  @Input() inputs?: Record<string, any>;


  @ViewChild('container', {read: ViewContainerRef, static: true})
  container!: ViewContainerRef;

  modal = inject(NgbActiveModal);
  injector = inject(Injector);

  ngAfterViewInit(): void {
    // Defer creation to ensure inputs assigned by NgbModal are set
    Promise.resolve().then(() => {
      const componentType = this.component;
      if (!componentType) return;

      // crea e inserisce il componente dinamico
      const cmpRef = this.container.createComponent(componentType, {
        injector: this.injector,
      });

      // Pass provided inputs to the created component, if any
      const provided = this.inputs;
      if (provided) {
        Object.entries(provided).forEach(([key, value]) => {
          // setInput triggers change detection for the input binding
          cmpRef.setInput(key, value);
        });
      }
    });
  }

  close() {
    this.modal.close();
  }
}
