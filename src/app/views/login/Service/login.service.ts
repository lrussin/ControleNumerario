import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private postLoginUrl = 'https://localhost:7162/api/User/login'

  constructor(
    private httpClient : HttpClient,
  ) { }

  postLogin(email: string, password: string, authcode: string) {
    let body = {
      "email": '',
      "password": '',
      "authCode": ''
    }

    return this.httpClient.post(this.postLoginUrl, body);
  }
}
