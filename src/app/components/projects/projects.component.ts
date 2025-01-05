import { Component, OnInit, signal, Signal } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../utils/project.interface';
import { Data } from '../../utils/data';
import { MatTabsModule } from '@angular/material/tabs';
import { ListViewComponent } from '../reusable/list-view/list-view.component';
import { KanbanViewComponent } from '../reusable/kanban-view/kanban-view.component';

@Component({
  selector: 'app-projects',
  imports: [ListViewComponent, KanbanViewComponent, MatTabsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  project!: Project;
  data = signal(this.projects);

  constructor(private projectService: ProjectService) {}

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
}
