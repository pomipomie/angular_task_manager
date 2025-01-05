import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Project } from '../utils/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiPath: string = '/projects';

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiConfig: ApiService
  ) {}

  getAllProjects(
    callback: (projects: Project[]) => void,
    errorCallback: (error: any) => void
  ) {
    this.http
      .get<{ results: Project[] }>(this.apiConfig.getApiUrl(this.apiPath))
      .subscribe({
        next: (response) => callback(response.results),
        error: (err) => errorCallback(err),
      });
  }
}
