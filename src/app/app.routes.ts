import { Routes } from '@angular/router';
import { SigninformComponent } from './components/home/signinform/signinform.component';
import { HomeComponent } from './components/home/home.component';
import { LoginformComponent } from './components/home/loginform/loginform.component';
import { authGuard } from './guards/auth.guard';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/projects/create/create.component';

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
      // { path: 'tasks', component: TasksComponent },
      // { path: 'settings', component: SettingsComponent },
    ],
  },
  { path: '**', redirectTo: '' }, // wildcard route
];
