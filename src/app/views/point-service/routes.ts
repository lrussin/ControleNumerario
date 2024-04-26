import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pointService',
    loadComponent: () => import('./point-service.component').then(m => m.PointServiceComponent),
    data: {
      title: `pointService`
    }
  }
];
