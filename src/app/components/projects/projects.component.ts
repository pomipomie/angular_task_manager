import { Component, OnInit, signal } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../utils/project.interface';
import { MatTabsModule } from '@angular/material/tabs';
import { ListViewComponent } from '../reusable/list-view/list-view.component';
import { KanbanViewComponent } from '../reusable/kanban-view/kanban-view.component';
import { MatButtonModule } from '@angular/material/button';
import { FiltersComponent } from '../reusable/filters/filters.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [
    ListViewComponent,
    KanbanViewComponent,
    MatTabsModule,
    MatButtonModule,
    FiltersComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  project!: Project;
  data = signal(this.projects);
  deleteProjectSignal = signal<string | null>(null);

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.getAllProjects(
      (projects) => {
        this.projects = projects;
        console.log('Projects:', this.projects);
        this.updateData();
      },
      (err) => {
        console.error('Failed to fetch projects:', err);
      }
    );
  }

  updateData() {
    this.data.set(this.projects);
    console.log('update date', this.data());
  }

  onDelete(projectId: string) {
    console.log(projectId);
    const confirmDelete = confirm(
      'Are you sure you want to delete this project?'
    );
    if (confirmDelete) {
      this.projectService.deleteProject(projectId);
      this.getAllProjects();
    }
  }

  onCreate() {
    this.router.navigate(['/projects/create']);
  }
}
