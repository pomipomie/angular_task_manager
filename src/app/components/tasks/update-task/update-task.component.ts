import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../../services/project.service';
import { taskStatus } from '../../../utils/taskStatus.enum';
import { Project } from '../../../utils/project.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { Task, TaskPayload } from '../../../utils/task.interface';

@Component({
  selector: 'app-update-task',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-task.component.html',
  styleUrl: '../../projects/create/create.component.css',
})
export class UpdateTaskComponent implements OnInit {
  name: string = '';
  description: string = '';
  status: taskStatus = taskStatus.PENDING;
  project!: Project;
  projects!: Project[];
  dueDate: Date = new Date();
  updateForm!: FormGroup;
  statusOptions = Object.values(taskStatus);
  taskId: string | null = null;
  task!: Task;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router
  ) {
    const route = inject(ActivatedRoute);
    route.paramMap.subscribe((params) => {
      this.taskId = params.get('id');
    });

    this.updateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
      project: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getAllProjects();
    if (this.taskId) {
      console.log('onInit', this.taskId);
      this.taskService.getTaskById(
        this.taskId,
        (task) => {
          this.updateForm.patchValue(task); // Populate form with task data
          this.task = task;
        },
        (error) => {
          console.error('Failed to fetch task:', error);
          alert('Failed to load task data');
        }
      );
    }
  }

  updateTask() {
    if (this.updateForm.invalid) {
      return;
    }

    const updatedTask = this.updateForm.value;

    if (!this.taskId) {
      return;
    }

    this.taskService.updateTask(
      this.taskId,
      updatedTask,
      (response) => {
        console.log('Task updated successfully:', response);
        alert('Task updated successfully');
        this.router.navigate(['/tasks']);
      },
      (error) => {
        console.error('Failed to update task:', error);
        alert('Failed to update task');
      }
    );
  }

  getAllProjects() {
    this.projectService.getAllProjects(
      (projects) => {
        this.projects = projects;
        console.log('Projects:', this.projects);
      },
      (err) => {
        console.error('Failed to fetch projects:', err);
      }
    );
  }

  onGoBack(): void {
    this.router.navigate(['/tasks']);
  }
}
