import { Routes } from '@angular/router';
import { TeacherLayout } from './layout/teacher-layout/teacher-layout';
import { Dashboard } from './dashboard/dashboard';
import { MyCourses } from './my-courses/my-courses';
import { Grading } from './grading/grading';

export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    component: TeacherLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'my-courses', component: MyCourses },
      { path: 'grading', component: Grading }
    ]
  }
];