import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from '../public/courses/courses.component';
import { CourseDetail } from '../public/course-detail/course-detail';
import { About } from '../public/about/about';
import { Contact } from '../public/contact/contact';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'courses/:id', component: CourseDetail },
      { path: 'about', component: About },
      { path: 'contact', component: Contact }
    ]
  }
];