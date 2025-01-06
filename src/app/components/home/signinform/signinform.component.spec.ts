import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninformComponent } from './signinform.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('SigninformComponent', () => {
  let component: SigninformComponent;
  let fixture: ComponentFixture<SigninformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninformComponent],
      providers: [provideHttpClient(withInterceptorsFromDi()), ActivatedRoute],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
