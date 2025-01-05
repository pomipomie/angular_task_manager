import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private apiUrl = 'https://express-task-manager.onrender.com';
  private apiUrl = 'http://localhost:3300';

  constructor() {}

  getApiUrl(route: string): string {
    return `${this.apiUrl}${route}`;
  }
}
