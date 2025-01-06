import { Routes } from '@angular/router';
import { SigninformComponent } from './components/home/signinform/signinform.component';
import { HomeComponent } from './components/home/home.component';
import { LoginformComponent } from './components/home/loginform/loginform.component';
import { authGuard } from './guards/auth.guard';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/projects/create/create.component';
import { UpdateProjectComponent } from './components/projects/update-project/update-project.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { CreateTaskComponent } from './components/tasks/create-task/create-task.component';
import { UpdateTaskComponent } from './components/tasks/update-task/update-task.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginformComponent,
        canActivate: [authGuard],
      },
      {
        path: 'signup',
        component: SigninformComponent,
        // canActivate: [authGuard],
      },
      // { path: 'dashboard', component: DashboardComponent },
      {
        path: 'projects',
        component: ProjectsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'projects/create',
        component: CreateComponent,
        canActivate: [authGuard],
      },
      {
        path: 'projects/update/:id',
        component: UpdateProjectComponent,
        canActivate: [authGuard],
      },
      {
        path: 'tasks',
        component: TasksComponent,
        canActivate: [authGuard],
      },
      {
        path: 'tasks/create',
        component: CreateTaskComponent,
        canActivate: [authGuard],
      },
      {
        path: 'tasks/update/:id',
        component: UpdateTaskComponent,
        canActivate: [authGuard],
      },
      // { path: 'settings', component: SettingsComponent },
    ],
  },
  { path: '**', redirectTo: '' }, // wildcard route
];
