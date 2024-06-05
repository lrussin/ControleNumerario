import { DetailsPaComponent } from './views/details-pa/details-pa.component';
import { ModalParameterService } from './views/modal-parameter/Service/modal-parameter.service';
import { ParameterComponent } from './views/parameter/parameter.component';
import { UsersListComponent } from './views/users-list/users-list.component';
import { InterbancarioComponent } from './views/interbancario/interbancario.component';
import { PointServiceComponent } from './views/point-service/point-service.component'
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { ApplicationRef, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { RegisterComponent } from './views/pages/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CmAngularDualListboxModule } from 'cm-angular-dual-listbox';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from './views/home/service/home.service';
import { AppComponent } from './app.component';
import { SidebarNavHelper } from '@coreui/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ModalRegisterComponent } from './views/modal-register/modal-register.component';
import { CommonModule } from '@angular/common';
import { UsersListService } from './views/users-list/Service/users-list.service';
import {ParameterService} from './views/parameter/Service/parameter.service';
import { PointService } from './views/point-service/Service/point.service';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '',
    component: DefaultLayoutComponent,
    // data: {
    //   title: 'Home'
    // },
    children: [
      // {
      //   path: 'home',
      //   component: HomeComponent
      // },
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
        path: 'pointService/details',
        component: DetailsPaComponent
      },
      {
        path: 'interbancario',
        component: InterbancarioComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'modal-register',
        component: ModalRegisterComponent
      },
      {
        path: 'parameter',
        component: ParameterComponent
      },
      {
        path: 'details',
        component: DetailsPaComponent
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
    CmAngularDualListboxModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  providers: [HomeService, UsersListService ,SidebarNavHelper, ParameterService, ModalParameterService, PointService],
  exports: [RouterModule]
})
export class AppRoutes {
  ngDoBootstrap(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent); // Componentes a serem inicializados
  }
 }
