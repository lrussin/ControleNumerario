import { HomeComponent } from './views/home/home.component';
import { PointServiceComponent } from './views/point-service/point-service.component'
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { LoginComponent } from './views/pages/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './views/pages/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CmAngularDualListboxModule } from 'cm-angular-dual-listbox';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'dashboard', redirectTo: 'dashboard' },
  // { path: 'pointService', component: PointServiceComponent },
  { path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'dashboard',
        // loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
        component: DashboardComponent
      },
      {
        path: 'pointService',
        component: PointServiceComponent
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/routes').then((m) => m.routes),
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '404',
    // loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    component:Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    // loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    component:Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  // {
  //   path: 'login',
  //   // loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
  //   component: LoginComponent,
  //   data: {
  //     title: 'Login Page'
  //   }
  // },
  {
    path: 'register',
    // loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'Home' }
];

@NgModule({
  imports:[RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CmAngularDualListboxModule
  ],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutes { }
