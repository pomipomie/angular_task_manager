import { Component, OnInit } from '@angular/core';
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
import { taskStatus } from '../../../utils/taskStatus.enum';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { TaskPayload } from '../../../utils/task.interface';
import { Project } from '../../../utils/project.interface';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-create-task',
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
  templateUrl: './create-task.component.html',
  styleUrl: '../../projects/create/create.component.css',
})
export class CreateTaskComponent implements OnInit {
  name: string = '';
  description: string = '';
  status: taskStatus = taskStatus.PENDING;
  project!: Project;
  projects!: Project[];
  dueDate: Date = new Date();
  createForm!: FormGroup;
  statusOptions = Object.values(taskStatus);
  // selectedOption: taskStatus | null = null;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
      project: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getAllProjects();
  }

  createTask() {
    console.log('click!');
    if (this.createForm.valid) {
      console.group(this.createForm.value);
      let payload: TaskPayload = this.createForm.value;
      if (typeof payload.dueDate !== 'string') {
        let formattedDate = payload.dueDate.toISOString();
        payload = { ...payload, dueDate: formattedDate };
      }
      this.taskService.createTask(payload);
    } else {
      console.log('not valid');
    }
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
