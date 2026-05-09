import { Routes } from '@angular/router';

export const routes: Routes = [
  // Public Routes
  {
    path: '',
    loadChildren: () => import('./public/public.routes').then(m => m.PUBLIC_ROUTES)
  },
  
  // Auth Routes
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  
  // Admin Routes
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  
  // Student Routes
  {
    path: 'student',
    loadChildren: () => import('./student/student.routes').then(m => m.STUDENT_ROUTES)
  },
  
  // Teacher Routes
  {
    path: 'teacher',
    loadChildren: () => import('./teacher/teacher.routes').then(m => m.TEACHER_ROUTES)
  },
  
  // Wildcard - redirect to home
  { path: '**', redirectTo: '' }
];