import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private postLoginUrl = environment.baseApiUrl + '/api/User/login'
  private postChangePassword = environment.baseApiUrl + '/api/User/changePassword'
   private postResetSenhaUrl = environment.baseApiUrl + '/api/User/forgotPassword'

  constructor(
    private httpClient : HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  postLogin(email: string, password: string, authcode: string) {
    let body = {
      "email": email,
      "password": password,
      "otpCode": authcode
    }

    return this.httpClient.post(this.postLoginUrl, body);
  }

  setSessionToken(token : string) : void {
    if( token ) localStorage.setItem('authToken', token);
    else throw new Error("Cannot set authToken with undefined");
  }

  removeSessionToken() : void {
    localStorage.removeItem('authToken');
  }


  getSessionToken() : string {
    return localStorage.getItem('authToken') || '';
  }

  isLoggedIn() : boolean {
    const token = this.getSessionToken();

    if( token && !this.jwtHelper.isTokenExpired(token)) return true;
    else return false;
  }

  changePassword(token : string, oldPassword : string, newPassword: string): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json;charset=UTF-8' });
    let body = {
      "oldPassword": oldPassword,
      "newPassword": newPassword
    }
    return this.httpClient.post(this.postChangePassword, body, {headers : headers, responseType: 'text'});
  }

  resetSenha(email : string) {
    let body = {
      "email": email
    }

    return this.httpClient.post(this.postResetSenhaUrl, body);
  }
}
