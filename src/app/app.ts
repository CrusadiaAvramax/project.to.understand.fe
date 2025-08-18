import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Footer} from './shared/components/footer/footer';
import {Header} from './pages/header/header';
import {ToastContainerDirective} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, ToastContainerDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('project.to.understand.fe');
}
