import { Component, signal, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatSidenavModule,
    ToolbarComponent,
    MatButtonModule,
    MatIconModule,
    HomeComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  events: string[] = [];
  opened = signal(false);
  @ViewChild(ToolbarComponent) toolbar!: ToolbarComponent;

  onOpenStateChanged(opened: boolean) {
    // console.log('opened', opened);
    this.opened.set(opened);
  }

  onClose() {
    this.opened.set(!this.opened());
    // console.log(this.opened());
  }
  changeChildSidebarState() {
    this.toolbar.toggleOpenState();
  }
}
