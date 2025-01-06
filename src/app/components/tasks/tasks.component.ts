import { Component, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ListViewComponent } from '../reusable/list-view/list-view.component';
import { KanbanViewComponent } from '../reusable/kanban-view/kanban-view.component';
import { MatButtonModule } from '@angular/material/button';
import { FiltersComponent } from '../reusable/filters/filters.component';
import { Router } from '@angular/router';
import { Task } from '../../utils/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  imports: [
    ListViewComponent,
    KanbanViewComponent,
    MatTabsModule,
    MatButtonModule,
    FiltersComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: '../projects/projects.component.css',
})
export class TasksComponent {
  tasks: Task[] = [];
  task!: Task;
  data = signal(this.tasks);
  deleteTaskSignal = signal<string | null>(null);

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks(
      (tasks) => {
        this.tasks = tasks;
        this.updateData();
      },
      (err) => {
        console.error('Failed to fetch tasks:', err);
      }
    );
  }

  updateData() {
    this.data.set(this.tasks);
    console.log('update date', this.data());
  }

  onDelete(taskId: string) {
    console.log(taskId);
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      this.taskService.deleteTask(taskId);
      this.getAllTasks();
    }
  }

  onCreate() {
    this.router.navigate(['/tasks/create']);
  }
}
