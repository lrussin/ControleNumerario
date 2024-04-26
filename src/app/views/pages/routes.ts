import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Page500Component } from './page500/page500.component';
import { Page404Component } from './page404/page404.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: '404',
    // loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component),
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    // loadComponent: () => import('./page500/page500.component').then(m => m.Page500Component),
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  // {
  //   path: 'login',
  //   // loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  //   component: LoginComponent,
  //   data: {
  //     title: 'Login Page'
  //   }
  // },
  {
    path: 'register',
    // loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  }
];
