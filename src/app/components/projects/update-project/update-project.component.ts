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
import { Project, ProjectPayload } from '../../../utils/project.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-project',
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
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css',
})
export class UpdateProjectComponent implements OnInit {
  projectId: string | null = null;
  name: string = '';
  description: string = '';
  status: taskStatus = taskStatus.PENDING;
  dueDate: Date = new Date();
  updateForm!: FormGroup;
  statusOptions = Object.values(taskStatus);
  selectedOption: taskStatus | null = null;
  project!: Project;

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router
  ) {
    const route = inject(ActivatedRoute);
    route.paramMap.subscribe((params) => {
      this.projectId = params.get('id');
    });

    this.updateForm = this.fb.group({
      name: [''],
      description: [''],
      status: [''],
      dueDate: [''],
    });
  }

  ngOnInit(): void {
    if (this.projectId) {
      console.log('onInit', this.projectId);
      this.projectService.getProjectById(
        this.projectId,
        (project) => {
          this.updateForm.patchValue(project); // Populate form with project data
          this.project = project;
        },
        (error) => {
          console.error('Failed to fetch project:', error);
          alert('Failed to load project data');
        }
      );
    }
  }

  updateProject() {
    if (this.updateForm.invalid) {
      return;
    }

    const updatedProject = this.updateForm.value;

    if (!this.projectId) {
      return;
    }

    this.projectService.updateProject(
      this.projectId,
      updatedProject,
      (response) => {
        console.log('Project updated successfully:', response);
        alert('Project updated successfully');
        this.router.navigate(['/projects']);
      },
      (error) => {
        console.error('Failed to update project:', error);
        alert('Failed to update project');
      }
    );
  }

  onGoBack(): void {
    this.router.navigate(['/projects']);
  }
}
