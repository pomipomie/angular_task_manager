import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(withInterceptorsFromDi())],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
