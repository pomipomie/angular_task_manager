import {
  AfterViewInit,
  Component,
  Input,
  Signal,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FiltersComponent } from '../filters/filters.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-list-view',
  imports: [MatTableModule, MatSortModule, FiltersComponent, TitleCasePipe],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css',
})
export class ListViewComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  @Input() data!: Signal<any>;
  dataSource = new MatTableDataSource<any[]>([]);
  displayedColumns: string[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Effect to react to signal changes
    effect(() => {
      const updatedData = this.data();
      console.log('updated', updatedData);
      this.dataSource.data = updatedData; // Update MatTableDataSource data
      this.displayedColumns = Object.keys(updatedData[0]).filter(
        (key) => key !== 'createdAt' && key !== 'updatedAt' && key !== 'id'
      );
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

  onClick() {
    console.log('data', this.data());
    console.log('source', this.dataSource);
  }
}
