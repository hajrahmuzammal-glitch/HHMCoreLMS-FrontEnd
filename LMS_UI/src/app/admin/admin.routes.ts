import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Courses } from './courses/courses';
import { Students } from './students/students';
import { Teachers } from './teachers/teachers';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'courses', component: Courses },
      { path: 'students', component: Students },
      { path: 'teachers', component: Teachers }
    ]
  }
];