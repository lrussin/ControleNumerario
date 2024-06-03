import { UserList } from './../../../util/interfaces/UserList';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersListService {
  private baseUrl = 'https://localhost:7162/api/User/listUser';
  private deleteUrl =  'https://localhost:7162/api/Usuario';

  constructor(
    private httpClient: HttpClient
  ) {}

  GetAllUsers(): Observable<UserList[]> {

    return this.httpClient.get<any>(this.baseUrl);
  }

  deleteUser(userId : string): Observable<any> {
    let deleteUserUrl = this.deleteUrl + '?id=' + userId;
    return this.httpClient.delete(deleteUserUrl,  { responseType: 'text' });
    // return this.httpClient.delete<any>(deleteUserUrl);
  }
}
