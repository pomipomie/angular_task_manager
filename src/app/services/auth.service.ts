import { Injectable, Inject, signal, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = signal<string | null>(null); // Store the JWT token
  private isLoggedInSignal = signal<boolean>(false); // Signal to track authentication state
  private isBrowser: boolean; // Flag to check if it's the browser environment

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiConfig: ApiService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        this.setToken(savedToken);
      }
    }
  }

  // Signal getter for the login state
  get isLoggedIn() {
    return this.isLoggedInSignal;
  }

  // Signal getter for the token
  getToken() {
    return this.token();
  }

  // Sign-Up method
  signUp(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    const payload = { username, firstName, lastName, email, password };
    return this.http
      .post<{ token: string }>(
        this.apiConfig.getApiUrl('/auth/signup'),
        payload
      )
      .subscribe({
        next: (response) => {
          this.setToken(response.token); // Save the token on successful sign-up
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Sign-Up failed:', err);
        },
      });
  }

  // Login method
  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(this.apiConfig.getApiUrl('/auth/login'), {
        email,
        password,
      })
      .subscribe({
        next: (response) => {
          this.setToken(response.token);
          this.router.navigate(['/projects']); //sghould be dashboard
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
      });
  }

  // Logout method
  logout() {
    this.setToken(null);
    localStorage.removeItem('token'); // Clear token from storage
    this.router.navigate(['/']); // Navigate to login page
  }

  // Private method to handle token state
  private setToken(token: string | null) {
    this.token.set(token); // Update signal value
    this.isLoggedInSignal.set(!!token); // Update login state
    if (token) {
      localStorage.setItem('token', token); // Save token to storage
    } else {
      localStorage.removeItem('token'); // Clear storage if token is null
    }
  }

  checkLoginStatus() {
    //Temporary implementation
    return this.isLoggedInSignal();

    //TODO: IMPLEMENT ONCE I HAVE IMPLEMENTED THE VERIFY TOKEN ROUTE ON THE BACK
    //   if (!this.isBrowser) return;

    //   const savedToken = localStorage.getItem('token');
    //   if (savedToken) {
    //     this.http
    //       .post<{ valid: boolean }>(this.apiConfig.getApiUrl('/auth/verify'), {
    //         token: savedToken,
    //       })
    //       .subscribe({
    //         next: (response) => {
    //           if (response.valid) {
    //             this.setToken(savedToken); // Set the token if it's valid
    //           } else {
    //             this.logout(); // Clear invalid token
    //           }
    //         },
    //         error: () => {
    //           this.logout();
    //         },
    //       });
    //   } else {
    //     this.logout();
    //   }
  }
}
