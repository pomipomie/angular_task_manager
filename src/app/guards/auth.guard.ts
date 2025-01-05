import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Avoid guarding the login page to prevent navigation loop
  if (state.url === '/login' && !authService.checkLoginStatus()) {
    return true;
  }

  console.log('guard', authService.checkLoginStatus());

  if (authService.checkLoginStatus()) {
    console.log('true');
    if (state.url === '/' || state.url === '/login') {
      router.navigate(['/projects']); //replace with /dashboard
      return false;
    }
    return true;
  } else {
    console.log('false');
    router.navigate(['/login']);
    return false;
  }
};
