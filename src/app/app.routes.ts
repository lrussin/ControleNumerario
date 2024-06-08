import { PermissionGuardService } from './util/guards/permission-guard.service';
import { DetailsPaComponent } from './views/details-pa/details-pa.component';
import { ModalParameterService } from './views/modal-parameter/Service/modal-parameter.service';
import { ParameterComponent } from './views/parameter/parameter.component';
import { UsersListComponent } from './views/users-list/users-list.component';
import { InterbancarioComponent } from './views/interbancario/interbancario.component';
import { PointServiceComponent } from './views/point-service/point-service.component'
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { LoginComponent } from './views/login/login.component';
import { ApplicationRef, NgModule } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { UsersListService } from './views/users-list/Service/users-list.service';
import {ParameterService} from './views/parameter/Service/parameter.service';
import { PointService } from './views/point-service/Service/point.service';
import { JwtModule } from '@auth0/angular-jwt';
import { CryptoService } from './services/crypto.service';
import { NgApexchartsModule } from "ng-apexcharts";


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '',
    component: DefaultLayoutComponent,
    canActivate: [PermissionGuardService],
    children: [
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
        component: UsersListComponent,
        canActivate: [PermissionGuardService], // Usar o guardião de rota aqui
        data:{rules: ["Admin"]} //
      },
      {
        path: 'parameter',
        component: ParameterComponent,
        canActivate: [PermissionGuardService],
        data:{rules: ["Admin"]}
      },
    ]
  },
  { path: '**', redirectTo: '/pointService' }
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
    CommonModule,
    NgApexchartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('authToken'); // Exemplo de como obter o token JWT armazenado no localStorage
        }
      }
    })
  ],
  providers: [CryptoService,HomeService, UsersListService ,SidebarNavHelper, ParameterService, ModalParameterService, PointService],
  exports: [RouterModule]
})
export class AppRoutes {
  ngDoBootstrap(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent); // Componentes a serem inicializados
  }
 }
