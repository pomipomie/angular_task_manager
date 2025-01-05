import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  computed,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  title = 'Task Manager';
  sidebarOpen = signal(false);
  @Output() sidebarChanged = new EventEmitter<boolean>();
  isLoggedIn = computed(() => this.authService.isLoggedIn());

  constructor(private authService: AuthService, private router: Router) {}

  toggleOpenState() {
    this.sidebarOpen.set(!this.sidebarOpen());
    // console.log('clicked!', this.sidebarOpen());
    this.sidebarChanged.emit(this.sidebarOpen());
  }

  @Input() set openState(value: boolean) {
    this.sidebarOpen.set(value);
  }

  onLogOut() {
    this.authService.logout();
  }

  onLogIn() {
    this.router.navigate(['/login']);
  }
}
