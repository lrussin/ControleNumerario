import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalRegisterService {

  private postCreateUserUrl = 'https://localhost:7162/api/User/register';
  private postPermissionUrl = 'https://localhost:7162/api/Role/SetUserRole'
  private getPermissionUrl = 'https://localhost:7162/api/Role/GetRoles';

  constructor(
    private httpClient: HttpClient
  ) { }

  getPermission(): Observable<any>{
    return this.httpClient.get<any>(this.getPermissionUrl);
  }

  createUser(email: string, fistname: string, lastName: string): Observable<any>{
    let body = {
      email: email,
      firstName: fistname,
      lastName: lastName
    };
    return this.httpClient.post<any>(this.postCreateUserUrl, body)
  }

  setPermission(email: string, permissao: string): Observable<any>{
    let postSetPermissao = this.postPermissionUrl + '?email=' + email + '&roleName=' + permissao

    return this.httpClient.post<any>(postSetPermissao, { responseType: 'text' })
  }
}
