import { Routes } from '@angular/router';
import { StudentLayout } from './layout/student-layout/student-layout';
import { Dashboard } from './dashboard/dashboard';
import { MyCourses } from './my-courses/my-courses';
import { Assignments } from './assignments/assignments';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: StudentLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'my-courses', component: MyCourses },
      { path: 'assignments', component: Assignments }
    ]
  }
];