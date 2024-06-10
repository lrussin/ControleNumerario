import { CryptoService } from './../../services/crypto.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuardService implements CanActivate {

  constructor(
    private router: Router,
    private cryptoService: CryptoService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.cryptoService.decrypt(token);
      if (decodedToken && decodedToken.role) {
        const userRoles = decodedToken.role as Array<string>;
        const requiredRoles = route.data['rules'] as Array<string>;

        if (userRoles && requiredRoles && requiredRoles.some(role => userRoles.includes(role))) {
          return true;
        }
      }
    }

    // Redirecionar para a página de login com a URL de retorno
    this.router.navigate(['/login']);
    return false;
  }
}
