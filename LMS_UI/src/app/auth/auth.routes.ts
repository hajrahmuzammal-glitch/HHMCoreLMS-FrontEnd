import { Routes } from '@angular/router';
import { BasicLoginComponent } from './login-basic/login-basic';
import { BasicRegisterComponent } from './register-basic/register-basic';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: BasicLoginComponent },
  { path: 'register', component: BasicRegisterComponent }
];