import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewComponent } from './list-view.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListViewComponent],
      providers: [provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();

    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
