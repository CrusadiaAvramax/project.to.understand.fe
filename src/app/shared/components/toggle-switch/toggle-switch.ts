import {Component, input, output, signal} from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  imports: [],
  templateUrl: './toggle-switch.html',
  styleUrl: './toggle-switch.scss'
})
export class ToggleSwitch {

  options = input.required<string[]>();
  selectedIndex = signal<number>(0);
  selectedIndexChange = output<number>();


  selectOption(index: number) {
    this.selectedIndex.set(index);
    this.selectedIndexChange.emit(this.selectedIndex());
  }
}
