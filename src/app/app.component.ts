import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('transform', [
      state(
        'start',
        style({
          transform: 'scale(1)',
        })
      ),
      transition('void => start', [animate('300ms ease-in')]),
    ]),
  ],
})
export class AppComponent {}
