import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-view',
  imports: [
    MatTableModule,
    MatSortModule,
    TitleCasePipe,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css',
})
export class ListViewComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  @Input() data!: Signal<any>;
  dataSource = new MatTableDataSource<any[]>([]);
  displayedColumns: string[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @Output() onDelete = new EventEmitter<string>();

  constructor(private router: Router) {
    // Effect to react to signal changes
    effect(() => {
      const updatedData = this.data();
      console.log('updated', updatedData);
      this.dataSource.data = updatedData; // Update MatTableDataSource data
      this.displayedColumns = Object.keys(updatedData[0]).filter(
        (key) =>
          key !== 'createdAt' &&
          key !== 'updatedAt' &&
          key !== 'id' &&
          key !== 'dueDate'
      );
      this.displayedColumns = [...this.displayedColumns, 'Due Date', 'Actions'];
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onEdit(id: string) {
    this.router.navigate([`projects/update/${id}`]);
  }

  onDeleteItem(id: string) {
    if (id) {
      console.log(id);
      this.onDelete.emit(id);
    }
  }
}
