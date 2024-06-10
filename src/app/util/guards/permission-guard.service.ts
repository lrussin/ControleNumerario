import { CryptoService } from './../../services/crypto.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { INavData } from '@coreui/angular';

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

  private decodeToken(token: string): any {
    return this.cryptoService.decrypt(token);
  }

  // Função para verificar se o token possui as permissões necessárias
  private hasRequiredPermissions(userRoles: string[], requiredPermissions?: string[]): boolean {
    if (!requiredPermissions) {
      return true; // Se não há permissões requeridas, permitir o acesso
    }
    return requiredPermissions.some(permission => userRoles.includes(permission));
  }

  // Função para filtrar os itens de navegação com base nas permissões do usuário
  public getFilteredNavItems(navItems: INavData[]): INavData[] {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.decodeToken(token);
      const userRoles = decodedToken?.role as string[] || [];

      return navItems.filter(item => this.hasRequiredPermissions(userRoles, item.permission));
    }
    return []; // Se não há token, retornar um array vazio
  }
}
