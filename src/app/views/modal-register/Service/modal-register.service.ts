import { LoginService } from 'src/app/views/login/Service/login.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalRegisterService {

  private postCreateUserUrl = environment.baseApiUrl + '/api/User/register';
  private postPermissionUrl = environment.baseApiUrl + '/api/Role/SetUserRole';
  private getPermissionUrl = environment.baseApiUrl + '/api/Role/GetRoles';
  private getLoadPermissionUrl = environment.baseApiUrl + '/api/Role/GetUserRole'
  private postReenviarQrCodeUrl = environment.baseApiUrl + '/api/User/ResendQrCode/'

  constructor(
    private httpClient: HttpClient,
    private LoginService: LoginService
  ) { }

  getPermission(): Observable<any>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });
    return this.httpClient.get<any>(this.getPermissionUrl, { headers : headers});
  }

  createUser(email: string, fistname: string, lastName: string): Observable<any>{
    let body = {
      email: email,
      firstName: fistname,
      lastName: lastName
    };

    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });
    console.log({ headers : headers })
    return this.httpClient.post<any>(this.postCreateUserUrl, body, { headers : headers})
  }

  setPermission(email: string, permissao: string): Observable<any> {
    let postSetPermissao = this.postPermissionUrl + '?email=' + email + '&roleName=' + permissao;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });
    return this.httpClient.post(postSetPermissao, null,{ headers : headers })
  }

  loadPermission(email: string): Observable<any> {
    let getLoadPermission = this.getLoadPermissionUrl + '?email=' + email;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });

    return this.httpClient.get<any>(getLoadPermission,{ headers : headers })
  }

  reenviarQrCode(email: string): Observable<any> {

    let reenviarQrCode = this.postReenviarQrCodeUrl + email

    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });
    return this.httpClient.post(reenviarQrCode, null ,{ headers : headers, responseType: 'text' })
  }
}
