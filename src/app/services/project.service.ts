import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Project, ProjectPayload } from '../utils/project.interface';

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

  createProject(payload: ProjectPayload) {
    return this.http
      .post(this.apiConfig.getApiUrl(`${this.apiPath}/new`), payload)
      .subscribe({
        next: (response) => {
          console.log('Project created successfully:', response);
          alert('Project created successfully');
        },
        error: (err) => {
          console.log('Project creation failed', err);
          alert('Project creation failed');
        },
      });
  }

  updateProject(payload: ProjectPayload) {}

  deleteProject(projectId: string) {
    return this.http
      .delete(this.apiConfig.getApiUrl(`${this.apiPath}/delete/${projectId}`))
      .subscribe({
        next: (response) => {
          console.log('Project deleted successfully:', response);
          alert('Project deleted successfully');
        },
        error: (err) => {
          console.log('Project deletion failed', err);
          alert('Project deletion failed');
        },
      });
  }
}
