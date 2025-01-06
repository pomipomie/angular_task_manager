import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Task, TaskPayload } from '../utils/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiPath: string = '/tasks';

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiConfig: ApiService
  ) {}

  getAllTasks(
    callback: (tasks: Task[]) => void,
    errorCallback: (error: any) => void
  ) {
    this.http
      .get<{ results: Task[] }>(this.apiConfig.getApiUrl(this.apiPath))
      .subscribe({
        next: (response) => callback(response.results),
        error: (err) => errorCallback(err),
      });
  }

  getTaskById(
    taskId: string,
    callback: (task: Task) => void,
    errorCallback: (error: any) => void
  ) {
    this.http
      .get<{ task: Task }>(
        this.apiConfig.getApiUrl(`${this.apiPath}/id/${taskId}`)
      )
      .subscribe({
        next: (response) => callback(response.task),
        error: (err) => errorCallback(err),
      });
  }

  createTask(payload: TaskPayload) {
    return this.http
      .post(this.apiConfig.getApiUrl(`${this.apiPath}/new`), payload)
      .subscribe({
        next: (response) => {
          console.log('Task created successfully:', response);
          alert('Task created successfully');
        },
        error: (err) => {
          console.log('Task creation failed', err);
          alert('Task creation failed');
        },
      });
  }

  updateTask(
    id: string,
    payload: TaskPayload,
    callback: (response: any) => void,
    errorCallback: (error: any) => void
  ) {
    this.http
      .put(this.apiConfig.getApiUrl(`${this.apiPath}/update/${id}`), payload)
      .subscribe({
        next: (response) => callback(response),
        error: (err) => errorCallback(err),
      });
  }

  deleteTask(taskId: string) {
    return this.http
      .delete(this.apiConfig.getApiUrl(`${this.apiPath}/delete/${taskId}`))
      .subscribe({
        next: (response) => {
          console.log('Task deleted successfully:', response);
          alert('Task deleted successfully');
        },
        error: (err) => {
          console.log('Task deletion failed', err);
          alert('Task deletion failed');
        },
      });
  }
}
