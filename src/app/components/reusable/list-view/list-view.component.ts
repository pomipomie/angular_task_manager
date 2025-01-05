import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FiltersComponent } from '../filters/filters.component';

//mock table data source
const ELEMENT_DATA = [
  {
    name: 'project 1',
    description: 'this is the project',
    users: ['123455666'],
    state: 'pending',
    dueDate: '1/4/2025',
  },
  {
    name: 'project 2',
    description: 'this is the project2',
    users: ['123455666'],
    status: 'pending',
    dueDate: '1/4/2025',
  },
  {
    name: 'project 3',
    description: 'this is the 3rd project',
    users: ['123455666'],
    status: 'pending',
    dueDate: '1/4/2025',
  },
];

@Component({
  selector: 'app-list-view',
  imports: [MatTableModule, MatSortModule, FiltersComponent],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css',
})
export class ListViewComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = [
    'name',
    'description',
    'users',
    'status',
    'dueDate',
  ];

  @ViewChild(MatSort) sort!: MatSort;

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
}
