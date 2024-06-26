import { LoginService } from 'src/app/views/login/Service/login.service';
import { UserList } from './../../../util/interfaces/UserList';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from 'src/app/util/interfaces/UserList';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersListService {
  private baseUrl = environment.baseApiUrl + '/api/User/listUser';
  private deleteUrl =  environment.baseApiUrl + '/api/User/delete';

  constructor(
    private httpClient: HttpClient,
    private LoginService: LoginService,

  ) {}

  GetAllUsers(pageNumber:number,pageSize: number): Observable<UserList> {
    let params = new HttpParams()
    .set('pageNumber',pageNumber.toString())
    .set('pageSize',pageSize.toString())

    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });

    return this.httpClient.get<any>(this.baseUrl, { params, headers : headers });
  }

  deleteUser(user : Item): Observable<any> {
    let deleteUserUrl = this.deleteUrl + '?email=' + user.email;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.LoginService.getSessionToken(), 'Content-Type': 'application/json;charset=UTF-8' });

    return this.httpClient.delete(deleteUserUrl,  { responseType: 'text', headers : headers });
  }
}
