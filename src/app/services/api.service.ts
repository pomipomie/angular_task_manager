import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  // private apiUrl = 'http://localhost:3300';

  constructor() {}

  getApiUrl(route: string): string {
    return `${this.apiUrl}${route}`;
  }
}
