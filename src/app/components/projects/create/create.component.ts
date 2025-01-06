import { Component } from '@angular/core';
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
import { ProjectPayload } from '../../../utils/project.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
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
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  name: string = '';
  description: string = '';
  status: taskStatus = taskStatus.PENDING;
  dueDate: Date = new Date();
  createForm!: FormGroup;
  statusOptions = Object.values(taskStatus);
  selectedOption: taskStatus | null = null;

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
    });
  }

  createProject() {
    if (this.createForm.valid) {
      let payload: ProjectPayload = this.createForm.value;
      if (typeof payload.dueDate !== 'string') {
        let formattedDate = payload.dueDate.toISOString();
        payload = { ...payload, dueDate: formattedDate };
      }
      this.projectService.createProject(payload);
    }
  }

  onGoBack(): void {
    this.router.navigate(['/projects']);
  }
}
