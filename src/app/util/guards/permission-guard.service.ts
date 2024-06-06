import { CryptoService } from './../../services/crypto.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuardService implements CanActivate {

  constructor(
    private Router: Router,
    private CryptoService: CryptoService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.CryptoService.decrypt(token);
      if (decodedToken && decodedToken.role && decodedToken.role.includes('Admin')) {
        return true;
      }
    }
    // Redirecionar para uma página de acesso negado ou página inicial
    // this.Router.navigate(['/access-denied']); // Você pode personalizar isso de acordo com suas necessidades
    return false;
  }
}

