import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ListViewComponent } from '../list-view/list-view.component';
import { KanbanViewComponent } from '../kanban-view/kanban-view.component';

@Component({
  selector: 'app-tabs',
  imports: [MatTabsModule, ListViewComponent, KanbanViewComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent {}
